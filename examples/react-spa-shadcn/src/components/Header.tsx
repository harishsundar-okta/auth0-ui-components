import { Link } from 'react-router-dom';
import { AuthButton } from './AuthButton';

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Navigation - Left aligned */}
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-xl font-semibold text-gray-900">
              Auth0 UI Components
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              {/* <Link to="/docs" className="text-gray-700 hover:text-gray-900 transition-colors">
                Docs
              </Link> */}
              {/* <Link
                to="/playground"
                className="text-gray-700 hover:text-gray-900 transition-colors"
              >
                Playground
              </Link> */}
            </nav>
          </div>

          {/* Auth Button */}
          <div className="flex items-center space-x-4">
            <AuthButton />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
