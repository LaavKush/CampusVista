// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import Navbar from "./components/Navbar";
// import HeroSection from "./components/HeroSection";
// import OurServices from "./components/OurServices";
// import Contact from "./components/contact";
// import Footer from "./components/footer";
// import SignupModal from "./components/SignupModal";
// import Dashboard from "./components/Dashboard";
// import AdminDashboard from "./components/adminDashboard";
// import ViewMenu from "./components/services/ViewMenu";
// import CartPage from "./components/services/CartPage";
// import ThankYou from "./pages/ThankYou";
// import MyOrders from "./pages/MyOrders";
// import Map from "./pages/Map";
// import Orders from "./pages/ordersReceived";
// import Stock from "./pages/stock";

// import { getRedirectResult, onAuthStateChanged } from "firebase/auth";
// import { auth } from "./firebase";
// import { CartProvider } from "./context/CartContext";
// import { AuthProvider } from "./context/AuthContext"; 

// function App() {
//   const [showNavbar, setShowNavbar] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [user, setUser] = useState(null);

//   // 👇 Navbar scroll effect
//   useEffect(() => {
//     const handleScroll = () => setShowNavbar(window.scrollY > 0);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // 👇 Firebase auth & redirect handler
//   useEffect(() => {
//     getRedirectResult(auth)
//       .then((result) => {
//         if (result?.user) setUser(result.user);
//       })
//       .catch((error) => console.error("Redirect error:", error.message));

//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//     });

//     return () => unsubscribe();
//   }, []);

//   return (
//     <AuthProvider>
//       <CartProvider>
//         <Router>
//           <Navbar visible={showNavbar} user={user} />
//           <Routes>
//             {/* 🏠 Home Page */}
//             <Route
//               path="/"
//               element={
//                 <>
//                   <HeroSection openSignupModal={() => setShowModal(true)} user={user} />
//                   <Footer />
//                   {showModal && <SignupModal onClose={() => setShowModal(false)} />}
//                 </>
//               }
//             />

//             {/* 🛠 Services */}
//             <Route
//               path="/services"
//               element={
//                 <>
//                   <OurServices />
//                   <Footer />
//                 </>
//               }
//             />

//             {/* 📞 Contact */}
//             <Route
//               path="/contact"
//               element={
//                 <>
//                   <Contact />
//                   <Footer />
//                 </>
//               }
//             />

//             {/* 🧑‍🎓 Student Dashboard */}
//             <Route path="/student-dashboard" element={<Dashboard />} />

//             {/* 👨‍💼 Admin Dashboard */}
//             <Route path="/admin-dashboard" element={<AdminDashboard />} />

//             {/* 🍔 View Menu */}
//             <Route path="/view-menu" element={<ViewMenu />} />

//             {/* 🛒 Cart */}
//             <Route path="/cart" element={<CartPage />} />

//             {/* ✅ Thank You */}
//             <Route path="/thank-you" element={<ThankYou user={user} />} />

//             {/* 📦 My Orders */}
//             <Route path="/my-orders" element={<MyOrders />} />

//             {/* 🗺 Campus Tour */}
//             <Route path="/campus-tour" element={<Map />} />

//             {/* 📬 Orders Received (Admin) */}
//             <Route path="/orders-received" element={<Orders />} />

//            <Route path="/stock/tiwariji" element={<Stock shop="tiwariji" />} />
// <Route path="/stock/nescafe" element={<Stock shop="nescafe" />} />
//           </Routes>
//         </Router>
//       </CartProvider>
//     </AuthProvider>
//   );
// }

// export default App;

import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useParams,
} from "react-router-dom";

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
import Stock from "./pages/Stock";

import { getRedirectResult, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";

// 🔹 Define which admin email maps to which shop
const adminShops = {
  "tiwarijishop@gmail.com": "tiwariji",
  "nescafe.igdtuw@gmail.com": "nescafe",
  "tuckshop.igdtuw@gmail.com":"tuckshop",
};

function App() {
  const [showNavbar, setShowNavbar] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);

  // 👇 Navbar scroll effect (works for all except stock pages)
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
          {/* ✅ Navbar inside Router so useLocation works */}
          <NavbarWrapper showNavbar={showNavbar} user={user} />

          <Routes>
            {/* 🏠 Home Page */}
            <Route
              path="/"
              element={
                <>
                  <HeroSection
                    openSignupModal={() => setShowModal(true)}
                    user={user}
                  />
                  <Footer />
                  {showModal && (
                    <SignupModal onClose={() => setShowModal(false)} />
                  )}
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

            {/* 📦 Stock (based on logged-in email) */}
            <Route
              path="/stock"
              element={
                user ? (
                  adminShops[user.email] ? (
                    <Stock shop={adminShops[user.email]} />
                  ) : (
                    <div className="min-h-screen flex items-center justify-center text-xl text-red-600">
                      ❌ Unauthorized: No stock access assigned for {user.email}
                    </div>
                  )
                ) : (
                  <div className="min-h-screen flex items-center justify-center text-xl text-gray-700">
                    Please log in to view stock
                  </div>
                )
              }
            />

            {/* 🏪 Optional Dynamic Route (e.g., /stock/tiwariji) */}
            <Route path="/stock/:shop" element={<StockWrapper user={user} />} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

// ✅ Wrapper for Navbar so it can safely use useLocation
function NavbarWrapper({ showNavbar, user }) {
  const { pathname } = useLocation();
  const isStockPage = pathname.startsWith("/stock");
  return <Navbar visible={showNavbar} user={user} isFixed={isStockPage} />;
}

// ✅ Wrapper for dynamic stock pages
function StockWrapper({ user }) {
  const { shop } = useParams();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-gray-700">
        Please log in to view stock
      </div>
    );
  }

  if (adminShops[user.email] !== shop) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-red-600">
        ❌ Unauthorized: {user.email} does not have access to {shop}
      </div>
    );
  }

  return <Stock shop={shop} />;
}

export default App;
