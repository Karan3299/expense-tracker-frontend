import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  // 1. Fetch expenses when the page loads
  const fetchExpenses = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const response = await fetch('https://expense-tracker-api-nine-beta.vercel.app/api/expenses', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      if (Array.isArray(data)) {
        setExpenses(data);
      }
    } catch (error) {
      console.error('Failed to fetch expenses', error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  // 2. Add a new expense
  const handleAddExpense = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch('https://expense-tracker-api-nine-beta.vercel.app/api/expenses', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ amount: Number(amount), category, description })
      });

      if (response.ok) {
        setAmount('');
        setDescription('');
        fetchExpenses(); // Refresh the list instantly
      } else {
        alert('Failed to add expense');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // 3. Logout function
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="app-container" style={{ alignItems: 'flex-start', paddingTop: '40px' }}>
      <div className="glass-card" style={{ maxWidth: '600px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2>My Expenses</h2>
          <button onClick={handleLogout} style={{ background: 'transparent', border: '1px solid #fc8181', color: '#fc8181', padding: '5px 15px', borderRadius: '8px', cursor: 'pointer' }}>
            Logout
          </button>
        </div>

        {/* Add Expense Form */}
        <form onSubmit={handleAddExpense} style={{ display: 'flex', gap: '10px', marginBottom: '30px', flexWrap: 'wrap' }}>
          <input type="number" placeholder="Amount (₹)" className="input-field" value={amount} onChange={(e) => setAmount(e.target.value)} required style={{ flex: '1 1 100px', padding: '10px' }} />
          <select className="input-field" value={category} onChange={(e) => setCategory(e.target.value)} style={{ flex: '1 1 120px', padding: '10px' }}>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Bills">Bills</option>
            <option value="Other">Other</option>
          </select>
          <input type="text" placeholder="Description" className="input-field" value={description} onChange={(e) => setDescription(e.target.value)} required style={{ flex: '2 1 200px', padding: '10px' }} />
          <button type="submit" className="primary-btn" style={{ flex: '1 1 100%', padding: '10px' }}>Add Expense</button>
        </form>

        {/* Expense List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', textAlign: 'left' }}>
          {expenses.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#4a5568' }}>No expenses yet. Add one above!</p>
          ) : (
            expenses.map((exp) => (
              <div key={exp._id} style={{ display: 'flex', justifyContent: 'space-between', background: 'rgba(255,255,255,0.6)', padding: '15px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <div>
                  <strong style={{ display: 'block', color: '#2d3748' }}>{exp.category}</strong>
                  <span style={{ fontSize: '0.85rem', color: '#4a5568' }}>{exp.description}</span>
                </div>
                <div style={{ fontWeight: '600', color: '#e53e3e' }}>
                  ₹{exp.amount}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}