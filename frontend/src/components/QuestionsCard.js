import React, { useState } from "react";

const SECTIONS = [
  { key: "roleQuestions",    label: "Role-Based"    },
  { key: "skillQuestions",   label: "Skill-Based"   },
  { key: "projectQuestions", label: "Project-Based" },
  { key: "hrQuestions",      label: "HR"            },
];

const QuestionsCard = ({ interviewQuestions }) => {
  const [active, setActive] = useState("roleQuestions");
  if (!interviewQuestions) return null;
  const questions = interviewQuestions[active] || [];

  return (
    <div className="card">
      <div className="card-title-wrap">
        <h2>Interview Preparation Dashboard</h2>
        <p className="card-subtext">Questions generated from your resume and selected role.</p>
      </div>

      <div className="q-tabs">
        {SECTIONS.map(({ key, label }) => (
          <button
            key={key}
            className={`q-tab ${active === key ? "active" : ""}`}
            onClick={() => setActive(key)}
          >
            {label}
            <span className="q-count">{interviewQuestions[key]?.length || 0}</span>
          </button>
        ))}
      </div>

      <div>
        {questions.length > 0 ? questions.map((item, i) => (
          <div className="question-item" key={i}>
            <div className="question-q">
              <span className="q-pill q">Q</span>
              <span>{item.question}</span>
            </div>
            <div className="question-a">
              <span className="q-pill a">A</span>
              <span>{item.answer}</span>
            </div>
          </div>
        )) : <p className="muted-text">No questions available.</p>}
      </div>
    </div>
  );
};

export default QuestionsCard;