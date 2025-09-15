import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Styles/Blocks.css';

const brands = [
  { name: 'MR', logo: '/images/products/exterior/Concrete Blocks/MR.png', price: 400 },
  { name: 'IMM', logo: '/images/products/exterior/Concrete Blocks/IMM.png', price: 420 },
  { name: 'Aerocon', logo: '/images/products/exterior/Concrete Blocks/Aerocon.png', price: 450 },
  { name: 'JKSB', logo: '/images/products/exterior/Concrete Blocks/JKSB.jpg', price: 470 },
  { name: 'UTX', logo: '/images/products/exterior/Concrete Blocks/UTX.jpg', price: 490 }
];

const concreteBlocks = [
  {
    id: 1,
    name: 'Hollow concrete blocks',
    image: '/images/products/exterior/Concrete Blocks/Concrete Blocks1.jpeg',
    description: 'High strength solid block for load-bearing walls.',
    selectedBrand: brands[0].name,
    quantity: 1
  },
  {
    id: 2,
    name: 'Hollow Concrete Block',
    image: '/images/products/exterior/Concrete Blocks/Concrete Blocks2.jpg',
    description: 'Lightweight hollow block for partition walls.',
    selectedBrand: brands[0].name,
    quantity: 1
  },
  {
    id: 3,
    name: 'Aerated Concrete Block',
    image: '/images/products/exterior/Concrete Blocks/Concrete Blocks3.webp',
    description: 'Thermal insulated aerated block for energy efficiency.',
    selectedBrand: brands[0].name,
    quantity: 1
  },
  {
    id: 4,
    name: 'Interlocking Concrete Block',
    image: '/images/products/exterior/Concrete Blocks/Concrete Blocks4.jpg',
    description: 'Easy-to-install interlocking block for quick construction.',
    selectedBrand: brands[0].name,
    quantity: 1
  },
  {
    id: 5,
    name: 'Paver Concrete Block',
    image: '/images/products/exterior/Concrete Blocks/Concrete Blocks5.webp',
    description: 'Durable paver block for outdoor flooring.',
    selectedBrand: brands[0].name,
    quantity: 1
  },
  {
    id: 6,
    name: 'Decorative Concrete Block',
    image: '/images/products/exterior/Concrete Blocks/Concrete Blocks6.jpeg',
    description: 'Stylish decorative block for aesthetic walls.',
    selectedBrand: brands[0].name,
    quantity: 1
  }
];

function ConcreteBlocks() {
  const [products, setProducts] = useState(concreteBlocks);
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
    const payload = { ...product, unitPrice, totalPrice: unitPrice * product.quantity };
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
          <h1>Premium Concrete Blocks</h1>
          <div className="products-grid">
            {products.map((product, idx) => {
              const selectedBrandObj = brands.find(b => b.name === product.selectedBrand);
              const unitPrice = selectedBrandObj ? selectedBrandObj.price : 400;
              return (
                <div key={product.id} className="product-card">
                  <img src={product.image} alt={product.name} className="product-image" />
                  <h2>{product.name}</h2>
                  <p>{product.description}</p>
                  <div className="price">Price: ₹{unitPrice * product.quantity}/block</div>
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

export default ConcreteBlocks;
