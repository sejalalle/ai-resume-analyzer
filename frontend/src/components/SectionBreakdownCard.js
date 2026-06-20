import React from "react";

const maxMap   = { contact:15, skills:15, education:15, projects:20, experience:15, certifications:10, formatting:10 };
const labelMap = { contact:"Contact Info", skills:"Skills", education:"Education", projects:"Projects", experience:"Experience", certifications:"Certifications", formatting:"Formatting" };
const iconMap  = {
  contact:      { icon:"📧", bg:"rgba(0,153,255,0.12)",   grad:"linear-gradient(90deg,#004f80,#0099ff)",   variantCls:"blue"   },
  skills:       { icon:"⚡", bg:"rgba(245,158,11,0.12)",  grad:"linear-gradient(90deg,#7c4f00,#f59e0b)",   variantCls:"orange" },
  education:    { icon:"🎓", bg:"rgba(124,58,237,0.12)",  grad:"linear-gradient(90deg,#3b0764,#a78bfa)",   variantCls:"purple" },
  projects:     { icon:"🛠", bg:"rgba(45,212,160,0.12)",  grad:"linear-gradient(90deg,#006651,#2dd4a0)",   variantCls:"green"  },
  experience:   { icon:"💼", bg:"rgba(239,68,68,0.12)",   grad:"linear-gradient(90deg,#7f1d1d,#ef4444)",   variantCls:"red"    },
  certifications:{ icon:"🏅", bg:"rgba(34,197,94,0.12)", grad:"linear-gradient(90deg,#14532d,#22c55e)",   variantCls:"green"  },
  formatting:   { icon:"📐", bg:"rgba(167,139,250,0.12)", grad:"linear-gradient(90deg,#4c1d95,#a78bfa)",  variantCls:"purple" },
};

const SectionBreakdownCard = ({ sectionBreakdown }) => {
  if (!sectionBreakdown) return null;
  return (
    <div className="card">
      <div className="card-title-wrap">
        <h2>Section-wise Analysis</h2>
        <p className="card-subtext">Score breakdown for each resume section.</p>
      </div>
      <div className="breakdown-list">
        {Object.entries(sectionBreakdown).map(([key, value]) => {
          const max  = maxMap[key] || 10;
          const pct  = Math.round((value / max) * 100);
          const meta = iconMap[key] || { icon:"•", bg:"rgba(255,255,255,0.05)", grad:"linear-gradient(90deg,#475569,#94a3b8)" };
          const pctColor = pct >= 70 ? "#2dd4a0" : pct >= 40 ? "#f59e0b" : "#f87171";

          return (
            <div className="breakdown-row" key={key}>
              <div className="breakdown-head">
                <div className="breakdown-row-label">
                  <span className="breakdown-icon" style={{ background: meta.bg }}>{meta.icon}</span>
                  {labelMap[key] || key}
                </div>
                <div className="breakdown-score">
                  <span className="breakdown-num">{value}</span>
                  <span style={{ color:"var(--text-3)" }}>/{max}</span>
                  <span className="breakdown-pct" style={{ color: pctColor }}>{pct}%</span>
                </div>
              </div>
              <div className="progress-bar small">
                <div className="progress-fill" style={{ width:`${pct}%`, background: meta.grad, "--fill-width":`${pct}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SectionBreakdownCard;