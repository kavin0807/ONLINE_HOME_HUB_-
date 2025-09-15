
import React, { useMemo } from 'react';
import UserAvatar from '../components/UserAvatar';
import { Link } from 'react-router-dom';

function Profile() {
  // Get current user
  const user = useMemo(() => {
    try {
      const raw = localStorage.getItem('currentUser');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }, []);

  // Get user's purchases
  const purchases = useMemo(() => {
    if (!user) return [];
    const raw = localStorage.getItem('purchases_' + user.email);
    return raw ? JSON.parse(raw) : [];
  }, [user]);

  if (!user) {
    return (
      <div className="profile-page" style={{ maxWidth: 600, margin: '40px auto', background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(44,62,80,0.10)', padding: '2rem' }}>
        <h2>Please log in to view your profile and purchases.</h2>
        <Link to="/login" className="btn-primary" style={{ display: 'inline-block', marginTop: '1rem' }}>Login</Link>
      </div>
    );
  }

  return (
    <div className="profile-page" style={{ maxWidth: 600, margin: '40px auto', background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(44,62,80,0.10)', padding: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
        <UserAvatar name={user.name} imageUrl={user.avatar} size={64} />
        <div>
          <h2 style={{ margin: 0 }}>{user.name}</h2>
          <div style={{ color: '#6b5b4f', fontSize: '1.05rem' }}>{user.email}</div>
        </div>
      </div>
      <h3 style={{ marginBottom: '1rem' }}>Purchase History</h3>
      {purchases.length === 0 ? (
        <div style={{ color: '#b00020', marginBottom: '1rem' }}>No purchases found.</div>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '2rem' }}>
          <thead>
            <tr style={{ background: '#f7f3f0' }}>
              <th style={{ textAlign: 'left', padding: '0.5rem' }}>Product</th>
              <th style={{ textAlign: 'left', padding: '0.5rem' }}>Brand</th>
              <th style={{ textAlign: 'left', padding: '0.5rem' }}>Quantity</th>
              <th style={{ textAlign: 'left', padding: '0.5rem' }}>Date</th>
              <th style={{ textAlign: 'left', padding: '0.5rem' }}>Status</th>
              <th style={{ textAlign: 'left', padding: '0.5rem' }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {purchases.map(order => (
              <tr key={order.id}>
                <td style={{ padding: '0.5rem', borderBottom: '1px solid #eee' }}>{order.product}</td>
                <td style={{ padding: '0.5rem', borderBottom: '1px solid #eee' }}>{order.brand}</td>
                <td style={{ padding: '0.5rem', borderBottom: '1px solid #eee' }}>{order.quantity} {order.unit}</td>
                <td style={{ padding: '0.5rem', borderBottom: '1px solid #eee' }}>{order.date}</td>
                <td style={{ padding: '0.5rem', borderBottom: '1px solid #eee' }}>{order.status}</td>
                <td style={{ padding: '0.5rem', borderBottom: '1px solid #eee' }}>&#8377;{order.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Link to="/products" className="btn-primary" style={{ display: 'inline-block', marginTop: '1rem' }}>Book More Products</Link>
    </div>
  );
}

export default Profile;
