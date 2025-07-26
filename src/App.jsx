import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import OurServices from './components/OurServices';;
import Contact from './components/contact';
import Footer from './components/footer';

function App() {
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowNavbar(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <main className="w-full">
        <Navbar visible={showNavbar} />
        <HeroSection />
        <OurServices />
        <Contact />
        <Footer />
      </main>
    </>
  );
}

export default App;
