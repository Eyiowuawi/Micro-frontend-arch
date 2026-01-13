export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      padding: '20px'
    }}>
      <header style={{ marginBottom: '20px', color: 'white' }}>
        <h1>Customer Portal Layout</h1>
      </header>
      <main>
        {children}
      </main>
    </div>
  );
}
