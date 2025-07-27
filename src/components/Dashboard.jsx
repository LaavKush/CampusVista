// src/components/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { useAuth } from '../context/AuthContext';
import OrderFoodSection from './services/OrderFoodSection';
import PhotocopyShopSection from './services/PhotocopyShopSection';
import SignupModal from './SignupModal';

const Dashboard = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const service = location.state?.service;

  const [showSignupModal, setShowSignupModal] = useState(false);

  // 🔒 Redirect or open modal if not authenticated
  useEffect(() => {
    if (!user) {
      console.log('User not logged in → opening signup modal');
      setShowSignupModal(true);
    }
  }, [user]);

  const closeSignupModal = () => {
    setShowSignupModal(false);
    navigate('/'); // optionally navigate to home
  };

  return (
    <>
      <Navbar visible={true} />
      <SignupModal isOpen={showSignupModal} onClose={closeSignupModal} />

      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-teal-50 to-teal-100 px-4 pt-24 pb-10">
        {user ? (
          <>
            <h1 className="text-4xl md:text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-teal-900 via-teal-600 to-teal-900 drop-shadow-lg mb-20">
              Welcome, {user.displayName || user.email || 'Guest'}!
            </h1>

            {/* Conditional Service Section */}
            {!service && (
              <div className="text-gray-500 text-center">
                <p>No specific service selected.</p>
                <button
                  onClick={() => navigate('/#services')}
                  className="mt-4 text-sm text-teal-700 underline hover:text-teal-900"
                >
                  Go to Services
                </button>
              </div>
            )}

            {service === 'food' && <OrderFoodSection />}
            {service === 'photocopy' && <PhotocopyShopSection />}
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
