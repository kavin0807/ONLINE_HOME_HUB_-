import React, { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Styles/ProductPurchase.css';

function ProductPurchase() {
  const location = useLocation();
  const product = location.state?.product;

  // Fallback if user refreshes or comes directly
  const persisted = product || JSON.parse(sessionStorage.getItem('lastProduct') || 'null');
  if (!product && persisted) {
    // Rehydrate location.state for consistent rendering without redirect
    location.state = { product: persisted };
  }

  // Require login guard
  const currentUser = useMemo(() => {
    try {
      const raw = localStorage.getItem('currentUser');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }, []);
  // ...existing code...
  if (!currentUser) {
    // If no user, show quick prompt to login
    return (
      <div className="purchase-page-bg">
        <div className="purchase-container">
          <header className="purchase-header">
            <h1 className="purchase-title">Login required</h1>
          </header>
          <div className="purchase-main">
            <p>Please sign in to continue to checkout.</p>
            <a className="purchase-submit-btn" href="/login">Go to Login</a>
          </div>
        </div>
      </div>
    );
  }

  // Save purchase to localStorage when order is placed
  const [buyer, setBuyer] = useState({ name: '', email: '', phone: '', address: '' });
  const [paymentMethod, setPaymentMethod] = useState('card');
  const summary = useMemo(() => {
    if (!product) return null;
    const subtotal = product.totalPrice ?? (product.unitPrice ?? 0) * (product.quantity ?? 1);
    const shipping = subtotal > 10000 ? 0 : 199; // simple shipping rule
    const tax = Math.round(subtotal * 0.18); // 18% GST example
    const grandTotal = subtotal + shipping + tax;
    return { subtotal, shipping, tax, grandTotal };
  }, [product]);
  // ...existing code...
  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!product) return;
    // Build order object
    const order = {
      id: Date.now(),
      product: product.name,
      brand: product.selectedBrand,
      quantity: product.quantity,
      unit: product.unit,
      color: product.selectedColor,
      price: summary?.grandTotal,
      date: new Date().toISOString().slice(0, 10),
      buyer,
      paymentMethod,
      status: 'Confirmed',
    };
    // Get current user
    const raw = localStorage.getItem('currentUser');
    if (!raw) return;
    const currentUser = JSON.parse(raw);
    // Get all purchases
    const purchasesRaw = localStorage.getItem('purchases_' + currentUser.email);
    const purchases = purchasesRaw ? JSON.parse(purchasesRaw) : [];
    purchases.push(order);
    localStorage.setItem('purchases_' + currentUser.email, JSON.stringify(purchases));
    alert('Order placed!');
  };

  return (
    <div className="purchase-page-bg">
      <div className="purchase-container">
        <header className="purchase-header">
          <h1 className="purchase-title">{product ? 'Checkout' : 'Product Purchase'}</h1>
          {product && (
            <div className="purchase-contact">
              <span>Item: {product.name}</span>
              <span>Brand: {product.selectedBrand}</span>
              <span>Qty: {product.quantity}{product.unit ? ` ${product.unit}` : ''}</span>
            </div>
          )}
        </header>
        <div className="purchase-main">
          <div className="purchase-image-section">
            <img src={product ? product.image : '/images/products/exterior/Exterior Paint.webp'} alt="Product" className="purchase-main-img" />
          </div>
          <div className="purchase-details-section">
            {/* Payment + Buyer section */}
            <div className="purchase-review-section">
              <div className="badge-secure">🔒 Secure Checkout</div>
              <h3>Billing & Shipping</h3>
              <form className="purchase-review-form" onSubmit={handlePlaceOrder}>
                <div className="form-grid">
                  <input value={buyer.name} onChange={e=>setBuyer({...buyer,name:e.target.value})} type="text" placeholder="Full Name" required />
                  <input value={buyer.email} onChange={e=>setBuyer({...buyer,email:e.target.value})} type="email" placeholder="Email" required />
                  <input value={buyer.phone} onChange={e=>setBuyer({...buyer,phone:e.target.value})} type="tel" placeholder="Phone" required />
                  <input type="text" placeholder="Pincode" />
                </div>
                <textarea value={buyer.address} onChange={e=>setBuyer({...buyer,address:e.target.value})} placeholder="Shipping Address" rows={3} required />

                <div className="payment-methods">
                  <div className={`pm-card${paymentMethod==='card' ? ' selected' : ''}`} onClick={()=>setPaymentMethod('card')}>
                    <div className="pm-icon">💳</div>
                    <div className="pm-title">Card</div>
                    <div className="pm-sub">Visa · MasterCard · RuPay</div>
                  </div>
                  <div className={`pm-card${paymentMethod==='upi' ? ' selected' : ''}`} onClick={()=>setPaymentMethod('upi')}>
                    <div className="pm-icon">📱</div>
                    <div className="pm-title">UPI</div>
                    <div className="pm-sub">GPay · PhonePe · Paytm</div>
                  </div>
                  <div className={`pm-card${paymentMethod==='netbanking' ? ' selected' : ''}`} onClick={()=>setPaymentMethod('netbanking')}>
                    <div className="pm-icon">🏦</div>
                    <div className="pm-title">NetBanking</div>
                    <div className="pm-sub">Popular Indian Banks</div>
                  </div>
                  <div className={`pm-card${paymentMethod==='cod' ? ' selected' : ''}`} onClick={()=>setPaymentMethod('cod')}>
                    <div className="pm-icon">📦</div>
                    <div className="pm-title">Cash on Delivery</div>
                    <div className="pm-sub">Pay at doorstep</div>
                  </div>
                </div>

                {paymentMethod==='card' && (
                  <div className="purchase-form-row">
                    <input type="text" placeholder="Card Number" pattern="[0-9]{12,19}" required />
                    <input type="text" placeholder="MM/YY" pattern="^(0[1-9]|1[0-2])\/[0-9]{2}$" required />
                    <input type="text" placeholder="CVV" pattern="^[0-9]{3,4}$" required />
                  </div>
                )}
                {paymentMethod==='upi' && (
                  <>
                    <div className="purchase-form-row">
                      <input type="text" placeholder="UPI ID (e.g. name@bank)" required />
                    </div>
                    <div className="radio-line">
                      <label><input type="radio" name="upi_app" defaultChecked /> GPay</label>
                      <label><input type="radio" name="upi_app" /> PhonePe</label>
                      <label><input type="radio" name="upi_app" /> Paytm</label>
                    </div>
                  </>
                )}
                {paymentMethod==='netbanking' && (
                  <div className="purchase-form-row">
                    <select defaultValue="HDFC">
                      <option value="HDFC">HDFC Bank</option>
                      <option value="SBI">State Bank of India</option>
                      <option value="ICICI">ICICI Bank</option>
                      <option value="AXIS">Axis Bank</option>
                      <option value="KOTAK">Kotak Mahindra</option>
                    </select>
                  </div>
                )}
                {paymentMethod==='cod' && (
                  <div className="cod-note">COD fee ₹49 will be added and paid in cash.</div>
                )}

                <button type="submit" className="purchase-submit-btn" style={{marginTop:'1rem'}}>
                  Place Order
                </button>
              </form>
            </div>

            {/* Order summary */}
            <div className="purchase-desc order-summary-card">
              <h2>Order Summary</h2>
              {product ? (
                <div style={{marginTop: '0.75rem'}}>
                  <div><strong>{product.name}</strong></div>
                  <div className="muted">Brand: {product.selectedBrand}</div>
                  <div className="muted">Quantity: {product.quantity}{product.unit ? ` (${product.unit})` : ''}</div>
                  {product.selectedColor && (<div className="muted">Color: {product.selectedColor}</div>)}
                  <div className="line"></div>
                  <div>Unit Price: ₹{product.unitPrice ?? '-'}</div>
                  <div>Total (items): ₹{summary?.subtotal ?? '-'}</div>
                  <div>Shipping: ₹{summary?.shipping ?? '-'}</div>
                  <div>Tax (18%): ₹{summary?.tax ?? '-'}</div>
                  <div className="line"></div>
                  <div className="grand">Grand Total: ₹{summary?.grandTotal ?? '-'}</div>
                </div>
              ) : (
                <p>Select a product to view details.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPurchase;
