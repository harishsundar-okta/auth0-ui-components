import { MyOrgClient, type Auth0MyOrg } from 'auth0-myorg-sdk';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { auth0Config } from '@/config/auth';
import { auth0 } from '@/lib/auth0';

export type UpdateOrganizationDetailsRequestContent =
  Auth0MyOrg.UpdateOrganizationDetailsRequestContent;

export type CreateIdentityProviderRequestContent = Auth0MyOrg.CreateIdentityProviderRequestContent;

export type UpdateIdentityProviderRequestContent = Auth0MyOrg.UpdateIdentityProviderRequestContent;

const createErrorResponse = (message: string, status: number, details?: string) => {
  return NextResponse.json(details ? { error: message, details } : { error: message }, { status });
};

const createMyOrgClient = async (): Promise<MyOrgClient> => {
  const { token } = (await auth0.getAccessToken()) || {};
  if (!token) {
    throw new Error('No access token available');
  }

  return new MyOrgClient({
    domain: auth0Config.issuerBaseUrl,
    token: token,
  });
};

interface RouteConfig {
  method: string;
  pattern: RegExp;
  handler: (
    myOrgClient: MyOrgClient,
    body?: Record<string, unknown>,
    pathParams?: Record<string, string>,
  ) => Promise<unknown>;
}

const routes: RouteConfig[] = [
  // My Org - Organization Details
  {
    method: 'GET',
    pattern: /^\/my-org\/details$/,
    handler: async (myOrgClient) => {
      return await myOrgClient.organizationDetails.get();
    },
  },
  {
    method: 'PATCH',
    pattern: /^\/my-org\/details$/,
    handler: async (myOrgClient, body) => {
      return await myOrgClient.organizationDetails.update(
        body as UpdateOrganizationDetailsRequestContent,
      );
    },
  },

  // My Org - Identity Providers
  {
    method: 'GET',
    pattern: /^\/my-org\/identity-providers\/(?<idpId>[^/]+)$/,
    handler: async (myOrgClient, body, pathParams) => {
      return await myOrgClient.organization.identityProviders.get(pathParams!.idpId);
    },
  },
  {
    method: 'PATCH',
    pattern: /^\/my-org\/identity-providers\/(?<idpId>[^/]+)$/,
    handler: async (myOrgClient, body, pathParams) => {
      return await myOrgClient.organization.identityProviders.update(
        pathParams!.idpId,
        body as UpdateIdentityProviderRequestContent,
      );
    },
  },
  {
    method: 'DELETE',
    pattern: /^\/my-org\/identity-providers\/(?<idpId>[^/]+)$/,
    handler: async (myOrgClient, body, pathParams) => {
      return await myOrgClient.organization.identityProviders.delete(pathParams!.idpId);
    },
  },
  {
    method: 'POST',
    pattern: /^\/my-org\/identity-providers\/(?<idpId>[^/]+)\/detach$/,
    handler: async (myOrgClient, body, pathParams) => {
      return await myOrgClient.organization.identityProviders.detach(pathParams!.idpId);
    },
  },
  {
    method: 'GET',
    pattern: /^\/my-org\/identity-providers$/,
    handler: async (myOrgClient) => {
      return await myOrgClient.organization.identityProviders.list();
    },
  },
  {
    method: 'POST',
    pattern: /^\/my-org\/identity-providers$/,
    handler: async (myOrgClient, body) => {
      return await myOrgClient.organization.identityProviders.create(
        body as unknown as CreateIdentityProviderRequestContent,
      );
    },
  },
];

const extractPathParams = (match: RegExpMatchArray): Record<string, string> => {
  return match.groups || {};
};

const proxyHandler = async (req: NextRequest) => {
  try {
    const path = req.nextUrl.pathname.substring('/api'.length);
    const method = req.method;

    const session = await auth0.getSession();
    if (!session) {
      return createErrorResponse('Not authenticated', 401, 'No user session found.');
    }

    const route = routes.find((r) => {
      return r.method === method && r.pattern.test(path);
    });

    if (!route) {
      return createErrorResponse('Route not found', 404, `No handler for ${method} ${path}`);
    }

    const myOrgClient = await createMyOrgClient();

    let body: Record<string, unknown> | undefined;
    if (['POST', 'PUT', 'PATCH'].includes(method)) {
      body = await req.json();
    }

    const match = path.match(route.pattern);
    const pathParams = match ? extractPathParams(match) : {};

    const result = await route.handler(myOrgClient, body, pathParams);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Proxy error:', error);

    if (error instanceof Error) {
      if (error.message.includes('No access token')) {
        return createErrorResponse('Unauthorized', 401, 'Failed to obtain access token.');
      }
      if (error.message.includes('No current session')) {
        return createErrorResponse('Authentication required', 401, 'Please log in again.');
      }
    }

    return createErrorResponse(
      'Internal proxy error',
      500,
      error instanceof Error ? error.message : 'An unknown error occurred.',
    );
  }
};

export {
  proxyHandler as GET,
  proxyHandler as POST,
  proxyHandler as PUT,
  proxyHandler as PATCH,
  proxyHandler as DELETE,
  proxyHandler as OPTIONS,
};
