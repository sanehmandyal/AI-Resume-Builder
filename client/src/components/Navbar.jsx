import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import "./Navbar.css";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/testimonials", label: "Testimonials" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="nav">
      <div className="container nav-inner">
        <Link to="/" className="nav-logo" onClick={() => setOpen(false)}>
          <span className="nav-logo-dot" />
          Resume<span>AI</span>
        </Link>

        <nav className={`nav-links ${open ? "nav-links-open" : ""}`}>
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) => "nav-link" + (isActive ? " nav-link-active" : "")}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </NavLink>
          ))}
          <div className="nav-actions-mobile">
            {user ? (
              <>
                <Link to="/dashboard" className="btn btn-outline btn-sm" onClick={() => setOpen(false)}>Dashboard</Link>
                <button className="btn btn-primary btn-sm" onClick={() => { logout(); setOpen(false); navigate("/"); }}>Log out</button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline btn-sm" onClick={() => setOpen(false)}>Log in</Link>
                <Link to="/register" className="btn btn-primary btn-sm" onClick={() => setOpen(false)}>Get started</Link>
              </>
            )}
          </div>
        </nav>

        <div className="nav-actions-desktop">
          {user ? (
            <>
              <Link to="/dashboard" className="btn btn-outline btn-sm">Dashboard</Link>
              <button className="btn btn-primary btn-sm" onClick={() => { logout(); navigate("/"); }}>Log out</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline btn-sm">Log in</Link>
              <Link to="/register" className="btn btn-primary btn-sm">Get started</Link>
            </>
          )}
        </div>

        <button
          className={`nav-burger ${open ? "nav-burger-open" : ""}`}
          aria-label="Toggle menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}
