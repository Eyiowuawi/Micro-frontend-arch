import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Dynamically import remote components
const AdminDashboard = dynamic(() => import('admin/AdminDashboard'), {
  ssr: false,
  loading: () => <div style={{ padding: '20px' }}>Loading Admin Dashboard...</div>,
});

const CustomerDashboard = dynamic(() => import('customer/CustomerDashboard'), {
  ssr: false,
  loading: () => <div style={{ padding: '20px' }}>Loading Customer Dashboard...</div>,
});

export default function Home() {
  return (
    <main style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '30px', fontSize: '2rem' }}>
        Module Federation Test - Shell App
      </h1>
      
      <div style={{ marginBottom: '40px', padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
        <h2 style={{ marginBottom: '10px' }}>Instructions:</h2>
        <ol style={{ paddingLeft: '20px' }}>
          <li>Start admin-dashboard: <code>yarn dev:admin</code> (port 3001)</li>
          <li>Start customer-dashboard: <code>yarn dev:customer</code> (port 3002)</li>
          <li>Start shell: <code>yarn dev:shell</code> (port 3000)</li>
        </ol>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div style={{ border: '2px solid #0070f3', borderRadius: '8px', padding: '20px' }}>
          <h2 style={{ marginBottom: '20px', color: '#0070f3' }}>Admin Dashboard (Remote)</h2>
          <Suspense fallback={<div>Loading...</div>}>
            <AdminDashboard />
          </Suspense>
        </div>

        <div style={{ border: '2px solid #7928ca', borderRadius: '8px', padding: '20px' }}>
          <h2 style={{ marginBottom: '20px', color: '#7928ca' }}>Customer Dashboard (Remote)</h2>
          <Suspense fallback={<div>Loading...</div>}>
            <CustomerDashboard />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
