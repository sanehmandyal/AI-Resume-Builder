const testimonials = [
  { name: "Ananya Sharma", role: "Frontend Developer", quote: "The AI summary suggestions saved me an hour of staring at a blank box. Landed two interviews the same week.", initials: "AS" },
  { name: "Marcus Bell", role: "Data Analyst", quote: "Clean layout, easy to edit sections, and the PDF export looks genuinely professional.", initials: "MB" },
  { name: "Priya Nair", role: "Product Manager", quote: "I liked being able to rewrite my bullet points with one click instead of second-guessing every word.", initials: "PN" },
  { name: "Daniel Osei", role: "UX Designer", quote: "Simple, fast, and the light green theme actually feels calming while writing about myself.", initials: "DO" },
  { name: "Sofia Ricci", role: "Marketing Lead", quote: "Switched from a clunky template site to this in a weekend. Much easier to keep updated.", initials: "SR" },
  { name: "Tariq Hassan", role: "Software Engineer", quote: "The dashboard makes it easy to keep a few resume versions for different roles.", initials: "TH" },
];

export default function Testimonials() {
  return (
    <div>
      <section className="section" style={{ background: "var(--green-50)" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <span className="pill">Testimonials</span>
          <h1 style={{ margin: "16px 0" }}>Loved by job seekers</h1>
          <p style={{ maxWidth: 520, margin: "0 auto" }}>
            A few words from people who built their resume with ResumeAI.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 22 }}>
          {testimonials.map((t) => (
            <div key={t.name} className="card" style={{ padding: 24 }}>
              <p style={{ fontSize: 14, color: "var(--ink)", marginBottom: 20 }}>&ldquo;{t.quote}&rdquo;</p>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{
                  width: 42, height: 42, borderRadius: "50%",
                  background: "linear-gradient(135deg, var(--green-500), var(--green-700))",
                  color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 700, fontSize: 14,
                }}>
                  {t.initials}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{t.name}</div>
                  <div style={{ fontSize: 13, color: "var(--ink-soft)" }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
