import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const navRef = useRef(null);

  // Glassmorphism sticky navbar
  useEffect(() => {
    const onScroll = () => {
      if (!navRef.current) return;
      navRef.current.classList.toggle("sticky", window.scrollY > 48);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-triggered reveal: pause animations until element enters viewport
  useEffect(() => {
    const targets = document.querySelectorAll(
      ".feature-card, .step-card, .section-heading, .cta-box"
    );
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.style.animationPlayState = "running";
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    targets.forEach((el) => {
      el.style.animationPlayState = "paused";
      io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const features = [
    { icon: "◈", title: "Resume Parsing",       desc: "Extracts name, email, phone, skills, education, projects, experience, and certifications." },
    { icon: "◉", title: "Resume & ATS Scoring", desc: "Gives a complete score and checks how ATS-friendly your resume is." },
    { icon: "◎", title: "Role Match Analysis",  desc: "Compares your skills with the selected job role and shows missing skills." },
    { icon: "✦", title: "AI Summary",           desc: "Gemini generates a professional summary, strengths, weaknesses, and guidance." },
    { icon: "◆", title: "Suggestions Dashboard",desc: "Shows what needs improvement in simple language for easy understanding." },
    { icon: "◇", title: "Interview Questions",  desc: "Generates role-based, skill-based, project-based, and HR questions with answers." },
  ];

  const steps = [
    { n: "01", title: "Upload Resume",      desc: "Select a PDF resume and choose your target role." },
    { n: "02", title: "System Parses Data", desc: "Backend extracts sections and important information from the resume." },
    { n: "03", title: "AI + Rule Analysis", desc: "Scores, ATS checks, role matching, and Gemini insights are generated." },
    { n: "04", title: "View Dashboard",     desc: "See complete analysis, suggestions, summary, and interview preparation." },
  ];

  return (
    <div className="home-page">
      {/* ── NAVBAR ── */}
      <nav className="navbar" ref={navRef}>
        <div className="nav-logo">AI Resume Analyzer</div>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#how-it-works">How it Works</a>
          <Link to="/analyzer" className="nav-btn">Open Analyzer</Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-badge">MERN + GEMINI PROJECT</span>
          <h1>
            Build <em>Better</em> Resumes with AI‑Powered Analysis
          </h1>
          <p>
            Upload your resume, get ATS score, role match, strengths,
            weaknesses, improvement suggestions, and interview questions —
            all in one intelligent dashboard.
          </p>
          <div className="hero-actions">
            <Link to="/analyzer" className="primary-hero-btn">
              Start Analyzing →
            </Link>
            <a href="#features" className="secondary-hero-btn">
              Explore Features
            </a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="floating-card card-one">
            <h3>Resume Score</h3>
            <p>82/100</p>
          </div>
          <div className="floating-card card-two">
            <h3>ATS Score</h3>
            <p>78/100</p>
          </div>
          <div className="floating-card card-three">
            <h3>Role Match</h3>
            <p>Frontend Dev — 74%</p>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="features-section" id="features">
        <div className="section-heading">
          <h2>Project Features</h2>
          <p>A complete AI resume analysis system designed for students and job seekers.</p>
        </div>
        <div className="feature-grid">
          {features.map((f, i) => (
            <div className="feature-card" key={i}>
              <div className="feature-icon"
                style={{ fontSize: 20, color: "var(--accent)", fontStyle: "normal" }}>
                {f.icon}
              </div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="how-section" id="how-it-works">
        <div className="section-heading">
          <h2>How It Works</h2>
          <p>Simple 4-step working process.</p>
        </div>
        <div className="steps-grid">
          {steps.map((s, i) => (
            <div className="step-card" key={i}>
              <div className="step-number">{s.n}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section">
        <div className="cta-box">
          <h2>Ready to analyze your resume?</h2>
          <p>Open the analyzer dashboard and test your resume live.</p>
          <Link to="/analyzer" className="primary-hero-btn">
            Go to Analyzer →
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;