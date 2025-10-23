// import React, { useState } from "react";
// import { useAuth } from "../context/AuthContext";
// import SignupModal from "./SignupModal";
// import { useNavigate } from "react-router-dom";

// const HeroSection = () => {
//   const { user } = useAuth();
//   const [isSignupOpen, setSignupOpen] = useState(false);
//   const navigate = useNavigate(); // <-- initialize navigate

//   const openSignupModal = () => setSignupOpen(true);
//   const closeSignupModal = () => setSignupOpen(false);

//   const handleExploreClick = () => {
//     if (user) {
//       // User is signed in, scroll to services
//       const servicesSection = document.getElementById("services");
//       if (servicesSection) {
//         servicesSection.scrollIntoView({ behavior: "smooth" });
//       }
//     } else {
//       console.log("User is null -> opening modal");
//       openSignupModal(); // just open the modal
//     }
//   };

//   return (
//     <section
//       id="hero"
//       className="relative w-full min-h-screen text-white flex flex-col justify-center items-center px-4 md:px-8 lg:px-16 text-center overflow-hidden"
//       style={{
//         backgroundImage:
//           "linear-gradient(135deg, rgba(20,184,166,0.95), rgba(15,118,110,0.95)), url('https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1470&q=80')",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       {/* Top Wave */}
//       <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
//         <svg
//           className="relative block w-[200%] h-40"
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 1200 120"
//           preserveAspectRatio="none"
//         >
//           <path
//             d="M0,0V46.29c47.84,22.75,103.65,29,158,16C306.41,39.06,360,7.73,414,2.28c60-6.15,113.72,18.55,173,29.43C648.35,48.85,709.1,46.92,768,38.06c60.42-9.07,113.91-31.15,174-35.51C1010.61-2.53,1074,11.2,1132,27.35c51.52,13.65,103.18,27.88,152,40.46V0Z"
//             opacity="0.3"
//             className="fill-white"
//           />
//         </svg>
//       </div>

//       {/* Content */}
//       <div className="max-w-4xl mx-auto z-10">
//         <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6 text-white tracking-wide drop-shadow-[0_4px_20px_rgba(0,0,0,0.45)]">
//           <span className="block">Welcome to</span>
//           <span className="block text-lime-300">IGDTUW Campus Tour</span>
//         </h1>

//         <p className="text-base sm:text-lg md:text-xl text-gray-100 max-w-2xl mx-auto mb-10 drop-shadow-md">
//           Discover the vibrant life, beautiful infrastructure, and excellent
//           facilities at Indira Gandhi Delhi Technical University for Women.
//         </p>

//         <button
//           onClick={handleExploreClick}
//           className="bg-white text-teal-700 font-semibold px-8 py-3 rounded-xl shadow-md hover:bg-gray-100 transition-all duration-300"
//         >
//           Explore Now
//         </button>
//       </div>

//       {/* Bottom Wave */}
//       <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180">
//         <svg
//           className="relative block w-[200%] h-40"
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 1200 120"
//           preserveAspectRatio="none"
//         >
//           <path
//             d="M0,0V46.29c47.84,22.75,103.65,29,158,16C306.41,39.06,360,7.73,414,2.28c60-6.15,113.72,18.55,173,29.43C648.35,48.85,709.1,46.92,768,38.06c60.42-9.07,113.91-31.15,174-35.51C1010.61-2.53,1074,11.2,1132,27.35c51.52,13.65,103.18,27.88,152,40.46V0Z"
//             opacity="0.3"
//             className="fill-white"
//           />
//         </svg>
//       </div>

//       {/* Signup Modal */}
//       <SignupModal
//   isOpen={isSignupOpen}
//   onClose={() => {
//     console.log("Signup modal closed"); // log when modal is closed
//     closeSignupModal();
//   }}
//   onSuccess={() => {
//     console.log("Signup successful -> navigating to campus tour page"); // log success
//     closeSignupModal();
//     navigate("/campus-tour"); // Navigate after signup/login
//   }}
// />

//     </section>
//   );
// };

// export default HeroSection;

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
    console.log("User is logged in:", user);
    // Navigate directly to campus tour
    console.log("Navigating to /campus-tour because user is logged in");
    navigate("/campus-tour");
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
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6 text-white tracking-wide drop-shadow-[0_4px_20px_rgba(0,0,0,0.45)]">
          <span className="block">Welcome to</span>
          <span className="block text-lime-300">IGDTUW Campus Tour</span>
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
          console.log("Signup successful -> navigating to campus-tour page");
          closeSignupModal();
          navigate("/campus-tour");
        }}
      />
    </section>
  );
};

export default HeroSection;

