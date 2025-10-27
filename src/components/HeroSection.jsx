import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import SignupModal from "./SignupModal";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const { user } = useAuth();
  const [isSignupOpen, setSignupOpen] = useState(false);
  const navigate = useNavigate();

  const openSignupModal = () => {
    console.log("Opening Signup Modal");
    setSignupOpen(true);
  };

  const closeSignupModal = () => {
    console.log("Closing Signup Modal");
    setSignupOpen(false);
  };

  const handleExploreClick = () => {
    console.log("Explore Now button clicked");

    if (user) {
      console.log("User is logged in:", user.email);

      // 🔹 Check for admin by email
      const adminEmails = ["nescafe.igdtuw@gmail.com", "tiwarijishop@gmail.com"]; // add your admin emails here

      if (adminEmails.includes(user.email)) {
        console.log("Admin detected -> Navigating to Admin Dashboard");
        navigate("/admin-dashboard");
      } else {
        console.log("Regular user detected -> Navigating to Campus Explore");
        window.location.href = "https://campus-explore.vercel.app/";
      }

    } else {
      console.log("User is null -> opening signup modal");
      openSignupModal();
    }
  };

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen text-white flex flex-col justify-center items-center px-4 md:px-8 lg:px-16 text-center overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(135deg, rgba(20,184,166,0.95), rgba(15,118,110,0.95)), url('https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1470&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Content */}
      <div className="max-w-4xl mx-auto z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-teal-100 via-teal-150 to-teal-100 drop-shadow-lg mb-6">
                Hello, {user.displayName || user.email || "Guest"}!
              </h1>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6 text-white tracking-wide drop-shadow-[0_4px_20px_rgba(0,0,0,0.45)]">
          <span className="block">Welcome to</span>
          <span className="block text-lime-300">CampusVista</span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-gray-100 max-w-2xl mx-auto mb-10 drop-shadow-md">
          Discover the vibrant life, beautiful infrastructure, and excellent
          facilities at Indira Gandhi Delhi Technical University for Women.
        </p>

        <button
          onClick={handleExploreClick}
          className="bg-white text-teal-700 font-semibold px-8 py-3 rounded-xl shadow-md hover:bg-gray-100 transition-all duration-300"
        >
          Explore Now
        </button>
      </div>

      {/* Signup Modal */}
      <SignupModal
        isOpen={isSignupOpen}
        onClose={() => {
          console.log("Signup modal closed");
          closeSignupModal();
        }}
        onSuccess={() => {
          console.log("Signup successful -> navigating to correct dashboard");
          closeSignupModal();

          // Redirect new user properly after signup
          if (user && user.email && adminEmails.includes(user.email)) {
            navigate("/admin-dashboard");
          } else {
            window.location.href = "https://campus-explore.vercel.app/";
          }
        }}
      />
    </section>
  );
};

export default HeroSection;
