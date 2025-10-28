// // // src/components/Navbar.jsx
// // import React, { useState, useRef, useEffect } from 'react';
// // import { Link } from 'react-router-dom';
// // import { useAuth } from '../context/AuthContext';
// // import { FiLogOut, FiUser } from 'react-icons/fi';

// // // Google Icon SVG
// // const GoogleIcon = () => (
// //   <svg width="24" height="24" viewBox="0 0 533.5 544.3" xmlns="http://www.w3.org/2000/svg">
// //     <path fill="#4285F4" d="M533.5 278.4c0-17.4-1.6-34.2-4.8-50.4H272v95.5h146.9c-6.3 33.7-25.2 62.2-53.9 81.3v67h87.1c50.8-46.8 80.4-115.6 80.4-193.4z"/>
// //     <path fill="#34A853" d="M272 544.3c72.9 0 134.2-24.2 178.9-65.7l-87.1-67c-24.2 16.3-55.3 25.9-91.8 25.9-70.7 0-130.7-47.7-152.2-111.6H32.5v69.9c44.7 87.9 136.2 148.5 239.5 148.5z"/>
// //     <path fill="#FBBC05" d="M119.8 323.1c-10.5-31.7-10.5-65.9 0-97.6v-69.9H32.5c-40.7 81.5-40.7 178.8 0 260.3l87.3-69.8z"/>
// //     <path fill="#EA4335" d="M272 107.7c39.6-.6 77.4 14.2 106.1 40.7l79.3-79.3C405.3 24.5 344 0 272 0 168.6 0 77.1 60.6 32.5 148.5l87.3 69.9c21.5-63.9 81.5-111.6 152.2-111.6z"/>
// //   </svg>
// // );

// // const Navbar = ({ visible }) => {
// //   const [dropdownOpen, setDropdownOpen] = useState(false);
// //   const { user, googleSignIn, logout } = useAuth();
// //   const dropdownRef = useRef(null);

// //   useEffect(() => {
// //     function handleClickOutside(event) {
// //       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
// //         setDropdownOpen(false);
// //       }
// //     }
// //     if (dropdownOpen) {
// //       document.addEventListener('mousedown', handleClickOutside);
// //     }
// //     return () => document.removeEventListener('mousedown', handleClickOutside);
// //   }, [dropdownOpen]);

// //   const toggleDropdown = () => setDropdownOpen((prev) => !prev);

// //   const handleSignOut = async () => {
// //     try {
// //       await logout();
// //       setDropdownOpen(false);
// //     } catch (err) {
// //       console.error('Logout failed:', err.message);
// //     }
// //   };

// //   const handleSignIn = async () => {
// //     try {
// //       await googleSignIn();
// //       setDropdownOpen(false);
// //     } catch (err) {
// //       console.error('Sign in failed:', err.message);
// //     }
// //   };

// //   console.log("✅ Navbar rendered!");


// //   return (
// //     <nav
// //       className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${
// //         visible ? 'translate-y-0' : '-translate-y-full'
// //       } bg-gradient-to-r from-[#0f172a] via-[#0f766e] to-[#134e4a] shadow-lg`}
// //     >
// //       <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
// //         {/* Logo */}
// //         <div className="text-2xl sm:text-3xl font-bold text-white tracking-wide flex items-center gap-3">
// //           <span className="bg-white text-[#0f766e] px-4 py-1.5 rounded-full shadow-lg text-base sm:text-lg font-semibold tracking-tight">
// //             IGDTUW
// //           </span>
// //           <span className="text-white sm:inline hidden font-light tracking-wider drop-shadow-md">
// //             CampusVista
// //           </span>
// //         </div>

// //         {/* Nav Links */}
// //         <ul className="flex gap-6 sm:gap-8 text-[#f1f5f9] font-semibold text-base sm:text-lg">
// //           {[
// //             { label: 'Home', to: '/student-dashboard' },
// //             { label: 'Services', to: '/services' },
// //             { label: 'Contact us', to: '/contact' },
// //           ].map((item) => (
// //             <li key={item.label}>
// //               <Link
// //                 to={item.to}
// //                 className="relative px-2 py-1 rounded-md transition-all duration-300 ease-in-out hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
// //               >
// //                 <span className="relative z-10">{item.label}</span>
// //               </Link>
// //             </li>
// //           ))}
// //         </ul>

// //         {/* Profile Icon & Dropdown */}
// //         <div className="relative ml-4" ref={dropdownRef}>
// //           <div
// //             onClick={toggleDropdown}
// //             className="cursor-pointer select-none text-white"
// //             title={user ? `Hello, ${user.displayName || user.email}` : 'Sign In'}
// //           >
// //             {user ? <FiUser size={28} /> : <GoogleIcon />}
// //           </div>

// //           {dropdownOpen && (
// //             <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50 border border-gray-200">
// //               {user ? (
// //                 <button
// //                   onClick={handleSignOut}
// //                   className="flex items-center gap-2 w-full text-sm px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition"
// //                 >
// //                   <FiLogOut className="text-lg" />
// //                   <span>Sign Out</span>
// //                 </button>
// //               ) : (
// //                 <button
// //                   onClick={handleSignIn}
// //                   className="flex items-center gap-2 w-full text-sm px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition"
// //                 >
// //                   <GoogleIcon />
// //                   <span>Sign in with Google</span>
// //                 </button>
// //               )}
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </nav>
// //   );
// // };

