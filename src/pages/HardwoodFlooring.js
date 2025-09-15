import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Styles/HardwoodFlooring.css';

const brands = [
  { name: 'AF', logo: '/images/products/interior/Flooring/AF.png', price: 350 },
  { name: 'BVG', logo: '/images/products/interior/Flooring/BVG.webp', price: 370 },
  { name: 'CP', logo: '/images/products/interior/Flooring/CP.png', price: 390 },
  { name: 'Mikasa', logo: '/images/products/interior/Flooring/Mikasa.png', price: 410 },
  { name: 'Greenply', logo: '/images/products/interior/Flooring/Greenply.png', price: 430 }
];

const hardwoodProducts = [
  {
    id: 1,
    name: 'Solid Wood Hardwood Flooring',
    image: '/images/products/interior/Flooring/floor1.jpg',
    description: 'Timeless oak hardwood for elegant interiors.',
    selectedBrand: brands[0].name,
    quantity: 1
  },
  {
    id: 2,
    name: 'Engineered Hardwood Flooring',
    image: '/images/products/interior/Flooring/floor2.jpeg',
    description: 'Rich walnut planks for a luxurious look.',
    selectedBrand: brands[0].name,
    quantity: 1
  },
  {
    id: 3,
    name: 'Bamboo Flooring',
    image: '/images/products/interior/Flooring/floor3.jpg',
    description: 'Durable maple engineered wood for high-traffic areas.',
    selectedBrand: brands[0].name,
    quantity: 1
  },
  {
    id: 4,
    name: 'Cork Flooring',
    image: '/images/products/interior/Flooring/floor4.jpg',
    description: 'Premium teak hardwood for a unique finish.',
    selectedBrand: brands[0].name,
    quantity: 1
  },
    {
    id: 5,
    name: 'Parquet Flooring',
    image: '/images/products/interior/Flooring/floor5.jpg',
    description: "Elegant parquet patterns for timeless style and durability.",
    selectedBrand: brands[0].name,
    quantity: 1
  }
];

function HardwoodFlooring() {
  const [products, setProducts] = useState(hardwoodProducts);
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
          <h1>Premium Hardwood Flooring</h1>
          <div className="products-grid">
            {products.map((product, idx) => {
              const selectedBrandObj = brands.find(b => b.name === product.selectedBrand);
              const unitPrice = selectedBrandObj ? selectedBrandObj.price : 350;
              return (
                <div key={product.id} className="product-card">
                  <img src={product.image} alt={product.name} className="product-image" />
                  <h2>{product.name}</h2>
                  <p>{product.description}</p>
                  <div className="brand-options" style={{ marginBottom: '0.5rem' }}>
                    <label>Select Brand:</label>
                    <div className="brand-list">
                      {brands.map(brand => (
                        <button
                          key={brand.name}
                          className={`brand-btn${product.selectedBrand === brand.name ? ' selected' : ''}`}
                          onClick={() => handleBrandChange(idx, brand.name)}
                          style={{ border: 'none', background: 'transparent', marginRight: 8, outline: product.selectedBrand === brand.name ? '2px solid #222' : 'none', boxShadow: product.selectedBrand === brand.name ? '0 0 6px #aaa' : 'none', cursor: 'pointer', padding: 0 }}
                        >
                          <img src={brand.logo} alt={brand.name} className="brand-logo" style={{ width: 40, height: 40, opacity: product.selectedBrand === brand.name ? 1 : 0.5 }} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="price">Price: ₹{unitPrice * product.quantity}/sq ft</div>
                  <button className="btn-primary" style={{ marginTop: '0.5rem' }} onClick={() => handleBuy(product)}>Buy Now</button>
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

export default HardwoodFlooring;
