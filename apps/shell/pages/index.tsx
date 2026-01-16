import Link from "next/link";

export default function Home() {

  return (
    <main style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "30px", fontSize: "2rem" }}>
        Module Federation Test - Shell App
      </h1>

      {/* Navigation Menu */}
      <nav
        style={{
          marginBottom: "40px",
          padding: "20px",
          background: "#ffffff",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <h2
          style={{ marginBottom: "20px", fontSize: "1.25rem", color: "#333" }}
        >
          Navigate to Dashboards:
        </h2>
        <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
          <Link href="/admin">
            <a
              style={{
                padding: "14px 28px",
                fontSize: "16px",
                fontWeight: "bold",
                color: "white",
                background: "#0070f3",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                textDecoration: "none",
                display: "inline-block",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              Admin Dashboard →
            </a>
          </Link>

          <Link href="/customer">
            <a
              style={{
                padding: "14px 28px",
                fontSize: "16px",
                fontWeight: "bold",
                color: "white",
                background: "#7928ca",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                textDecoration: "none",
                display: "inline-block",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              Customer Dashboard →
            </a>
          </Link>
        </div>
      </nav>

      {/* Welcome Section */}
      <div
        style={{
          padding: "60px",
          textAlign: "center",
          background: "linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)",
          borderRadius: "8px",
          color: "#666",
        }}
      >
        <p style={{ fontSize: "20px", marginBottom: "15px", color: "#333" }}>
          👆 Click a navigation link above to load a dashboard
        </p>
        <p style={{ fontSize: "14px", lineHeight: "1.6" }}>
          Dashboards are loaded dynamically using Module Federation.
          <br />
          Each dashboard runs as an independent remote application.
        </p>
      </div>
    </main>
  );
}

// Use server-side rendering to avoid static generation issues
export const getServerSideProps = async () => {
  return {
    props: {},
  };
};
