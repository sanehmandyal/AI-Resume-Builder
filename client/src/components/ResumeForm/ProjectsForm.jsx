const empty = { title: "", link: "", techStack: "", description: "" };

export default function ProjectsForm({ items, onChange, onAskAI }) {
  const list = items?.length ? items : [];

  const update = (idx, key, value) => {
    const next = [...list];
    next[idx] = { ...next[idx], [key]: value };
    onChange(next);
  };

  const add = () => onChange([...list, { ...empty }]);
  const remove = (idx) => onChange(list.filter((_, i) => i !== idx));

  return (
    <div>
      {list.map((item, idx) => (
        <div key={idx} className="card" style={{ padding: 18, marginBottom: 16 }}>
          <div className="grid-2">
            <div className="field">
              <label>Project title</label>
              <input value={item.title} onChange={(e) => update(idx, "title", e.target.value)} placeholder="AI Resume Builder" />
            </div>
            <div className="field">
              <label>Link (optional)</label>
              <input value={item.link} onChange={(e) => update(idx, "link", e.target.value)} placeholder="github.com/you/project" />
            </div>
          </div>
          <div className="field">
            <label>Tech stack</label>
            <input value={item.techStack} onChange={(e) => update(idx, "techStack", e.target.value)} placeholder="React, Node.js, MongoDB" />
          </div>
          <div className="field" style={{ marginBottom: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <label style={{ marginBottom: 0 }}>Description</label>
              <button type="button" className="btn btn-outline btn-sm" onClick={() => onAskAI("bullet", { keyword: item.title, context: item.description })}>
                ✨ Ask AI
              </button>
            </div>
            <textarea value={item.description} onChange={(e) => update(idx, "description", e.target.value)} placeholder="What did the project do and what was your role?" rows={3} />
          </div>
          <button type="button" className="btn btn-ghost btn-sm" style={{ color: "#b3261e" }} onClick={() => remove(idx)}>Remove</button>
        </div>
      ))}
      <button type="button" className="btn btn-outline btn-sm" onClick={add}>+ Add project</button>
    </div>
  );
}
