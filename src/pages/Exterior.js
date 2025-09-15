import React from 'react';
import { Link } from 'react-router-dom';
import './Styles/Exterior.css';


function Exterior() {
  const products = [
    {
      id: 1,
      name: "Premium Roofing Tiles",
      brand: "UltraRoof",
      description: "High-quality ceramic and concrete roofing tiles for durability and style",
      price: "₹1,100/sq ft",
      image: "/images/products/exterior/Premium Roofing Tiles.jpg",
      features: ["Weather resistant", "50-year warranty", "Multiple colors", "Easy installation"]
    },
    {
      id: 2,
      name: "Concrete Blocks",
      brand: "BuildStrong",
      description: "Standard and lightweight concrete blocks for structural walls",
      price: "₹184/block",
      image: "/images/products/exterior/Concrete Blocks.jpg?v=2",
      features: ["High strength", "Thermal insulation", "Fire resistant", "Cost effective"]
    },
    {
      id: 3,
      name: "Energy-Efficient Windows",
      brand: "ClearView",
      description: "Double and triple glazed windows with thermal insulation",
      price: "₹11,000/window",
      image: "/images/products/exterior/Energy-Efficient Windows.webp",
      features: ["UV protection", "Noise reduction", "Energy saving", "Security features"]
    },
    {
      id: 4,
      name: "Foundation Cement",
      brand: "Cemex India",
      description: "Premium grade cement for strong and durable foundations",
      price: "₹880/bag",
      image: "/images/products/exterior/Foundation Cement.png",
      features: ["High strength", "Quick setting", "Weather resistant", "Low shrinkage"]
    },
    {
      id: 5,
      name: "Exterior Paint",
      brand: "Asian Paints",
      description: "Weather-resistant exterior paint with UV protection",
      price: "₹1,840/gallon",
      image: "/images/products/exterior/Exterior Paint.webp",
      features: ["UV resistant", "Mold resistant", "Long lasting", "Easy application"]
    },
    {
      id: 6,
      name: "Steel Rebar",
      brand: "Tata Steel",
      description: "High-tensile steel reinforcement bars for concrete structures",
      price: "₹59/lb",
      image: "/images/products/exterior/Steel Rebar.jpg",
      features: ["High tensile strength", "Corrosion resistant", "Various sizes", "ASTM certified"]
    }
  ];

  return (
    <div className="product-page">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <Link to="/" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <img src="/images/LOGO.png" alt="Logo" className="logo-image" />
            </Link>
          </div>
          <div className="nav-menu">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/products" className="nav-link">Products</Link>
            <Link to="/" className="nav-link">About Us</Link>
            <Link to="/" className="nav-link">Reviews</Link>
            <Link to="/" className="nav-link">Contact</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="product-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/products">Products</Link> / Exterior
          </div>
          <h1>Exterior Building Materials</h1>
          <p>Premium materials for the outside of your home - from foundation to roof</p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="products-section">
        <div className="container">
          <div className="products-grid">
            {products.map((product) => (
              <div key={product.id} className="product-item">
                <div className="product-image">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-img"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                  <span className="product-emoji" style={{ display: 'none' }}>🏗️</span>
                </div>
                <div className="product-content">
                  <h3>{product.name}</h3>
                  <div className="product-brand">{product.brand}</div>
                  <p>{product.description}</p>
                  <div className="product-price">{product.price}</div>
                  <ul className="product-features">
                    {product.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                  {product.name === "Premium Roofing Tiles" ? (
                    <Link to="/products/exterior/nt-roofs" className="btn-primary">View Details <span style={{ marginLeft: '8px', fontWeight: 700, fontSize: '1.1em' }}>→</span></Link>
                  ) : product.name === "Concrete Blocks" ? (
                    <Link to="/products/exterior/concrete-blocks" className="btn-primary">View Details <span style={{ marginLeft: '8px', fontWeight: 700, fontSize: '1.1em' }}>→</span></Link>
                  ) : product.name === "Energy-Efficient Windows" ? (
                    <Link to="/products/exterior/energy-efficient-windows" className="btn-primary">View Details <span style={{ marginLeft: '8px', fontWeight: 700, fontSize: '1.1em' }}>→</span></Link>
                  ) : product.name === "Foundation Cement" ? (
                    <Link to="/products/cement" className="btn-primary">View Details <span style={{ marginLeft: '8px', fontWeight: 700, fontSize: '1.1em' }}>→</span></Link>
                  ) : product.name === "Exterior Paint" ? (
                    <Link to="/products/exterior/exterior-paint" className="btn-primary">View Details <span style={{ marginLeft: '8px', fontWeight: 700, fontSize: '1.1em' }}>→</span></Link>
                  ) : product.name === "Steel Rebar" ? (
                    <Link to="/products/exterior/steel-rebar" className="btn-primary">View Details <span style={{ marginLeft: '8px', fontWeight: 700, fontSize: '1.1em' }}>→</span></Link>
                  ) : (
                    <button className="btn-primary">View Details <span style={{ marginLeft: '8px', fontWeight: 700, fontSize: '1.1em' }}>→</span></button>
                  )}
                </div>
              </div>
            ))}
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

export default Exterior; 