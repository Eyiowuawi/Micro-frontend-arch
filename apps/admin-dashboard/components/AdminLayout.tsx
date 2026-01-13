export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px'
    }}>
      <header style={{ marginBottom: '20px', color: 'white' }}>
        <h1>Admin Portal Layout</h1>
      </header>
      <main>
        {children}
      </main>
    </div>
  );
}
