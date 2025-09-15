import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Styles/PlumbingFixtures.css';

const brands = [
  { name: 'Jaquar', logo: '/images/products/interior/plumbing/AD.png', price: 1200 },
  { name: 'Hindware', logo: '/images/products/interior/plumbing/AR.jpeg', price: 1300 },
  { name: 'Cera', logo: '/images/products/interior/plumbing/CR.png', price: 1400 },
  { name: 'Parryware', logo: '/images/products/interior/plumbing/KO.jpeg ', price: 1500 },
  { name: 'Kohler', logo: '/images/products/interior/plumbing/SP.jpg', price: 1600 }
];

const plumbingProducts = [
  {
    id: 1,
    name: 'Single Lever Basin Mixer',
    image: '/images/products/interior/plumbing/img1.jpeg',
    description: 'Modern single lever mixer for wash basins.',
    selectedBrand: brands[0].name,
    quantity: 1
  },
  {
    id: 2,
    name: 'Wall Mounted Shower',
    image: '/images/products/interior/plumbing/img2.jpg',
    description: 'Elegant wall mounted shower for bathrooms.',
    selectedBrand: brands[0].name,
    quantity: 1
  },
  {
    id: 3,
    name: 'Concealed Stop Cock',
    image: '/images/products/interior/plumbing/img3.jpg',
    description: 'Concealed stop cock for modern plumbing.',
    selectedBrand: brands[0].name,
    quantity: 1
  },
  {
    id: 4,
    name: 'Angle Valve',
    image: '/images/products/interior/plumbing/img4.jpg',
    description: 'Durable angle valve for water control.',
    selectedBrand: brands[0].name,
    quantity: 1
  },
  {
    id: 5,
    name: 'Health Faucet',
    image: '/images/products/interior/plumbing/img5.webp',
    description: 'Handy health faucet for hygiene.',
    selectedBrand: brands[0].name,
    quantity: 1
  },
  {
    id: 6,
    name: 'Overhead Rain Shower',
    image: '/images/products/interior/plumbing/img6.jpg',
    description: 'Luxurious overhead rain shower for spa-like experience.',
    selectedBrand: brands[0].name,
    quantity: 1
  }
];

function PlumbingFixtures() {
  const [products, setProducts] = useState(plumbingProducts);
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
    const payload = { ...product, unitPrice, totalPrice: unitPrice * product.quantity, unit: 'piece' };
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
          <h1>Premium Plumbing Fixtures</h1>
          <div className="products-grid">
            {products.map((product, idx) => {
              const selectedBrandObj = brands.find(b => b.name === product.selectedBrand);
              const unitPrice = selectedBrandObj ? selectedBrandObj.price : 1200;
              return (
                <div key={product.id} className="product-card">
                  <img src={product.image} alt={product.name} className="product-image" />
                  <h2>{product.name}</h2>
                  <p>{product.description}</p>
                  <div className="price">Price: ₹{unitPrice * product.quantity}/piece</div>
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

export default PlumbingFixtures;
