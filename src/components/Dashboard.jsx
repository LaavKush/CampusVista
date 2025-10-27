// src/components/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./footer"; // ✅ Import Footer
import { useAuth } from "../context/AuthContext";
import OrderFoodSection from "./services/OrderFoodSection";
import PhotocopyShopSection from "./services/PhotocopyShopSection";
import SignupModal from "./SignupModal";
import HeroSection from "./HeroSection"; // ✅ Import HeroSection

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
    navigate("/student-dashboard");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-teal-50 to-teal-100 m-0 p-0 overflow-x-hidden">
      {/* ✅ Navbar */}
      <div className="m-0 p-0">
        <Navbar visible={true} />
      </div>

      {/* ✅ Signup Modal */}
      <SignupModal isOpen={showSignupModal} onClose={closeSignupModal} />

      {/* ✅ Main Content */}
      <main className="flex-grow m-0 p-0">
        {user ? (
          <>
            {/* ✅ Conditional Section */}
            {!service ? (
              <div className="w-full m-0 p-0">
                <HeroSection />
              </div>
            ) : service === "food" ? (
              <OrderFoodSection />
            ) : service === "photocopy" ? (
              <PhotocopyShopSection />
            ) : null}
          </>
        ) : (
          <div className="text-gray-600 text-center text-lg">
            Please log in to access the dashboard.
          </div>
        )}
      </main>

      {/* ✅ Footer */}
      <div className="m-0 p-0">
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
