import { useState } from "react";

export default function SkillsForm({ items, onChange, onAskAI }) {
  const [input, setInput] = useState("");
  const list = items || [];

  const addSkill = (raw) => {
    const skill = raw.trim();
    if (!skill || list.includes(skill)) return;
    onChange([...list, skill]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addSkill(input);
      setInput("");
    }
  };

  const remove = (skill) => onChange(list.filter((s) => s !== skill));

  return (
    <div>
      <div className="field">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <label style={{ marginBottom: 0 }}>Skills</label>
          <button type="button" className="btn btn-outline btn-sm" onClick={() => onAskAI("skills", {})}>✨ Suggest skills</button>
        </div>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a skill and press Enter"
        />
      </div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {list.map((s) => (
          <span key={s} className="pill" style={{ background: "var(--bg-soft)", display: "flex", alignItems: "center", gap: 6 }}>
            {s}
            <button type="button" onClick={() => remove(s)} style={{ background: "none", border: "none", color: "var(--green-700)", fontWeight: 700 }}>×</button>
          </span>
        ))}
      </div>
    </div>
  );
}
