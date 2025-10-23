import { SsoProviderEdit } from '@auth0-web-ui-components/react';
import { useNavigate, useParams } from 'react-router-dom';

const SsoProviderEditPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  return (
    <div className="space-y-6">
      <SsoProviderEdit
        idpId={id!}
        backButton={{
          onClick: () => navigate('/sso-providers'),
        }}
        delete={{
          onAfter: () => {
            navigate('/sso-providers');
          },
        }}
        removeFromOrg={{
          onAfter: () => {
            navigate('/sso-providers');
          },
        }}
      />
    </div>
  );
};

export default SsoProviderEditPage;
