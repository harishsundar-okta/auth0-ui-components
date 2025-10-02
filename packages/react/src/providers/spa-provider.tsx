'use client';

import { useAuth0 } from '@auth0/auth0-react';
import * as React from 'react';

import { CoreClientContext } from '@/hooks/use-core-client';
import { useCoreClientInitialization } from '@/hooks/use-core-client-initialization';
import type { InternalProviderProps } from '@/types/auth-types';

export const SpaProvider = ({
  i18n,
  authDetails,
  children,
}: InternalProviderProps & { children: React.ReactNode }) => {
  const auth0ContextInterface = useAuth0();

  const memoizedAuthDetails = React.useMemo(
    () => ({
      ...authDetails,
      contextInterface: auth0ContextInterface,
    }),
    [
      authDetails,
      auth0ContextInterface.isAuthenticated,
      auth0ContextInterface.getAccessTokenSilently,
      auth0ContextInterface.user?.sub,
    ],
  );

  const memoizedServicesConfig = React.useMemo(
    () => ({
      myOrg: {
        enabled: auth0ContextInterface.user?.org_id !== undefined,
      },
    }),
    [auth0ContextInterface.user?.org_id],
  );

  const coreClient = useCoreClientInitialization({
    authDetails: memoizedAuthDetails,
    i18nOptions: i18n,
    servicesConfig: memoizedServicesConfig,
  });

  const coreClientValue = React.useMemo(
    () => ({
      coreClient,
    }),
    [coreClient],
  );

  return (
    <CoreClientContext.Provider value={coreClientValue}>{children}</CoreClientContext.Provider>
  );
};

export default SpaProvider;
