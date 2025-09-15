import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Styles/Windows.css';

const brands = [
  { name: 'FEN', logo: '/images/products/exterior/Window/Window1.png', price: 5000 },
  { name: 'AIS', logo: '/images/products/exterior/Window/Window2.png', price: 5500 },
  { name: 'NCL', logo: '/images/products/exterior/Window/Window3.webp', price: 6000 },
  { name: 'REH', logo: '/images/products/exterior/Window/Window4.jpg', price: 5750 },
  { name: 'ENC', logo: '/images/products/exterior/Window/Window5.webp', price: 5250 },
];

const windowsData = [
  {
    id: 1,
    name: 'Double Glazed Window',
    image: '/images/products/exterior/Window/img1.jpg',
    description: 'Highly energy-efficient double glazed window for modern homes.',
    selectedBrand: brands[0].name,
    quantity: 1
  },
  {
    id: 2,
    name: 'Sliding Window',
    image: '/images/products/exterior/Window/img2.jpg',
    description: 'Smooth sliding window with noise reduction.',
    selectedBrand: brands[0].name,
    quantity: 1
  },
  {
    id: 3,
    name: 'Casement Window',
    image: '/images/products/exterior/Window/img3.jpg',
    description: 'Classic casement window with secure locking.',
    selectedBrand: brands[0].name,
    quantity: 1
  },
  {
    id: 4,
    name: 'Awning Window',
    image: '/images/products/exterior/Window/img4.jpeg',
    description: 'Ventilated awning window for kitchens and bathrooms.',
    selectedBrand: brands[0].name,
    quantity: 1
  },
  {
    id: 5,
    name: 'Bay Window',
    image: '/images/products/exterior/Window/img5.jpg',
    description: 'Elegant bay window for panoramic views.',
    selectedBrand: brands[0].name,
    quantity: 1
  },
  {
    id: 6,
    name: 'Tilt & Turn Window',
    image: '/images/products/exterior/Window/img6.jpeg',
    description: 'Versatile tilt & turn window for easy cleaning.',
    selectedBrand: brands[0].name,
    quantity: 1
  }
];


function Windows() {
  const navigate = useNavigate();
  const [products, setProducts] = useState(windowsData);

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
    const payload = { ...product, unitPrice, totalPrice: unitPrice * product.quantity, unit: 'window' };
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
          <h1>Energy-Efficient Windows</h1>
          <div className="products-grid">
            {products.map((product, idx) => {
              const selectedBrandObj = brands.find(b => b.name === product.selectedBrand);
              const unitPrice = selectedBrandObj ? selectedBrandObj.price : 5000;
              return (
                <div key={product.id} className="product-card">
                  <img src={product.image} alt={product.name} className="product-image" />
                  <h2>{product.name}</h2>
                  <p>{product.description}</p>
                  <div className="price">Price: ₹{unitPrice * product.quantity}</div>
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

export default Windows;
