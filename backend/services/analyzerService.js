import roleSkillsMap from "../utils/roleSkills.js";
import { generateAdvancedSuggestions } from "./suggestionService.js";

const calculateSectionScore = (parsedData) => {
  let score = 0;

  const sectionBreakdown = {
    contact: 0,
    skills: 0,
    education: 0,
    projects: 0,
    experience: 0,
    certifications: 0,
    formatting: 0
  };

  const hasName = parsedData.name && parsedData.name.trim() !== "";
  const hasEmail = parsedData.email && parsedData.email.trim() !== "";
  const hasPhone = parsedData.phone && parsedData.phone.trim() !== "";

  if (hasName) sectionBreakdown.contact += 5;
  if (hasEmail) sectionBreakdown.contact += 5;
  if (hasPhone) sectionBreakdown.contact += 5;

  if (parsedData.skills.length >= 5) sectionBreakdown.skills = 15;
  else if (parsedData.skills.length >= 3) sectionBreakdown.skills = 10;
  else if (parsedData.skills.length >= 1) sectionBreakdown.skills = 5;

  if (parsedData.education.length > 0) sectionBreakdown.education = 15;

  if (parsedData.projects.length >= 2) sectionBreakdown.projects = 20;
  else if (parsedData.projects.length === 1) sectionBreakdown.projects = 12;

  if (parsedData.experience.length >= 2) sectionBreakdown.experience = 15;
  else if (parsedData.experience.length === 1) sectionBreakdown.experience = 10;

  if (parsedData.certifications.length >= 1) sectionBreakdown.certifications = 10;

  const sectionCount = [
    parsedData.skills.length > 0,
    parsedData.education.length > 0,
    parsedData.projects.length > 0,
    parsedData.experience.length > 0,
    parsedData.certifications.length > 0
  ].filter(Boolean).length;

  if (sectionCount >= 4) sectionBreakdown.formatting = 10;
  else if (sectionCount >= 3) sectionBreakdown.formatting = 7;
  else if (sectionCount >= 2) sectionBreakdown.formatting = 4;

  score = Object.values(sectionBreakdown).reduce((a, b) => a + b, 0);

  return {
    overallScore: score,
    sectionBreakdown
  };
};

const detectMissingSections = (parsedData) => {
  const missingSections = [];

  if (!parsedData.name) missingSections.push("Name");
  if (!parsedData.email) missingSections.push("Email");
  if (!parsedData.phone) missingSections.push("Phone");
  if (!parsedData.skills.length) missingSections.push("Skills");
  if (!parsedData.education.length) missingSections.push("Education");
  if (!parsedData.projects.length) missingSections.push("Projects");
  if (!parsedData.experience.length) missingSections.push("Experience");
  if (!parsedData.certifications.length) missingSections.push("Certifications");

  return missingSections;
};

const calculateATSScore = (parsedData, extractedText) => {
  let atsScore = 0;
  const atsChecks = {
    contactInfo: false,
    skillsSection: false,
    educationSection: false,
    projectSection: false,
    readableLength: false,
    keywordDensity: false
  };

  if (parsedData.email && parsedData.phone) {
    atsChecks.contactInfo = true;
    atsScore += 15;
  }

  if (parsedData.skills.length > 0) {
    atsChecks.skillsSection = true;
    atsScore += 15;
  }

  if (parsedData.education.length > 0) {
    atsChecks.educationSection = true;
    atsScore += 15;
  }

  if (parsedData.projects.length > 0) {
    atsChecks.projectSection = true;
    atsScore += 15;
  }

  const wordCount = extractedText.split(/\s+/).filter(Boolean).length;
  if (wordCount >= 150 && wordCount <= 900) {
    atsChecks.readableLength = true;
    atsScore += 20;
  }

  if (parsedData.skills.length >= 4) {
    atsChecks.keywordDensity = true;
    atsScore += 20;
  }

  return { atsScore, atsChecks };
};

const calculateRoleMatch = (parsedData, selectedRole = "mern developer") => {
  const role = selectedRole.toLowerCase();
  const expectedSkills = roleSkillsMap[role] || roleSkillsMap["mern developer"];

  const resumeSkillsLower = parsedData.skills.map((skill) => skill.toLowerCase());

  const matchedSkills = expectedSkills.filter((skill) =>
    resumeSkillsLower.includes(skill.toLowerCase())
  );

  const missingRoleSkills = expectedSkills.filter(
    (skill) => !resumeSkillsLower.includes(skill.toLowerCase())
  );

  const roleMatchPercentage = Math.round(
    (matchedSkills.length / expectedSkills.length) * 100
  );

  return {
    selectedRole,
    matchedSkills,
    missingRoleSkills,
    roleMatchPercentage
  };
};

export const analyzeResume = (parsedData, extractedText, selectedRole) => {
  const scoreData = calculateSectionScore(parsedData);
  const missingSections = detectMissingSections(parsedData);
  const atsData = calculateATSScore(parsedData, extractedText);
  const roleAnalysis = calculateRoleMatch(parsedData, selectedRole);

  const suggestions = generateAdvancedSuggestions({
    parsedData,
    missingSections,
    roleAnalysis,
    overallScore: scoreData.overallScore
  });

  return {
    overallScore: scoreData.overallScore,
    sectionBreakdown: scoreData.sectionBreakdown,
    missingSections,
    atsScore: atsData.atsScore,
    atsChecks: atsData.atsChecks,
    roleAnalysis,
    suggestions
  };
};