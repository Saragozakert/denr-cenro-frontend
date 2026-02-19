import React from 'react';
import DENRLogo from '../../assets/images/DENR.png';
import LoginForm from '../../components/Auth/LoginForm'; // Updated import
import '../../assets/Style/LandingDesign/Mainpage.css';

function Mainpage() {
  return (
    <div className="mainpage-container">
      <div 
        className="blurred-logo-background"
        style={{ backgroundImage: `url(${DENRLogo})` }}
      ></div>
      <div className="full-blurry-green"></div>
      
      <LoginForm /> {/* Single login form */}
    </div>
  );
};

export default Mainpage;