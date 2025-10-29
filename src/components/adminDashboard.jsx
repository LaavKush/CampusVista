// src/components/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AdminNavbar from "./Navbar";
import { useAuth } from "../context/AuthContext";
import SignupModal from "./SignupModal";

// ✅ Import images
import nescafeImg from "../assets/nescafe.png";
import tiwariImg from "../assets/tiwari.png";
import tuckImg from "../assets/tuck.png";

const Dashboard = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const service = location.state?.service;

  const [showSignupModal, setShowSignupModal] = useState(false);

  // 🔒 Redirect or open modal if not authenticated
  useEffect(() => {
    if (!user) {
      console.log("User not logged in → opening signup modal");
      setShowSignupModal(true);
    }
  }, [user]);

  const closeSignupModal = () => {
    setShowSignupModal(false);
    navigate("/admin-dashboard");
  };

  // ✅ Identify which shop admin is logged in
  const getShopImage = (email) => {
    if (!email) return null;
    if (email === "nescafe.igdtuw@gmail.com") return nescafeImg;
    if (email === "tiwarijishop@gmail.com") return tiwariImg;
    if (email === "tuckshop.igdtuw@gmail.com") return tuckImg;
    return null;
  };

  const shopImage = getShopImage(user?.email);

  return (
    <>
      <AdminNavbar visible={true} />
      <SignupModal isOpen={showSignupModal} onClose={closeSignupModal} />

      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-teal-50 to-teal-100 px-4 pt-24 pb-10">
        {user ? (
          <>
            <h1 className="text-4xl md:text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-teal-900 via-teal-600 to-teal-900 drop-shadow-lg mb-6">
               Welcome, {user?.displayName || user?.email || "Guest"}!
            </h1>

            {/* ✅ Show shop image below the welcome text */}
            {shopImage && (
              <img
                src={shopImage}
                alt="Shop Logo"
                className="w-60 md:w-80 h-auto mt-6 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
              />
            )}

            {!shopImage && (
              <p className="text-gray-500 mt-6">
                No specific shop assigned to this admin.
              </p>
            )}
          </>
        ) : (
          <div className="text-gray-600 text-center mt-20 text-lg">
            Please log in to access the dashboard.
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
