import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import AdminNavbar from "../components/NavBarAdmin";
import Navbar from "../components/Navbar";

const Contact = () => {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(null); // null means "checking access"

  // ✅ Authorized admin emails (case-insensitive)
  const adminEmails = ["tiwarijishop@gmail.com", "nescafe.igdtuw@gmail.com"];

  useEffect(() => {
    if (!user) {
      console.log("⚠️ No user logged in → showing normal Navbar");
      setIsAdmin(false);
      return;
    }

    const userEmail = (user.email || "").trim().toLowerCase();
    const matched = adminEmails.some(
      (adminEmail) => adminEmail.toLowerCase() === userEmail
    );

    setIsAdmin(matched);
    console.log("✅ Logged-in user:", userEmail, "→ isAdmin:", matched);
  }, [user]);

  // 🕓 Loading state before we know user's role
  if (isAdmin === null) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#0F172A] text-white text-lg">
        Checking access...
      </div>
    );
  }

  return (
    <>
      {/* ✅ Render correct navbar */}
      {isAdmin ? <AdminNavbar /> : <Navbar visible={true} />}

      {/* ✅ Contact Section */}
      <section
        id="contact"
        className="bg-[#0F172A] py-16 px-6 sm:px-10 md:px-20 text-white min-h-screen"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 tracking-wide text-teal-400">
            Get in Touch
          </h2>
          <p className="text-lg text-[#cbd5e1] mb-10">
            Have questions or want to collaborate? We'd love to hear from you!
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Message Sent!");
            }}
            className="space-y-6 text-left"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Full Name"
                className="bg-[#1e293b] text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-teal-400"
                required
              />
              <input
                type="email"
                placeholder="Email Address"
                className="bg-[#1e293b] text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-teal-400"
                required
              />
            </div>

            <textarea
              rows="5"
              placeholder="Your Message"
              className="w-full bg-[#1e293b] text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-teal-400"
              required
            ></textarea>

            <button
              type="submit"
              className="bg-teal-500 hover:bg-teal-600 text-black font-semibold px-6 py-3 rounded-lg transition duration-300 shadow-md hover:shadow-lg"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Contact;
