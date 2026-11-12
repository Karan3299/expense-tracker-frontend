import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://expense-tracker-api-nine-beta.vercel.app/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      
      if (data.token) {
        localStorage.setItem('token', data.token);
        navigate('/dashboard'); 
      } else {
        alert(data.error || 'Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Network error. Is the backend running?');
    }
  };

  return (
    <div className="app-container">
      <div className="glass-card">
        <h2>Welcome Back</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input 
              type="email" 
              placeholder="Email Address" 
              className="input-field"
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
            <input 
              type="password" 
              placeholder="Password" 
              className="input-field"
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="primary-btn">
            Login
          </button>
        </form>
        <p style={{ marginTop: '20px', fontSize: '0.95rem', color: '#4a5568' }}>
          Don't have an account? <Link to="/register" className="link-text">Register here</Link>
        </p>
      </div>
    </div>
  );
}