import React from 'react';

export default function HomePage() {
  return (
    <div className="max-w-none">
      <div className="mb-8">
        <nav className="text-sm text-gray-500 mb-4">
          <span>Docs</span>
          <span className="mx-2">›</span>
          <span>Introduction</span>
        </nav>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-6">Auth0 UI Components</h1>

      <p className="text-lg text-gray-600 mb-8">
        Professional React components for Auth0 authentication and identity management, designed to
        help you build secure and user-friendly applications faster.
      </p>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg className="w-6 h-6 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Ready to Use</h3>
            <div className="text-blue-800">
              <p>
                Pre-built, fully functional components that integrate seamlessly with Auth0's
                authentication platform. Simply install, configure, and start building secure
                applications with multi-factor authentication support.
              </p>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-semibold text-gray-900 mb-4">What's Included</h2>

      <div className="grid md:grid-cols-1 gap-6 mb-8">
        <div className="bg-white border rounded-lg p-6">
          <div className="flex items-center mb-3">
            <svg
              className="w-8 h-8 text-blue-600 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            <h3 className="text-xl font-semibold text-gray-900">UserMFAMgmt Component</h3>
          </div>
          <p className="text-gray-600 mb-4">
            A comprehensive Multi-Factor Authentication management component that handles:
          </p>
          <ul className="space-y-2 text-gray-600">
            <li>• Viewing and managing existing MFA factors</li>
            <li>• Enrolling new authentication methods (SMS, TOTP, WebAuthn, etc.)</li>
            <li>• Removing unwanted factors</li>
            <li>• Full localization support</li>
            <li>• Customizable configuration options</li>
          </ul>
        </div>
      </div>

      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Key Features</h2>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="text-center">
          <div className="bg-blue-100 rounded-lg p-3 w-12 h-12 mx-auto mb-3 flex items-center justify-center">
            <svg
              className="w-6 h-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Quick Setup</h3>
          <p className="text-sm text-gray-600">
            Get started in minutes with simple installation and configuration
          </p>
        </div>
        <div className="text-center">
          <div className="bg-blue-100 rounded-lg p-3 w-12 h-12 mx-auto mb-3 flex items-center justify-center">
            <svg
              className="w-6 h-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"
              />
            </svg>
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Responsive Design</h3>
          <p className="text-sm text-gray-600">
            Works seamlessly across desktop and mobile devices
          </p>
        </div>
        <div className="text-center">
          <div className="bg-blue-100 rounded-lg p-3 w-12 h-12 mx-auto mb-3 flex items-center justify-center">
            <svg
              className="w-6 h-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Highly Configurable</h3>
          <p className="text-sm text-gray-600">
            Customize behavior, appearance, and factor types to fit your needs
          </p>
        </div>
      </div>

      <p className="mb-6">
        Built specifically for React applications using Auth0 for authentication, these components
        provide a robust foundation for implementing secure, user-friendly identity management
        features.
      </p>

      <ul className="space-y-3 mb-8">
        <li className="flex items-start">
          <span className="font-semibold mr-2">Code ownership:</span>
          <span>
            Take ownership of the UI components code, just like you would with any other code in
            their project.
          </span>
        </li>
        <li className="flex items-start">
          <span className="font-semibold mr-2">Customization:</span>
          <span>
            Modify the pre-built components to fit your specific needs and branding. This might
            involve changing colors, fonts, or layouts, or adding custom functionality.
          </span>
        </li>
        <li className="flex items-start">
          <span className="font-semibold mr-2">Integration:</span>
          <span>Integrate the UI components into your existing codebase.</span>
        </li>
        <li className="flex items-start">
          <span className="font-semibold mr-2">Version control:</span>
          <span>Manage the UI components code alongside your codebase.</span>
        </li>
      </ul>

      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Notes</h2>

      <p className="mb-4">
        The UI components were designed specifically for use with{' '}
        <a
          href="https://react.dev"
          className="text-blue-600 hover:text-blue-700 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          React
        </a>{' '}
        applications. They are built on top of{' '}
        <a
          href="https://ui.shadcn.com"
          className="text-blue-600 hover:text-blue-700 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Shadcn
        </a>
        , a powerful collection that provides headless components you can easily integrate into your
        apps. Our UI components follow the same philosophy: simply copy and paste them to customize
        them for your specific app.
      </p>
    </div>
  );
}
