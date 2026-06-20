import React from "react";

const ScoreCard = ({ title, value, subtitle, variant = "blue" }) => {
  const safeValue = Math.max(0, Math.min(100, value));
  const r = 22;
  const circ = 2 * Math.PI * r;
  const offset = circ - (safeValue / 100) * circ;

  const strokeMap = { blue: "#2dd4a0", green: "#4ade80", purple: "#a78bfa", orange: "#f59e0b" };
  const stroke = strokeMap[variant] || "#2dd4a0";

  return (
    <div className={`card score-card ${variant}`}>
      <div className="score-card-top">
        <div>
          <p className="score-title">{title}</p>
          <h2 className="score-value">
            {safeValue}<span className="score-denom">/100</span>
          </h2>
        </div>
        <div className="score-ring-wrap">
          <svg width="56" height="56" viewBox="0 0 56 56" style={{ transform: "rotate(-90deg)" }}>
            <circle cx="28" cy="28" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
            <circle
              cx="28" cy="28" r={r}
              fill="none"
              stroke={stroke}
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={circ}
              strokeDashoffset={offset}
              style={{ transition: "stroke-dashoffset 1s ease" }}
            />
          </svg>
        </div>
      </div>
      <div className="progress-bar">
        <div
          className={`progress-fill ${variant}`}
          style={{ "--fill-width": `${safeValue}%` }}
        />
      </div>
      <p className="score-subtitle">{subtitle}</p>
    </div>
  );
};

export default ScoreCard;