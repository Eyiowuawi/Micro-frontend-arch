import dynamic from 'next/dynamic';

// Dynamically import to disable SSR for client-side only component
const CustomerDashboard = dynamic(() => import('../components/CustomerDashboard'), {
  ssr: false,
});

export default function Home() {
  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '30px' }}>Customer Dashboard Standalone</h1>
      <p style={{ marginBottom: '20px', color: '#666' }}>
        This is the standalone customer dashboard app. It can run independently or be consumed by the shell app.
      </p>
      <CustomerDashboard />
    </div>
  );
}

// Use server-side rendering instead of static generation
export const getServerSideProps = async () => {
  return {
    props: {},
  };
};
