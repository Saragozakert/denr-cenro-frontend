import React from 'react';
import DENRLogo from '../../assets/images/DENR.png';
import '../../assets/Style/LandingDesign/Homepage.css';

function FooterLayout() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section footer-logo">
            <img src={DENRLogo} alt="DENR Logo" className="footer-logo-img" />
            <h4>CENRO Lianga</h4>
            <p>Department of Environment and Natural Resources</p>
            <div className="social-links">
              <a href="#link" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#link" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#link" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
          <div className="footer-section">
            <h4>Contact Information</h4>
            <div className="contact-item">
              <i className="fas fa-map-marker-alt"></i>
              <span>Lianga, Surigao del Sur</span>
            </div>
            <div className="contact-item">
              <i className="fas fa-phone"></i>
              <span>+63 921 773 6931</span>
            </div>
            <div className="contact-item">
              <i className="fas fa-envelope"></i>
              <span>cenrolianga@denr.gov.ph</span>
            </div>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#link">Home</a></li>
              <li><a href="#link">Services</a></li>
              <li><a href="#link">About Us</a></li>
              <li><a href="#link">Contact</a></li>
              <li><a href="#link">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} CENRO Lianga - DENR. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default FooterLayout;