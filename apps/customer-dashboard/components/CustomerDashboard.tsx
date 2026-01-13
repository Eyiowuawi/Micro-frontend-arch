import { useState } from 'react';

export default function CustomerDashboard() {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  
  const products = [
    { id: 1, name: 'Product A', price: '$99', description: 'Premium product with all features' },
    { id: 2, name: 'Product B', price: '$49', description: 'Standard product for everyday use' },
    { id: 3, name: 'Product C', price: '$149', description: 'Enterprise solution with support' },
  ];

  const orders = [
    { id: 'ORD-001', product: 'Product A', date: '2024-01-15', status: 'Delivered', total: '$99' },
    { id: 'ORD-002', product: 'Product B', date: '2024-01-20', status: 'Processing', total: '$49' },
    { id: 'ORD-003', product: 'Product C', date: '2024-01-25', status: 'Pending', total: '$149' },
  ];

  return (
    <div style={{ 
      padding: '20px', 
      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      borderRadius: '8px',
      color: 'white',
      minHeight: '300px'
    }}>
      <h2 style={{ marginBottom: '20px', fontSize: '1.5rem' }}>
        Customer Dashboard Component
      </h2>

      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ marginBottom: '10px' }}>Available Products</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => setSelectedProduct(product.name)}
              style={{
                padding: '12px',
                background: selectedProduct === product.name 
                  ? 'rgba(255, 255, 255, 0.3)' 
                  : 'rgba(255, 255, 255, 0.1)',
                borderRadius: '6px',
                cursor: 'pointer',
                border: selectedProduct === product.name ? '2px solid white' : '1px solid rgba(255, 255, 255, 0.2)',
                minWidth: '150px',
                transition: 'all 0.2s'
              }}
            >
              <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>{product.name}</div>
              <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>{product.price}</div>
            </div>
          ))}
        </div>
        {selectedProduct && (
          <div style={{ marginTop: '10px', padding: '10px', background: 'rgba(255, 255, 255, 0.2)', borderRadius: '4px' }}>
            Selected: <strong>{selectedProduct}</strong>
          </div>
        )}
      </div>

      <div>
        <h3 style={{ marginBottom: '15px' }}>Recent Orders</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {orders.map((order) => (
            <div
              key={order.id}
              style={{
                padding: '12px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '6px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div>
                <div style={{ fontWeight: 'bold' }}>{order.id}</div>
                <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>
                  {order.product} • {order.date}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 'bold' }}>{order.total}</div>
                <div style={{ 
                  fontSize: '0.75rem',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  background: order.status === 'Delivered' 
                    ? 'rgba(76, 175, 80, 0.3)' 
                    : order.status === 'Processing'
                    ? 'rgba(255, 193, 7, 0.3)'
                    : 'rgba(244, 67, 54, 0.3)',
                  display: 'inline-block',
                  marginTop: '4px'
                }}>
                  {order.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: '20px', fontSize: '0.875rem', opacity: 0.9 }}>
        <p>✅ This component is loaded from the customer-dashboard remote app</p>
        <p>✅ Interactive state management works</p>
        <p>✅ Independent styling and functionality</p>
      </div>
    </div>
  );
}
