import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section" style={{ display: "flex", justifyContent: "center" }}>
      <div className="card" style={{ padding: 32, width: 380, maxWidth: "100%" }}>
        <h2 style={{ marginBottom: 4 }}>Welcome back</h2>
        <p style={{ marginBottom: 20, fontSize: 14 }}>Log in to keep editing your resumes.</p>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label>Email</label>
            <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" />
          </div>
          <div className="field">
            <label>Password</label>
            <input type="password" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="••••••••" />
          </div>
          {error && <p style={{ color: "#b3261e", fontSize: 13, marginTop: -8, marginBottom: 12 }}>{error}</p>}
          <button className="btn btn-primary btn-block" disabled={loading}>{loading ? "Logging in…" : "Log in"}</button>
        </form>
        <p style={{ fontSize: 13, marginTop: 18, textAlign: "center" }}>
          No account? <Link to="/register" style={{ color: "var(--green-700)", fontWeight: 600 }}>Sign up</Link>
        </p>
      </div>
    </section>
  );
}
