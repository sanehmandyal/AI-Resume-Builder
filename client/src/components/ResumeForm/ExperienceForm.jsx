const empty = { company: "", role: "", location: "", startDate: "", endDate: "", current: false, description: "" };

export default function ExperienceForm({ items, onChange, onAskAI }) {
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
              <label>Company</label>
              <input value={item.company} onChange={(e) => update(idx, "company", e.target.value)} placeholder="Acme Inc." />
            </div>
            <div className="field">
              <label>Role / Title</label>
              <input value={item.role} onChange={(e) => update(idx, "role", e.target.value)} placeholder="Software Engineer" />
            </div>
            <div className="field">
              <label>Location</label>
              <input value={item.location} onChange={(e) => update(idx, "location", e.target.value)} placeholder="Remote" />
            </div>
            <div className="field">
              <label>Start – End</label>
              <div style={{ display: "flex", gap: 8 }}>
                <input value={item.startDate} onChange={(e) => update(idx, "startDate", e.target.value)} placeholder="Jan 2023" />
                <input value={item.endDate} onChange={(e) => update(idx, "endDate", e.target.value)} placeholder="Present" disabled={item.current} />
              </div>
            </div>
          </div>
          <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, marginBottom: 10 }}>
            <input type="checkbox" checked={item.current} onChange={(e) => update(idx, "current", e.target.checked)} style={{ width: "auto" }} />
            I currently work here
          </label>
          <div className="field" style={{ marginBottom: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <label style={{ marginBottom: 0 }}>Description</label>
              <button type="button" className="btn btn-outline btn-sm" onClick={() => onAskAI("bullet", { keyword: item.role, context: item.description })}>
                ✨ Ask AI
              </button>
            </div>
            <textarea value={item.description} onChange={(e) => update(idx, "description", e.target.value)} placeholder="Describe your impact and responsibilities." rows={3} />
          </div>
          <button type="button" className="btn btn-ghost btn-sm" style={{ color: "#b3261e" }} onClick={() => remove(idx)}>Remove</button>
        </div>
      ))}
      <button type="button" className="btn btn-outline btn-sm" onClick={add}>+ Add experience</button>
    </div>
  );
}
