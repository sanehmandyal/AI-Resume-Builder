import { forwardRef } from "react";

const ResumePreview = forwardRef(({ resume }, ref) => {
  const { personalInfo = {}, experience = [], education = [], projects = [], skills = [] } = resume;

  return (
    <div
      ref={ref}
      style={{
        background: "#fff",
        width: "100%",
        maxWidth: 720,
        margin: "0 auto",
        padding: "40px 44px",
        fontFamily: "Inter, sans-serif",
        color: "#16281f",
        boxShadow: "0 0 0 1px #dcefe2",
      }}
    >
      <div style={{ borderBottom: "3px solid #4caf7d", paddingBottom: 16, marginBottom: 20 }}>
        <h1 style={{ fontFamily: "Sora, sans-serif", fontSize: 28, margin: 0 }}>{personalInfo.fullName || "Your Name"}</h1>
        <p style={{ margin: "4px 0 10px", color: "#237350", fontWeight: 600 }}>{personalInfo.jobTitle || "Your Job Title"}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, fontSize: 12, color: "#4d6357" }}>
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
          {personalInfo.github && <span>{personalInfo.github}</span>}
          {personalInfo.website && <span>{personalInfo.website}</span>}
        </div>
      </div>

      {personalInfo.summary && (
        <Section title="Summary">
          <p style={{ fontSize: 13, margin: 0 }}>{personalInfo.summary}</p>
        </Section>
      )}

      {experience.length > 0 && (
        <Section title="Experience">
          {experience.map((e, i) => (
            <div key={i} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, fontWeight: 700 }}>
                <span>{e.role} {e.company && `· ${e.company}`}</span>
                <span style={{ fontWeight: 400, color: "#4d6357" }}>{e.startDate} – {e.current ? "Present" : e.endDate}</span>
              </div>
              {e.location && <div style={{ fontSize: 12, color: "#4d6357" }}>{e.location}</div>}
              {e.description && <p style={{ fontSize: 12.5, margin: "4px 0 0" }}>{e.description}</p>}
            </div>
          ))}
        </Section>
      )}

      {projects.length > 0 && (
        <Section title="Projects">
          {projects.map((p, i) => (
            <div key={i} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, fontWeight: 700 }}>
                <span>{p.title}</span>
                {p.link && <span style={{ fontWeight: 400, fontSize: 11, color: "#237350" }}>{p.link}</span>}
              </div>
              {p.techStack && <div style={{ fontSize: 12, color: "#4d6357" }}>{p.techStack}</div>}
              {p.description && <p style={{ fontSize: 12.5, margin: "4px 0 0" }}>{p.description}</p>}
            </div>
          ))}
        </Section>
      )}

      {education.length > 0 && (
        <Section title="Education">
          {education.map((ed, i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, fontWeight: 700 }}>
                <span>{ed.degree} {ed.fieldOfStudy && `in ${ed.fieldOfStudy}`}</span>
                <span style={{ fontWeight: 400, color: "#4d6357" }}>{ed.startDate} – {ed.endDate}</span>
              </div>
              <div style={{ fontSize: 12, color: "#4d6357" }}>{ed.school} {ed.grade && `· ${ed.grade}`}</div>
            </div>
          ))}
        </Section>
      )}

      {skills.length > 0 && (
        <Section title="Skills">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {skills.map((s) => (
              <span key={s} style={{ fontSize: 11.5, background: "#eafaf0", color: "#237350", padding: "4px 10px", borderRadius: 999, fontWeight: 600 }}>{s}</span>
            ))}
          </div>
        </Section>
      )}
    </div>
  );
});

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <h4 style={{ fontFamily: "Sora, sans-serif", fontSize: 13, textTransform: "uppercase", letterSpacing: "0.06em", color: "#349466", margin: "0 0 8px", borderBottom: "1px solid #dcefe2", paddingBottom: 4 }}>
        {title}
      </h4>
      {children}
    </div>
  );
}

ResumePreview.displayName = "ResumePreview";
export default ResumePreview;
