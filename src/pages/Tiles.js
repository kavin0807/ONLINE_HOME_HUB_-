import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Styles/Tiles.css';

const brands = [
  { name: 'HSIL', logo: '/images/products/interior/Tiles/HSIL.jpeg', price: 220 },
  { name: 'KJA', logo: '/images/products/interior/Tiles/KJA.webp', price: 240 },
  { name: 'ORA', logo: '/images/products/interior/Tiles/ORA.jpeg', price: 260 },
  { name: 'Nitco', logo: '/images/products/interior/Tiles/NIT.png', price: 280 },
  { name: 'SOM', logo: '/images/products/interior/Tiles/SOM.png', price: 300 }
];

const tileProducts = [
  {
    id: 1,
    name: 'Glossy Ceramic Tile',
    image: '/images/products/interior/Tiles/tiles1.jpg',
    description: 'Glossy finish ceramic tile for walls and floors.',
    selectedBrand: brands[0].name,
    quantity: 1
  },
  {
    id: 2,
    name: 'Matte Porcelain Tile',
    image: '/images/products/interior/Tiles/tiles2.webp',
    description: 'Matte finish porcelain tile for a modern look.',
    selectedBrand: brands[0].name,
    quantity: 1
  },
  {
    id: 3,
    name: 'Digital Vitrified Tile',
    image: '/images/products/interior/Tiles/tiles3.jpg',
    description: 'Digitally printed vitrified tile for unique designs.',
    selectedBrand: brands[0].name,
    quantity: 1
  },
  {
    id: 4,
    name: 'Wooden Finish Tile',
    image: '/images/products/interior/Tiles/tiles4.webp',
    description: 'Wooden finish tile for a natural look.',
    selectedBrand: brands[0].name,
    quantity: 1
  },
  {
    id: 5,
    name: 'Anti-skid Bathroom Tile',
    image: '/images/products/interior/Tiles/tiles5.jpg',
    description: 'Anti-skid tile for safe and stylish bathrooms.',
    selectedBrand: brands[0].name,
    quantity: 1
  }
];

function Tiles() {
  const [products, setProducts] = useState(tileProducts);
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
          <h1>Premium Tiles</h1>
          <div className="products-grid">
            {products.map((product, idx) => {
              const selectedBrandObj = brands.find(b => b.name === product.selectedBrand);
              const unitPrice = selectedBrandObj ? selectedBrandObj.price : 220;
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

export default Tiles;
