import React, { useState } from "react";
import API from "../api";

const ROLES = [
  { value: "mern developer",       label: "MERN Developer"       },
  { value: "frontend developer",   label: "Frontend Developer"   },
  { value: "backend developer",    label: "Backend Developer"    },
  { value: "java developer",       label: "Java Developer"       },
  { value: "full stack developer", label: "Full Stack Developer" },
];

const UploadForm = ({ setResumeData }) => {
  const [file, setFile]               = useState(null);
  const [selectedRole, setSelectedRole] = useState("mern developer");
  const [loading, setLoading]         = useState(false);
  const [message, setMessage]         = useState("");
  const [isSuccess, setIsSuccess]     = useState(false);
  const [drag, setDrag]               = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) { setMessage("Please select a PDF resume first."); setIsSuccess(false); return; }

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("selectedRole", selectedRole);

    try {
      setLoading(true); setMessage("");
      const response = await API.post("/resumes/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResumeData(response.data.resume);
      setMessage("Resume uploaded and analyzed successfully.");
      setIsSuccess(true);
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || "Upload failed.");
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card upload-card">
      <div className="card-title-wrap">
        <h2>Upload Resume</h2>
        <p className="card-subtext">Select a PDF resume and choose a target role to analyze.</p>
      </div>

      <div className="upload-grid">
        <div className="form-group">
          <label>Resume PDF</label>
          <div
            className={`drop-zone ${drag ? "dragover" : ""} ${file ? "has-file" : ""}`}
            onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
            onDragLeave={() => setDrag(false)}
            onDrop={(e) => {
              e.preventDefault(); setDrag(false);
              const f = e.dataTransfer.files[0];
              if (f?.type === "application/pdf") setFile(f);
            }}
          >
            <input type="file" accept=".pdf" onChange={(e) => setFile(e.target.files[0])} />
            {file ? (
              <span className="drop-zone-filename">📄 {file.name}</span>
            ) : (
              <>
                <span className="drop-zone-icon">📄</span>
                <p className="drop-zone-text"><strong>Click to upload</strong> or drag & drop</p>
                <p className="drop-zone-hint">PDF only</p>
              </>
            )}
          </div>
        </div>

        <div className="form-group">
          <label>Target Role</label>
          <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
            {ROLES.map(({ value, label }) => <option key={value} value={value}>{label}</option>)}
          </select>
        </div>
      </div>

      <button className="primary-btn" onClick={handleSubmit} disabled={loading}>
        {loading ? <><span className="btn-spinner" /> Analyzing Resume...</> : "Upload and Analyze →"}
      </button>

      {message && (
        <div className={`status-message ${isSuccess ? "success" : "error"}`}>
          <span className={`status-dot ${isSuccess ? "success" : "error"}`} />
          {message}
        </div>
      )}
    </div>
  );
};

export default UploadForm;