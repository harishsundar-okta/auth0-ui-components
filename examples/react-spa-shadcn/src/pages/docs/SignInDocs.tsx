import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Copy, Check } from 'lucide-react';

const SignInDocs = () => {
  const [copiedSnippet, setCopiedSnippet] = useState('');

  const copyToClipboard = async (text: string, snippetId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedSnippet(snippetId);
      setTimeout(() => setCopiedSnippet(''), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const CodeSnippet = ({
    code,
    snippetId,
    language = 'javascript',
  }: {
    code: string;
    snippetId: string;
    language?: string;
  }) => (
    <div className="relative">
      <div className="bg-gray-900 rounded-lg overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
          <span className="text-xs text-gray-400 font-medium">{language}</span>
          <button
            onClick={() => copyToClipboard(code, snippetId)}
            className="flex items-center gap-1 text-xs text-gray-400 hover:text-white transition-colors"
          >
            {copiedSnippet === snippetId ? (
              <>
                <Check className="w-3 h-3" />
                Copied
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                Copy
              </>
            )}
          </button>
        </div>
        <pre className="p-4 text-sm text-green-400 overflow-x-auto">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );

  const usageCode = `import { useAuth0 } from '@auth0/auth0-react'
import { SignInButton } from '@/components/SignInButton'

export default function SignInPage() {
  const { loginWithRedirect } = useAuth0()
  
  return (
    <div className="flex justify-center items-center min-h-screen">
      <SignInButton 
        onSignIn={() => loginWithRedirect()}
      />
    </div>
  )
}`;

  const customizationCode = `import { SignInButton } from '@/components/SignInButton'

<SignInButton 
  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
  onSignIn={() => loginWithRedirect()}
/>`;

  const authHookCode = `import { useAuth0 } from '@auth0/auth0-react'

const { 
  loginWithRedirect, 
  logout, 
  user, 
  isAuthenticated, 
  isLoading 
} = useAuth0()`;

  const logoutCode = `logout({ returnTo: window.location.origin })`;

  const protectedRouteCode = `import { useAuth0 } from '@auth0/auth0-react'

function ProtectedComponent() {
  const { isAuthenticated, isLoading } = useAuth0()
  
  if (isLoading) return <div>Loading...</div>
  
  if (!isAuthenticated) {
    return <div>Please sign in to access this content</div>
  }
  
  return <div>Protected content</div>
}`;

  return (
    <div className="p-8">
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <span>UI Components</span>
          <span>/</span>
          <span>&lt;SignInButton /&gt;</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">&lt;SignInButton /&gt; component</h1>
      </div>

      {/* Documentation Content */}
      <div className="prose max-w-none">
        <p className="text-lg text-gray-600 mb-8">
          The <code className="bg-gray-100 px-2 py-1 rounded text-sm">&lt;SignInButton /&gt;</code>{' '}
          component renders a UI to allow users to sign in using Auth0. The component integrates
          with Auth0's authentication service and can be customized to match your application's
          design system. You can further customize the component by passing additional props.
        </p>

        <h2 id="properties" className="text-2xl font-semibold text-gray-900 mb-4 scroll-mt-24">
          Properties
        </h2>

        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-8">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                  onSignIn
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <Badge variant="outline">function</Badge>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  Callback function triggered when sign-in button is clicked
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                  className
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <Badge variant="outline">string</Badge>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  CSS classes to customize the button appearance
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                  disabled
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <Badge variant="outline">boolean</Badge>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">Disables the sign-in button</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 id="usage" className="text-2xl font-semibold text-gray-900 mb-4 scroll-mt-24">
          Usage
        </h2>

        <div className="mb-8">
          <CodeSnippet code={usageCode} snippetId="usage-example" language="tsx" />
        </div>

        {/* Usage with Auth0 hooks */}
        <h3 id="useAuth0Hook" className="text-xl font-semibold text-gray-900 mb-4 scroll-mt-24">
          useAuth0() Hook
        </h3>
        <p className="text-gray-600 mb-4">
          The useAuth0 hook provides access to Auth0 authentication methods and state.
        </p>
        <div className="mb-8">
          <CodeSnippet code={authHookCode} snippetId="auth-hook" language="javascript" />
        </div>

        <h3 id="logout" className="text-xl font-semibold text-gray-900 mb-4 scroll-mt-24">
          logout()
        </h3>
        <p className="text-gray-600 mb-4">
          Logs out the current user and redirects to the specified URL.
        </p>
        <div className="mb-8">
          <CodeSnippet code={logoutCode} snippetId="logout" language="javascript" />
        </div>

        <h3 id="protectedRoute" className="text-xl font-semibold text-gray-900 mb-4 scroll-mt-24">
          Protected Routes
        </h3>
        <p className="text-gray-600 mb-4">
          How to create protected components that require authentication.
        </p>
        <div className="mb-8">
          <CodeSnippet
            code={protectedRouteCode}
            snippetId="protected-route"
            language="javascript"
          />
        </div>

        <h2 id="customization" className="text-2xl font-semibold text-gray-900 mb-4 scroll-mt-24">
          Customization
        </h2>

        <p className="text-gray-600 mb-4">
          The SignInButton component can be customized using CSS classes and styled to match your
          application's design system.
        </p>

        <div className="mb-8">
          <CodeSnippet code={customizationCode} snippetId="customization-example" language="tsx" />
        </div>
      </div>
    </div>
  );
};

export default SignInDocs;
