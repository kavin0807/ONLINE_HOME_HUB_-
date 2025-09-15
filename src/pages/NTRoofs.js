import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Styles/NTRoofs.css';

const brands = [
  { name: 'TBS', logo: '/images/products/exterior/Roofing/TBS.jpeg', price: 1200 },
  { name: 'JSW', logo: '/images/products/exterior/Roofing/JSW.png', price: 1250 },
  { name: 'Hindalco', logo: '/images/products/exterior/Roofing/HINDALCO.jpeg', price: 1300 },
  { name: 'BRPL', logo: '/images/products/exterior/Roofing/BRPL.png', price: 1350 },
  { name: 'DS', logo: '/images/products/exterior/Roofing/DS.png', price: 1400 }
];

const ntRoofs = [
  {
    id: 1,
    name: 'Luxury asphalt shingles',
    image: '/images/products/exterior/Roofing/Roof1.webp',
    description: 'Classic NT roof for traditional homes. Durable and weather-resistant.',
    selectedBrand: brands[0].name,
    quantity: 1
  },
  {
    id: 2,
    name: 'Metal roofing',
    image: '/images/products/exterior/Roofing/Roof2.jpg',
    description: 'Modern NT roof with sleek design. Perfect for contemporary buildings.',
    selectedBrand: brands[0].name,
    quantity: 1
  },
  {
    id: 3,
    name: 'Slate roofing',
    image: '/images/products/exterior/Roofing/Roof3.webp',
    description: 'Eco-friendly NT roof with energy-saving features.',
    selectedBrand: brands[0].name,
    quantity: 1
  },
  {
    id: 4,
    name: 'Clay or Concrete tiles',
    image: '/images/products/exterior/Roofing/Roof4.webp',
    description: 'Premium NT roof for luxury homes. Superior quality and finish.',
    selectedBrand: brands[0].name,
    quantity: 1
  }
];

function NTRoofs() {
  const [products, setProducts] = useState(ntRoofs);
  const navigate = useNavigate();

  const handleBrandChange = (index, brand) => {
    const updated = [...products];
    updated[index].selectedBrand = brand;
    setProducts(updated);
  };

  const handleQuantityChange = (index, delta) => {
    setProducts(prev => {
      const updated = [...prev];
      const newQty = updated[index].quantity + delta;
      updated[index].quantity = newQty < 1 ? 1 : newQty;
      return updated;
    });
  };

  const handleBuy = (product) => {
    const selectedBrandObj = brands.find(b => b.name === product.selectedBrand);
    const unitPrice = selectedBrandObj ? selectedBrandObj.price : 0;
    const payload = { ...product, unitPrice, totalPrice: unitPrice * product.quantity, unit: 'sq ft' };

    // persist last product to recover after redirect/login
    sessionStorage.setItem('lastProduct', JSON.stringify(payload));

    // Require login before purchasing
    try {
      const raw = localStorage.getItem('currentUser');
      const current = raw ? JSON.parse(raw) : null;
      if (!current) {
        navigate('/login', { state: { redirectTo: '/purchase' } });
        return;
      }
    } catch (_) {
      navigate('/login', { state: { redirectTo: '/purchase' } });
      return;
    }

    navigate('/purchase', { state: { product: payload } });
  };

  return (
    <div className="nt-roofs-page">
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
            <Link to="/engineers" className="nav-link">Engineers</Link>
          </div>
        </div>
      </nav>
      <section className="nt-roofs-section">
        <div className="container">
          <div className="brand-list-marquee" style={{marginBottom: '2rem'}}>
            <div className="brand-list-inner">
              {brands.concat(brands).map((brand, i) => (
                <button
                  key={brand.name + i}
                  className="brand-btn"
                  tabIndex={-1}
                  style={{pointerEvents: 'none', background: 'transparent', border: 'none', boxShadow: 'none'}}
                >
                  <img src={brand.logo} alt={brand.name} className="brand-logo" />
                </button>
              ))}
            </div>
          </div>
          <h1>Premium NT Roofs</h1>
          <div className="products-grid">
            {products.map((product, idx) => {
              const selectedBrandObj = brands.find(b => b.name === product.selectedBrand);
              const unitPrice = selectedBrandObj ? selectedBrandObj.price : 1200;
              return (
                <div key={product.id} className="product-card">
                  <img src={product.image} alt={product.name} className="product-image" />
                  <h2>{product.name}</h2>
                  <p>{product.description}</p>
                  <div className="price">Price: ₹{unitPrice * product.quantity}/sq ft</div>
                  <div className="brand-options">
                    <label>Select Brand:</label>
                    <div className="brand-list">
                      {brands.map(brand => (
                        <button
                          key={brand.name}
                          className={`brand-btn${product.selectedBrand === brand.name ? ' selected' : ''}`}
                          onClick={() => handleBrandChange(idx, brand.name)}
                        >
                          <img src={brand.logo} alt={brand.name} className="brand-logo" />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="selected-brand-info">
                    <strong>Selected Brand:</strong> {product.selectedBrand}
                  </div>
                  <div className="quantity-control">
                    <label style={{ marginRight: '0.5rem' }}>Quantity:</label>
                    <button className="qty-btn" onClick={() => handleQuantityChange(idx, -1)}>-</button>
                    <span style={{ display: 'inline-block', minWidth: '24px', textAlign: 'center', fontWeight: 'bold', fontSize: '1.1rem' }}>{product.quantity}</span>
                    <button className="qty-btn" onClick={() => handleQuantityChange(idx, 1)}>+</button>
                  </div>
                  <button className="btn-primary" style={{ marginTop: '0.5rem' }} onClick={() => handleBuy(product)}>Buy</button>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 MK & Buildings. All rights reserved. | Crafting Quality Since 2009</p>
        </div>
      </footer>
    </div>
  );
}

export default NTRoofs;
