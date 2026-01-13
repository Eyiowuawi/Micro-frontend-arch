import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const CustomerDashboard = dynamic(() => import('customer/CustomerDashboard'), {
  ssr: false,
  loading: () => <div style={{ padding: '20px' }}>Loading Customer Dashboard...</div>,
});

export default function CustomerPage() {
  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '30px' }}>Customer Dashboard Page</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <CustomerDashboard />
      </Suspense>
    </div>
  );
}

// Use server-side rendering to avoid static generation issues
export const getServerSideProps = async () => {
  return {
    props: {},
  };
};
