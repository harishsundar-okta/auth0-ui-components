import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const DocsSidebar = () => {
  const location = useLocation();
  const [expandedSections, setExpandedSections] = useState({
    authentication: true,
    user: true,
    organization: false,
    billing: false,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const isActive = (path: string) => location.pathname === path;

  const menuItems = [
    {
      title: 'Authentication Components',
      key: 'authentication',
      items: [
        { title: '<SignIn />', path: '/docs/components/sign-in' },
        { title: '<SignUp />', path: '/docs/components/sign-up' },
        { title: '<MFASetup />', path: '/docs/components/mfa-setup' },
      ],
    },
    {
      title: 'User Components',
      key: 'user',
      items: [
        { title: '<UserButton />', path: '/docs/components/user-button' },
        { title: '<UserProfile />', path: '/docs/components/user-profile' },
      ],
    },
    {
      title: 'Organization Components',
      key: 'organization',
      items: [
        { title: '<CreateOrganization />', path: '/docs/components/create-organization' },
        { title: '<OrganizationProfile />', path: '/docs/components/organization-profile' },
      ],
    },
    {
      title: 'Billing Components',
      key: 'billing',
      items: [
        { title: '<PricingTable />', path: '/docs/components/pricing-table' },
        { title: '<PaymentForm />', path: '/docs/components/payment-form' },
      ],
    },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
      <div className="p-4">
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Select your SDK</h3>
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-2 flex items-center gap-2">
            <div className="w-6 h-6 bg-yellow-400 rounded text-xs font-bold flex items-center justify-center text-black">
              JS
            </div>
            <span className="text-sm text-gray-900">JavaScript</span>
          </div>
        </div>

        <div className="space-y-1">
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Types</h3>
            <div className="text-sm text-gray-700 pl-2">Component Types</div>
          </div>

          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-500 mb-2">UI Components</h3>
            <Link
              to="/docs/components/overview"
              className={cn(
                'block text-sm px-2 py-1 rounded hover:bg-gray-100',
                isActive('/docs/components/overview')
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-700',
              )}
            >
              Overview
            </Link>
          </div>

          {menuItems.map((section) => (
            <div key={section.key} className="mb-2">
              <button
                onClick={() => toggleSection(section.key as keyof typeof expandedSections)}
                className="flex items-center justify-between w-full text-sm font-medium text-gray-900 hover:bg-gray-50 p-2 rounded"
              >
                <span>{section.title}</span>
                {expandedSections[section.key as keyof typeof expandedSections] ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>

              {expandedSections[section.key as keyof typeof expandedSections] && (
                <div className="ml-4 mt-1 space-y-1">
                  {section.items.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={cn(
                        'block text-sm px-2 py-1 rounded hover:bg-gray-100',
                        isActive(item.path) ? 'text-blue-600 bg-blue-50' : 'text-gray-600',
                      )}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default DocsSidebar;
