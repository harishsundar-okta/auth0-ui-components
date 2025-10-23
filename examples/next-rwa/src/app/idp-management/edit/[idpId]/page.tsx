'use client';

import { EditSsoProvider } from '@auth0-web-ui-components/react';
import { useRouter, useParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';

export default function SsoProviderEditPage() {
  const router = useRouter();
  const params = useParams();
  const idpId = params.idpId as string;

  const handleUpdate = useCallback((): void => {
    router.push('/idp-management/');
  }, [router]);

  const handleBack = useCallback((): void => {
    router.push('/idp-management/');
  }, [router]);

  const updateAction = useMemo(
    () => ({
      onAfter: handleUpdate,
    }),
    [handleUpdate],
  );

  return (
    <div className="p-6 pt-8 space-y-6">
      <EditSsoProvider
        idpId={idpId!}
        update={updateAction}
        backButton={{ onClick: handleBack }}
        delete={{
          onAfter: () => {
            router.push('/idp-management/');
          },
        }}
        removeFromOrg={{
          onAfter: () => {
            router.push('/idp-management/');
          },
        }}
      />
    </div>
  );
}
