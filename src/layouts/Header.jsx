import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaHiking,
  FaUsers,
  FaCheckSquare,
  FaCreditCard,
  FaUser,
  FaSignInAlt,
  FaSignOutAlt,
  FaTachometerAlt,
  FaChevronDown,
} from "react-icons/fa";
import logo from "/public/Trail_Mate_Logo.png";
import { useAuth } from "../auth/authProvider";

const navItems = [
  { name: "Home", path: "/", icon: <FaHome /> },
  { name: "Trails", path: "/trails", icon: <FaHiking /> },
  { name: "Groups", path: "/groups", icon: <FaUsers /> },
  { name: "Checklist", path: "/checklist", icon: <FaCheckSquare /> },
  { name: "Payments", path: "/payments", icon: <FaCreditCard /> },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  
  // Use AuthContext for real authentication data
  const { user, isAuthenticated, logout, loading } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSignOut = () => {
    logout();
    setShowProfileDropdown(false);
  };

  const handleProfileClick = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  // Get user display name
  const getUserName = () => {
    if (!user) return "";
    return user.name || user.username || user.email || "User";
  };

  // Check if user is admin
  const isAdmin = user?.role === "admin" || user?.isAdmin || false;

  // Show loading state
  if (loading) {
    return (
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center py-3 px-6">
          <div className="flex items-center space-x-2">
            <div className="h-10 w-10 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="hidden md:flex space-x-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
            ))}
          </div>
          <div className="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </nav>
    );
  }

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-green-100" 
          : "bg-white/90 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center py-3 px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="relative">
            <img 
              className="h-10 w-10 rounded-lg transition-transform group-hover:scale-105" 
              src={logo} 
              alt="Hike Hub" 
            />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Hike Hub
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                location.pathname === item.path
                  ? "bg-green-100 text-green-700 shadow-sm"
                  : "text-gray-600 hover:text-green-600 hover:bg-green-50"
              }`}
            >
              <span className="text-base">{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </div>

        {/* Auth Section */}
        <div className="hidden md:flex items-center space-x-3">
          {isAuthenticated ? (
            <div className="flex items-center space-x-3">
              {/* Admin Dashboard Button */}
              {isAdmin && (
                <Link
                  to="/admin/dashboard"
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  <FaTachometerAlt />
                  Dashboard
                </Link>
              )}

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={handleProfileClick}
                  className="flex items-center space-x-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-all duration-200 border border-gray-200 hover:border-gray-300"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {user?.avatar ? (
                      <img src={user.avatar} alt="Profile" className="w-8 h-8 rounded-full object-cover" />
                    ) : (
                      getUserName().charAt(0).toUpperCase()
                    )}
                  </div>
                  <span className="text-sm font-medium text-gray-700 max-w-24 truncate">
                    {getUserName()}
                  </span>
                  <FaChevronDown className={`text-xs text-gray-500 transition-transform ${showProfileDropdown ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {showProfileDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                    <Link
                      to="/profile"
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => setShowProfileDropdown(false)}
                    >
                      <FaUser />
                      My Profile
                    </Link>
                    <hr className="my-1 border-gray-100" />
                    <button
                      onClick={handleSignOut}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                    >
                      <FaSignOutAlt />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 font-medium"
            >
              <FaSignInAlt />
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <FaTimes size={20} className="text-gray-600" />
            ) : (
              <FaBars size={20} className="text-gray-600" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-lg">
          <div className="px-6 py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 py-3 px-4 rounded-lg transition-all ${
                  location.pathname === item.path
                    ? "bg-green-100 text-green-700"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <span className="text-base">{item.icon}</span>
                {item.name}
              </Link>
            ))}
            
            <hr className="my-3 border-gray-200" />
            
            {isAuthenticated ? (
              <div className="space-y-2">
                {isAdmin && (
                  <Link
                    to="/admin/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 py-3 px-4 bg-yellow-200 text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    <FaTachometerAlt />
                    Dashboard
                  </Link>
                )}
                
                <div className="flex items-center gap-3 py-3 px-4 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {user?.avatar ? (
                      <img src={user.avatar} alt="Profile" className="w-8 h-8 rounded-full object-cover" />
                    ) : (
                      getUserName().charAt(0).toUpperCase()
                    )}
                  </div>
                  <span className="text-sm font-medium text-gray-700 truncate">
                    {getUserName()}
                  </span>
                </div>
                
                <Link
                  to="/profile"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 py-3 px-4 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <FaUser />
                  My Profile
                </Link>
                
                <button
                  onClick={() => {
                    handleSignOut();
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-3 py-3 px-4 text-red-600 hover:bg-red-50 rounded-lg transition-colors w-full text-left"
                >
                  <FaSignOutAlt />
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all font-medium"
              >
                <FaSignInAlt />
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}