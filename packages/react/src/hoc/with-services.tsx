import * as React from 'react';

import { Spinner } from '../components/ui/spinner';
import { useTheme, useCoreClient } from '../hooks';

export interface ServiceRequirements {
  myAccountApiService?: boolean;
  myOrgService?: boolean;
}

/**
 * Higher-Order Component that ensures coreClient and required services are initialized
 * before rendering the wrapped component.
 *
 * This HOC provides a flexible way to specify which services are required for a component.
 *
 * @param WrappedComponent - The component that requires specific services
 * @param requirements - Configuration object specifying which services are required
 * @returns A new component that handles service initialization and loading states
 */
export function withServices<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  requirements: ServiceRequirements = {},
): React.ComponentType<P> {
  const WithServicesComponent = (props: P) => {
    const { loader } = useTheme();
    const { coreClient } = useCoreClient();

    const defaultLoader = (
      <div className="fixed inset-0 flex items-center justify-center">
        <Spinner className="h-8 w-8" />
      </div>
    );

    // Basic core client check
    if (!coreClient) {
      return <>{loader || defaultLoader}</>;
    }

    // Check authentication service requirement
    if (requirements.myAccountApiService && !coreClient.myAccountApiService) {
      return <>{loader || defaultLoader}</>;
    }

    // Check MyOrg service requirement
    if (requirements.myOrgService && !coreClient.myOrgApiService) {
      return <>{loader || defaultLoader}</>;
    }

    return <WrappedComponent {...props} />;
  };

  WithServicesComponent.displayName = `withServices(${WrappedComponent.displayName || WrappedComponent.name})`;

  return WithServicesComponent;
}

/**
 * HOC that requires authentication service (for MFA operations)
 */
export const withAuthenticationService = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
) => withServices(WrappedComponent, { myAccountApiService: true });

/**
 * HOC that requires MyOrg service (for organization management)
 */
export const withMyOrgService = <P extends object>(WrappedComponent: React.ComponentType<P>) =>
  withServices(WrappedComponent, { myOrgService: true });

/**
 * HOC that requires all available services
 */
export const withAllServices = <P extends object>(WrappedComponent: React.ComponentType<P>) =>
  withServices(WrappedComponent, {
    myAccountApiService: true,
    myOrgService: true,
  });
