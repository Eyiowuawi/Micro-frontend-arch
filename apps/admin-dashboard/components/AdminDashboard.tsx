import { useState } from 'react';

export default function AdminDashboard() {
  const [count, setCount] = useState(0);
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', role: 'Manager', status: 'Active' },
    { id: 3, name: 'Bob Johnson', role: 'User', status: 'Inactive' },
  ]);

  return (
    <div style={{ 
      padding: '20px', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      borderRadius: '8px',
      color: 'white',
      minHeight: '300px'
    }}>
      <h2 style={{ marginBottom: '20px', fontSize: '1.5rem' }}>
        Admin Dashboard Component
      </h2>
      
      <div style={{ marginBottom: '20px' }}>
        <p style={{ marginBottom: '10px' }}>Counter: {count}</p>
        <button
          onClick={() => setCount(count + 1)}
          style={{
            padding: '8px 16px',
            background: 'white',
            color: '#667eea',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold',
            marginRight: '10px'
          }}
        >
          Increment
        </button>
        <button
          onClick={() => setCount(0)}
          style={{
            padding: '8px 16px',
            background: 'rgba(255, 255, 255, 0.2)',
            color: 'white',
            border: '1px solid white',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Reset
        </button>
      </div>

      <div>
        <h3 style={{ marginBottom: '15px' }}>User Management</h3>
        <table style={{ width: '100%', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '4px', padding: '10px' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '8px' }}>ID</th>
              <th style={{ textAlign: 'left', padding: '8px' }}>Name</th>
              <th style={{ textAlign: 'left', padding: '8px' }}>Role</th>
              <th style={{ textAlign: 'left', padding: '8px' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td style={{ padding: '8px' }}>{user.id}</td>
                <td style={{ padding: '8px' }}>{user.name}</td>
                <td style={{ padding: '8px' }}>{user.role}</td>
                <td style={{ padding: '8px' }}>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '4px',
                    background: user.status === 'Active' ? 'rgba(76, 175, 80, 0.3)' : 'rgba(244, 67, 54, 0.3)',
                    fontSize: '0.875rem'
                  }}>
                    {user.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: '20px', fontSize: '0.875rem', opacity: 0.9 }}>
        <p>✅ This component is loaded from the admin-dashboard remote app</p>
        <p>✅ State management works independently</p>
        <p>✅ Styled with inline styles (no external CSS conflicts)</p>
      </div>
    </div>
  );
}
