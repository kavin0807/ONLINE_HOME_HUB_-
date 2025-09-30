import React, { useEffect, useState } from 'react';
import './Styles/CartClassic.css';

function Cart() {
  const [cart, setCart] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Get current user
    const raw = localStorage.getItem('currentUser');
    if (!raw) return;
    const user = JSON.parse(raw);
    setCurrentUser(user);
    // Get purchases for this user
    const purchasesRaw = localStorage.getItem('purchases_' + user.email);
    setCart(purchasesRaw ? JSON.parse(purchasesRaw) : []);
  }, []);

  if (!currentUser) {
    return (
      <div className="cart-page-bg">
        <div className="cart-container">
          <header className="cart-header">
            <h1 className="cart-title">Login required</h1>
          </header>
          <div className="cart-empty">
            <p>Please sign in to view your cart.</p>
            <a
              href="/login"
              style={{
                display: 'inline-block',
                background: '#3b2e2a',
                color: '#fff',
                padding: '0.9rem 2.5rem',
                borderRadius: '16px',
                fontWeight: 600,
                fontSize: '1.2rem',
                textDecoration: 'none',
                marginTop: '1.5rem',
                boxShadow: '0 2px 12px #3b2e2a22',
                transition: 'background 0.2s',
              }}
              onMouseOver={e => e.currentTarget.style.background = '#2a1f1a'}
              onMouseOut={e => e.currentTarget.style.background = '#3b2e2a'}
            >
              Go to Login
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Calculate total price for products
  const totalPrice = cart
    .filter(item => item.type === 'product')
    .reduce((sum, item) => sum + (parseFloat(item.price) || 0), 0);

  // Filter out empty bills (items missing key info)
  const filteredCart = cart.filter(item => {
    if (item.type === 'product') {
      return item.product && item.price && item.quantity;
    }
    if (item.type === 'meeting') {
      return item.engineerName && item.date && item.time;
    }
    return false;
  });

  return (
    <div className="cart-page-bg" style={{ background: 'linear-gradient(135deg,#f7f3f0 0%,#fff 100%)', minHeight: '100vh' }}>
      <div className="cart-container" style={{ maxWidth: 900, margin: '0 auto', padding: '2.5rem 1.5rem' }}>
        <header className="cart-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
          <h1 className="cart-title" style={{ fontFamily: 'serif', fontWeight: 700, fontSize: '2.2rem', color: '#3b2e2a', margin: 0 }}>My Cart</h1>
          {filteredCart.length > 0 && (
            <div style={{ fontSize: '1.1rem', color: '#6b5b4f', fontWeight: 600 }}>
              <span style={{ marginRight: 8 }}>Total:</span>
              <span style={{ color: '#b00020', fontWeight: 700, fontSize: '1.25rem' }}>₹{totalPrice}</span>
            </div>
          )}
        </header>
        {filteredCart.length === 0 ? (
          <div className="cart-empty" style={{ textAlign: 'center', color: '#b00020', fontSize: '1.2rem', marginTop: '2rem' }}>No items in your cart yet.</div>
        ) : (
          <div className="cart-list">
            {filteredCart.map((item, idx) => (
              <div key={item.id || idx} className="cart-item-card" style={{
                background: '#fff',
                borderRadius: 18,
                boxShadow: '0 4px 18px #3b2e2a18',
                padding: '2rem',
                marginBottom: '2rem',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '2.5rem',
                position: 'relative',
                transition: 'box-shadow 0.2s',
                border: '1px solid #f7f3f0',
              }}>
                {/* Icon section */}
                <div style={{ minWidth: 56, textAlign: 'center', marginTop: 4 }}>
                  {item.type === 'product' ? (
                    <span role="img" aria-label="product" style={{ fontSize: 40 }}>🛒</span>
                  ) : item.type === 'meeting' ? (
                    <span role="img" aria-label="meeting" style={{ fontSize: 40 }}>👷‍♂️</span>
                  ) : null}
                </div>
                {/* Details section */}
                <div style={{ flex: 1 }}>
                  {item.type === 'product' ? (
                    <>
                      <div className="cart-item-title" style={{ fontWeight: 700, fontSize: '1.25rem', color: '#3b2e2a', marginBottom: 6 }}>
                        {item.product} <span className="muted" style={{ fontWeight: 400, color: '#6b5b4f' }}>(Product)</span>
                      </div>
                      <div className="muted">Brand: {item.brand}</div>
                      <div className="muted">Quantity: {item.quantity}{item.unit ? ` (${item.unit})` : ''}</div>
                      {item.color && <div className="muted">Color: {item.color}</div>}
                      <div>Price: <span style={{ color: '#b00020', fontWeight: 600 }}>₹{item.price}</span></div>
                      <div>Date: {item.date}</div>
                      <div>Status: <span style={{ color: item.status === 'Delivered' ? '#388e3c' : '#b00020', fontWeight: 600 }}>{item.status}</span></div>
                    </>
                  ) : item.type === 'meeting' ? (
                    <>
                      <div className="cart-item-title" style={{ fontWeight: 700, fontSize: '1.25rem', color: '#3b2e2a', marginBottom: 6 }}>
                        {item.engineerName} <span className="muted" style={{ fontWeight: 400, color: '#6b5b4f' }}>(Engineer Meeting)</span>
                      </div>
                      <div className="muted">{item.engineerTitle}</div>
                      <div>Type: <span style={{ color: '#3b2e2a', fontWeight: 600 }}>{item.meetingType === 'video' ? 'Video Call' : 'Audio Call'}</span></div>
                      <div>Date: {item.date}</div>
                      <div>Time: {item.time}</div>
                      <div>Project: {item.projectDetails}</div>
                      <div>Rate: <span style={{ color: '#b00020', fontWeight: 600 }}>{item.rate}</span></div>
                      <div>Status: <span style={{ color: item.status === 'Confirmed' ? '#388e3c' : '#b00020', fontWeight: 600 }}>{item.status}</span></div>
                    </>
                  ) : null}
                </div>
                {/* Action section */}
                <div style={{ minWidth: 120, textAlign: 'right' }}>
                  <button
                    className="btn-primary"
                    style={{ padding: '0.7rem 1.5rem', borderRadius: 14, fontWeight: 600, fontSize: '1.05rem', marginBottom: 10, background: 'linear-gradient(90deg,#b00020 0%,#3b2e2a 100%)', color: '#fff', border: 'none', boxShadow: '0 2px 12px #3b2e2a22', transition: 'background 0.2s' }}
                    onClick={() => alert('Checkout coming soon!')}
                  >Checkout</button>
                  <br />
                  <button
                    className="btn-secondary"
                    style={{ padding: '0.7rem 1.5rem', borderRadius: 14, fontWeight: 600, fontSize: '1.05rem', background: '#eee', color: '#3b2e2a', border: 'none', boxShadow: '0 2px 8px #3b2e2a11', marginTop: 4 }}
                    onClick={() => alert('Remove coming soon!')}
                  >Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
