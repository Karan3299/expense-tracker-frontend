import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://expense-tracker-api-nine-beta.vercel.app/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const data = await response.json();
      
      if (response.ok || data.message === 'User registered successfully') {
        alert('Registration successful! Please login.');
        navigate('/login'); 
      } else {
        alert(data.error || 'Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Network error. Is the backend running?');
    }
  };

  return (
    <div className="app-container">
      <div className="glass-card">
        <h2>Create Account</h2>
        <form onSubmit={handleRegister}>
          <div className="input-group">
            <input 
              type="text" 
              placeholder="Full Name" 
              className="input-field"
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
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
            Register
          </button>
        </form>
        <p style={{ marginTop: '20px', fontSize: '0.95rem', color: '#4a5568' }}>
          Already have an account? <Link to="/login" className="link-text">Login here</Link>
        </p>
      </div>
    </div>
  );
}