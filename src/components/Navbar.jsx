import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';

const Navbar = ({ visible }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Set this via auth in real scenario

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${
        visible ? 'translate-y-0' : '-translate-y-full'
      } bg-gradient-to-r from-[#0f172a] via-[#0f766e] to-[#134e4a] shadow-lg`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl sm:text-3xl font-bold text-white tracking-wide flex items-center gap-3">
          <span className="bg-white text-[#0f766e] px-4 py-1.5 rounded-full shadow-lg text-base sm:text-lg font-semibold tracking-tight">
            IGDTUW
          </span>
          <span className="text-white sm:inline hidden font-light tracking-wider drop-shadow-md">
            Campus Tour
          </span>
        </div>

        {/* Nav Links */}
        <ul className="flex gap-6 sm:gap-8 text-[#f1f5f9] font-semibold text-base sm:text-lg">
          {[
            { label: 'Home', href: '#hero' },
            { label: 'Services', href: '#services' },
            { label: 'Contact us', href: '#contact' },
          ].map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="relative px-2 py-1 rounded-md transition-all duration-300 ease-in-out
                  hover:bg-white/10 hover:text-white
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                <span className="relative z-10">{item.label}</span>
              </a>
            </li>
          ))}
        </ul>

        {/* Profile Icon */}
        <div className="relative ml-4">
          <FaUserCircle
            size={30}
            className="text-white cursor-pointer hover:text-gray-300 transition duration-300"
            onClick={toggleDropdown}
          />

        {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-2 z-50">
              {isLoggedIn ? (
                <>
                  <a
                    href="/profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    View Profile
                  </a>
                  <button
                    onClick={() => alert('Signing out...')}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <a
                  href="/signup"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Sign Up
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
