import { UserMFAMgmt } from '@auth0-web-ui-components/react';

const UserProfilePage = () => {
  return (
    <div className="space-y-6">
      <UserMFAMgmt
        factorConfig={{
          duo: {
            visible: false,
          },
          'webauthn-platform': {
            visible: false,
          },
          'recovery-code': {
            visible: false,
          },
          'webauthn-roaming': {
            visible: false,
          },
        }}
      />
    </div>
  );
};

export default UserProfilePage;
