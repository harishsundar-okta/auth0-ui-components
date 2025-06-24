import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { User, Shield, CreditCard, Package, ArrowLeft } from 'lucide-react';

const AccountsSidebar = () => {
  const location = useLocation();

  const sidebarItems = [
    {
      title: 'Profile',
      href: '/accounts',
      icon: User,
    },
    {
      title: 'Security',
      href: '/accounts/security',
      icon: Shield,
    },
    {
      title: 'Payment',
      href: '/accounts/payment',
      icon: CreditCard,
    },
    {
      title: 'Orders',
      href: '/accounts/orders',
      icon: Package,
    },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="p-6">
        <Link
          to="/"
          className="flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Link>

        <h2 className="text-2xl font-semibold text-gray-900 mb-8">Account</h2>

        <nav className="space-y-2">
          {sidebarItems.map((item) => {
            const isActive =
              location.pathname === item.href ||
              (item.href === '/accounts' && location.pathname === '/accounts');

            return (
              <Link key={item.href} to={item.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    'w-full justify-start h-10 px-3 text-left',
                    isActive
                      ? 'bg-gray-100 text-gray-900 font-medium'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50',
                  )}
                >
                  <item.icon className="w-4 h-4 mr-3" />
                  {item.title}
                </Button>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default AccountsSidebar;
