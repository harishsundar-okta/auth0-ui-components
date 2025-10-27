import { MyOrgClient } from 'auth0-myorg-sdk';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { auth0Config } from '@/config/auth';
import { auth0 } from '@/lib/auth0';

interface SdkAction {
  sdkMethod: string;
  hasBody?: boolean;
  isVoid?: boolean;
}
interface RouteConfig {
  path: string;
  actions: Record<string, SdkAction>;
}
interface SdkRoute {
  sdkPath: string[];
  routes: RouteConfig[];
}
interface ProcessedRoute extends SdkAction {
  method: string;
  path: string;
  sdkPath: string[];
  orderedParams: string[];
}

const sdkRoutes: SdkRoute[] = [
  {
    sdkPath: ['organizationDetails'],
    routes: [
      {
        path: '/my-org/details',
        actions: {
          GET: { sdkMethod: 'get' },
          PATCH: { sdkMethod: 'update', hasBody: true },
        },
      },
    ],
  },
  {
    sdkPath: ['organization', 'identityProviders'],
    routes: [
      {
        path: '/my-org/identity-providers',
        actions: { GET: { sdkMethod: 'list' }, POST: { sdkMethod: 'create', hasBody: true } },
      },
      {
        path: '/my-org/identity-providers/:id',
        actions: {
          GET: { sdkMethod: 'get' },
          PATCH: { sdkMethod: 'update', hasBody: true },
          DELETE: { sdkMethod: 'delete', isVoid: true },
        },
      },
      {
        path: '/my-org/identity-providers/:id/detach',
        actions: { POST: { sdkMethod: 'detach', isVoid: true } },
      },
    ],
  },
  {
    sdkPath: ['organization', 'identityProviders', 'provisioning'],
    routes: [
      {
        path: '/my-org/identity-providers/:id/provisioning',
        actions: {
          GET: { sdkMethod: 'get' },
          POST: { sdkMethod: 'create' },
          DELETE: { sdkMethod: 'delete', isVoid: true },
        },
      },
    ],
  },
  {
    sdkPath: ['organization', 'identityProviders', 'provisioning', 'scimTokens'],
    routes: [
      {
        path: '/my-org/identity-providers/:id/provisioning/scim-tokens',
        actions: {
          GET: { sdkMethod: 'list' },
          POST: { sdkMethod: 'create', hasBody: true },
        },
      },
      {
        path: '/my-org/identity-providers/:id/provisioning/scim-tokens/:tokenId',
        actions: { DELETE: { sdkMethod: 'delete', isVoid: true } },
      },
    ],
  },
];

const groupBy = <T>(array: T[], predicate: (value: T) => string | number): Record<string, T[]> => {
  return array.reduce(
    (acc, value) => {
      const key = predicate(value);
      (acc[key] || (acc[key] = [])).push(value);
      return acc;
    },
    {} as Record<string, T[]>,
  );
};

const processRoutes = (): ProcessedRoute[] => {
  const flatRoutes = sdkRoutes.flatMap((sdkRoute) =>
    sdkRoute.routes.flatMap((route) => {
      const orderedParams = (route.path.match(/:\w+/g) || []).map((p) => p.substring(1));
      return Object.entries(route.actions).map(([method, action]) => ({
        ...action,
        method,
        path: route.path,
        sdkPath: sdkRoute.sdkPath,
        orderedParams,
      }));
    }),
  );

  return flatRoutes.sort(
    (a, b) => a.orderedParams.length - b.orderedParams.length || b.path.length - a.path.length,
  );
};

const createRouteMap = (routes: ProcessedRoute[]) => {
  const routesByMethod = groupBy(routes, (route) => route.method);
  const routeMap = new Map<string, Map<number, ProcessedRoute[]>>();

  for (const method in routesByMethod) {
    const routesBySegmentCount = groupBy(
      routesByMethod[method],
      (route) => route.path.split('/').filter(Boolean).length,
    );
    routeMap.set(
      method,
      new Map(Object.entries(routesBySegmentCount).map(([count, r]) => [Number(count), r])),
    );
  }
  return routeMap;
};

const routeMap = createRouteMap(processRoutes());

