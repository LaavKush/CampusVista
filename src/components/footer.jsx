import React from 'react';
import { FaInstagram, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#0F172A] text-white py-10 px-6 sm:px-12  border-t border-gray-800">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 text-center sm:text-left">
        
        {/* Left: About */}
        <div>
          <h3 className="text-lg font-bold text-teal-400 mb-2">About CampusVista</h3>
          <p className="text-gray-400 text-sm">
            Explore our beautiful campus, student life, and everything IGDTUW has to offer!
          </p>
        </div>

        {/* Center: Quick Links */}
        <div>
          <h3 className="text-lg font-bold text-teal-400 mb-2">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="/" className="hover:text-white transition">Home</a></li>
            <li><a href="/services" className="hover:text-white transition">Services</a></li>
            <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
          </ul>
        </div>

        {/* Right: Connect */}
        <div>
          <h3 className="text-lg font-bold text-teal-400 mb-2">Connect with Us</h3>
          <div className="flex justify-center sm:justify-start gap-4 mt-2">
            <a href="mailto:contact@igdtuw.ac.in" className="text-gray-400 hover:text-white transition">
              <FaEnvelope size={20} />
            </a>
            <a href="https://www.instagram.com/igdtuw.official/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
              <FaInstagram size={20} />
            </a>
            <a href="https://www.linkedin.com/school/indira-gandhi-delhi-technical-university-for-women-new-delhi/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>

      </div>

      {/* Bottom copyright */}
      <div className="mt-10 text-center text-sm text-gray-500 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} IGDTUW CampusVista. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
