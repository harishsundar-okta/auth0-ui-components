import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, Plus } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
// import { useTranslation } from 'react-i18next';

const SecurityPage = () => {
  // const { t } = useTranslation();
  return (
    <div className="p-8 max-w-4xl">
      <h1 className="text-3xl font-semibold text-gray-900 mb-2">Security</h1>

      {/* Add Manage MFA Component here */}
      <p className="text-gray-600 mb-6">Manage MFA Component Goes Here.</p>
      {/* Sign-in methods */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Sign-in methods</h2>
        <p className="text-gray-600 mb-6">
          Ways you can sign in to your account. You can use one of these or combine them for
          flexibility.
        </p>

        <div className="space-y-4">
          {/* Password */}
          <Card className="bg-white">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-medium">Password</CardTitle>
                  <CardDescription className="text-sm text-gray-500">
                    last updated 2 months ago
                  </CardDescription>
                </div>
                <Button variant="outline" className="text-gray-700 border-gray-300">
                  Change Password
                </Button>
              </div>
            </CardHeader>
          </Card>

          {/* Passkey */}
          <Card className="bg-white">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-base font-medium">Passkey</CardTitle>
                      <Badge className="bg-green-100 text-green-800 text-xs">RECOMMENDED</Badge>
                    </div>
                    <div className="mt-2">
                      <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                        <div>
                          <p className="font-medium text-sm">dev_2409385</p>
                          <p className="text-xs text-gray-500">
                            Created on 9/25/24 · Last used 5/2/25
                          </p>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="bg-white">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="text-gray-700 border-gray-300">
                  <Plus className="w-4 h-4 mr-2" />
                  Add a Passkey
                </Button>
              </div>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Two-factor Authentication */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Two-factor Authentication</h2>
        <p className="text-gray-600 mb-6">
          Extra protection for your account when signing in with a password.
        </p>

        <div className="space-y-4">
          {/* Authenticators */}
          <Card className="bg-white">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-medium">Authenticators</CardTitle>
                <Button variant="outline" className="text-gray-700 border-gray-300">
                  Add an Authenticator
                </Button>
              </div>
              <div className="mt-2">
                <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                  <div>
                    <p className="font-medium text-sm">Google Authenticator</p>
                    <p className="text-xs text-gray-500">Created on 9/25/24 · Last used 5/2/25</p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-white">
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* SMS OTP */}
          <Card className="bg-white">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-medium">SMS OTP</CardTitle>
                  <CardDescription className="text-sm text-gray-500">
                    No phone has been added.
                  </CardDescription>
                </div>
                <Button variant="outline" className="text-gray-700 border-gray-300">
                  Add a Phone
                </Button>
              </div>
            </CardHeader>
          </Card>

          {/* Email OTP */}
          <Card className="bg-white">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-medium">Email OTP</CardTitle>
                <Button variant="outline" className="text-gray-700 border-gray-300">
                  Add an Email
                </Button>
              </div>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Help Section */}
      <div className="text-sm text-gray-600">
        <p>Need help?</p>
      </div>
    </div>
  );
};

export default SecurityPage;
