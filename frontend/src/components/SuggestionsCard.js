import React from "react";

const SuggestionsCard = ({ suggestions, missingSections, aiInsights }) => {
  const strengths  = aiInsights?.strengths  || [];
  const weaknesses = aiInsights?.weaknesses || [];

  return (
    <div className="card">
      <div className="card-title-wrap">
        <h2>Improvement Dashboard</h2>
        <p className="card-subtext">What's working and what needs improvement.</p>
      </div>

      <div className="priority-box">
        <h3>⚠ Missing Sections</h3>
        {missingSections.length > 0
          ? <div className="tag-wrap">{missingSections.map((item,i) => <span className="tag warning" key={i}>{item}</span>)}</div>
          : <p className="good-text">✓ All major sections are present</p>}
      </div>

      <div className="strength-weakness-grid">
        <div className="mini-card success-bg">
          <h3>Strengths</h3>
          {strengths.length > 0
            ? <ul className="clean-list">{strengths.map((item,i) => <li key={i}>{item}</li>)}</ul>
            : <p className="muted-text">No strengths available.</p>}
        </div>
        <div className="mini-card danger-bg">
          <h3>Weaknesses</h3>
          {weaknesses.length > 0
            ? <ul className="clean-list">{weaknesses.map((item,i) => <li key={i}>{item}</li>)}</ul>
            : <p className="muted-text">No weaknesses available.</p>}
        </div>
      </div>

      <div className="improve-box" style={{ marginTop: 20 }}>
        <h3>→ What to Improve</h3>
        {suggestions.length > 0
          ? <ul className="numbered-list">
              {suggestions.map((item,i) => (
                <li className="numbered-item" key={i}>
                  <span className="num-badge">{i+1}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          : <p className="muted-text">No suggestions available.</p>}
      </div>
    </div>
  );
};

export default SuggestionsCard;