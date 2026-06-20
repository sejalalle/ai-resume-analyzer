import React from "react";

const RoleMatchCard = ({ roleAnalysis }) => {
  if (!roleAnalysis) return null;
  const pct = roleAnalysis.roleMatchPercentage || 0;
  const r = 42;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;

  return (
    <div className="card role-match-card">
      <div className="card-title-wrap">
        <h2>Role Match</h2>
        <p className="card-subtext">How well your resume matches the selected role.</p>
      </div>

      <div className="role-match-hero">
        <div className="role-circle-wrap">
          <svg className="role-circle-svg" width="100" height="100" viewBox="0 0 100 100">
            <defs>
              <linearGradient id="rg" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="#2dd4a0" />
                <stop offset="100%" stopColor="#4ade80" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
            <circle
              cx="50" cy="50" r={r}
              fill="none" stroke="url(#rg)" strokeWidth="6" strokeLinecap="round"
              strokeDasharray={circ} strokeDashoffset={offset}
              style={{ transition: "stroke-dashoffset 1.2s ease" }}
            />
          </svg>
          <div className="role-circle-text">
            <span className="role-pct">{pct}<span className="role-pct-small">%</span></span>
            <span className="role-match-sublabel">Match</span>
          </div>
        </div>

        <div className="role-info-side">
          <p className="role-name-label">Target Role</p>
          <p className="role-name">{roleAnalysis.selectedRole}</p>
          <div className="role-bar-track">
            <div className="role-bar-fill" style={{ width: `${pct}%` }} />
          </div>
          <p className="role-bar-note">{pct}% of required skills matched</p>
        </div>
      </div>

      <div className="skills-split">
        <div className="mini-section">
          <h3>Matched Skills</h3>
          {roleAnalysis.matchedSkills?.length > 0
            ? <div className="tag-wrap">{roleAnalysis.matchedSkills.map((s,i) => <span className="tag success" key={i}>{s}</span>)}</div>
            : <p className="muted-text">No matched skills found.</p>}
        </div>
        <div className="mini-section">
          <h3>Missing Skills</h3>
          {roleAnalysis.missingRoleSkills?.length > 0
            ? <div className="tag-wrap">{roleAnalysis.missingRoleSkills.map((s,i) => <span className="tag danger" key={i}>{s}</span>)}</div>
            : <p className="muted-text">No missing skills.</p>}
        </div>
      </div>
    </div>
  );
};

export default RoleMatchCard;