const createErrorResponse = (message: string, status: number, details?: unknown) =>
  NextResponse.json(details !== undefined ? { error: message, details } : { error: message }, {
    status,
  });

const createMyOrgClient = async (): Promise<MyOrgClient> => {
  const { token } = (await auth0.getAccessToken()) || {};
  if (!token) throw new Error('No access token available');
  return new MyOrgClient({ domain: auth0Config.issuerBaseUrl, token: token });
};

const templateCache = new Map<string, { regex: RegExp; paramNames: string[] }>();
const matchPath = (template: string, path: string): Record<string, string> | null => {
  let compiled = templateCache.get(template);
  if (!compiled) {
    const paramNames = (template.match(/:\w+/g) || []).map((p) => p.substring(1));
    const staticParts = template.split(/:\w+/g);
    const regexString =
      staticParts.reduce((acc, part, i) => {
        const escapedPart = part.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        return acc + escapedPart + (i < paramNames.length ? '([^/]+)' : '');
      }, '^') + '$';
    compiled = { regex: new RegExp(regexString), paramNames };
    templateCache.set(template, compiled);
  }
  const match = compiled.regex.exec(path);
  if (!match) return null;
  return compiled.paramNames.reduce((acc, name, i) => ({ ...acc, [name]: match[i + 1] }), {});
};

const isIndexable = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const handleProxyError = (error: unknown): NextResponse => {
  console.error('Proxy error:', error);
  if (isIndexable(error)) {
    const statusCode = typeof error.statusCode === 'number' ? error.statusCode : 500;
    const details = error.body ?? error.message ?? 'An unknown error occurred.';
    let message = 'Internal proxy error';
    if (statusCode === 401) message = 'Unauthorized';
    else if (statusCode === 403) message = 'Forbidden';
    else if (statusCode === 404) message = 'Not Found';
    return createErrorResponse(message, statusCode, details);
  }
  const message = error instanceof Error ? error.message : 'An unknown error occurred.';
  return createErrorResponse('Internal proxy error', 500, message);
};

const proxyHandler = async (req: NextRequest) => {
  try {
    const session = await auth0.getSession();
    if (!session) return createErrorResponse('Not authenticated', 401, 'No user session found.');

    const path = req.nextUrl.pathname.substring('/api'.length) || '/';
    const method = req.method ?? 'GET';
    const pathSegmentsCount = path.split('/').filter(Boolean).length;
    const candidateRoutes = routeMap.get(method)?.get(pathSegmentsCount) || [];
    let params: Record<string, string> | null = null;
    const route = candidateRoutes.find((r) => (params = matchPath(r.path, path)));

    if (!route || !params) {
      return createErrorResponse('Route not found', 404, `No handler for ${method} ${path}`);
    }

    const myOrgClient = await createMyOrgClient();
    let targetObject: unknown = myOrgClient;
    for (const key of route.sdkPath) {
      if (!isIndexable(targetObject)) {
        targetObject = undefined;
        break;
      }
      targetObject = targetObject[key];
    }

    if (!isIndexable(targetObject)) {
      return createErrorResponse(
        'Invalid SDK path',
        500,
        `Could not resolve path: ${route.sdkPath.join('.')}`,
      );
    }

    const sdkMethod = targetObject[route.sdkMethod];
    if (typeof sdkMethod !== 'function') {
      return createErrorResponse(
        'Method not found on SDK object',
        404,
        `Action "${route.sdkMethod}" is not a function.`,
      );
    }

    const args: (string | object)[] = route.orderedParams.map((paramName) => params![paramName]);
    if (route.hasBody) {
      try {
        const text = await req.text();
        if (text) args.push(JSON.parse(text));
      } catch (jsonError) {
        return createErrorResponse('Bad Request', 400, 'Invalid JSON in request body.');
      }
    }

    const result = await sdkMethod.apply(targetObject, args);
    return route.isVoid ? new NextResponse(null, { status: 204 }) : NextResponse.json(result);
  } catch (error) {
    return handleProxyError(error);
  }
};

export {
  proxyHandler as GET,
  proxyHandler as POST,
  proxyHandler as PUT,
  proxyHandler as PATCH,
  proxyHandler as DELETE,
};
