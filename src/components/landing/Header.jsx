import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Mountain,
  Users,
  ListChecks,
  CreditCard,
  User,
  LogIn,
  Sun,
  Menu,
  X,
} from "lucide-react";

const navLinks = [
  { name: "Home", path: "/", icon: <Home size={18} /> },
  { name: "Trails", path: "/trails", icon: <Mountain size={18} /> },
  { name: "Groups", path: "/groups", icon: <Users size={18} /> },
  { name: "Checklist", path: "/checklist", icon: <ListChecks size={18} /> },
  { name: "Payments", path: "/payments", icon: <CreditCard size={18} /> },
  { name: "Profile", path: "/profile", icon: <User size={18} /> },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // const isActive = () => location.pathname === path;

  return (
    <header className="sticky top-0 z-50  w-full bg-gray-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex  flex-row  space-x-60 justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 text-xl font-bold text-gray-900">
          <Mountain className="text-green-600" size={24} />
          <span>HikeHub</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-6" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className= 'flex items-center space-x-1 text-sm font-medium text-green-600 hover:text-gray-600 ' 
                // isActive(link.path)
                  // ? "text-green-600"
                  // : "text-gray-500 hover:text-gray-800"
              // }`}
              
              
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          ))}

          {/* Theme Toggle */}
          <button
            className="p-2 rounded-md border border-gray-200 hover:bg-gray-100 transition"
            aria-label="Toggle Theme"
          >
            <Sun size={18} />
          </button>

          {/* Sign In Button */}
          <Link
            to="/signin"
            className="ml-3 px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 transition"
          >
            <div className="flex items-center space-x-1">
              <LogIn size={16} />
              <span>Sign In</span>
            </div>
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-gray-700"
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="md:hidden bg-gray-50 px-4 pb-4 pt-2 border-t border-gray-200">
          <div className="space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium ${
                  isActive(link.path)
                    ? "text-green-600 bg-green-50"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}

            {/* Theme toggle and sign in in mobile */}
            <div className="flex items-center justify-between mt-2">
              <button
                className="p-2 rounded-md border border-gray-200 hover:bg-gray-100"
                aria-label="Toggle Theme"
              >
                <Sun size={18} />
              </button>
              <Link
                to="/signin"
                className="flex items-center space-x-1 px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 transition"
              >
                <LogIn size={16} />
                <span>Sign In</span>
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
