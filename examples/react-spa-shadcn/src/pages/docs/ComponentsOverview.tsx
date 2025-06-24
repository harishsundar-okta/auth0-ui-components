import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, User, Building, CreditCard } from 'lucide-react';

const ComponentsOverview = () => {
  const componentCategories = [
    {
      title: 'Authentication Components',
      description: 'Ready-to-use authentication forms and flows',
      icon: Shield,
      components: [
        { name: 'SignIn', description: 'Complete sign-in form with social providers' },
        { name: 'SignUp', description: 'User registration with email verification' },
        { name: 'MFASetup', description: 'Multi-factor authentication setup' },
      ],
    },
    {
      title: 'User Components',
      description: 'User profile and account management',
      icon: User,
      components: [
        { name: 'UserButton', description: 'Dropdown menu for user actions' },
        { name: 'UserProfile', description: 'Complete user profile editor' },
      ],
    },
    {
      title: 'Organization Components',
      description: 'Team and organization management',
      icon: Building,
      components: [
        { name: 'CreateOrganization', description: 'Form to create new organizations' },
        { name: 'OrganizationProfile', description: 'Organization settings and members' },
      ],
    },
    {
      title: 'Billing Components',
      description: 'Payment and subscription management',
      icon: CreditCard,
      components: [
        { name: 'PricingTable', description: 'Display pricing plans and features' },
        { name: 'PaymentForm', description: 'Secure payment processing form' },
      ],
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">UI Components Overview</h1>
        <p className="text-lg text-gray-600">
          A comprehensive collection of pre-built, customizable React components for authentication,
          user management, and business operations. Built with TypeScript and Tailwind CSS.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
        {componentCategories.map((category) => (
          <Card key={category.title} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <category.icon className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-xl">{category.title}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {category.components.map((component) => (
                  <div
                    key={component.name}
                    className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                  >
                    <h4 className="font-mono text-sm font-medium text-gray-900 mb-1">
                      &lt;{component.name} /&gt;
                    </h4>
                    <p className="text-sm text-gray-600">{component.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">Quick Start</h2>
        <p className="text-gray-700 mb-4">
          Get started with our components in minutes. All components are built with React,
          TypeScript, and follow modern best practices.
        </p>
        <div className="bg-white rounded-lg p-4">
          <pre className="text-sm text-gray-800">
            <code>{`npm install @your-company/ui-components

import { SignIn, UserButton } from '@your-company/ui-components'

function App() {
  return (
    <div>
      <SignIn />
      <UserButton />
    </div>
  )
}`}</code>
          </pre>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">🎨 Customizable</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Fully customizable with CSS variables, Tailwind classes, and component props.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">🔒 Secure</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Built with security best practices and modern authentication standards.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">📱 Responsive</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Mobile-first design that works seamlessly across all devices.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ComponentsOverview;
