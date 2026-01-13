import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const AdminDashboard = dynamic(() => import('admin/AdminDashboard'), {
  ssr: false,
  loading: () => <div style={{ padding: '20px' }}>Loading Admin Dashboard...</div>,
});

export default function AdminPage() {
  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '30px' }}>Admin Dashboard Page</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <AdminDashboard />
      </Suspense>
    </div>
  );
}
