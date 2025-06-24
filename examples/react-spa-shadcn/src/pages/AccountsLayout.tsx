import { Outlet } from 'react-router-dom';
import Header from '@/components/Header';
import AccountsSidebar from '@/components/AccountsSidebar';

const AccountsLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <AccountsSidebar />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AccountsLayout;
