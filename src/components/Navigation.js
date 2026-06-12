import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, Sun, Moon } from 'lucide-react';
import useAuthStore from '../store/authStore';
import useThemeStore from '../store/themeStore';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuthStore();
  const { isDark, toggleTheme } = useThemeStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getDashboardLink = () => {
    if (!isAuthenticated) return null;
    switch (user?.role) {
      case 'donor':
        return '/dashboard/donor';
      case 'ngo':
        return '/dashboard/ngo';
      case 'admin':
        return '/dashboard/admin';
      default:
        return null;
    }
  };

  return (
    <nav className={`sticky top-0 z-50 ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white/80 border-gray-200'} border-b backdrop-blur-md`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center text-white font-bold text-lg">
              F
            </div>
            <span className="text-2xl font-bold gradient-primary text-transparent bg-clip-text">FEEDIN</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`smooth-transition ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-orange-600'}`}>
              Home
            </Link>
            {isAuthenticated && (
              <Link to={getDashboardLink()} className={`smooth-transition ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-orange-600'}`}>
                Dashboard
              </Link>
            )}
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {isAuthenticated ? (
              <>
                <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {user?.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors flex items-center space-x-2"
                >
                  <LogOut size={18} />
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-orange-600 font-semibold hover:bg-orange-50 rounded-lg transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-gradient-primary text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  Register
                </Link>
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className={`md:hidden pb-4 space-y-2 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
            <Link to="/" className="block px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700">
              Home
            </Link>
            {isAuthenticated && (
              <Link to={getDashboardLink()} className="block px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700">
                Dashboard
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
