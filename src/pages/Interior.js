import React from 'react';
import { Link } from 'react-router-dom';
import './Styles/ProductPage.css';

function Interior() {
  const products = [
    {
      id: 1,
      name: "Hardwood Flooring",
      brand: "GreenPly",
      description: "Premium hardwood flooring in various species and finishes",
      price: "₹588/sq ft",
      image: "/images/products/interior/Hardwood Flooring.jpg",
      features: ["Natural beauty", "Durable finish", "Easy maintenance", "Value adding"]
    },
    {
      id: 2,
      name: "Ceramic Tiles",
      brand: "Kajaria",
      description: "High-quality ceramic tiles for walls and floors",
      price: "₹220/sq ft",
      image: "/images/products/interior/Ceramic Tiles.jpg",
      features: ["Water resistant", "Easy to clean", "Multiple designs", "Long lasting"]
    },
    {
      id: 3,
      name: "Interior Paint",
      brand: "Nerolac",
      description: "Premium interior paint with low VOC and easy application",
      price: "₹1,470/gallon",
      image: "/images/products/interior/Interior Paint.webp",
      features: ["Low VOC", "Easy application", "Wide color range", "Washable finish"]
    },
    {
      id: 4,
      name: "Plumbing Fixtures",
      brand: "Jaquar",
      description: "Modern plumbing fixtures for bathrooms and kitchens",
      price: "₹3,675/fixture",
      image: "/images/products/interior/Plumbing Fixtures.avif",
      features: ["Water efficient", "Modern design", "Easy installation", "Durable finish"]
    },
    {
      id: 5,
      name: "Electrical Wiring",
      brand: "Finolex",
      description: "Copper electrical wiring and accessories for safe installation",
      price: "₹37/ft",
      image: "/images/products/interior/Electrical Wiring.jpg",
      features: ["Copper conductor", "Safety certified", "Easy installation", "Long warranty"]
    },
    {
      id: 6,
      name: "Ceiling Materials",
      brand: "Gyproc",
      description: "Acoustic ceiling tiles and decorative ceiling materials",
      price: "₹147/sq ft",
      image: "/images/products/interior/Ceiling Materials.avif",
      features: ["Sound absorption", "Fire resistant", "Easy installation", "Multiple designs"]
    }
  ];

  return (
    <div className="product-page">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <Link to="/" className="nav-link">
              <h2>MK & Buildings</h2>
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
            <Link to="/products">Products</Link> / Interior
          </div>
          <h1>Interior Building Materials</h1>
          <p>Beautiful and functional materials for the inside of your home</p>
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
                  <span className="product-emoji" style={{display: 'none'}}>🏡</span>
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
                  {product.name === "Hardwood Flooring" && (
                    <Link to="/products/interior/hardwood-flooring" className="btn-primary">View Details <span style={{marginLeft: '8px', fontWeight: 700, fontSize: '1.1em'}}>→</span></Link>
                  )}
                  {product.name === "Ceramic Tiles" && (
                    <Link to="/products/interior/tiles" className="btn-primary">View Details <span style={{marginLeft: '8px', fontWeight: 700, fontSize: '1.1em'}}>→</span></Link>
                  )}
                  {product.name === "Interior Paint" && (
                    <Link to="/products/interior/interior-paint" className="btn-primary">View Details <span style={{marginLeft: '8px', fontWeight: 700, fontSize: '1.1em'}}>→</span></Link>
                  )}
                  {product.name === "Plumbing Fixtures" && (
                    <Link to="/products/interior/plumbing-fixtures" className="btn-primary">View Details <span style={{marginLeft: '8px', fontWeight: 700, fontSize: '1.1em'}}>→</span></Link>
                  )}
                  {product.name === "Electrical Wiring" && (
                    <Link to="/products/interior/electrical-wiring" className="btn-primary">View Details <span style={{marginLeft: '8px', fontWeight: 700, fontSize: '1.1em'}}>→</span></Link>
                  )}
                  {product.name === "Ceiling Materials" && (
                    <Link to="/products/interior/ceiling-materials" className="btn-primary">View Details <span style={{marginLeft: '8px', fontWeight: 700, fontSize: '1.1em'}}>→</span></Link>
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

export default Interior; 