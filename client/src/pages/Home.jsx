import { Link } from "react-router-dom";

const features = [
  { icon: "✨", title: "AI writing assist", text: "Generate polished summaries and bullet points tailored to your role in one click." },
  { icon: "🎨", title: "Clean templates", text: "Modern, recruiter-friendly layouts that stay readable on screen and in print." },
  { icon: "📄", title: "One-click PDF", text: "Download an ATS-friendly PDF the moment your resume looks right." },
  { icon: "🔒", title: "Private by default", text: "Your data lives in your own account and is never shared with third parties." },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="section" style={{ paddingTop: 72, background: "linear-gradient(180deg, var(--green-50), var(--white) 70%)" }}>
        <div className="container" style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 48, alignItems: "center" }}>
          <div>
            <span className="pill">AI-powered resume builder</span>
            <h1 style={{ fontSize: "clamp(32px, 5vw, 52px)", margin: "18px 0" }}>
              Build a resume that gets you the interview.
            </h1>
            <p style={{ fontSize: 17, maxWidth: 480 }}>
              ResumeAI helps you write, format, and polish your resume in minutes —
              powered by AI suggestions for your summary, experience, and skills.
            </p>
            <div style={{ display: "flex", gap: 14, marginTop: 28, flexWrap: "wrap" }}>
              <Link to="/register" className="btn btn-primary">Create your resume →</Link>
              <Link to="/about" className="btn btn-outline">How it works</Link>
            </div>
          </div>

          <div className="card" style={{ padding: 28 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <strong>Jordan Lee</strong>
              <span className="pill">Preview</span>
            </div>
            <p style={{ fontSize: 13, margin: "0 0 14px" }}>Product Designer · jordan@email.com · San Francisco, CA</p>
            <div style={{ height: 1, background: "var(--border)", margin: "14px 0" }} />
            <h4 style={{ fontSize: 14, color: "var(--green-700)" }}>Experience</h4>
            <p style={{ fontSize: 13, margin: 0 }}>Led a 4-person design team to ship a redesign that lifted conversion by 18%.</p>
            <div style={{ height: 1, background: "var(--border)", margin: "14px 0" }} />
            <h4 style={{ fontSize: 14, color: "var(--green-700)" }}>Skills</h4>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["Figma", "UX Research", "Design Systems", "Prototyping"].map((s) => (
                <span key={s} className="pill" style={{ background: "var(--bg-soft)" }}>{s}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section">
        <div className="container">
          <h2 style={{ textAlign: "center", marginBottom: 10 }}>Everything you need to stand out</h2>
          <p style={{ textAlign: "center", maxWidth: 520, margin: "0 auto 48px" }}>
            From first draft to downloaded PDF, ResumeAI keeps every step simple.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 20 }}>
            {features.map((f) => (
              <div key={f.title} className="card" style={{ padding: 24 }}>
                <div style={{ fontSize: 26, marginBottom: 10 }}>{f.icon}</div>
                <h3 style={{ fontSize: 17 }}>{f.title}</h3>
                <p style={{ fontSize: 14 }}>{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ background: "var(--green-700)", color: "#fff" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <h2 style={{ color: "#fff" }}>Ready to build your resume?</h2>
          <p style={{ color: "var(--green-100)", maxWidth: 460, margin: "0 auto 24px" }}>
            It's free to start. Add your details, let AI polish the wording, and download your PDF.
          </p>
          <Link to="/register" className="btn" style={{ background: "#fff", color: "var(--green-700)" }}>
            Get started for free
          </Link>
        </div>
      </section>
    </div>
  );
}
