const empty = { school: "", degree: "", fieldOfStudy: "", startDate: "", endDate: "", grade: "" };

export default function EducationForm({ items, onChange }) {
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
              <label>School / University</label>
              <input value={item.school} onChange={(e) => update(idx, "school", e.target.value)} placeholder="XYZ University" />
            </div>
            <div className="field">
              <label>Degree</label>
              <input value={item.degree} onChange={(e) => update(idx, "degree", e.target.value)} placeholder="B.Tech" />
            </div>
            <div className="field">
              <label>Field of study</label>
              <input value={item.fieldOfStudy} onChange={(e) => update(idx, "fieldOfStudy", e.target.value)} placeholder="Computer Science" />
            </div>
            <div className="field">
              <label>Grade / CGPA</label>
              <input value={item.grade} onChange={(e) => update(idx, "grade", e.target.value)} placeholder="8.5 CGPA" />
            </div>
            <div className="field">
              <label>Start – End</label>
              <div style={{ display: "flex", gap: 8 }}>
                <input value={item.startDate} onChange={(e) => update(idx, "startDate", e.target.value)} placeholder="2020" />
                <input value={item.endDate} onChange={(e) => update(idx, "endDate", e.target.value)} placeholder="2024" />
              </div>
            </div>
          </div>
          <button type="button" className="btn btn-ghost btn-sm" style={{ color: "#b3261e" }} onClick={() => remove(idx)}>Remove</button>
        </div>
      ))}
      <button type="button" className="btn btn-outline btn-sm" onClick={add}>+ Add education</button>
    </div>
  );
}
