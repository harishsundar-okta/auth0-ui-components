import { useAuth0 } from '@auth0/auth0-react';
import { Menu, LogOut, User } from 'lucide-react';
import type { ReactNode } from 'react';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent } from '@/components/ui/sheet';

interface LayoutProps {
  children: ReactNode;
}

const navigationSections = [
  {
    title: 'Getting Started',
    items: [
      { name: 'Introduction', href: '/' },
      { name: 'Installation', href: '/getting-started' },
    ],
  },
  {
    title: 'Components',
    items: [{ name: 'UserMFA', href: '/components/user-mfa' }],
  },
];

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const location = useLocation();
  const { isAuthenticated, isLoading, loginWithRedirect, logout, user } = useAuth0();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Auth0 Logo + UI Components + Docs */}
            <div className="flex items-center space-x-4">
              {/* Sidebar Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(true)}
                className="md:hidden"
              >
                <Menu className="h-5 w-5" />
              </Button>

              {/* Auth0 Logo */}
              <div className="flex items-center">
                <img src="/auth0_light_mode.png" alt="Auth0" className="h-8 w-auto" />
              </div>

              {/* UI Components */}
              <Link to="/" className="text-lg font-medium text-gray-900">
                UI Components
              </Link>

              {/* Docs */}
              <Link to="/" className="text-sm text-gray-600 hover:text-gray-900">
                Docs
              </Link>
            </div>

            {/* Right side - User profile and mobile menu */}
            <div className="flex items-center space-x-4">
              {/* User Profile Dropdown */}
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user?.picture} alt={user?.name || 'User'} />
                        <AvatarFallback>
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        {user?.name && <p className="font-medium">{user.name}</p>}
                        {user?.email && (
                          <p className="w-[200px] truncate text-sm text-muted-foreground">
                            {user.email}
                          </p>
                        )}
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => {
                        localStorage.setItem(
                          'preLogoutLocation',
                          window.location.pathname + window.location.hash,
                        );
                        logout({ logoutParams: { returnTo: window.location.origin } });
                      }}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sign out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : !isLoading ? (
                <Button
                  onClick={() =>
                    loginWithRedirect({
                      appState: { returnTo: window.location.pathname + window.location.hash },
                    })
                  }
                >
                  Sign In
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Sheet */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-64">
          <div className="px-4 py-6">
            {navigationSections.map((section) => (
              <div key={section.title} className="mb-6">
                <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3">
                  {section.title}
                </h3>
                <nav className="space-y-1">
                  {section.items.map((item) => {
                    const isActive = location.pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`block px-3 py-2 text-sm rounded-md transition-colors ${
                          isActive
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                        onClick={() => setSidebarOpen(false)}
                      >
                        {item.name}
                      </Link>
                    );
                  })}
                </nav>
              </div>
            ))}
          </div>
        </SheetContent>
      </Sheet>

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex md:flex-col md:w-64 md:border-r md:border-gray-100 md:bg-gray-50 md:sticky md:top-16 md:h-[calc(100vh-4rem)] md:overflow-y-auto">
          <div className="flex-1 px-4 py-6">
            {navigationSections.map((section) => (
              <div key={section.title} className="mb-8">
                <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3">
                  {section.title}
                </h3>
                <nav className="space-y-1">
                  {section.items.map((item) => {
                    const isActive = location.pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`block px-3 py-2 text-sm rounded-md transition-colors ${
                          isActive
                            ? 'bg-white text-gray-900 shadow-sm border border-gray-200'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-white'
                        }`}
                      >
                        {item.name}
                      </Link>
                    );
                  })}
                </nav>
              </div>
            ))}
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1">
          <div className="max-w-4xl mx-auto px-6 py-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
