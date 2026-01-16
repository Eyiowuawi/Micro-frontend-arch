import dynamic from "next/dynamic";
import Link from "next/link";
import { Suspense } from "react";

const CustomerDashboard = dynamic(() => import("customer/CustomerDashboard"), {
  ssr: false,
  loading: () => (
    <div style={{ padding: "20px" }}>Loading Customer Dashboard...</div>
  ),
});

export default function CustomerPage() {
  return (
    <div style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto" }}>
      {/* Navigation Bar */}
      <nav
        style={{
          marginBottom: "30px",
          padding: "15px 20px",
          background: "#f5f5f5",
          borderRadius: "8px",
          display: "flex",
          gap: "15px",
          alignItems: "center",
        }}
      >
        <Link href="/" passHref>
          <a
            style={{
              padding: "8px 16px",
              fontSize: "14px",
              color: "#666",
              textDecoration: "none",
              borderRadius: "4px",
              transition: "all 0.2s",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = "#e0e0e0";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            ← Home
          </a>
        </Link>
        <span style={{ color: "#ccc" }}>|</span>
        <Link href="/admin" passHref>
          <a
            style={{
              padding: "8px 16px",
              fontSize: "14px",
              color: "#0070f3",
              textDecoration: "none",
              borderRadius: "4px",
              transition: "all 0.2s",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = "#e6f2ff";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            Admin Dashboard →
          </a>
        </Link>
      </nav>

      <h1 style={{ marginBottom: "30px", color: "#7928ca" }}>
        Customer Dashboard Page
      </h1>
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
