import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Styles/LoginSignup.css';
import { loginUser, getCurrentUser } from '../auth';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem('savedEmail');
    if (savedEmail) setEmail(savedEmail);
    // If already logged in, redirect home
    const user = getCurrentUser();
    if (user) navigate('/');
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await loginUser(email, password);
      if (remember) localStorage.setItem('savedEmail', email.trim().toLowerCase());
      navigate('/');
    } catch (err) {
      setError(err?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <img src="/images/LOGO.png" alt="Logo" className="auth-logo" />
        <h2>Sign in</h2>
        <p className="auth-subtitle">Welcome back. Please enter your details.</p>
        <form onSubmit={handleSubmit}>
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
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
              <button type="button" className="toggle-password" onClick={() => setShowPassword(v => !v)}>
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <div className="inline-row" style={{ justifyContent: 'space-between' }}>
            <label className="inline-row">
              <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
              Keep me signed in on this device
            </label>
            <a className="auth-link" href="#">Forgot password?</a>
          </div>

          {error && (<div className="form-error">{error}</div>)}

          <button type="submit" className="auth-btn primary" disabled={loading}>{loading ? 'Signing in...' : 'Sign in'}</button>
        </form>

        <div className="divider small">or</div>
        <div className="social-buttons">
          <button className="social-btn" type="button" onClick={() => alert('Google sign-in (UI only)')}>
            <span className="provider-badge google-badge">G</span>
            Continue with Google
          </button>
          <button className="social-btn" type="button" onClick={() => alert('Apple sign-in (UI only)')}>
            <span className="provider-badge apple-badge"></span>
            Continue with Apple
          </button>
          <button className="social-btn" type="button" onClick={() => alert('Facebook sign-in (UI only)')}>
            <span className="provider-badge facebook-badge">f</span>
            Continue with Facebook
          </button>
          <button className="social-btn" type="button" onClick={() => alert('GitHub sign-in (UI only)')}>
            <span className="provider-badge github-badge">GH</span>
            Continue with GitHub
          </button>
        </div>

        <div className="divider">New to MK & Buildings?</div>
        <button className="auth-btn secondary" onClick={() => navigate('/signup')}>Create your account</button>

        <div className="help-links">
          <a href="#">Conditions of Use</a>
          <a href="#">Privacy Notice</a>
          <a href="#">Help</a>
        </div>
      </div>
    </div>
  );
}

export default Login;