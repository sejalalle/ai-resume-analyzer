const skillDatabase = [
  "java",
  "javascript",
  "python",
  "c",
  "c++",
  "html",
  "css",
  "react",
  "node",
  "node.js",
  "express",
  "mongodb",
  "mysql",
  "sql",
  "git",
  "github",
  "bootstrap",
  "tailwind",
  "firebase",
  "rest api",
  "api",
  "mongoose"
];

const extractSkills = (text) => {
  const lowerText = text.toLowerCase();

  const foundSkills = skillDatabase.filter((skill) =>
    lowerText.includes(skill.toLowerCase())
  );

  return [...new Set(foundSkills)];
};

export default extractSkills;