import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Styles/CeilingMaterials.css';

const brands = [
  { name: 'Gyproc', logo: '/images/products/interior/celling/GP.png', price: 150 },
  { name: 'Armstrong', logo: '/images/products/interior/celling/AS.png', price: 170 },
  { name: 'Saint-Gobain', logo: '/images/products/interior/celling/SG.png', price: 160 },
  { name: 'USG Boral', logo: '/images/products/interior/celling/USG.webp', price: 180 }
];

const ceilingProducts = [
  {
    id: 1,
    name: 'Acoustic Ceiling Tile',
    image: '/images/products/interior/celling/img1.jpg',
    description: 'Sound-absorbing ceiling tile for offices and homes.',
    selectedBrand: brands[0].name,
    quantity: 1
  },
  {
    id: 2,
    name: 'Gypsum Board',
    image: '/images/products/interior/celling/img2.webp',
    description: 'High-quality gypsum board for smooth ceilings.',
    selectedBrand: brands[0].name,
    quantity: 1
  },
  {
    id: 3,
    name: 'PVC Ceiling Panel',
    image: '/images/products/interior/celling/img3.avif',
    description: 'Durable PVC panel for decorative ceilings.',
    selectedBrand: brands[0].name,
    quantity: 1
  },
  {
    id: 4,
    name: 'Metal Grid System',
    image: '/images/products/interior/celling/img4.avif',
    description: 'Strong metal grid system for suspended ceilings.',
    selectedBrand: brands[0].name,
    quantity: 1
  }
  ,
  {
    id: 5,
    name: 'Decorative Ceiling Panel',
    image: '/images/products/interior/celling/img5.jpg',
    description: 'Elegant decorative panel for stylish ceilings.',
    selectedBrand: brands[0].name,
    quantity: 1
  },
  {
    id: 6,
    name: 'Fire Resistant Board',
    image: '/images/products/interior/celling/img6.webp',
    description: 'Board designed for enhanced fire safety in ceilings.',
    selectedBrand: brands[0].name,
    quantity: 1
  }
];

function CeilingMaterials() {
  const [products, setProducts] = useState(ceilingProducts);
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
          <h1 style={{textAlign: 'center', marginBottom: '1.5rem'}}>Ceiling Materials</h1>
          <div className="products-grid">
            {products.map((product, idx) => {
              const selectedBrandObj = brands.find(b => b.name === product.selectedBrand);
              const unitPrice = selectedBrandObj ? selectedBrandObj.price : 150;
              // Highlight Fire Resistant Board and Acoustic Ceiling Tile
              const highlight = product.name === 'Fire Resistant Board' || product.name === 'Acoustic Ceiling Tile';
              return (
                <div key={product.id} className={`product-card${highlight ? ' highlight' : ''}`}
                  style={highlight ? {boxShadow: '0 4px 24px rgba(255,0,0,0.10)', border: '2px solid #ff5252'} : {}}>
                  <img src={product.image} alt={product.name} className="product-image" style={highlight ? {border: '2px solid #ff5252'} : {}} />
                  <h2 style={highlight ? {color: '#ff5252'} : {}}>{product.name}</h2>
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
                  <button className="btn-primary" style={{ marginTop: '0.5rem' }} onClick={() => handleBuy(product)}>
                    Buy
                  </button>
                  {highlight && (
                    <div style={{marginTop: '0.5rem', color: '#ff5252', fontWeight: 600, fontSize: '0.98rem'}}>🔥 Popular Choice</div>
                  )}
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

export default CeilingMaterials;
