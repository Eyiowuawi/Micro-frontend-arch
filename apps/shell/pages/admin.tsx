import dynamic from "next/dynamic";
import Link from "next/link";
import { Suspense } from "react";

const AdminDashboard = dynamic(() => import("admin/AdminDashboard"), {
  ssr: false,
  loading: () => (
    <div style={{ padding: "20px" }}>Loading Admin Dashboard...</div>
  ),
});

export default function AdminPage() {
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
        <Link href="/">
          <a
            style={{
              padding: "8px 16px",
              fontSize: "14px",
              color: "#666",
              textDecoration: "none",
              borderRadius: "4px",
            }}
          >
            ← Home
          </a>
        </Link>
        <span style={{ color: "#ccc" }}>|</span>
        <Link href="/customer">
          <a
            style={{
              padding: "8px 16px",
              fontSize: "14px",
              color: "#7928ca",
              textDecoration: "none",
              borderRadius: "4px",
            }}
          >
            Customer Dashboard →
          </a>
        </Link>
      </nav>

      <h1 style={{ marginBottom: "30px", color: "#0070f3" }}>
        Admin Dashboard Page
      </h1>
      <Suspense fallback={<div>Loading...</div>}>
        <AdminDashboard />
      </Suspense>
    </div>
  );
}

// Use server-side rendering to avoid static generation issues
export const getServerSideProps = async (context) => {
  // Allow the page to render on server without Module Federation
  // Remote components load client-side only (ssr: false)
  return {
    props: {},
  };
};
