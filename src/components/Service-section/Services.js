import React from "react";
import ForestBackground from "../../assets/images/forest-management.png";
import WaterBackground from "../../assets/images/water-resource.jpg";
import MarineBackground from "../../assets/images/marine.jpg";
import BioBackground from "../../assets/images/biodiversity.jpg";
import "../../assets/Style/LandingDesign/Homepage.css";

function Services() {
  const services = [
    {
      image: ForestBackground,
      title: "Forest Management",
      description:
        "Sustainable forest conservation programs that balance ecological health with community needs through scientific management practices.",
    },
    {
      image: WaterBackground,
      title: "Water Resources",
      description:
        "Comprehensive water quality monitoring and watershed management programs to ensure clean, sustainable water supplies for communities.",
    },
    {
      image: MarineBackground,
      title: "Coastal and Marine Resources",
      description:
        "Conservation of marine ecosystems, mangroves, and coastal habitats through community-based programs and science-driven marine biodiversity protection.",
    },
    {
      image: BioBackground,
      title: "Biodiversity Conservation",
      description:
        "Protection of wildlife and natural habitats through research-based conservation strategies and community engagement programs.",
    },
  ];

  return (
    <section className="services-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">
            Comprehensive environmental solutions tailored to meet community
            needs through sustainable practices
          </p>
        </div>

        <div className="services-container">
          <div className="service-decoration deco-1"></div>
          <div className="service-decoration deco-2"></div>

          <div className="service-row">
            {services.slice(0, 2).map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>

          <div className="service-row">
            {services.slice(2, 4).map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ServiceCard as a sub-component
function ServiceCard({ image, title, description }) {
  return (
    <div className="service-card">
      <div className="service-image-container">
        <img src={image} alt={title} className="service-image" />
      </div>
      <div className="service-content">
        <h3 className="service-title">{title}</h3>
        <p className="service-description">{description}</p>
        <a href="#link" className="service-link">
          Learn more
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}

export default Services;
