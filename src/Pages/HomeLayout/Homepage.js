import React, { useState, useEffect } from "react";
import "../../assets/Style/LandingDesign/Homepage.css";
import Navbar from "../../components/Navigation/Navbar";
import Services from "../../components/Service-section/Services";
import FooterLayout from "../../components/Footer/FooterLayout";
import AdminForm from "../../components/Auth/AdminForm";
import UserForm from "../../components/Auth/UserForm"; // Add this import
import HeroLayout from "../../components/HeroSection/HeroLayout";

function Homepage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false); // Add this state

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="homepage">
      <Navbar 
        isScrolled={isScrolled}
        showLoginModal={showLoginModal} 
        setShowLoginModal={setShowLoginModal}
        showUserModal={showUserModal} // Pass this prop
        setShowUserModal={setShowUserModal} // Pass this prop
      />
      <HeroLayout/>
      <Services/>
      <FooterLayout/>
      <AdminForm show={showLoginModal} onClose={() => setShowLoginModal(false)}/>
      <UserForm show={showUserModal} onClose={() => setShowUserModal(false)}/> {/* Add this */}
    </div>
  );
}

export default Homepage;