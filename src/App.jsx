import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import OurServices from "./components/OurServices";
import Contact from "./components/contact";
import Footer from "./components/footer";
import SignupModal from "./components/SignupModal";
import Dashboard from "./components/Dashboard";
import AdminDashboard from "./components/adminDashboard";
import ViewMenu from "./components/services/ViewMenu";
import CartPage from "./components/services/CartPage";
import ThankYou from "./pages/ThankYou";
import MyOrders from "./pages/MyOrders";
import Map from "./pages/Map";
import Orders from "./pages/ordersReceived";

import { getRedirectResult, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext"; 

function App() {
  const [showNavbar, setShowNavbar] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);

  // 👇 Navbar scroll effect
  useEffect(() => {
    const handleScroll = () => setShowNavbar(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 👇 Firebase auth & redirect handler
  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) setUser(result.user);
      })
      .catch((error) => console.error("Redirect error:", error.message));

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Navbar visible={showNavbar} user={user} />
          <Routes>
            {/* 🏠 Home Page */}
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

            {/* 🛠 Services */}
            <Route
              path="/services"
              element={
                <>
                  <OurServices />
                  <Footer />
                </>
              }
            />

            {/* 📞 Contact */}
            <Route
              path="/contact"
              element={
                <>
                  <Contact />
                  <Footer />
                </>
              }
            />

            {/* 🧑‍🎓 Student Dashboard */}
            <Route path="/student-dashboard" element={<Dashboard />} />

            {/* 👨‍💼 Admin Dashboard */}
            <Route path="/admin-dashboard" element={<AdminDashboard />} />

            {/* 🍔 View Menu */}
            <Route path="/view-menu" element={<ViewMenu />} />

            {/* 🛒 Cart */}
            <Route path="/cart" element={<CartPage />} />

            {/* ✅ Thank You */}
            <Route path="/thank-you" element={<ThankYou user={user} />} />

            {/* 📦 My Orders */}
            <Route path="/my-orders" element={<MyOrders />} />

            {/* 🗺 Campus Tour */}
            <Route path="/campus-tour" element={<Map />} />

            {/* 📬 Orders Received (Admin) */}
            <Route path="/orders-received" element={<Orders />} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
