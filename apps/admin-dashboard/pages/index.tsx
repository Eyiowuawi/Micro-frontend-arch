import AdminDashboard from '../components/AdminDashboard';

export default function Home() {
  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '30px' }}>Admin Dashboard Standalone</h1>
      <p style={{ marginBottom: '20px', color: '#666' }}>
        This is the standalone admin dashboard app. It can run independently or be consumed by the shell app.
      </p>
      <AdminDashboard />
    </div>
  );
}
