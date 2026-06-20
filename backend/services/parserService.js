import fs from "fs";
import pdfParse from "pdf-parse";
import extractSkills from "../utils/extractSkills.js";

const extractEmail = (text) => {
  const match = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}/i);
  return match ? match[0] : "";
};

const extractPhone = (text) => {
  const match = text.match(/(\+91[\s-]?)?[6-9]\d{9}|\(\d{3}\)\s?\d{3}-\d{4}/);
  return match ? match[0] : "";
};

const cleanLine = (line) => {
  return line
    .replace(/[•▪◦■◆★]/g, "")
    .replace(/\s+/g, " ")
    .trim();
};

const isLikelyHeading = (line) => {
  const headings = [
    "education",
    "academic details",
    "academic background",
    "skills",
    "technical skills",
    "computer skills",
    "projects",
    "project",
    "experience",
    "work experience",
    "internship",
    "internships",
    "certifications",
    "certification",
    "courses",
    "summary",
    "objective",
    "profile",
    "achievements",
    "activities",
    "references",
    "professional profile",
    "professional accomplishments",
    "professional skills and experience",
    "work history"
  ];

  const lower = line.toLowerCase().trim();
  return headings.includes(lower);
};

const isBadLine = (line) => {
  const lower = line.toLowerCase();

  if (!line || line.length < 3) return true;

  const junkPhrases = [
    "references furnished upon request",
    "career services center",
    "resume wizard",
    "templates available online",
    "contact the career services",
    "word of caution",
    "please don’t be tempted",
    "please don't be tempted",
    "furnished upon request"
  ];

  if (junkPhrases.some((phrase) => lower.includes(phrase))) return true;

  return false;
};

const extractName = (text) => {
  const lines = text
    .split("\n")
    .map((line) => cleanLine(line))
    .filter((line) => line.length > 0);

  for (let line of lines.slice(0, 8)) {
    if (
      !line.includes("@") &&
      !/\d/.test(line) &&
      line.length >= 3 &&
      line.length <= 35 &&
      !isLikelyHeading(line)
    ) {
      return line;
    }
  }

  return "";
};

const extractSectionLines = (text, keywords, limit = 5) => {
  const lines = text
    .split("\n")
    .map((line) => cleanLine(line))
    .filter(Boolean);

  let capture = false;
  const collected = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lowerLine = line.toLowerCase();

    if (!capture && keywords.some((keyword) => lowerLine.includes(keyword))) {
      capture = true;
      continue;
    }

    if (capture && isLikelyHeading(lowerLine)) {
      break;
    }

    if (capture) {
      if (isBadLine(line)) continue;

      const words = line.split(" ").length;

      if (words >= 2 && words <= 18) {
        collected.push(line);
      }

      if (collected.length >= limit) {
        break;
      }
    }
  }

  return [...new Set(collected)];
};

const extractProjectsSmart = (text) => {
  const projectLines = extractSectionLines(text, ["projects", "project"], 4);

  return projectLines.map((line) => {
    if (line.length > 90) {
      return line.slice(0, 90) + "...";
    }
    return line;
  });
};

const extractEducationSmart = (text) => {
  return extractSectionLines(
    text,
    ["education", "academic", "academic details", "academic background"],
    4
  );
};

const extractExperienceSmart = (text) => {
  return extractSectionLines(
    text,
    ["experience", "internship", "internships", "work experience", "work history"],
    4
  );
};

const extractCertificationsSmart = (text) => {
  return extractSectionLines(
    text,
    ["certifications", "certification", "courses"],
    4
  );
};

export const parseResumePDF = async (filePath) => {
  const dataBuffer = fs.readFileSync(filePath);
  const pdfData = await pdfParse(dataBuffer);
  const text = pdfData.text || "";

  const parsedData = {
    name: extractName(text),
    email: extractEmail(text),
    phone: extractPhone(text),
    skills: extractSkills(text).slice(0, 10),
    education: extractEducationSmart(text),
    projects: extractProjectsSmart(text),
    experience: extractExperienceSmart(text),
    certifications: extractCertificationsSmart(text)
  };

  return {
    extractedText: text,
    parsedData
  };
};