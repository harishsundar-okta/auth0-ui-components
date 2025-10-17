'use client';

import { SsoProviderTable, type IdentityProvider } from '@auth0-web-ui-components/react';
import { useCallback, useMemo } from 'react';

export default function IdpManagementPage() {
  const handleCreate = useCallback((): void => {
    console.log('Navigate to create SSO provider page');
    // router.push('/idp-management/create');
  }, []);

  const handleEdit = useCallback((provider: IdentityProvider): void => {
    console.log('Navigate to edit SSO provider page', provider);
    // router.push(`/idp-management/edit/${provider.id}`);
  }, []);

  const createAction = useMemo(
    () => ({
      onAfter: handleCreate,
      disabled: false,
    }),
    [handleCreate],
  );

  const editAction = useMemo(
    () => ({
      onAfter: handleEdit,
      disabled: false,
    }),
    [handleEdit],
  );

  return (
    <div className="p-6 pt-8 space-y-6">
      <SsoProviderTable create={createAction} edit={editAction} />
    </div>
  );
}
