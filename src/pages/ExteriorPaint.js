import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Styles/ExteriorPaint.css';

const brands = [
  { name: 'AP', logo: '/images/products/exterior/Paints/AP.png', price: 1800 },
  { name: 'BP', logo: '/images/products/exterior/Paints/BP.png', price: 1850 },
  { name: 'ND', logo: '/images/products/exterior/Paints/NP.webp', price: 1900 },
  { name: 'ID', logo: '/images/products/exterior/Paints/IP.png', price: 1950 },
  { name: 'SP', logo: '/images/products/exterior/Paints/SP.png', price: 2000 },
];

const colorOptions = [
  'White', 'Ivory', 'Beige', 'Sky Blue', 'Royal Blue', 'Mint Green', 'Olive', 'Sunset Orange', 'Crimson', 'Charcoal', 'Slate Grey', 'Chocolate', 'Lemon Yellow', 'Lavender', 'Peach', 'Turquoise', 'Brick Red', 'Teal', 'Sand', 'Silver'
];

const paintProducts = [
  {
    id: 1,
    name: 'WeatherGuard Exterior Paint',
    image: '/images/products/exterior/Exterior Paint.webp',
    description: 'Long-lasting, weather-resistant paint for all exterior surfaces.',
    selectedBrand: brands[0].name,
    selectedColor: colorOptions[0],
    quantity: 1
  },
  {
    id: 2,
    name: 'UltraShield Wall Paint',
    image: '/images/products/exterior/Exterior Paint.webp',
    description: 'High-coverage paint with UV protection and vibrant colors.',
    selectedBrand: brands[0].name,
    selectedColor: colorOptions[1],
    quantity: 1
  },
  {
    id: 3,
    name: 'EcoFresh Exterior Emulsion',
    image: '/images/products/exterior/Exterior Paint.webp',
    description: 'Eco-friendly paint with anti-fungal and anti-dust properties.',
    selectedBrand: brands[0].name,
    selectedColor: colorOptions[2],
    quantity: 1
  }
];

function ExteriorPaint() {
  const [products, setProducts] = useState(paintProducts);
  const navigate = useNavigate();

  const handleBrandChange = (index, brand) => {
    const updated = [...products];
    updated[index].selectedBrand = brand;
    setProducts(updated);
  };

  const handleColorChange = (index, color) => {
    const updated = [...products];
    updated[index].selectedColor = color;
    setProducts(updated);
  };

  const handleColorPicker = (index, hex) => {
    const updated = [...products];
    updated[index].selectedColor = hex;
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
    // Compute pricing for the selected brand and pass full details to /purchase
    const selectedBrandObj = brands.find(b => b.name === product.selectedBrand);
    const unitPrice = selectedBrandObj ? selectedBrandObj.price : 0;
    const payload = {
      ...product,
      unitPrice,
      totalPrice: unitPrice * product.quantity,
    };
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
          <h1>Premium Exterior Paints</h1>
          <div className="products-grid">
            {products.map((product, idx) => {
              const selectedBrandObj = brands.find(b => b.name === product.selectedBrand);
              const unitPrice = selectedBrandObj ? selectedBrandObj.price : 1800;
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
                  <div className="color-options">
                    <label>Select Colour:</label>
                    <select
                      className="color-select"
                      value={product.selectedColor}
                      onChange={e => handleColorChange(idx, e.target.value)}
                      style={{marginRight: '1rem'}}
                    >
                      {colorOptions.map(color => (
                        <option key={color} value={color}>{color}</option>
                      ))}
                    </select>
                    <input
                      type="color"
                      className="color-picker-input"
                      value={/^#([0-9A-F]{3}){1,2}$/i.test(product.selectedColor) ? product.selectedColor : '#eb4034'}
                      onChange={e => handleColorPicker(idx, e.target.value)}
                      title="Pick a custom color"
                      style={{width: '2.2rem', height: '2.2rem', border: 'none', background: 'none', verticalAlign: 'middle', cursor: 'pointer'}}
                    />
                  </div>
                  <div className="selected-brand-info">
                    <strong>Selected Brand:</strong> {product.selectedBrand}<br />
                    <strong>Selected Colour:</strong> {product.selectedColor}
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

export default ExteriorPaint;
