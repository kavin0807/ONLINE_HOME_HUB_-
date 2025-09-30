import React, { useState, useEffect } from 'react';
import './Styles/EngineerProfile.css';



function Settings() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    avatar: '',
    phone: '',
    address: '',
    dob: '',
    gender: '',
    occupation: '',
    company: '',
    bio: '',
    website: '',
    linkedin: '',
    twitter: '',
    facebook: '',
    skills: '',
    interests: '',
    education: '',
    experience: '',
    languages: '',
    location: ''
  });

  useEffect(() => {
    const raw = localStorage.getItem('currentUser');
    if (raw) {
      setUser({ ...user, ...JSON.parse(raw) });
    }
    // eslint-disable-next-line
  }, []);

  const handleChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = e => {
    e.preventDefault();
    localStorage.setItem('currentUser', JSON.stringify(user));
    alert('Profile updated!');
  };

  return (
    <div className="profile-content" style={{ maxWidth: 900, margin: '48px auto', background: 'linear-gradient(135deg,#f7f3f0 0%,#fff 100%)', borderRadius: 24, boxShadow: '0 8px 32px rgba(44,62,80,0.13)', padding: '3rem 2.5rem' }}>
      {/* Summary Card */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '2.5rem', background: '#fff', borderRadius: 18, boxShadow: '0 2px 12px #3b2e2a22', padding: '1.5rem 2rem' }}>
        <div style={{ minWidth: 90, textAlign: 'center' }}>
          {user.avatar ? (
            <img src={user.avatar} alt="avatar" style={{ width: 72, height: 72, borderRadius: '50%', objectFit: 'cover', border: '3px solid #e0c3a6' }} />
          ) : (
            <span role="img" aria-label="avatar" style={{ fontSize: 64, color: '#b00020', background: '#f7f3f0', borderRadius: '50%', padding: 12 }}>{user.name ? user.name[0].toUpperCase() : 'U'}</span>
          )}
        </div>
        <div style={{ flex: 1 }}>
          <h2 style={{ fontFamily: 'serif', fontWeight: 700, fontSize: '2rem', margin: 0, color: '#3b2e2a' }}>{user.name || 'Your Name'}</h2>
          <div style={{ color: '#6b5b4f', fontSize: '1.1rem', marginBottom: 4 }}>{user.email || 'your@email.com'}</div>
          <div style={{ color: '#b00020', fontWeight: 600 }}>{user.occupation || 'Occupation not set'}</div>
        </div>
      </div>
      {/* Form Section */}
      <form onSubmit={handleSave} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div>
          <h3 style={{ fontFamily: 'serif', color: '#3b2e2a', marginBottom: '1rem' }}>Basic Info</h3>
          <div className="form-group"><label>Name</label><input type="text" name="name" value={user.name} onChange={handleChange} required /></div>
          <div className="form-group"><label>Email</label><input type="email" name="email" value={user.email} onChange={handleChange} required /></div>
          <div className="form-group"><label>Avatar URL</label><input type="text" name="avatar" value={user.avatar} onChange={handleChange} placeholder="Paste image URL" /></div>
          <div className="form-group"><label>Phone</label><input type="text" name="phone" value={user.phone} onChange={handleChange} /></div>
          <div className="form-group"><label>Address</label><input type="text" name="address" value={user.address} onChange={handleChange} /></div>
          <div className="form-group"><label>Date of Birth</label><input type="date" name="dob" value={user.dob} onChange={handleChange} /></div>
          <div className="form-group"><label>Gender</label><input type="text" name="gender" value={user.gender} onChange={handleChange} /></div>
        </div>
        <div>
          <h3 style={{ fontFamily: 'serif', color: '#3b2e2a', marginBottom: '1rem' }}>Professional & Social</h3>
          <div className="form-group"><label>Occupation</label><input type="text" name="occupation" value={user.occupation} onChange={handleChange} /></div>
          <div className="form-group"><label>Company</label><input type="text" name="company" value={user.company} onChange={handleChange} /></div>
          <div className="form-group"><label>Bio</label><textarea name="bio" value={user.bio} onChange={handleChange} rows={2} /></div>
          <div className="form-group"><label>Website</label><input type="text" name="website" value={user.website} onChange={handleChange} /></div>
          <div className="form-group"><label>LinkedIn</label><input type="text" name="linkedin" value={user.linkedin} onChange={handleChange} /></div>
          <div className="form-group"><label>Twitter</label><input type="text" name="twitter" value={user.twitter} onChange={handleChange} /></div>
          <div className="form-group"><label>Facebook</label><input type="text" name="facebook" value={user.facebook} onChange={handleChange} /></div>
          <div className="form-group"><label>Skills</label><input type="text" name="skills" value={user.skills} onChange={handleChange} placeholder="Comma separated" /></div>
          <div className="form-group"><label>Interests</label><input type="text" name="interests" value={user.interests} onChange={handleChange} placeholder="Comma separated" /></div>
          <div className="form-group"><label>Education</label><input type="text" name="education" value={user.education} onChange={handleChange} /></div>
          <div className="form-group"><label>Experience</label><input type="text" name="experience" value={user.experience} onChange={handleChange} /></div>
          <div className="form-group"><label>Languages</label><input type="text" name="languages" value={user.languages} onChange={handleChange} placeholder="Comma separated" /></div>
          <div className="form-group"><label>Location</label><input type="text" name="location" value={user.location} onChange={handleChange} /></div>
        </div>
        <div style={{ gridColumn: 'span 2', textAlign: 'center', marginTop: '2rem' }}>
          <button type="submit" className="btn-primary" style={{ fontSize: '1.2rem', padding: '0.9rem 3.5rem', borderRadius: 16, fontWeight: 700, background: 'linear-gradient(90deg,#b00020 0%,#3b2e2a 100%)', color: '#fff', boxShadow: '0 2px 12px #3b2e2a22', border: 'none', transition: 'background 0.2s' }}>Save Changes</button>
        </div>
      </form>
    </div>
  );
}

export default Settings;
