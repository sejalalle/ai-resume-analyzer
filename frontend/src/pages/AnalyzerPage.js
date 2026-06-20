import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import UploadForm from "../components/UploadForm";
import ScoreCard from "../components/ScoreCard";
import ParsedDataCard from "../components/ParsedDataCard";
import SuggestionsCard from "../components/SuggestionsCard";
import RoleMatchCard from "../components/RoleMatchCard";
import QuestionsCard from "../components/QuestionsCard";
import SectionBreakdownCard from "../components/SectionBreakdownCard";
import AIInsightsCard from "../components/AIInsightsCard";

const AnalyzerPage = () => {
  const [resumeData, setResumeData] = useState(null);
  const [dashVisible, setDashVisible] = useState(false);
  const navRef  = useRef(null);
  const dashRef = useRef(null);

  // Sticky navbar
  useEffect(() => {
    const onScroll = () => {
      if (!navRef.current) return;
      navRef.current.classList.toggle("sticky", window.scrollY > 48);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Trigger dashboard fade-in after data arrives
  useEffect(() => {
    if (resumeData) {
      const t = setTimeout(() => setDashVisible(true), 60);
      return () => clearTimeout(t);
    } else {
      setDashVisible(false);
    }
  }, [resumeData]);

  // Smooth scroll to dashboard
  useEffect(() => {
    if (dashVisible && dashRef.current) {
      dashRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [dashVisible]);

  return (
    <div className="analyzer-page">
      {/* ── NAVBAR ── */}
      <nav className="navbar analyzer-nav" ref={navRef}>
        <div className="nav-logo">AI Resume Analyzer</div>
        <div className="nav-links">
          <Link to="/" className="back-home-link">← Back to Home</Link>
        </div>
      </nav>

      <div className="app-shell">
        {/* ── HERO ── */}
        <header className="hero small-hero">
          <div className="hero-left">
            <span className="hero-badge">ANALYZER DASHBOARD</span>
            <h1>Resume Analysis Dashboard</h1>
            <p className="hero-subtitle">
              Upload your resume and get a full smart analysis with scores,
              suggestions, AI summary, and interview questions.
            </p>
          </div>
        </header>

        {/* ── UPLOAD ── */}
        <UploadForm setResumeData={setResumeData} />

        {/* ── RESULTS DASHBOARD ── */}
        {resumeData && (
          <div
            ref={dashRef}
            style={{
              opacity:    dashVisible ? 1 : 0,
              transform:  dashVisible ? "translateY(0)" : "translateY(28px)",
              transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <div className="dashboard-grid top-stats">
              <ScoreCard
                title="Overall Resume Score"
                value={resumeData.analysis?.overallScore || 0}
                subtitle="Calculated from important resume sections"
                variant="blue"
              />
              <ScoreCard
                title="ATS Score"
                value={resumeData.analysis?.atsScore || 0}
                subtitle="Checks ATS-friendly structure and content"
                variant="green"
              />
              <RoleMatchCard roleAnalysis={resumeData.analysis?.roleAnalysis} />
            </div>

            <SectionBreakdownCard
              sectionBreakdown={resumeData.analysis?.sectionBreakdown}
            />

            <div className="dashboard-grid two-col-layout">
              <ParsedDataCard parsedData={resumeData.parsedData} />
              <SuggestionsCard
                suggestions={resumeData.analysis?.suggestions || []}
                missingSections={resumeData.analysis?.missingSections || []}
                aiInsights={resumeData.aiInsights}
              />
            </div>

            <AIInsightsCard aiInsights={resumeData.aiInsights} />
            <QuestionsCard interviewQuestions={resumeData.interviewQuestions} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyzerPage;