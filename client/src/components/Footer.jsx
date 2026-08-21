import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--border)", background: "var(--bg-soft)" }}>
      <div className="container" style={{ padding: "40px 24px", display: "flex", flexWrap: "wrap", gap: 20, alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 800 }}>
          Resume<span style={{ color: "var(--green-600)" }}>AI</span>
        </div>
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/testimonials" className="nav-link">Testimonials</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
        </div>
        <p style={{ margin: 0, fontSize: 13 }}>© {new Date().getFullYear()} ResumeAI. All rights reserved.</p>
      </div>
    </footer>
  );
}
