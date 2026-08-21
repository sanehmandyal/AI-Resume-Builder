export default function PersonalInfoForm({ data, onChange, onAskAI }) {
  const set = (key) => (e) => onChange({ ...data, [key]: e.target.value });

  return (
    <div>
      <div className="grid-2">
        <div className="field">
          <label>Full name</label>
          <input value={data.fullName || ""} onChange={set("fullName")} placeholder="Jordan Lee" />
        </div>
        <div className="field">
          <label>Job title</label>
          <input value={data.jobTitle || ""} onChange={set("jobTitle")} placeholder="Product Designer" />
        </div>
        <div className="field">
          <label>Email</label>
          <input type="email" value={data.email || ""} onChange={set("email")} placeholder="you@example.com" />
        </div>
        <div className="field">
          <label>Phone</label>
          <input value={data.phone || ""} onChange={set("phone")} placeholder="+91 98765 43210" />
        </div>
        <div className="field">
          <label>Location</label>
          <input value={data.location || ""} onChange={set("location")} placeholder="Ludhiana, Punjab" />
        </div>
        <div className="field">
          <label>LinkedIn</label>
          <input value={data.linkedin || ""} onChange={set("linkedin")} placeholder="linkedin.com/in/you" />
        </div>
        <div className="field">
          <label>GitHub</label>
          <input value={data.github || ""} onChange={set("github")} placeholder="github.com/you" />
        </div>
        <div className="field">
          <label>Website / Portfolio</label>
          <input value={data.website || ""} onChange={set("website")} placeholder="yourportfolio.com" />
        </div>
      </div>
      <div className="field">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <label style={{ marginBottom: 0 }}>Professional summary</label>
          <button type="button" className="btn btn-outline btn-sm" onClick={() => onAskAI("summary", { jobTitle: data.jobTitle, context: data.summary })}>
            ✨ Ask AI
          </button>
        </div>
        <textarea
          value={data.summary || ""}
          onChange={set("summary")}
          placeholder="A short 2-3 sentence overview of your experience and strengths."
          rows={4}
        />
      </div>
    </div>
  );
}
