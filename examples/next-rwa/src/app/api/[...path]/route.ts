import { MyOrgClient, type Auth0MyOrg } from 'auth0-myorg-sdk';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// Update Organization Details
export type UpdateOrganizationDetailsRequestContent =
  Auth0MyOrg.UpdateOrganizationDetailsRequestContent;

import { auth0Config } from '@/config/auth';
import { auth0 } from '@/lib/auth0';

const createErrorResponse = (message: string, status: number, details?: string) => {
  return NextResponse.json(details ? { error: message, details } : { error: message }, { status });
};

const createMyOrgClient = async (): Promise<MyOrgClient> => {
  const { token: accessToken } = (await auth0.getAccessToken()) || {};
  if (!accessToken) {
    throw new Error('No access token available');
  }

  return new MyOrgClient({
    domain: auth0Config.issuerBaseUrl,
    token: accessToken,
  });
};

const routeHandlers = {
  'GET /my-org/details': async (myOrgClient: MyOrgClient) => {
    return await myOrgClient.organizationDetails.get();
  },
  'PATCH /my-org/details': async (
    myOrgClient: MyOrgClient,
    body: UpdateOrganizationDetailsRequestContent,
  ) => {
    return await myOrgClient.organizationDetails.update(body);
  },
} as const;

const proxyHandler = async (req: NextRequest) => {
  try {
    const path = req.nextUrl.pathname.substring('/api'.length);

    // Check authentication
    const session = await auth0.getSession();
    if (!session) {
      return createErrorResponse('Not authenticated', 401, 'No user session found.');
    }

    // Find route handler
    const routeKey = `${req.method} ${path}` as keyof typeof routeHandlers;
    const handler = routeHandlers[routeKey];

    if (!handler) {
      return createErrorResponse('Route not found', 404, `No handler for ${req.method} ${path}`);
    }

    // Create MyOrgClient and handle SDK route
    const myOrgClient = await createMyOrgClient();

    let body;
    if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
      body = await req.json();
    }

    const result = await handler(myOrgClient, body);
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
