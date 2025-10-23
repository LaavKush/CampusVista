import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import OurServices from './components/OurServices';
import Contact from './components/contact';
import Footer from './components/footer';
import SignupModal from './components/SignupModal';
import Dashboard from './components/Dashboard';
import ViewMenu from './components/services/ViewMenu';
import CartPage from './components/services/CartPage';
import ThankYou from './pages/ThankYou';
import MyOrders from './pages/MyOrders'; 
import Map from './pages/Map'; 

import { getRedirectResult, onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { CartProvider } from './context/CartContext';

function App() {
  const [showNavbar, setShowNavbar] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);

  // Detect scroll to toggle navbar visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowNavbar(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle Firebase redirect and auth state
  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          setUser(result.user);
        }
      })
      .catch((error) => {
        console.error('Redirect error:', error.message);
      });

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <CartProvider>
      <Router>
        <Navbar visible={showNavbar} user={user} />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HeroSection openSignupModal={() => setShowModal(true)} user={user} />
                <Footer />
                {showModal && <SignupModal onClose={() => setShowModal(false)} />}
              </>
            }
          />
          <Route
            path="/services"
            element={
              <>
                <OurServices />
                <Footer />
              </>
            }
          />
          <Route
            path="/contact"
            element={
              <>
                <Contact />
                <Footer />
              </>
            }
          />
          <Route path="/dashboard" element={<Dashboard user={user} />} />
          <Route path="/view-menu" element={<ViewMenu />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/thank-you" element={<ThankYou user={user} />} />
          <Route path="/my-orders" element={<MyOrders />} /> 
          <Route path="/campus-tour" element={<Map />} /> 
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
