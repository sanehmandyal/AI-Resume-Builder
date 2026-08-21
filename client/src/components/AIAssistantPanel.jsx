export default function AIAssistantPanel({ open, loading, suggestions, onApply, onClose }) {
  if (!open) return null;
  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(22,40,31,0.35)", zIndex: 200,
      display: "flex", justifyContent: "flex-end",
    }} onClick={onClose}>
      <div
        className="card"
        style={{ width: 360, maxWidth: "90vw", height: "100%", borderRadius: 0, padding: 24, overflowY: "auto" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ margin: 0 }}>✨ AI suggestions</h3>
          <button className="btn btn-ghost btn-sm" onClick={onClose}>Close</button>
        </div>

        {loading ? (
          <p>Generating suggestions…</p>
        ) : suggestions.length === 0 ? (
          <p>No suggestions yet.</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {suggestions.map((s, i) => (
              <div key={i} className="card" style={{ padding: 14 }}>
                <p style={{ fontSize: 14, marginBottom: 10 }}>{s}</p>
                <button className="btn btn-primary btn-sm" onClick={() => onApply(s)}>Use this</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
