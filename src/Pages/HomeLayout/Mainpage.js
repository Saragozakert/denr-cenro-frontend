import React, { useState } from 'react';
import DENRLogo from '../../assets/images/DENR.png';
import AdminForm from '../../components/Auth/AdminForm'; 
import UserForm from '../../components/Auth/UserForm'; 
import '../../assets/Style/LandingDesign/Mainpage.css';

function Mainpage() {
  const [showAdminForm, setShowAdminForm] = useState(false); 
  const [showUserForm, setShowUserForm] = useState(true);

  const handleSwitchToUser = () => {
    setShowAdminForm(false);
    setShowUserForm(true);
  };

  const handleSwitchToAdmin = () => {
    setShowUserForm(false);
    setShowAdminForm(true);
  };

  const handleCloseForms = () => {
    setShowAdminForm(false);
    setShowUserForm(false);
  };

  return (
    <div className="mainpage-container">
      <div 
        className="blurred-logo-background"
        style={{ backgroundImage: `url(${DENRLogo})` }}
      ></div>
      <div className="full-blurry-green"></div>
      
      <AdminForm 
        show={showAdminForm} 
        onClose={handleCloseForms}
        onSwitchToUser={handleSwitchToUser}
      />
      
      <UserForm 
        show={showUserForm} 
        onClose={handleCloseForms}
        onSwitchToAdmin={handleSwitchToAdmin}
      />
    </div>
  );
};

export default Mainpage;