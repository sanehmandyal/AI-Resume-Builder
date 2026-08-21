import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function Dashboard() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  const load = async () => {
    setLoading(true);
    const { data } = await api.get("/resumes");
    setResumes(data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const createNew = async () => {
    const { data } = await api.post("/resumes", { title: "Untitled Resume" });
    navigate(`/builder/${data._id}`);
  };

  const remove = async (id) => {
    if (!confirm("Delete this resume?")) return;
    await api.delete(`/resumes/${id}`);
    load();
  };

  return (
    <section className="section">
      <div className="container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16, marginBottom: 28 }}>
          <div>
            <h1 style={{ margin: 0 }}>Hi {user?.name?.split(" ")[0]} 👋</h1>
            <p style={{ margin: 0 }}>Manage your resumes or start a new one.</p>
          </div>
          <button className="btn btn-primary" onClick={createNew}>+ New resume</button>
        </div>

        {loading ? (
          <p>Loading…</p>
        ) : resumes.length === 0 ? (
          <div className="card" style={{ padding: 40, textAlign: "center" }}>
            <p>You don't have any resumes yet.</p>
            <button className="btn btn-primary" onClick={createNew}>Create your first resume</button>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 18 }}>
            {resumes.map((r) => (
              <div key={r._id} className="card" style={{ padding: 20 }}>
                <h3 style={{ fontSize: 16, marginBottom: 4 }}>{r.title || "Untitled Resume"}</h3>
                <p style={{ fontSize: 13 }}>{r.personalInfo?.jobTitle || "No job title set"}</p>
                <p style={{ fontSize: 12, color: "var(--ink-soft)" }}>Updated {new Date(r.updatedAt).toLocaleDateString()}</p>
                <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                  <Link to={`/builder/${r._id}`} className="btn btn-outline btn-sm">Edit</Link>
                  <button className="btn btn-ghost btn-sm" onClick={() => remove(r._id)} style={{ color: "#b3261e" }}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