// // export default Navbar;

// // src/components/Navbar.jsx
// import React, { useState, useRef, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import { FiLogOut, FiUser } from 'react-icons/fi';

// // ✅ Google Icon SVG
// const GoogleIcon = () => (
//   <svg width="24" height="24" viewBox="0 0 533.5 544.3" xmlns="http://www.w3.org/2000/svg">
//     <path fill="#4285F4" d="M533.5 278.4c0-17.4-1.6-34.2-4.8-50.4H272v95.5h146.9c-6.3 33.7-25.2 62.2-53.9 81.3v67h87.1c50.8-46.8 80.4-115.6 80.4-193.4z"/>
//     <path fill="#34A853" d="M272 544.3c72.9 0 134.2-24.2 178.9-65.7l-87.1-67c-24.2 16.3-55.3 25.9-91.8 25.9-70.7 0-130.7-47.7-152.2-111.6H32.5v69.9c44.7 87.9 136.2 148.5 239.5 148.5z"/>
//     <path fill="#FBBC05" d="M119.8 323.1c-10.5-31.7-10.5-65.9 0-97.6v-69.9H32.5c-40.7 81.5-40.7 178.8 0 260.3l87.3-69.8z"/>
//     <path fill="#EA4335" d="M272 107.7c39.6-.6 77.4 14.2 106.1 40.7l79.3-79.3C405.3 24.5 344 0 272 0 168.6 0 77.1 60.6 32.5 148.5l87.3 69.9c21.5-63.9 81.5-111.6 152.2-111.6z"/>
//   </svg>
// );

// const Navbar = ({ visible }) => {
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const { user, googleSignIn, logout } = useAuth();
//   const dropdownRef = useRef(null);

//   // ✅ Admin emails list
//   const adminEmails = ["nescafe.igdtuw@gmail.com", "tiwarijishop@gmail.com"];

//   // ✅ Check if current user is admin
//   const isAdmin = user && adminEmails.includes(user.email);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setDropdownOpen(false);
//       }
//     };
//     if (dropdownOpen) {
//       document.addEventListener('mousedown', handleClickOutside);
//     }
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, [dropdownOpen]);

//   const toggleDropdown = () => setDropdownOpen((prev) => !prev);

//   const handleSignOut = async () => {
//     try {
//       await logout();
//       setDropdownOpen(false);
//     } catch (err) {
//       console.error('Logout failed:', err.message);
//     }
//   };

//   const handleSignIn = async () => {
//     try {
//       await googleSignIn();
//       setDropdownOpen(false);
//     } catch (err) {
//       console.error('Sign in failed:', err.message);
//     }
//   };

//   console.log("✅ Navbar rendered!", user?.email, "→ isAdmin:", isAdmin);

//   // ✅ Conditional nav links based on user type
//   const navLinks = isAdmin
//     ? [
//         { label: 'Home', to: '/admin-dashboard' },
//         { label: 'Orders', to: '/orders-received' },
//         { label: 'Stock', to: '/stock' },
//         { label: 'Contact us', to: '/contact' },
//       ]
//     : [
//         { label: 'Home', to: '/student-dashboard' },
//         { label: 'Services', to: '/services' },
//         { label: 'Contact us', to: '/contact' },
//       ];

//   return (
//     <nav
//       className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${
//         visible ? 'translate-y-0' : '-translate-y-full'
//       } bg-gradient-to-r from-[#0f172a] via-[#0f766e] to-[#134e4a] shadow-lg`}
//     >
//       <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
//         {/* Logo */}
//         <div className="text-2xl sm:text-3xl font-bold text-white tracking-wide flex items-center gap-3">
//           <span className="bg-white text-[#0f766e] px-4 py-1.5 rounded-full shadow-lg text-base sm:text-lg font-semibold tracking-tight">
//             IGDTUW
//           </span>
//           <span className="text-white sm:inline hidden font-light tracking-wider drop-shadow-md">
//             CampusVista
//           </span>
//         </div>

//         {/* ✅ Dynamic Nav Links */}
//         <ul className="flex gap-6 sm:gap-8 text-[#f1f5f9] font-semibold text-base sm:text-lg">
//           {navLinks.map((item) => (
//             <li key={item.label}>
//               <Link
//                 to={item.to}
//                 className="relative px-2 py-1 rounded-md transition-all duration-300 ease-in-out hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
//               >
//                 <span className="relative z-10">{item.label}</span>
//               </Link>
//             </li>
//           ))}
//         </ul>

//         {/* Profile Icon & Dropdown */}
//         <div className="relative ml-4" ref={dropdownRef}>
//           <div
//             onClick={toggleDropdown}
//             className="cursor-pointer select-none text-white"
//             title={user ? `Hello, ${user.displayName || user.email}` : 'Sign In'}
//           >
//             {user ? <FiUser size={28} /> : <GoogleIcon />}
//           </div>

