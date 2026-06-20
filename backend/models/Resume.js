import mongoose from "mongoose";

const qaSchema = new mongoose.Schema(
  {
    question: { type: String, default: "" },
    answer: { type: String, default: "" }
  },
  { _id: false }
);

const resumeSchema = new mongoose.Schema(
  {
    fileName: {
      type: String,
      required: true
    },
    extractedText: {
      type: String,
      required: true
    },
    parsedData: {
      name: { type: String, default: "" },
      email: { type: String, default: "" },
      phone: { type: String, default: "" },
      skills: { type: [String], default: [] },
      education: { type: [String], default: [] },
      projects: { type: [String], default: [] },
      experience: { type: [String], default: [] },
      certifications: { type: [String], default: [] }
    },
    analysis: {
      overallScore: { type: Number, default: 0 },
      sectionBreakdown: {
        contact: { type: Number, default: 0 },
        skills: { type: Number, default: 0 },
        education: { type: Number, default: 0 },
        projects: { type: Number, default: 0 },
        experience: { type: Number, default: 0 },
        certifications: { type: Number, default: 0 },
        formatting: { type: Number, default: 0 }
      },
      missingSections: { type: [String], default: [] },
      atsScore: { type: Number, default: 0 },
      atsChecks: {
        contactInfo: { type: Boolean, default: false },
        skillsSection: { type: Boolean, default: false },
        educationSection: { type: Boolean, default: false },
        projectSection: { type: Boolean, default: false },
        readableLength: { type: Boolean, default: false },
        keywordDensity: { type: Boolean, default: false }
      },
      roleAnalysis: {
        selectedRole: { type: String, default: "mern developer" },
        matchedSkills: { type: [String], default: [] },
        missingRoleSkills: { type: [String], default: [] },
        roleMatchPercentage: { type: Number, default: 0 }
      },
      suggestions: { type: [String], default: [] }
    },
    aiInsights: {
      aiSummary: { type: String, default: "" },
      strengths: { type: [String], default: [] },
      weaknesses: { type: [String], default: [] },
      aiSuggestions: { type: [String], default: [] },
      improvedProjectBullets: { type: [String], default: [] }
    },
    interviewQuestions: {
      roleQuestions: { type: [qaSchema], default: [] },
      skillQuestions: { type: [qaSchema], default: [] },
      projectQuestions: { type: [qaSchema], default: [] },
      hrQuestions: { type: [qaSchema], default: [] }
    }
  },
  { timestamps: true }
);

const Resume = mongoose.model("Resume", resumeSchema);

export default Resume;