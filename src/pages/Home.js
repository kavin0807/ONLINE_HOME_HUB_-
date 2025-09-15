import React, { useState, useEffect } from 'react';
import UserAvatar from '../components/UserAvatar';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Styles/HomeSectionReveal.css';

function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    setTimeout(() => setHeroVisible(true), 200);

    // simple reveal on scroll
    const revealables = document.querySelectorAll('.cta-reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    revealables.forEach((el) => io.observe(el));

    // handle hash scroll from other pages
    if (window.location.hash) {
      const id = window.location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 150);
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      io.disconnect();
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  // Get user info from localStorage
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem('currentUser');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);
  const handleAvatarClick = () => setAvatarMenuOpen((open) => !open);
  const handleMenuClose = () => setAvatarMenuOpen(false);

  const handleLogout = () => {
    // Remove user from localStorage and update state
    localStorage.removeItem('currentUser');
    setUser(null);
    handleMenuClose();
    navigate('/login');
  };

  return (
    <div className="App">
      {/* Navigation */}
      <nav className={`navbar home-nav ${isScrolled ? 'scrolled' : ''}`}> 
        <div className="nav-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div className="nav-logo">
            <img src="/images/LOGO.png" alt="MK & Buildings Logo" className="logo-image" />
          </div>
          <div className="nav-menu" style={{ display: 'flex', gap: '2.5rem', justifyContent: 'flex-end', alignItems: 'center' }}>
            <a href="#home" className="nav-link">Home</a>
            <a href="#about" className="nav-link">About Us</a>
            <Link to="/products" className="nav-link">Products</Link>
            <Link to="/engineers" className="nav-link">Engineers</Link>
            <a href="#rating" className="nav-link">Reviews</a>
            <a href="#contact" className="nav-link">Contact</a>
            {!user && <><Link to="/login" className="nav-link">Login</Link><Link to="/signup" className="nav-link">Sign Up</Link></>}
            {/* User avatar at right corner, only if logged in */}
            {user && (
              <div style={{ position: 'relative', marginLeft: '1.5rem' }}>
                <button
                  style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                  onClick={handleAvatarClick}
                  aria-label="User menu"
                >
                  <UserAvatar name={user.name} imageUrl={user.avatar} size={40} />
                </button>
                {avatarMenuOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '48px',
                      right: 0,
                      background: '#fff',
                      borderRadius: '10px',
                      boxShadow: '0 4px 16px rgba(44,62,80,0.12)',
                      minWidth: '140px',
                      zIndex: 100,
                      padding: '0.5rem 0',
                    }}
                    onMouseLeave={handleMenuClose}
                  >
                    <button style={{ display: 'block', width: '100%', padding: '0.5rem 1rem', background: 'none', border: 'none', color: '#232f3e', fontWeight: 500, textAlign: 'left', cursor: 'pointer' }} onClick={() => { handleMenuClose(); navigate('/profile'); }}>Profile</button>
                    <Link to="/settings" style={{ display: 'block', padding: '0.5rem 1rem', color: '#232f3e', textDecoration: 'none', fontWeight: 500 }}>Settings</Link>
                    <button style={{ display: 'block', width: '100%', padding: '0.5rem 1rem', background: 'none', border: 'none', color: '#b00020', fontWeight: 500, textAlign: 'left', cursor: 'pointer' }} onClick={handleLogout}>Logout</button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <motion.div
          className={`hero-content${heroVisible ? ' hero-animate' : ''}`}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div>
            <h1 style={{ fontFamily: 'serif', fontSize: '3.5rem', fontWeight: 700, marginBottom: 8, lineHeight: 1.1 }}>
              Timeless Building<br />Materials
            </h1>
            <p style={{ fontSize: '1.2rem', marginBottom: 24, maxWidth: 600, lineHeight: 1.6 }}>
              Discover premium construction supplies that bring your architectural vision to life. From foundation to finishing, we provide the finest materials for your dream home.
            </p>
            <div className="hero-buttons">
              <Link to="/products" className="btn-primary">View Products</Link>
              <button className="btn-secondary" onClick={() => scrollToSection('contact')}>Get Quote</button>
            </div>
          </div>
        </motion.div>
        <div className="hero-image">
          <img src="/images/HOME!.png" alt="Home materials" className="hero-graphic" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <h2>About MK & Buildings</h2>
          <div className="about-content">
            <motion.div
              className="about-text"
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
            >
              <h3>Your Trusted Building Partner</h3>
              <p className="title">Leading Construction Materials Supplier</p>
              <p>
                With over 15 years of experience in the construction industry, MK & Buildings has been the go-to destination for quality building materials.
              </p>
              <div className="skills">
                <span className="skill-tag">Quality Materials</span>
                <span className="skill-tag">Expert Advice</span>
                <span className="skill-tag">Fast Delivery</span>
                <span className="skill-tag">Competitive Prices</span>
                <span className="skill-tag">Professional Service</span>
              </div>
            </motion.div>
            <motion.div
              className="about-image"
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
            >
              <div className="profile-placeholder" style={{ height: 260, borderRadius: 12 }}></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Reveal Section (Trionn style) */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-row">
            <aside className="cta-sticky">
              <h2>Ready to start your project?</h2>
              <p className="cta-sub">High‑quality materials, expert guidance, on‑time delivery.</p>
            </aside>
            <div className="cta-content">
              <div className="cta-card cta-reveal">
                <h3>Explore Products</h3>
                <p>Browse our full catalog of foundation, structural, and finishing materials ideal for residential and commercial builds.</p>
                <div className="cta-actions">
                  <Link to="/products" className="btn-primary">View Products</Link>
                </div>
              </div>
              <div className="cta-card cta-reveal">
                <h3>Consult an Engineer</h3>
                <p>Get expert recommendations on materials, structural planning, and cost optimization for your project.</p>
                <div className="cta-actions">
                  <Link to="/engineers" className="btn-secondary">Meet Engineers</Link>
                </div>
              </div>
              <div className="cta-card cta-reveal">
                <h3>Request a Quote</h3>
                <p>Tell us your requirements and we’ll provide a tailored quotation with the best pricing options.</p>
                <div className="cta-actions">
                  <button className="btn-primary" onClick={() => scrollToSection('contact')}>Get Quote</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Section */}
      <section id="product" className="product">
        <div className="container">
          <h2>Our Building Products</h2>
          <div className="product-grid">
            {[
              { icon: '🏗️', title: 'Foundation Materials', desc: 'High-quality cement, concrete, rebar, and foundation materials for solid construction.' },
              { icon: '🧱', title: 'Bricks & Blocks', desc: 'Premium bricks, concrete blocks, and masonry materials for walls and structures.' },
              { icon: '🏠', title: 'Roofing Materials', desc: 'Durable roofing tiles, shingles, and waterproofing materials for protection.' },
              { icon: '🔧', title: 'Plumbing & Electrical', desc: 'Complete range of plumbing pipes, electrical wiring, and fixtures.' },
              { icon: '🪟', title: 'Windows & Doors', desc: 'Energy-efficient windows, doors, and frames for modern homes.' },
              { icon: '🎨', title: 'Finishing Materials', desc: 'Paint, tiles, flooring, and decorative materials for beautiful interiors.' },
            ].map((card, idx) => (
              <motion.div
                key={idx}
                className="product-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
              >
                <div style={{ fontSize: 28 }}>{card.icon}</div>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Rating Section */}
      <section id="rating" className="rating">
        <div className="container">
          <h2>Customer Reviews</h2>
          <div className="rating-grid">
            {[0,1,2].map((i) => (
              <motion.div
                key={i}
                className="rating-card"
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4 }}
              >
                <div className="stars">⭐⭐⭐⭐⭐</div>
                <p>"Excellent quality materials and professional service. Built my entire house with their products!"</p>
                <h4>- Ahmed Hassan</h4>
                <span>Homeowner, Dubai</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <h2>Get In Touch</h2>
          <div className="contact-content">
            <div className="contact-info">
              <h3>Let's Build Together</h3>
              <p>Ready to start your construction project? Contact us for quotes, consultations, and expert advice.</p>
              <div className="contact-details">
                <div className="contact-item">
                  <span className="contact-icon">📧</span>
                  <span>info@mkbuildings.com</span>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📱</span>
                  <span>+971 50 123 4567</span>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📍</span>
                  <span>Dubai Industrial City, UAE</span>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">🕒</span>
                  <span>Mon-Sat: 8AM-8PM</span>
                </div>
              </div>
            </div>
            <div className="contact-form">
              <form>
                <input type="text" placeholder="Your Name" />
                <input type="email" placeholder="Your Email" />
                <input type="tel" placeholder="Phone Number" />
                <textarea placeholder="Project Details & Requirements"></textarea>
                <button type="submit" className="btn-primary">Send Inquiry</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 MK & Buildings. All rights reserved. | Quality Building Materials Since 2009</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
