
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
      {/* Profile Details Section */}
      <div style={{ background: '#f7f3f0', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem', boxShadow: '0 2px 8px rgba(44,62,80,0.07)' }}>
        <h3 style={{ marginTop: 0, marginBottom: '1rem', color: '#3b2e2a' }}>Profile Details</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div><strong>Phone:</strong> {user.phone || <span style={{ color: '#b00020' }}>Not set</span>}</div>
          <div><strong>Address:</strong> {user.address || <span style={{ color: '#b00020' }}>Not set</span>}</div>
          <div><strong>Date of Birth:</strong> {user.dob || <span style={{ color: '#b00020' }}>Not set</span>}</div>
          <div><strong>Gender:</strong> {user.gender || <span style={{ color: '#b00020' }}>Not set</span>}</div>
          <div><strong>Occupation:</strong> {user.occupation || <span style={{ color: '#b00020' }}>Not set</span>}</div>
          <div><strong>Company:</strong> {user.company || <span style={{ color: '#b00020' }}>Not set</span>}</div>
          <div style={{ gridColumn: 'span 2' }}><strong>Bio:</strong> {user.bio || <span style={{ color: '#b00020' }}>Not set</span>}</div>
          <div><strong>Website:</strong> {user.website || <span style={{ color: '#b00020' }}>Not set</span>}</div>
          <div><strong>LinkedIn:</strong> {user.linkedin || <span style={{ color: '#b00020' }}>Not set</span>}</div>
          <div><strong>Twitter:</strong> {user.twitter || <span style={{ color: '#b00020' }}>Not set</span>}</div>
          <div><strong>Facebook:</strong> {user.facebook || <span style={{ color: '#b00020' }}>Not set</span>}</div>
          <div><strong>Skills:</strong> {user.skills || <span style={{ color: '#b00020' }}>Not set</span>}</div>
          <div><strong>Interests:</strong> {user.interests || <span style={{ color: '#b00020' }}>Not set</span>}</div>
          <div><strong>Education:</strong> {user.education || <span style={{ color: '#b00020' }}>Not set</span>}</div>
          <div><strong>Experience:</strong> {user.experience || <span style={{ color: '#b00020' }}>Not set</span>}</div>
          <div><strong>Languages:</strong> {user.languages || <span style={{ color: '#b00020' }}>Not set</span>}</div>
          <div><strong>Location:</strong> {user.location || <span style={{ color: '#b00020' }}>Not set</span>}</div>
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
