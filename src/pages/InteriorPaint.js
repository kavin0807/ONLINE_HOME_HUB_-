import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Styles/InteriorPaint.css';

const brands = [
  { name: 'Asian Paints', logo: '/images/products/exterior/Paints/AP.png', price: 1500 },
  { name: 'Nerolac', logo: '/images/products/exterior/Paints/NP.webp', price: 1550 },
  { name: 'Berger', logo: '/images/products/exterior/Paints/IP.png', price: 1600 },
  { name: 'Dulux', logo: '/images/products/exterior/Paints/SP.png', price: 1650 },
  { name: 'Indigo', logo: '/images/products/exterior/Paints/BP.png', price: 1700 }
];

const paintProducts = [
  {
    id: 1,
    name: 'Luxury Emulsion',
    image: '/images/products/interior/IN Paints/paint1.jpg',
    description: 'Smooth finish luxury emulsion for living rooms.',
    selectedBrand: brands[0].name,
    quantity: 1
  },
  {
    id: 2,
    name: 'Matte Finish Paint',
    image: '/images/products/interior/IN Paints/paint3.jpg',
    description: 'Matte finish paint for a modern look.',
    selectedBrand: brands[0].name,
    quantity: 1
  },
  {
    id: 3,
    name: 'Silk Touch Paint',
    image: '/images/products/interior/IN Paints/img2.webp',
    description: 'Silky smooth paint for bedrooms and halls.',
    selectedBrand: brands[0].name,
    quantity: 1
  },
  {
    id: 4,
    name: 'Anti-Bacterial Paint',
    image: '/images/products/interior/IN Paints/img4.jpg',
    description: 'Paint with anti-bacterial properties for kitchens and bathrooms.',
    selectedBrand: brands[0].name,
    quantity: 1
  },
  {
    id: 5,
    name: 'Washable Paint',
    image: '/images/products/interior/IN Paints/img5.jpg',
    description: 'Washable paint for easy cleaning and maintenance.',
    selectedBrand: brands[0].name,
    quantity: 1
  },
  {
    id: 6,
    name: 'Primer & Undercoat',
    image: '/images/products/interior/IN Paints/img6.webp',
    description: 'Primer and undercoat for perfect paint adhesion.',
    selectedBrand: brands[0].name,
    quantity: 1
  }
];

function InteriorPaint() {
  const [products, setProducts] = useState(paintProducts);
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
    const payload = { ...product, unitPrice, totalPrice: unitPrice * product.quantity, unit: 'gallon' };
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
          <h1>Premium Interior Paints</h1>
          <div className="products-grid">
            {products.map((product, idx) => {
              const selectedBrandObj = brands.find(b => b.name === product.selectedBrand);
              const unitPrice = selectedBrandObj ? selectedBrandObj.price : 1500;
              return (
                <div key={product.id} className="product-card">
                  <img src={product.image} alt={product.name} className="product-image" />
                  <h2>{product.name}</h2>
                  <p>{product.description}</p>
                  <div className="price">Price: ₹{unitPrice * product.quantity}/gallon</div>
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

export default InteriorPaint;
