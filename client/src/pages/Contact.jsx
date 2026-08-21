import { useState } from "react";
import api from "../api/axios.js";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await api.post("/contact", form);
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="section">
      <div className="container" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "flex-start" }}>
        <div>
          <span className="pill">Contact</span>
          <h1 style={{ margin: "16px 0" }}>Questions? Send us a message</h1>
          <p style={{ maxWidth: 420 }}>
            Whether it's feedback, a bug report, or a feature idea, we read every message.
          </p>
          <div style={{ marginTop: 24, fontSize: 14, color: "var(--ink-soft)" }}>
            <p style={{ margin: "0 0 6px" }}>📧 support@resumeai.app</p>
            <p style={{ margin: 0 }}>💬 Typically replies within 1–2 business days</p>
          </div>
        </div>

        <form className="card" style={{ padding: 28 }} onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="name">Name</label>
            <input id="name" name="name" value={form.name} onChange={handleChange} required placeholder="Your name" />
          </div>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" name="email" value={form.email} onChange={handleChange} required placeholder="you@example.com" />
          </div>
          <div className="field">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" value={form.message} onChange={handleChange} required placeholder="How can we help?" />
          </div>
          <button className="btn btn-primary btn-block" disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : "Send message"}
          </button>
          {status === "sent" && <p style={{ color: "var(--green-700)", marginTop: 12 }}>Thanks! Your message has been sent.</p>}
          {status === "error" && <p style={{ color: "#b3261e", marginTop: 12 }}>Something went wrong. Please try again.</p>}
        </form>
      </div>
    </section>
  );
}
