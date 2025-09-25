import React from "react";
import "../../assets/Style/LandingDesign/Homepage.css";
import HeroBackground from "../../assets/images/hero-background.avif";

function HeroLayout() {
  return (
    <section className="hero-section">
      <div className="hero-background-container">
        <img
          src={HeroBackground}
          alt="Forest background"
          className="hero-background"
        />
      </div>
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1 className="hero-title">
          Community Environment and Natural Resources Office
        </h1>
        <h2 className="hero-subtitle">R13 Lianga, Surigao del Sur</h2>
        <p className="hero-description">
          Protecting and conserving the environment for sustainable
          development and future generations
        </p>
        <div className="hero-buttons">
          <button className="btn btn-primary">Our Services</button>
          <button className="btn btn-secondary">Learn More</button>
        </div>
      </div>
    </section>
  );
}

export default HeroLayout;