import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section" style={{ display: "flex", justifyContent: "center" }}>
      <div className="card" style={{ padding: 32, width: 380, maxWidth: "100%" }}>
        <h2 style={{ marginBottom: 4 }}>Create your account</h2>
        <p style={{ marginBottom: 20, fontSize: 14 }}>Start building your resume in minutes.</p>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label>Full name</label>
            <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Jordan Lee" />
          </div>
          <div className="field">
            <label>Email</label>
            <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" />
          </div>
          <div className="field">
            <label>Password</label>
            <input type="password" required minLength={6} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="At least 6 characters" />
          </div>
          {error && <p style={{ color: "#b3261e", fontSize: 13, marginTop: -8, marginBottom: 12 }}>{error}</p>}
          <button className="btn btn-primary btn-block" disabled={loading}>{loading ? "Creating account…" : "Create account"}</button>
        </form>
        <p style={{ fontSize: 13, marginTop: 18, textAlign: "center" }}>
          Already have an account? <Link to="/login" style={{ color: "var(--green-700)", fontWeight: 600 }}>Log in</Link>
        </p>
      </div>
    </section>
  );
}
