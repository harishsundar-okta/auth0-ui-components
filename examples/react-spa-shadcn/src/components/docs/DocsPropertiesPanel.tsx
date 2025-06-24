import { useState, useEffect } from 'react';
import { Copy, Check } from 'lucide-react';

const DocsPropertiesPanel = () => {
  const [activeSection, setActiveSection] = useState('');
  const [copiedSnippet, setCopiedSnippet] = useState('');

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.target.id) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    // Observe all sections with IDs
    const sections = document.querySelectorAll('h2[id], h3[id]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const copyToClipboard = async (text: string, snippetId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedSnippet(snippetId);
      setTimeout(() => setCopiedSnippet(''), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const tocItems = [
    { id: 'properties', label: 'Properties' },
    { id: 'usage', label: 'Usage' },
    { id: 'customization', label: 'Customization' },
  ];

  const usageItems = [
    { id: 'mountSignIn', label: 'mountSignIn()' },
    { id: 'unmountSignIn', label: 'unmountSignIn()' },
    { id: 'openSignIn', label: 'openSignIn()' },
    { id: 'closeSignIn', label: 'closeSignIn()' },
  ];

  return (
    <aside className="w-80 bg-white border-l border-gray-200 p-6 sticky top-16 max-h-[calc(100vh-4rem)] overflow-y-auto">
      {/* Table of Contents */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">On this page</h3>
        <nav className="space-y-1">
          {tocItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`block w-full text-left text-sm py-1 transition-colors ${
                activeSection === item.id
                  ? 'text-blue-600 font-medium'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Usage with frameworks */}
      <div className="mb-8">
        <h4 className="text-sm font-semibold text-gray-900 mb-4">Usage with frameworks</h4>
        <div className="space-y-1">
          {usageItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`block w-full text-left text-sm font-mono py-1 transition-colors ${
                activeSection === item.id
                  ? 'text-blue-600 font-medium'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div>
        <h4 className="text-sm font-semibold text-gray-900 mb-4">Actions</h4>
        <div className="space-y-3">
          <button
            onClick={() => copyToClipboard(window.location.href, 'page-link')}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            {copiedSnippet === 'page-link' ? (
              <Check className="w-4 h-4" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
            Copy page as markdown
          </button>
          <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            Edit this page on GitHub
          </button>
          <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.078 6.078 0 0 0 6.529 2.9 5.991 5.991 0 0 0 9.411-2.662 5.991 5.991 0 0 0 4.055-2.772 5.99 5.99 0 0 0-.449-6.733zm-9.022 12.281a10.04 10.04 0 0 1-5.475-1.585.11.11 0 0 1-.069-.1V19.65a.11.11 0 0 1 .069-.1l5.475-1.585.069.1v.836l-4.91 1.425a.11.11 0 0 0-.069.1v.7a.11.11 0 0 0 .069.1l4.91 1.425v.836a.11.11 0 0 1-.069.1z" />
            </svg>
            Open in ChatGPT
          </button>
        </div>
      </div>
    </aside>
  );
};

export default DocsPropertiesPanel;