//           {dropdownOpen && (
//             <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50 border border-gray-200">
//               {user ? (
//                 <button
//                   onClick={handleSignOut}
//                   className="flex items-center gap-2 w-full text-sm px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition"
//                 >
//                   <FiLogOut className="text-lg" />
//                   <span>Sign Out</span>
//                 </button>
//               ) : (
//                 <button
//                   onClick={handleSignIn}
//                   className="flex items-center gap-2 w-full text-sm px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition"
//                 >
//                   <GoogleIcon />
//                   <span>Sign in with Google</span>
//                 </button>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiLogOut, FiUser } from 'react-icons/fi';

// ✅ Google Icon SVG
const GoogleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 533.5 544.3" xmlns="http://www.w3.org/2000/svg">
    <path fill="#4285F4" d="M533.5 278.4c0-17.4-1.6-34.2-4.8-50.4H272v95.5h146.9
      c-6.3 33.7-25.2 62.2-53.9 81.3v67h87.1
      c50.8-46.8 80.4-115.6 80.4-193.4z"/>
    <path fill="#34A853" d="M272 544.3
      c72.9 0 134.2-24.2 178.9-65.7l-87.1-67
      c-24.2 16.3-55.3 25.9-91.8 25.9
      -70.7 0-130.7-47.7-152.2-111.6H32.5v69.9
      c44.7 87.9 136.2 148.5 239.5 148.5z"/>
    <path fill="#FBBC05" d="M119.8 323.1
      c-10.5-31.7-10.5-65.9 0-97.6v-69.9H32.5
      c-40.7 81.5-40.7 178.8 0 260.3l87.3-69.8z"/>
    <path fill="#EA4335" d="M272 107.7
      c39.6-.6 77.4 14.2 106.1 40.7l79.3-79.3
      C405.3 24.5 344 0 272 0
      168.6 0 77.1 60.6 32.5 148.5l87.3 69.9
      c21.5-63.9 81.5-111.6 152.2-111.6z"/>
  </svg>
);

const Navbar = ({ visible }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, googleSignIn, logout } = useAuth();
  const dropdownRef = useRef(null);

  // ✅ Admin Emails
  const adminEmails = {
    "nescafe.igdtuw@gmail.com": "nescafe",
    "tiwarijishop@gmail.com": "tiwariji"
  };

  // ✅ Identify if user is admin
  const shopKey = user ? adminEmails[user.email] : null;
  const isAdmin = !!shopKey;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const handleSignOut = async () => {
    try {
      await logout();
      setDropdownOpen(false);
    } catch (err) {
      console.error("Logout failed:", err.message);
    }
  };

  const handleSignIn = async () => {
    try {
      await googleSignIn();
      setDropdownOpen(false);
    } catch (err) {
      console.error("Sign in failed:", err.message);
    }
  };

  console.log("✅ Navbar rendered!", user?.email, "→ shop:", shopKey);

  // ✅ Dynamic Navbar Links
  const navLinks = isAdmin
    ? [
        { label: "Home", to: "/admin-dashboard" },
        { label: "Orders", to: "/orders-received" },
        { label: "Stock", to: `/stock/${shopKey}` },
        { label: "Contact us", to: "/contact" },
      ]
    : [
        { label: "Home", to: "/student-dashboard" },
        { label: "Services", to: "/services" },
        { label: "Contact us", to: "/contact" },
      ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      } bg-gradient-to-r from-[#0f172a] via-[#0f766e] to-[#134e4a] shadow-lg`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl sm:text-3xl font-bold text-white tracking-wide flex items-center gap-3">
          <span className="bg-white text-[#0f766e] px-4 py-1.5 rounded-full shadow-lg text-base sm:text-lg font-semibold tracking-tight">
            IGDTUW
          </span>
          <span className="text-white sm:inline hidden font-light tracking-wider drop-shadow-md">
            CampusVista
          </span>
        </div>

        {/* ✅ Dynamic Nav Links */}
        <ul className="flex gap-6 sm:gap-8 text-[#f1f5f9] font-semibold text-base sm:text-lg">
          {navLinks.map((item) => (
            <li key={item.label}>
              <Link
                to={item.to}
                className="relative px-2 py-1 rounded-md transition-all duration-300 ease-in-out hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                <span className="relative z-10">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Profile Dropdown */}
        <div className="relative ml-4" ref={dropdownRef}>
          <div
            onClick={toggleDropdown}
            className="cursor-pointer select-none text-white"
            title={user ? `Hello, ${user.displayName || user.email}` : "Sign In"}
          >
            {user ? <FiUser size={28} /> : <GoogleIcon />}
          </div>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50 border border-gray-200">
              {user ? (
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-2 w-full text-sm px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition"
                >
                  <FiLogOut className="text-lg" />
                  <span>Sign Out</span>
                </button>
              ) : (
                <button
                  onClick={handleSignIn}
                  className="flex items-center gap-2 w-full text-sm px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition"
                >
                  <GoogleIcon />
                  <span>Sign in with Google</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
