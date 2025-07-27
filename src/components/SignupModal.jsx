import React from "react";
import { useAuth } from "../context/AuthContext";

// Google Icon SVG component
const GoogleIcon = () => (
  <svg
    className="w-6 h-6 mr-2"
    viewBox="0 0 533.5 544.3"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
  >
    <path
      fill="#4285F4"
      d="M533.5 278.4c0-17.4-1.6-34.2-4.8-50.4H272v95.5h146.9c-6.3 33.7-25.2 62.2-53.9 81.3v67h87.1c50.8-46.8 80.4-115.6 80.4-193.4z"
    />
    <path
      fill="#34A853"
      d="M272 544.3c72.9 0 134.2-24.2 178.9-65.7l-87.1-67c-24.2 16.3-55.3 25.9-91.8 25.9-70.7 0-130.7-47.7-152.2-111.6H32.5v69.9c44.7 87.9 136.2 148.5 239.5 148.5z"
    />
    <path
      fill="#FBBC05"
      d="M119.8 323.1c-10.5-31.7-10.5-65.9 0-97.6v-69.9H32.5c-40.7 81.5-40.7 178.8 0 260.3l87.3-69.8z"
    />
    <path
      fill="#EA4335"
      d="M272 107.7c39.6-.6 77.4 14.2 106.1 40.7l79.3-79.3C405.3 24.5 344 0 272 0 168.6 0 77.1 60.6 32.5 148.5l87.3 69.9c21.5-63.9 81.5-111.6 152.2-111.6z"
    />
  </svg>
);

const SignupModal = ({ isOpen, onClose }) => {
  const { googleSignIn } = useAuth();

  const handleGoogleSignIn = async () => {
  try {
    await googleSignIn();
    onClose(); 
  } catch (error) {
    alert(error.message); 
  }
};


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/60 backdrop-blur-sm">
      <div className="bg-[#1e293b] p-8 rounded-xl shadow-lg w-full max-w-md text-white relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl font-bold hover:text-gray-300"
        >
          ×
        </button>
        <h2 className="text-3xl font-semibold text-center mb-6">Sign Up</h2>
        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center py-2 bg-white text-black font-medium rounded-md hover:bg-gray-300 transition"
        >
          <GoogleIcon />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default SignupModal;
