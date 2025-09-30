import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './Styles/EngineerProfile.css';
import './Styles/EngineerSectionReveal.css';
import './Styles/EngineerProfileOverrides.css';
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

function EngineerProfile() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showMeetingModal, setShowMeetingModal] = useState(false);
  const [showPlanModal, setShowPlanModal] = useState(false);

  // Reveal on scroll: add 'is-revealed' when card enters viewport
  useEffect(() => {
    const revealables = document.querySelectorAll('.reveal-on-scroll');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    revealables.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Simple engineer data for testing
  const engineerData = {
    1: {
      id: 1,
      name: "Ahmed Al-Rashid",
      title: "Senior Structural Engineer",
      experience: "15+ years",
      rating: 4.9,
      reviews: 127,
      image: "👨‍💼",
      specialties: ["High-rise Buildings", "Bridge Design", "Seismic Analysis", "Foundation Engineering", "Steel Structures"],
      bio: "Expert in structural engineering with specialization in high-rise buildings and complex infrastructure projects.",
      recentProjects: ["Dubai Marina Tower", "Abu Dhabi Bridge", "Sharjah Mall"],
      availability: "Available for new projects",
      contact: "+971 50 123 4567",
      email: "ahmed.alrashid@mkbuildings.com",
      location: "Dubai, UAE",
      education: "MSc in Structural Engineering, University of Dubai (2010)",
      certifications: ["PE License", "LEED AP", "SEI Member"],
      languages: ["Arabic", "English", "French"],
      hourlyRate: "₹12,500/hour",
      consultationFee: "₹16,500/session",
      workingHours: "Mon-Fri: 8AM-6PM, Sat: 9AM-2PM",
      responseTime: "Within 2 hours",
      achievements: ["Led design team for Dubai's tallest residential tower", "Awarded Best Structural Engineer 2023"],
      skills: ["AutoCAD", "ETABS", "SAP2000", "Revit"],
      plan: {
        title: "Structural Design Plan",
        phases: [
          { name: "Initial Assessment", duration: "1-2 weeks", tasks: ["Site analysis", "Soil testing", "Load calculations"] },
          { name: "Detailed Design", duration: "3-4 weeks", tasks: ["Structural modeling", "Material selection", "Safety analysis"] }
        ]
      },
      audioRate: "₹500/hour",
      videoRate: "₹1500/hour",
    },
    2: {
      id: 2,
      name: "Mohammed Hassan",
      title: "Senior Project Management Expert",
      experience: "18+ years",
      rating: 4.7,
      reviews: 156,
      image: "👨‍💻",
      specialties: ["Large-scale Projects", "Cost Management", "Timeline Optimization", "Risk Management", "Stakeholder Management"],
      bio: "Experienced project manager specializing in large-scale construction and development projects with expertise in delivering complex projects on time and within budget.",
      recentProjects: ["Dubai Shopping Center", "Abu Dhabi Hotel Complex", "Sharjah Industrial Facility"],
      availability: "Limited availability (2-3 projects per year)",
      contact: "+971 52 456 7890",
      email: "mohammed.hassan@mkbuildings.com",
      location: "Abu Dhabi, UAE",
      education: "MBA in Project Management, American University (2008)",
      certifications: ["PMP", "PRINCE2", "Agile Certified"],
      languages: ["Arabic", "English", "Urdu"],
      hourlyRate: "₹15,000/hour",
      consultationFee: "₹20,800/session",
      workingHours: "Mon-Fri: 7AM-7PM, Sat: 9AM-3PM",
      responseTime: "Within 4 hours",
      achievements: ["Managed ₹165B+ worth of construction projects", "Reduced project timelines by 25% on average"],
      skills: ["Primavera P6", "Microsoft Project", "AutoCAD", "BIM"],
      plan: {
        title: "Project Management Plan",
        phases: [
          { name: "Project Initiation", duration: "1 week", tasks: ["Stakeholder analysis", "Scope definition", "Budget planning"] },
          { name: "Planning Phase", duration: "2-3 weeks", tasks: ["Detailed planning", "Risk assessment", "Resource allocation"] }
        ]
      },
      audioRate: "₹500/hour",
      videoRate: "₹1500/hour",
    },
    3: {
      id: 3,
      name: "David Chen",
      title: "Senior Quality Assurance Engineer",
      experience: "14+ years",
      rating: 4.9,
      reviews: 94,
      image: "👨‍🔬",
      specialties: ["Quality Control", "Safety Standards", "Compliance", "ISO Certification", "Process Improvement"],
      bio: "Dedicated quality assurance engineer ensuring the highest standards in construction projects with expertise in international quality standards and safety protocols.",
      recentProjects: ["Dubai Airport Terminal 3", "Abu Dhabi Oil Refinery", "Sharjah Industrial Zone"],
      availability: "Available for inspections and audits",
      contact: "+971 56 789 0123",
      email: "david.chen@mkbuildings.com",
      location: "Sharjah, UAE",
      education: "MSc in Quality Management, University of Sharjah (2012)",
      certifications: ["ISO 9001 Lead Auditor", "Six Sigma Black Belt", "OHSAS 18001"],
      languages: ["English", "Mandarin", "Arabic"],
      hourlyRate: "₹10,000/hour",
      consultationFee: "₹15,000/session",
      workingHours: "Mon-Fri: 8AM-6PM, Sat: 9AM-1PM",
      responseTime: "Within 3 hours",
      achievements: ["Implemented ISO 9001 in 100+ companies", "Reduced defect rates by 40% across all projects"],
      skills: ["ISO Standards", "Six Sigma", "Statistical Analysis", "Audit Management"],
      plan: {
        title: "Quality Assurance Plan",
        phases: [
          { name: "Assessment Phase", duration: "1 week", tasks: ["Current state analysis", "Gap identification", "Risk assessment"] },
          { name: "Implementation", duration: "2-4 weeks", tasks: ["Process improvement", "Training programs", "Documentation"] }
        ]
      },
      audioRate: "₹500/hour",
      videoRate: "₹1500/hour",
    },
    4: {
      id: 4,
      name: "Sarah Wilson",
      title: "MEP Engineering Specialist",
      experience: "12+ years",
      rating: 4.8,
      reviews: 89,
      image: "👩‍🔧",
      specialties: ["Mechanical Systems", "Electrical Design", "Plumbing", "HVAC", "Energy Efficiency"],
      bio: "Expert in Mechanical, Electrical, and Plumbing (MEP) systems with focus on sustainable and energy-efficient solutions for modern buildings.",
      recentProjects: ["Dubai Green Tower", "Abu Dhabi Hospital", "Sharjah Smart Building"],
      availability: "Available for new projects",
      contact: "+971 55 234 5678",
      email: "sarah.wilson@mkbuildings.com",
      location: "Dubai, UAE",
      education: "MSc in Mechanical Engineering, University of Manchester (2013)",
      certifications: ["LEED AP", "Chartered Engineer (UK)", "HVAC Certified"],
      languages: ["English", "French", "Arabic"],
      hourlyRate: "₹11,600/hour",
      consultationFee: "₹18,300/session",
      workingHours: "Mon-Fri: 8AM-6PM, Sat: 9AM-2PM",
      responseTime: "Within 2 hours",
      achievements: ["Designed MEP systems for 30+ LEED-certified buildings", "Reduced energy consumption by 35% in commercial projects"],
      skills: ["AutoCAD MEP", "Revit MEP", "HVAC Design", "Electrical Design"],
      plan: {
        title: "MEP Design & Implementation Plan",
        phases: [
          { name: "System Analysis", duration: "1 week", tasks: ["Building analysis", "Load calculations", "Energy requirements"] },
          { name: "Detailed Design", duration: "3-4 weeks", tasks: ["Mechanical design", "Electrical design", "Plumbing design"] }
        ]
      },
      audioRate: "₹500/hour",
      videoRate: "₹1500/hour",
    },
    5: {
      id: 5,
      name: "Ali Al-Zahra",
      title: "Civil Engineering Consultant",
      experience: "20+ years",
      rating: 4.9,
      reviews: 203,
      image: "👨‍🏗️",
      specialties: ["Infrastructure Design", "Road Construction", "Water Systems", "Urban Planning", "Geotechnical Engineering"],
      bio: "Senior civil engineering consultant with extensive experience in infrastructure projects, urban development, and sustainable city planning.",
      recentProjects: ["Dubai Metro Extension", "Abu Dhabi Water Treatment Plant", "Sharjah Highway Network"],
      availability: "Limited availability (high demand)",
      contact: "+971 54 345 6789",
      email: "ali.alzahra@mkbuildings.com",
      location: "Abu Dhabi, UAE",
      education: "PhD in Civil Engineering, University of California (2005)",
      certifications: ["PE License", "Chartered Engineer", "Urban Planning Certified"],
      languages: ["Arabic", "English", "German"],
      hourlyRate: "₹16,600/hour",
      consultationFee: "₹25,000/session",
      workingHours: "Mon-Fri: 7AM-7PM, Sat: 9AM-3PM",
      responseTime: "Within 6 hours",
      achievements: ["Led 50+ major infrastructure projects worth ₹1,240B+", "Designed sustainable water systems for 10+ cities"],
      skills: ["AutoCAD Civil 3D", "MicroStation", "HEC-RAS", "SWMM"],
      plan: {
        title: "Infrastructure Development Plan",
        phases: [
          { name: "Feasibility Study", duration: "2-3 weeks", tasks: ["Site investigation", "Environmental impact", "Cost-benefit analysis"] },
          { name: "Design Phase", duration: "4-6 weeks", tasks: ["Detailed engineering", "Material specifications", "Construction methods"] }
        ]
      },
      audioRate: "₹500/hour",
      videoRate: "₹1500/hour",
    },
    6: {
      id: 6,
      name: "Omar Al-Zahra",
      title: "Civil Engineering Specialist",
      experience: "12+ years",
      rating: 4.6,
      reviews: 89,
      image: "👨‍🏗️",
      specialties: ["Infrastructure Design", "Road Construction", "Drainage Systems"],
      bio: "Specialized in civil engineering with focus on infrastructure and public works projects.",
      recentProjects: ["Highway Extension", "Drainage Network", "Public Park"],
      availability: "Available for consultations",
      contact: "+971 54 321 0987",
      email: "omar.alzahra@mkbuildings.com",
      location: "Abu Dhabi, UAE",
      education: "MSc in Civil Engineering, University of Sharjah (2011)",
      certifications: ["PE License", "Road Safety Certified"],
      languages: ["Arabic", "English"],
      hourlyRate: "₹13,300/hour",
      consultationFee: "₹17,500/session",
      workingHours: "Mon-Fri: 8AM-5PM",
      responseTime: "Within 5 hours",
      achievements: ["Completed 20+ public works projects", "Improved city drainage systems"],
      skills: ["AutoCAD Civil 3D", "StormCAD", "Project Management"],
      plan: {
        title: "Infrastructure Project Plan",
        phases: [
          { name: "Survey & Analysis", duration: "1 week", tasks: ["Site survey", "Needs assessment", "Stakeholder meetings"] },
          { name: "Design & Implementation", duration: "3-5 weeks", tasks: ["Detailed design", "Construction supervision", "Quality control"] }
        ]
      },
      audioRate: "₹500/hour",
      videoRate: "₹1500/hour",
    },
    7: {
      id: 7,
      name: "Sarah Johnson",
      title: "Architectural Design Specialist",
      experience: "12+ years",
      rating: 4.8,
      reviews: 89,
      image: "👩‍🎨",
      specialties: ["Residential Design", "Sustainable Architecture", "3D Modeling"],
      bio: "Creative architectural designer with focus on sustainable and modern residential projects.",
      recentProjects: ["Eco Villa Complex", "Modern Office Tower", "Luxury Apartments"],
      availability: "Available for consultations",
      contact: "+971 55 987 6543",
      email: "sarah.johnson@mkbuildings.com",
      location: "Dubai, UAE",
      education: "BArch, University of Dubai (2010)",
      certifications: ["LEED AP", "Registered Architect"],
      languages: ["English", "Arabic"],
      hourlyRate: "₹10,800/hour",
      consultationFee: "₹15,000/session",
      workingHours: "Mon-Fri: 9AM-5PM",
      responseTime: "Within 3 hours",
      achievements: ["Designed 50+ sustainable homes", "Awarded Best Architect 2022", "Published 10+ articles on green building"],
      skills: ["AutoCAD", "Revit", "SketchUp", "3D Rendering"],
      plan: {
        title: "Architectural Design Plan",
        phases: [
          { name: "Concept Design", duration: "1 week", tasks: ["Client briefing", "Initial sketches", "Mood boards"] },
          { name: "Detailed Design", duration: "2 weeks", tasks: ["3D modeling", "Material selection", "Technical drawings"] }
        ]
      },
      audioRate: "₹500/hour",
      videoRate: "₹1500/hour",
    },
    8: {
      id: 8,
      name: "Fatima Al-Zahra",
      title: "MEP Engineering Consultant",
      experience: "10+ years",
      rating: 4.6,
      reviews: 73,
      image: "👩‍🔧",
      specialties: ["Mechanical Systems", "Electrical Design", "Plumbing"],
      bio: "Specialized in MEP engineering with expertise in energy-efficient building systems.",
      recentProjects: ["Green Building", "Hospital MEP", "Office Complex"],
      availability: "Available for new projects",
      contact: "+971 54 321 0987",
      email: "fatima.alzahra@mkbuildings.com",
      location: "Abu Dhabi, UAE",
      education: "BSc in Mechanical Engineering, Khalifa University (2012)",
      certifications: ["LEED AP", "MEP Certified"],
      languages: ["Arabic", "English"],
      hourlyRate: "₹10,000/hour",
      consultationFee: "₹14,200/session",
      workingHours: "Mon-Fri: 8AM-4PM",
      responseTime: "Within 4 hours",
      achievements: ["Completed 30+ MEP projects", "Implemented energy-saving systems in 10+ buildings"],
      skills: ["AutoCAD MEP", "Revit", "Energy Modeling"],
      plan: {
        title: "MEP Project Plan",
        phases: [
          { name: "System Design", duration: "1 week", tasks: ["System layout", "Load calculations", "Equipment selection"] },
          { name: "Implementation", duration: "2-3 weeks", tasks: ["Installation supervision", "Testing", "Commissioning"] }
        ]
      },
      audioRate: "₹500/hour",
      videoRate: "₹1500/hour",
    },
    9: {
      id: 9,
      name: "Aisha Rahman",
      title: "Interior Design Engineer",
      experience: "8+ years",
      rating: 4.5,
      reviews: 67,
      image: "👩‍🎨",
      specialties: ["Interior Design", "Space Planning", "Material Selection"],
      bio: "Creative interior design engineer with expertise in modern and traditional design approaches.",
      recentProjects: ["Luxury Villa", "Office Interior", "Restaurant Design"],
      availability: "Available for consultations",
      contact: "+971 58 654 3210",
      email: "aisha.rahman@mkbuildings.com",
      location: "Sharjah, UAE",
      education: "BSc in Interior Design, American University of Sharjah (2015)",
      certifications: ["NCIDQ Certified"],
      languages: ["English", "Arabic"],
      hourlyRate: "₹9,200/hour",
      consultationFee: "₹12,500/session",
      workingHours: "Mon-Fri: 10AM-6PM",
      responseTime: "Within 4 hours",
      achievements: ["Designed 30+ commercial interiors", "Awarded Best Young Designer 2021"],
      skills: ["AutoCAD", "SketchUp", "Material Selection"],
      plan: {
        title: "Interior Design Plan",
        phases: [
          { name: "Concept Development", duration: "1 week", tasks: ["Client meeting", "Mood boards", "Initial layouts"] },
          { name: "Execution", duration: "2 weeks", tasks: ["Material selection", "Site supervision", "Final styling"] }
        ]
      },
      audioRate: "₹500/hour",
      videoRate: "₹1500/hour",
    },
    10: {
      id: 10,
      name: "Layla Ahmed",
      title: "Lighting Design Specialist",
      experience: "9+ years",
      rating: 4.7,
      reviews: 82,
      image: "👩‍💡",
      specialties: ["Lighting Design", "Smart Home Systems", "Energy Efficiency"],
      bio: "Expert in lighting design and smart home integration for modern living spaces.",
      recentProjects: ["Smart Villa", "Hotel Lighting", "Retail Space"],
      availability: "Available for new projects",
      contact: "+971 57 123 4567",
      email: "layla.ahmed@mkbuildings.com",
      location: "Dubai, UAE",
      education: "BSc in Electrical Engineering, University of Sharjah (2014)",
      certifications: ["Lighting Certified (LC)", "Smart Home Specialist"],
      languages: ["English", "Arabic"],
      hourlyRate: "₹9,600/hour",
      consultationFee: "₹11,700/session",
      workingHours: "Mon-Fri: 9AM-5PM",
      responseTime: "Within 3 hours",
      achievements: ["Designed lighting for 100+ projects", "Implemented smart home systems in 20+ homes"],
      skills: ["DIALux", "AutoCAD", "Smart Home Integration"],
      plan: {
        title: "Lighting Design Plan",
        phases: [
          { name: "Lighting Concept", duration: "1 week", tasks: ["Client consultation", "Concept sketches", "Fixture selection"] },
          { name: "Implementation", duration: "1 week", tasks: ["Installation supervision", "System programming", "Final adjustments"] }
        ]
      },
      audioRate: "₹500/hour",
      videoRate: "₹1500/hour",
    },
    11: {
      id: 11,
      name: "Noor Al-Mansouri",
      title: "Acoustic Engineering Consultant",
      experience: "11+ years",
      rating: 4.4,
      reviews: 59,
      image: "👩‍🎵",
      specialties: ["Acoustic Design", "Sound Insulation", "Audio Systems"],
      bio: "Specialized in acoustic engineering for theaters, studios, and residential soundproofing.",
      recentProjects: ["Cinema Complex", "Recording Studio", "Luxury Villa"],
      availability: "Limited availability",
      contact: "+971 56 789 0123",
      email: "noor.mansouri@mkbuildings.com",
      location: "Abu Dhabi, UAE",
      education: "BSc in Acoustic Engineering, University of Manchester (2012)",
      certifications: ["Acoustic Consultant Certified"],
      languages: ["English", "Arabic"],
      hourlyRate: "₹10,400/hour",
      consultationFee: "₹13,300/session",
      workingHours: "Mon-Fri: 10AM-6PM",
      responseTime: "Within 5 hours",
      achievements: ["Designed acoustics for 15+ theaters", "Developed soundproofing for 30+ homes"],
      skills: ["EASE", "AutoCAD", "Sound Measurement"],
      plan: {
        title: "Acoustic Design Plan",
        phases: [
          { name: "Assessment", duration: "1 week", tasks: ["Site visit", "Acoustic measurements", "Client interview"] },
          { name: "Design & Install", duration: "2 weeks", tasks: ["System design", "Material selection", "Installation supervision"] }
        ]
      },
      audioRate: "₹500/hour",
      videoRate: "₹1500/hour",
    },
    12: {
      id: 12,
      name: "Zara Khan",
      title: "Kitchen & Bathroom Specialist",
      experience: "7+ years",
      rating: 4.6,
      reviews: 71,
      image: "👩‍🍳",
      specialties: ["Kitchen Design", "Bathroom Planning", "Custom Cabinetry"],
      bio: "Expert in kitchen and bathroom design with focus on functionality and aesthetics.",
      recentProjects: ["Luxury Kitchen", "Spa Bathroom", "Custom Cabinets"],
      availability: "Available for consultations",
      contact: "+971 59 456 7890",
      email: "zara.khan@mkbuildings.com",
      location: "Dubai, UAE",
      education: "BSc in Interior Architecture, Heriot-Watt University (2016)",
      certifications: ["NKBA Certified"],
      languages: ["English", "Urdu"],
      hourlyRate: "₹8,300/hour",
      consultationFee: "₹10,000/session",
      workingHours: "Mon-Fri: 9AM-4PM",
      responseTime: "Within 4 hours",
      achievements: ["Designed 100+ kitchens and bathrooms", "Awarded Best Kitchen Designer 2023"],
      skills: ["AutoCAD", "Cabinet Vision", "3D Rendering"],
      plan: {
        title: "Kitchen & Bathroom Design Plan",
        phases: [
          { name: "Consultation", duration: "1 week", tasks: ["Client meeting", "Needs analysis", "Initial sketches"] },
          { name: "Design & Build", duration: "2 weeks", tasks: ["Material selection", "Custom cabinetry", "Installation supervision"] }
        ]
      },
      audioRate: "₹500/hour",
      videoRate: "₹1500/hour",
    },
    13: {
      id: 13,
      name: "Khalid Rahman",
      title: "Foundation Engineering Expert",
      experience: "16+ years",
      rating: 4.8,
      reviews: 112,
      image: "👨‍🔧",
      specialties: ["Foundation Design", "Soil Analysis", "Geotechnical Engineering"],
      bio: "Expert in foundation engineering and geotechnical analysis for complex construction projects.",
      recentProjects: ["Skyscraper Foundation", "Bridge Foundation", "Industrial Complex"],
      availability: "Available for new projects",
      contact: "+971 55 654 3210",
      email: "khalid.rahman@mkbuildings.com",
      location: "Dubai, UAE",
      education: "MSc in Geotechnical Engineering, University of Leeds (2007)",
      certifications: ["PE License", "Geotechnical Specialist"],
      languages: ["English", "Arabic"],
      hourlyRate: "₹12,100/hour",
      consultationFee: "₹15,800/session",
      workingHours: "Mon-Fri: 8AM-5PM",
      responseTime: "Within 4 hours",
      achievements: ["Designed 100+ foundations", "Published 20+ papers on soil mechanics"],
      skills: ["PLAXIS", "AutoCAD", "Soil Testing"],
      plan: {
        title: "Foundation Engineering Plan",
        phases: [
          { name: "Site Investigation", duration: "1 week", tasks: ["Soil sampling", "Lab analysis", "Site survey"] },
          { name: "Foundation Design", duration: "2 weeks", tasks: ["Load calculations", "Design drawings", "Material selection"] }
        ]
      },
      audioRate: "₹500/hour",
      videoRate: "₹1500/hour",
    },
    14: {
      id: 14,
      name: "Yusuf Patel",
      title: "Roofing & Waterproofing Specialist",
      experience: "10+ years",
      rating: 4.5,
      reviews: 78,
      image: "👨‍🏠",
      specialties: ["Roofing Systems", "Waterproofing", "Thermal Insulation"],
      bio: "Specialized in roofing systems and waterproofing solutions for commercial and residential projects.",
      recentProjects: ["Shopping Mall Roof", "Villa Complex", "Office Building"],
      availability: "Available for consultations",
      contact: "+971 58 987 6543",
      email: "yusuf.patel@mkbuildings.com",
      location: "Sharjah, UAE",
      education: "BSc in Civil Engineering, Heriot-Watt University (2013)",
      certifications: ["Roofing Specialist Certified"],
      languages: ["English", "Urdu"],
      hourlyRate: "₹9,200/hour",
      consultationFee: "₹10,800/session",
      workingHours: "Mon-Fri: 9AM-4PM",
      responseTime: "Within 5 hours",
      achievements: ["Installed 200+ roofing systems", "Developed new waterproofing method"],
      skills: ["AutoCAD", "RoofCAD", "Thermal Analysis"],
      plan: {
        title: "Roofing & Waterproofing Plan",
        phases: [
          { name: "Assessment & Planning", duration: "1 week", tasks: ["Site inspection", "Material selection", "Thermal analysis"] },
          { name: "Installation", duration: "1 week", tasks: ["Roof installation", "Waterproofing", "Final inspection"] }
        ]
      },
      audioRate: "₹500/hour",
      videoRate: "₹1500/hour",
    }
  };

  const engineer = engineerData[id];

  if (!engineer) {
    return (
      <div className="engineer-profile-page">
        <div className="container">
          <h2>Engineer not found</h2>
          <Link to="/engineers" className="btn-primary">Back to Engineers</Link>
        </div>
      </div>
    );
  }

  const handleMeetingBooking = (e) => {
    e.preventDefault();
    // Collect form data
    const form = e.target;
    const meetingType = form.meetingType.value;
    const date = form.querySelector('input[type="date"]').value;
    const time = form.querySelector('select').value;
    const projectDetails = form.querySelector('textarea').value;
    let rate = engineer.hourlyRate;
    if (meetingType === 'video' && engineer.videoRate) rate = engineer.videoRate;
    if (meetingType === 'audio' && engineer.audioRate) rate = engineer.audioRate;

    // Prepare meeting data
    const meeting = {
      engineerId: engineer.id,
      engineerName: engineer.name,
      engineerTitle: engineer.title,
      engineerImage: engineer.image,
      meetingType,
      rate,
      date,
      time,
      projectDetails,
    };
    // Redirect to purchase page with meeting data
    navigate('/purchase', { state: { meeting } });
    setShowMeetingModal(false);
  };

  return (
    <div className="engineer-profile-page">
      {/* Navigation - consistent with Engineers.js */}
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

      {/* Profile Header */}
      <section className="profile-header">
        <div className="container">
          <div className="profile-intro">
            <div className="profile-avatar">
              <img
                src={resolveEngineerImage(engineer.image)}
                alt={engineer.image && !EMOJI_REGEX.test(engineer.image) ? engineer.name : 'Default Avatar'}
                className="profile-img"
              />
            </div>
            <div className="profile-info">
              <h1>{engineer.name}</h1>
              <p className="profile-title">{engineer.title}</p>
              <div className="profile-rating">
                <span className="stars">{'⭐'.repeat(Math.floor(engineer.rating))}</span>
                <span className="rating-text">{engineer.rating} ({engineer.reviews} reviews)</span>
              </div>
              <p className="profile-location">{engineer.location}</p>
            </div>
            <div className="profile-actions">
              <button 
                className="btn-primary"
                onClick={() => setShowMeetingModal(true)}
              >
                📹 Book Online Meeting
              </button>
              <button 
                className="btn-secondary"
                onClick={() => setShowPlanModal(true)}
              >
                📋 View Work Plan
              </button>
            </div>
          </div>
          {/* Quick Info Bar */}
          <div className="quick-info-bar">
            <div className="info-item">
              <span className="info-label">Experience:</span>
              <span className="info-value">{engineer.experience}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Hourly Rate:</span>
              <span className="info-value">{engineer.hourlyRate}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Response Time:</span>
              <span className="info-value">{engineer.responseTime}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Availability:</span>
              <span className="info-value">{engineer.availability}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section Reveal Layout */}
      <section className="section-reveal">
        <div className="container">
          <div className="sr-row">
            <aside className="sr-sticky">
              <h2>Overview</h2>
              <p className="sr-sub">Profile highlights</p>
            </aside>
            <div className="sr-content">
              <div className="sr-card reveal-on-scroll">
                <h3>About</h3>
                <p>{engineer.bio}</p>
              </div>
              <div className="sr-card reveal-on-scroll">
                <h3>Specialties</h3>
                <div className="specialty-tags">
                  {engineer.specialties.map((specialty, index) => (
                    <span key={index} className="specialty-tag">{specialty}</span>
                  ))}
                </div>
              </div>
              {engineer.skills && (
                <div className="sr-card reveal-on-scroll">
                  <h3>Technical Skills</h3>
                  <div className="skills-grid">
                    {engineer.skills.map((skill, index) => (
                      <span key={index} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>
              )}
              <div className="sr-card reveal-on-scroll">
                <h3>Education & Certifications</h3>
                <p><strong>Education:</strong> {engineer.education}</p>
                <div className="certifications">
                  {engineer.certifications.map((cert, index) => (
                    <span key={index} className="certification-tag">{cert}</span>
                  ))}
                </div>
              </div>
              <div className="sr-card reveal-on-scroll">
                <h3>Languages</h3>
                <div className="language-tags">
                  {engineer.languages.map((lang, index) => (
                    <span key={index} className="language-tag">{lang}</span>
                  ))}
                </div>
              </div>
              <div className="sr-card reveal-on-scroll">
                <h3>Working Hours & Response</h3>
                <p><strong>Working Hours:</strong> {engineer.workingHours}</p>
                <p><strong>Response Time:</strong> {engineer.responseTime}</p>
                <p><strong>Consultation Fee:</strong> {engineer.consultationFee}</p>
              </div>
            </div>
          </div>

          <div className="sr-row">
            <aside className="sr-sticky">
              <h2>Experience</h2>
              <p className="sr-sub">Background & achievements</p>
            </aside>
            <div className="sr-content">
              <div className="sr-card reveal-on-scroll">
                <h3>Professional Experience</h3>
                <p><strong>Years of Experience:</strong> {engineer.experience}</p>
                <p><strong>Current Status:</strong> {engineer.availability}</p>
                <p><strong>Hourly Rate:</strong> {engineer.hourlyRate}</p>
                <p><strong>Consultation Fee:</strong> {engineer.consultationFee}</p>
              </div>
              <div className="sr-card reveal-on-scroll">
                <h3>Key Achievements</h3>
                <ul className="achievements-list">
                  {engineer.achievements.map((achievement, index) => (
                    <li key={index}>{achievement}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="sr-row">
            <aside className="sr-sticky">
              <h2>Projects</h2>
              <p className="sr-sub">Selected work</p>
            </aside>
            <div className="sr-content">
              <div className="sr-card reveal-on-scroll">
                <h3>Recent Projects</h3>
                <div className="project-list">
                  {engineer.recentProjects.map((project, index) => (
                    <div key={index} className="project-item">
                      <h4>{project}</h4>
                      <p>Successfully completed with excellent client feedback</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="sr-row">
            <aside className="sr-sticky">
              <h2>Contact</h2>
              <p className="sr-sub">Get in touch</p>
            </aside>
            <div className="sr-content">
              <div className="sr-card reveal-on-scroll">
                <h3>Contact Information</h3>
                <div className="contact-info">
                  <p><strong>Phone:</strong> {engineer.contact}</p>
                  <p><strong>Email:</strong> {engineer.email}</p>
                  <p><strong>Location:</strong> {engineer.location}</p>
                </div>
              </div>
              <div className="sr-card reveal-on-scroll">
                <h3>Quick Actions</h3>
                <div className="quick-actions">
                  <button className="btn-primary" onClick={() => setShowMeetingModal(true)}>📹 Schedule Meeting</button>
                  <button className="btn-secondary" onClick={() => setShowPlanModal(true)}>📋 View Work Plan</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Online Meeting Modal */}
      {showMeetingModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Book Online Meeting with {engineer.name}</h3>
              <button 
                className="modal-close"
                onClick={() => setShowMeetingModal(false)}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleMeetingBooking} className="meeting-form">
              <div className="form-group">
                <label>Meeting Type:</label>
                <div className="meeting-type-options">
                  <label style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                    <input type="radio" name="meetingType" value="video" defaultChecked />
                    📹 Video Call
                    <span style={{color: '#007bff', fontWeight: 500, marginLeft: '0.5rem', fontSize: '0.98rem'}}>
                      {engineer.videoRate ? engineer.videoRate : engineer.hourlyRate}
                    </span>
                  </label>
                  <label style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                    <input type="radio" name="meetingType" value="audio" />
                    📞 Audio Call
                    <span style={{color: '#007bff', fontWeight: 500, marginLeft: '0.5rem', fontSize: '0.98rem'}}>
                      {engineer.audioRate ? engineer.audioRate : engineer.hourlyRate}
                    </span>
                  </label>
                </div>
              </div>
              <div className="form-group">
                <label>Date:</label>
                <input type="date" required />
              </div>
              <div className="form-group">
                <label>Time:</label>
                <select required>
                  <option value="">Select time</option>
                  <option value="09:00">9:00 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="14:00">2:00 PM</option>
                  <option value="15:00">3:00 PM</option>
                  <option value="16:00">4:00 PM</option>
                </select>
              </div>
              <div className="form-group">
                <label>Project Details:</label>
                <textarea placeholder="Describe your project requirements..." rows="4" />
              </div>
              <div className="modal-actions">
                <button type="button" onClick={() => setShowMeetingModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Book Meeting
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Work Plan Modal */}
      {showPlanModal && (
        <div className="modal-overlay">
          <div className="modal plan-modal">
            <div className="modal-header">
              <h3>{engineer.plan.title}</h3>
              <button 
                className="modal-close"
                onClick={() => setShowPlanModal(false)}
              >
                ×
              </button>
            </div>
            <div className="plan-content">
              <div className="plan-phases">
                {engineer.plan.phases.map((phase, index) => (
                  <div key={index} className="plan-phase">
                    <div className="phase-header">
                      <div className="phase-number">{index + 1}</div>
                      <div className="phase-info">
                        <h4>{phase.name}</h4>
                        <span className="phase-duration">{phase.duration}</span>
                      </div>
                    </div>
                    <div className="phase-tasks">
                      {phase.tasks.map((task, taskIndex) => (
                        <div key={taskIndex} className="task-item">
                          <span className="task-checkbox">✓</span>
                          <span className="task-text">{task}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 MK & Buildings. All rights reserved. | Quality Building Materials Since 2009</p>
        </div>
      </footer>
    </div>
  );
}

export default EngineerProfile;