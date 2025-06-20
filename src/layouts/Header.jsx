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
} from "react-icons/fa";
import logo from "../assets/hike_logo.png"

const navItems = [
  { name: "Home", path: "/", icon: <FaHome /> },
  { name: "Trails", path: "/trails", icon: <FaHiking /> },
  { name: "Groups", path: "/groups", icon: <FaUsers /> },
  { name: "Checklist", path: "/checklist", icon: <FaCheckSquare /> },
  { name: "Payments", path: "/payments", icon: <FaCreditCard /> },
  { name: "Profile", path: "/profile", icon: <FaUser /> },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center py-2 px-4 ">
        {/* Logo */}
        <Link to="/" className="">
          <img className="h-[40px] w-[40px]" src={logo} alt="Hike Hub" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-6 items-center">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-1 text-sm font-medium transition ${
                location.pathname === item.path
                  ? "text-green-600"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
          {isLoggedIn ? (
            <button
              onClick={() => setIsLoggedIn(false)}
              className="px-4 py-2 border border-black text-white rounded hover:bg-red-700 transition"
            >
              Sign Out
            </button>
          ) : (
            <Link
              to="/login"
              className="flex items-center px-5 py-2  bg-black text-white rounded-md hover:text-white hover:bg-red-700 transition border-spacing-6"
            >
              <FaSignInAlt className="mr-1" /> Sign In
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white px-4 pb-4 space-y-4 shadow-md">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-2 py-2 border-b ${
                location.pathname === item.path
                  ? "text-blue-600 font-semibold"
                  : "text-gray-700"
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
          {isLoggedIn ? (
            <button
              onClick={() => {
                setIsLoggedIn(false);
                setIsOpen(false);
              }}
              className="w-full py-2 mt-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-100 transition"
            >
              Sign Out
            </button>
          ) : (
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center py-2 mt-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              <FaSignInAlt className="mr-1" />
              Sign In
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
