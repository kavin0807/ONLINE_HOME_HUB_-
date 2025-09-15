import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Styles/LoginSignup.css';
import { registerUser } from '../auth';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [strength, setStrength] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    // Simple strength calc
    const rules = [/[a-z]/, /[A-Z]/, /\d/, /[^\w\s]/];
    let score = 0; rules.forEach(r => { if (r.test(password)) score++; });
    setStrength(score);
    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      await registerUser(name, email, password);
      setSuccess('Registration successful. You can now log in.');
      setTimeout(() => navigate('/login'), 800);
    } catch (err) {
      setError(err?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <img src="/images/LOGO.png" alt="Logo" className="auth-logo" />
        <h2>Create account</h2>
        <p className="auth-subtitle">Join us to access your saved quotes and faster checkout.</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Your name</label>
            <div className="input-row">
              <input
                id="name"
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="name"
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <div className="input-row">
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className="input-row">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
              <button type="button" className="toggle-password" onClick={() => setShowPassword(v => !v)}>
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            <div className={`strength s${Math.max(1, Math.min(4, strength || 1))}`}>
              <span className="bar" />
              <span className="bar" />
              <span className="bar" />
              <span className="bar" />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="confirm">Re-enter password</label>
            <div className="input-row">
              <input
                id="confirm"
                type={showConfirm ? 'text' : 'password'}
                placeholder="Re-enter password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
                autoComplete="new-password"
              />
              <button type="button" className="toggle-password" onClick={() => setShowConfirm(v => !v)}>
                {showConfirm ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          {error && (<div className="form-error">{error}</div>)}
          {success && (<div className="form-success">{success}</div>)}

          <button type="submit" className="auth-btn primary" disabled={loading}>{loading ? 'Creating...' : 'Create your account'}</button>
        </form>

        <div className="divider small">or</div>
        <div className="social-buttons">
          <button className="social-btn" type="button" onClick={() => alert('Google sign-up (UI only)')}>
            <span className="provider-badge google-badge">G</span>
            Sign up with Google
          </button>
          <button className="social-btn" type="button" onClick={() => alert('Apple sign-up (UI only)')}>
            <span className="provider-badge apple-badge"></span>
            Sign up with Apple
          </button>
          <button className="social-btn" type="button" onClick={() => alert('Facebook sign-up (UI only)')}>
            <span className="provider-badge facebook-badge">f</span>
            Sign up with Facebook
          </button>
          <button className="social-btn" type="button" onClick={() => alert('GitHub sign-up (UI only)')}>
            <span className="provider-badge github-badge">GH</span>
            Sign up with GitHub
          </button>
        </div>

        <div className="divider">Already have an account?</div>
        <button className="auth-btn secondary" onClick={() => navigate('/login')}>Sign in</button>

        <div className="help-links">
          <a href="#">Buying for work?</a>
          <a href="#">Terms</a>
          <a href="#">Privacy</a>
        </div>
      </div>
    </div>
  );
}

export default Signup;