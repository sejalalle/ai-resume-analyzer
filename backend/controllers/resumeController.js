import fs from "fs";
import Resume from "../models/Resume.js";
import { parseResumePDF } from "../services/parserService.js";
import { analyzeResume } from "../services/analyzerService.js";
import {
  generateAIResumeInsights,
  getFallbackAIResumeInsights
} from "../services/geminiService.js";

export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const selectedRole = req.body.selectedRole || "mern developer";

    const { extractedText, parsedData } = await parseResumePDF(req.file.path);
    const analysis = analyzeResume(parsedData, extractedText, selectedRole);

    let geminiResult = getFallbackAIResumeInsights(selectedRole);

    try {
      geminiResult = await generateAIResumeInsights({
        parsedData,
        extractedText,
        selectedRole,
        analysis
      });
    } catch (geminiError) {
      console.error("Gemini API error:", geminiError.message);
      geminiResult = getFallbackAIResumeInsights(selectedRole);
    }

    const newResume = await Resume.create({
      fileName: req.file.originalname,
      extractedText,
      parsedData,
      analysis,
      aiInsights: {
        aiSummary: geminiResult.aiSummary || "",
        strengths: geminiResult.strengths || [],
        weaknesses: geminiResult.weaknesses || [],
        aiSuggestions: geminiResult.aiSuggestions || [],
        improvedProjectBullets: geminiResult.improvedProjectBullets || []
      },
      interviewQuestions: geminiResult.interviewQuestions || {
        roleQuestions: [],
        skillQuestions: [],
        projectQuestions: [],
        hrQuestions: []
      }
    });

    if (req.file?.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.status(201).json({
      message: "Resume uploaded and analyzed successfully",
      resume: newResume
    });
  } catch (error) {
    console.error("Upload error:", error.message);

    if (req.file?.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({
      message: "Server error while processing resume",
      error: error.message
    });
  }
};

export const getAllResumes = async (req, res) => {
  try {
    const resumes = await Resume.find().sort({ createdAt: -1 });
    res.status(200).json(resumes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching resumes" });
  }
};

export const getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    res.status(200).json(resume);
  } catch (error) {
    res.status(500).json({ message: "Error fetching resume" });
  }
};