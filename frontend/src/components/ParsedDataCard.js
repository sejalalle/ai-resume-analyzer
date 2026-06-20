import React from "react";

const InfoBox = ({ label, value }) => (
  <div className="info-box">
    <p className="info-label">{label}</p>
    <p className="info-value">{value || "Not found"}</p>
  </div>
);

const TagWrap = ({ items }) =>
  !items || items.length === 0
    ? <p className="muted-text">Not found</p>
    : <div className="tag-wrap">{items.map((item, i) => <span className="tag" key={i}>{item}</span>)}</div>;

const SimpleList = ({ items }) =>
  !items || items.length === 0
    ? <p className="muted-text">Not found</p>
    : <ul className="clean-list">{items.map((item, i) => <li key={i}>{item}</li>)}</ul>;

const ParsedDataCard = ({ parsedData }) => {
  if (!parsedData) return null;
  return (
    <div className="card">
      <div className="card-title-wrap">
        <h2>Resume Overview</h2>
        <p className="card-subtext">Main details extracted from the uploaded resume.</p>
      </div>
      <div className="info-grid">
        <InfoBox label="Name"  value={parsedData.name} />
        <InfoBox label="Email" value={parsedData.email} />
        <InfoBox label="Phone" value={parsedData.phone} />
      </div>
      <div className="section-box"><h3>Skills</h3><TagWrap items={parsedData.skills} /></div>
      <div className="section-box"><h3>Education</h3><SimpleList items={parsedData.education} /></div>
      <div className="section-box"><h3>Projects</h3><SimpleList items={parsedData.projects} /></div>
      <div className="section-box"><h3>Experience</h3><SimpleList items={parsedData.experience} /></div>
      <div className="section-box"><h3>Certifications</h3><SimpleList items={parsedData.certifications} /></div>
    </div>
  );
};

export default ParsedDataCard;