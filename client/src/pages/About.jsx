const steps = [
  { n: "01", title: "Add your details", text: "Fill in personal info, experience, education, projects, and skills in a guided form." },
  { n: "02", title: "Let AI refine it", text: "Ask the AI assistant to tighten your summary and turn duties into impact-driven bullet points." },
  { n: "03", title: "Preview & download", text: "See a live preview as you type, then export a clean, print-ready PDF." },
];

export default function About() {
  return (
    <div>
      <section className="section" style={{ background: "var(--green-50)" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <span className="pill">About ResumeAI</span>
          <h1 style={{ margin: "16px 0" }}>Resume writing, without the blank-page stress</h1>
          <p style={{ maxWidth: 560, margin: "0 auto" }}>
            ResumeAI is a MERN-stack app that pairs a distraction-free builder with AI writing
            help, so you spend less time formatting and more time telling your story.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 style={{ textAlign: "center", marginBottom: 40 }}>How it works</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
            {steps.map((s) => (
              <div key={s.n} className="card" style={{ padding: 26 }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 28, color: "var(--green-300)", fontWeight: 800 }}>{s.n}</div>
                <h3 style={{ fontSize: 18 }}>{s.title}</h3>
                <p style={{ fontSize: 14 }}>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "center" }}>
          <div>
            <h2>Built with the MERN stack</h2>
            <p>
              MongoDB stores your resumes, Express and Node power the API, and React drives a fast,
              responsive interface — so the app is quick, secure, and easy to extend.
            </p>
          </div>
          <div className="card" style={{ padding: 24 }}>
            <ul style={{ margin: 0, paddingLeft: 18, color: "var(--ink-soft)", fontSize: 14, lineHeight: 2 }}>
              <li>React + Vite frontend, fully responsive</li>
              <li>Node.js / Express REST API</li>
              <li>MongoDB with Mongoose models</li>
              <li>JWT authentication</li>
              <li>AI-generated summaries & bullet points</li>
              <li>Client-side PDF export</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
