import { useEffect, useRef, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import api from "../api/axios.js";

import PersonalInfoForm from "../components/ResumeForm/PersonalInfoForm.jsx";
import ExperienceForm from "../components/ResumeForm/ExperienceForm.jsx";
import EducationForm from "../components/ResumeForm/EducationForm.jsx";
import ProjectsForm from "../components/ResumeForm/ProjectsForm.jsx";
import SkillsForm from "../components/ResumeForm/SkillsForm.jsx";
import ResumePreview from "../components/ResumePreview.jsx";
import AIAssistantPanel from "../components/AIAssistantPanel.jsx";

const tabs = [
  { key: "personal", label: "Personal Info" },
  { key: "experience", label: "Experience" },
  { key: "projects", label: "Projects" },
  { key: "education", label: "Education" },
  { key: "skills", label: "Skills" },
];

const emptyResume = {
  title: "Untitled Resume",
  personalInfo: {},
  experience: [],
  education: [],
  projects: [],
  skills: [],
};

export default function ResumeBuilder() {
  const { id } = useParams();
  const navigate = useNavigate();
  const previewRef = useRef(null);

  const [resume, setResume] = useState(emptyResume);
  const [activeTab, setActiveTab] = useState("personal");
  const [saving, setSaving] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [savedAt, setSavedAt] = useState(null);

  const [aiOpen, setAiOpen] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [aiContext, setAiContext] = useState(null); // { type, field }

  useEffect(() => {
    if (!id) return;
    api.get(`/resumes/${id}`).then(({ data }) => setResume(data));
  }, [id]);

  const saveResume = useCallback(async () => {
    if (!id) return;
    setSaving(true);
    try {
      await api.put(`/resumes/${id}`, resume);
      setSavedAt(new Date());
    } finally {
      setSaving(false);
    }
  }, [id, resume]);

  // autosave with debounce
  useEffect(() => {
    const t = setTimeout(() => { if (id) saveResume(); }, 1200);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resume]);

  const askAI = async (type, input) => {
    setAiContext({ type, field: activeTab });
    setAiOpen(true);
    setAiLoading(true);
    setAiSuggestions([]);
    try {
      const { data } = await api.post("/ai/generate", { type, input });
      setAiSuggestions(data.suggestions || []);
    } catch {
      setAiSuggestions(["Could not reach the AI service. Check your server is running and OPENAI_API_KEY is set."]);
    } finally {
      setAiLoading(false);
    }
  };

  const applySuggestion = (text) => {
    if (aiContext?.type === "summary") {
      setResume((r) => ({ ...r, personalInfo: { ...r.personalInfo, summary: text } }));
    } else if (aiContext?.type === "skills") {
      const parsed = text.split(",").map((s) => s.trim()).filter(Boolean);
      setResume((r) => ({ ...r, skills: Array.from(new Set([...(r.skills || []), ...parsed])) }));
    } else if (aiContext?.type === "bullet") {
      // Apply to the last item's description in the currently active list
      setResume((r) => {
        const key = activeTab === "experience" ? "experience" : "projects";
        const list = [...(r[key] || [])];
        if (list.length === 0) return r;
        list[list.length - 1] = { ...list[list.length - 1], description: text };
        return { ...r, [key]: list };
      });
    }
    setAiOpen(false);
  };

  const downloadPDF = async () => {
    if (!previewRef.current) return;
    setDownloading(true);
    try {
      const canvas = await html2canvas(previewRef.current, { scale: 2, backgroundColor: "#ffffff" });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "pt", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgHeight = (canvas.height * pageWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, pageWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, pageWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${(resume.personalInfo?.fullName || resume.title || "resume").replace(/\s+/g, "_")}.pdf`);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <section style={{ padding: "32px 0 60px" }}>
      <div className="container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, marginBottom: 20 }}>
          <div>
            <button className="btn btn-ghost btn-sm" onClick={() => navigate("/dashboard")}>← Back to dashboard</button>
            <input
              value={resume.title}
              onChange={(e) => setResume({ ...resume, title: e.target.value })}
              style={{ display: "block", fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, border: "none", background: "transparent", marginTop: 6 }}
            />
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <span style={{ fontSize: 12, color: "var(--ink-soft)" }}>
              {saving ? "Saving…" : savedAt ? `Saved ${savedAt.toLocaleTimeString()}` : ""}
            </span>
            <button className="btn btn-outline btn-sm" onClick={saveResume} disabled={saving}>Save</button>
            <button className="btn btn-primary btn-sm" onClick={downloadPDF} disabled={downloading}>
              {downloading ? "Preparing…" : "⬇ Download PDF"}
            </button>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }} className="builder-grid">
          {/* Form column */}
          <div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 18 }}>
              {tabs.map((t) => (
                <button
                  key={t.key}
                  className="btn btn-sm"
                  onClick={() => setActiveTab(t.key)}
                  style={{
                    background: activeTab === t.key ? "var(--green-600)" : "var(--green-50)",
                    color: activeTab === t.key ? "#fff" : "var(--green-700)",
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="card" style={{ padding: 22 }}>
              {activeTab === "personal" && (
                <PersonalInfoForm
                  data={resume.personalInfo}
                  onChange={(personalInfo) => setResume({ ...resume, personalInfo })}
                  onAskAI={askAI}
                />
              )}
              {activeTab === "experience" && (
                <ExperienceForm items={resume.experience} onChange={(experience) => setResume({ ...resume, experience })} onAskAI={askAI} />
              )}
              {activeTab === "projects" && (
                <ProjectsForm items={resume.projects} onChange={(projects) => setResume({ ...resume, projects })} onAskAI={askAI} />
              )}
              {activeTab === "education" && (
                <EducationForm items={resume.education} onChange={(education) => setResume({ ...resume, education })} />
              )}
              {activeTab === "skills" && (
                <SkillsForm items={resume.skills} onChange={(skills) => setResume({ ...resume, skills })} onAskAI={askAI} />
              )}
            </div>
          </div>

          {/* Preview column */}
          <div>
            <div className="pill" style={{ marginBottom: 12 }}>Live preview</div>
            <div style={{ background: "var(--bg-soft)", borderRadius: "var(--radius-lg)", padding: 20, overflowX: "auto" }}>
              <ResumePreview ref={previewRef} resume={resume} />
            </div>
          </div>
        </div>
      </div>

      <AIAssistantPanel
        open={aiOpen}
        loading={aiLoading}
        suggestions={aiSuggestions}
        onApply={applySuggestion}
        onClose={() => setAiOpen(false)}
      />

      <style>{`
        @media (max-width: 900px) {
          .builder-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
