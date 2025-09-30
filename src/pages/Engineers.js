import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Styles/Engineers.css';
import './Styles/EngineersLeadership.css';
// import './Styles/EngineersLeadershipOverrides.css';
import './Styles/EngineersExteriorLight.css';

const DEFAULT_ENGINEER_IMAGE = `${process.env.PUBLIC_URL || ''}/images/products/default.jpg`;
const EMOJI_REGEX = /[\uD800-\uDBFF][\uDC00-\uDFFF]|[\u2600-\u27BF]/;

const resolveEngineerImage = (image) => {
  if (!image || typeof image !== 'string') {
    return DEFAULT_ENGINEER_IMAGE;
  }

  const trimmedImage = image.trim();

  if (trimmedImage.startsWith('/images/')) {
    return trimmedImage;
  }

  if (EMOJI_REGEX.test(trimmedImage)) {
    return DEFAULT_ENGINEER_IMAGE;
  }

  return trimmedImage;
};

function Engineers() {
  // Combine all engineers into one leadership grid
  const exteriorEngineers = [
    {
      id: 1,
  name: "Arjun Mehra",
      title: "Senior Structural Engineer",
      experience: "15+ years",
      rating: 4.9,
      reviews: 127,
      image: "👨‍💼",
  specialties: ["Metro Rail Projects", "Bridge Design", "Seismic Analysis", "Foundation Engineering", "Steel Structures"],
  description: "Expert in structural engineering with specialization in high-rise buildings and infrastructure projects across India. Specializes in innovative design solutions for challenging environments.",
  recentProjects: ["Mumbai Metro Line 3 - 33.5km underground", "Bandra-Worli Sea Link - 5.6km span", "Delhi Mall - 200,000 sqm, complex foundation system"],
  availability: "Available for new projects",
  contact: "+91 98765 43210"
    },
    {
      id: 2,
  name: "Ravi Kumar",
      title: "Senior Project Management Expert",
      experience: "18+ years",
      rating: 4.7,
      reviews: 156,
      image: "",
  specialties: ["Smart City Projects", "Cost Management", "Timeline Optimization", "Risk Management", "Stakeholder Management"],
  description: "Experienced project manager specializing in large-scale construction and development projects in India, delivering complex projects on time and within budget.",
  recentProjects: ["Ahmedabad Smart City - ₹1200Cr, 3-year timeline", "Bangalore IT Park - ₹800Cr, tech development", "Pune Industrial Facility - ₹350Cr, state-of-the-art facility"],
  availability: "Limited availability (2-3 projects per year)",
  contact: "+91 99876 54321"
    },
    {
      id: 3,
  name: "Suresh Patil",
      title: "Senior Quality Assurance Engineer",
      experience: "14+ years",
      rating: 4.9,
      reviews: 94,
      image: "👨‍🔬",
  specialties: ["Quality Control", "Safety Standards", "Compliance", "ISO Certification", "Process Improvement"],
  description: "Dedicated quality assurance engineer ensuring the highest standards in Indian construction projects with expertise in BIS and ISO protocols.",
  recentProjects: ["Delhi Airport Terminal 2 - Safety audit for ₹900Cr project", "Reliance Oil Refinery - ISO 9001 certification", "Chennai Industrial Zone - Comprehensive compliance review"],
  availability: "Available for inspections and audits",
  contact: "+91 91234 56789"
    },
    {
      id: 4,
  name: "Priya Sharma",
      title: "MEP Engineering Specialist",
      experience: "12+ years",
      rating: 4.8,
      reviews: 89,
      image: "👩‍🔧",
  specialties: ["Mechanical Systems", "Electrical Design", "Plumbing", "HVAC", "Energy Efficiency"],
  description: "Expert in Mechanical, Electrical, and Plumbing (MEP) systems with focus on sustainable and energy-efficient solutions for Indian buildings.",
  recentProjects: ["Mumbai Green Tower - IGBC Platinum, ₹300Cr project", "Apollo Hospital Chennai - Advanced MEP systems", "Bangalore Smart Building - IoT integration"],
  availability: "Available for new projects",
  contact: "+91 93456 78123"
    },
    {
      id: 5,
  name: "Vikram Singh",
      title: "Civil Engineering Consultant",
      experience: "20+ years",
      rating: 4.9,
      reviews: 203,
      image: "👨‍🏗️",
  specialties: ["Infrastructure Design", "Road Construction", "Water Systems", "Urban Planning", "Geotechnical Engineering"],
  description: "Senior civil engineering consultant with extensive experience in Indian infrastructure projects, urban development, and sustainable city planning.",
  recentProjects: ["Delhi Metro Extension - ₹1500Cr infrastructure project", "Mumbai Water Treatment Plant - ₹200Cr facility", "NH48 Highway Network - 100km road system"],
  availability: "Limited availability (high demand)",
  contact: "+91 94567 12345"
    },
    {
      id: 6,
  name: "Amit Joshi",
      title: "Civil Engineering Specialist",
      experience: "12+ years",
      rating: 4.6,
      reviews: 89,
      image: "👨‍🏗️",
  specialties: ["Infrastructure Design", "Road Construction", "Drainage Systems"],
  description: "Specialized in civil engineering with focus on Indian infrastructure and public works projects.",
  recentProjects: ["Eastern Peripheral Expressway", "Mumbai Drainage Network", "Bangalore Public Park"],
  availability: "Available for consultations",
  contact: "+91 98712 34567"
    },
    {
      id: 7,
  name: "Manish Verma",
      title: "Foundation Engineering Expert",
      experience: "16+ years",
      rating: 4.8,
      reviews: 112,
      image: "👨‍🔧",
  specialties: ["Foundation Design", "Soil Analysis", "Geotechnical Engineering"],
  description: "Expert in foundation engineering and geotechnical analysis for complex Indian construction projects.",
  recentProjects: ["Mumbai Skyscraper Foundation", "Yamuna Bridge Foundation", "Pune Industrial Complex"],
  availability: "Available for new projects",
  contact: "+91 87654 32109"
    },
    {
      id: 8,
  name: "Rahul Desai",
      title: "Roofing & Waterproofing Specialist",
      experience: "10+ years",
      rating: 4.5,
      reviews: 78,
      image: "👨‍🏠",
  specialties: ["Roofing Systems", "Waterproofing", "Thermal Insulation"],
  description: "Specialized in roofing systems and waterproofing solutions for commercial and residential projects across India.",
  recentProjects: ["Phoenix Mall Roof", "DLF Villa Complex", "Infosys Office Building"],
  availability: "Available for consultations",
  contact: "+91 91234 87654"
    }
  ];

  const interiorEngineers = [
    {
      id: 9,
  name: "Neha Agarwal",
      title: "Architectural Design Specialist",
      experience: "12+ years",
      rating: 4.8,
      reviews: 89,
      image: "👩‍🎨",
  specialties: ["Residential Design", "Sustainable Architecture", "3D Modeling"],
  description: "Creative architectural designer with focus on sustainable and modern residential projects in India.",
  recentProjects: ["Bangalore Eco Villa Complex", "Mumbai Office Tower", "Delhi Luxury Apartments"],
  availability: "Available for consultations",
  contact: "+91 99876 54321"
    },
    {
      id: 10,
  name: "Pooja Nair",
      title: "MEP Engineering Consultant",
      experience: "10+ years",
      rating: 4.6,
      reviews: 73,
      image: "👩‍🔧",
  specialties: ["Mechanical Systems", "Electrical Design", "Plumbing"],
  description: "Specialized in MEP engineering with expertise in energy-efficient building systems for Indian projects.",
  recentProjects: ["Delhi Green Building", "Apollo Hospital MEP", "Bangalore Office Complex"],
  availability: "Available for new projects",
  contact: "+91 98712 34567"
    },
    {
      id: 11,
  name: "Anjali Gupta",
      title: "Interior Design Engineer",
      experience: "8+ years",
      rating: 4.5,
      reviews: 67,
      image: "👩‍🎨",
  specialties: ["Interior Design", "Space Planning", "Material Selection"],
  description: "Creative interior design engineer with expertise in modern and traditional design approaches for Indian homes and offices.",
  recentProjects: ["Delhi Luxury Villa", "Mumbai Office Interior", "Chennai Restaurant Design"],
  availability: "Available for consultations",
  contact: "+91 87654 32109"
    },
    {
      id: 12,
  name: "Ritu Menon",
      title: "Lighting Design Specialist",
      experience: "9+ years",
      rating: 4.7,
      reviews: 82,
      image: "👩‍💡",
  specialties: ["Lighting Design", "Smart Home Systems", "Energy Efficiency"],
  description: "Expert in lighting design and smart home integration for modern Indian living spaces.",
  recentProjects: ["Bangalore Smart Villa", "Taj Hotel Lighting", "Reliance Retail Space"],
  availability: "Available for new projects",
  contact: "+91 91234 56789"
    },
    {
      id: 13,
  name: "Sunita Rao",
      title: "Acoustic Engineering Consultant",
      experience: "11+ years",
      rating: 4.4,
      reviews: 59,
      image: "👩‍🎵",
  specialties: ["Acoustic Design", "Sound Insulation", "Audio Systems"],
  description: "Specialized in acoustic engineering for Indian theaters, studios, and residential soundproofing.",
  recentProjects: ["PVR Cinema Complex", "Mumbai Recording Studio", "Delhi Luxury Villa"],
  availability: "Limited availability",
  contact: "+91 99876 54321"
    },
    {
      id: 14,
  name: "Meera Iyer",
      title: "Kitchen & Bathroom Specialist",
      experience: "7+ years",
      rating: 4.6,
      reviews: 71,
      image: "👩‍🍳",
  specialties: ["Kitchen Design", "Bathroom Planning", "Custom Cabinetry"],
  description: "Expert in kitchen and bathroom design with focus on functionality and aesthetics for Indian homes.",
  recentProjects: ["Mumbai Luxury Kitchen", "Delhi Spa Bathroom", "Bangalore Custom Cabinets"],
  availability: "Available for consultations",
  contact: "+91 94567 12345"
    }
  ];

  const [activeCategory, setActiveCategory] = useState('exterior');
  const filteredEngineers = activeCategory === 'exterior' ? exteriorEngineers : interiorEngineers;
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className={`engineers-page ${activeCategory}`}>
      {/* Navigation - consistent with other pages */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <Link to="/" className="nav-link">
              <img src="/images/LOGO.png" alt="MK & Buildings Logo" className="logo-image" />
            </Link>
          </div>
          <div className="nav-menu">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/products" className="nav-link">Products</Link>
            <Link to="/engineers" className="nav-link active">Engineers</Link>
            <Link to={{ pathname: '/', hash: '#about' }} className="nav-link">About Us</Link>
            <Link to={{ pathname: '/', hash: '#rating' }} className="nav-link">Reviews</Link>
            <Link to={{ pathname: '/', hash: '#contact' }} className="nav-link">Contact</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="engineers-hero">
        <div className="container">
          <h1>Leadership & Expert Engineers</h1>
          <p>Meet the leaders and specialists who bring your construction vision to life with precision and expertise.</p>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="category-tabs">
        <div className="container">
          <div className="tabs">
            <button 
              className={`tab ${activeCategory === 'exterior' ? 'active' : ''}`}
              onClick={() => setActiveCategory('exterior')}
            >
              <span className="tab-icon">🏠</span>
              Exterior Specialists
            </button>
            <button 
              className={`tab ${activeCategory === 'interior' ? 'active' : ''}`}
              onClick={() => setActiveCategory('interior')}
            >
              <span className="tab-icon">🏡</span>
              Interior Specialists
            </button>

          </div>
        </div>
      </section>

      {/* Leadership Grid - Filtered by active category */}
      <section className="leadership-section">
        <div className="container">
          <h2 className="leadership-section-title">{activeCategory === 'exterior' ? 'Exterior Specialists' : 'Interior Specialists'}</h2>
          <div className="leadership-grid">
            {filteredEngineers.map((engineer) => {
              const isOpen = expandedId === engineer.id;
              return (
                <article key={engineer.id} className={`leadership-card ${isOpen ? 'expanded' : ''}`}>
                  <button
                    className="leadership-card-body"
                    onClick={() => toggleExpand(engineer.id)}
                    aria-expanded={isOpen}
                    aria-controls={`details-${engineer.id}`}
                  >
                    <div className="leadership-avatar" aria-hidden>
                      <img
                        src={resolveEngineerImage(engineer.image)}
                        alt={engineer.image && !EMOJI_REGEX.test(engineer.image) ? engineer.name : 'Default Avatar'}
                        className="leadership-img"
                      />
                    </div>
                    <div className="leadership-info">
                      <h3 className="leadership-name">{engineer.name}</h3>
                      <p className="leadership-title">{engineer.title}</p>
                      <div className="leadership-meta">
                        <span className="meta-badge">{'⭐'.repeat(Math.floor(engineer.rating))} {engineer.rating}</span>
                        <span className="meta-dot">•</span>
                        <span className="meta-badge">{engineer.experience}</span>
                      </div>
                    </div>
                    <div className="leadership-action" aria-hidden>
                      <span className="action-text">{isOpen ? 'Hide details' : 'View details'}</span>
                    </div>
                  </button>

                  {isOpen && (
                    <div id={`details-${engineer.id}`} className="leadership-details">
                      <p className="leadership-description">{engineer.description}</p>

                      <div className="leadership-fields">
                        <div className="field"><strong>Availability:</strong> {engineer.availability}</div>
                        <div className="field"><strong>Contact:</strong> {engineer.contact}</div>
                        <div className="field"><strong>Reviews:</strong> {engineer.reviews}</div>
                      </div>

                      <div className="leadership-specialties">
                        <h4>Specialties</h4>
                        <div className="specialty-tags">
                          {engineer.specialties.map((s, i) => (
                            <span key={i} className="specialty-tag">{s}</span>
                          ))}
                        </div>
                      </div>

                      <div className="leadership-projects">
                        <h4>Recent Projects</h4>
                        <ul>
                          {engineer.recentProjects.map((project, index) => (
                            <li key={index}>{project}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="leadership-cta">
                        <Link to={`/engineers/${engineer.id}`} className="leadership-profile-link">View Profile</Link>
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 MK & Buildings. All rights reserved. | Crafting Quality Since 2009</p>
        </div>
      </footer>
    </div>
  );
}

export default Engineers;
