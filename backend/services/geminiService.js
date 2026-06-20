import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const DEFAULT_MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";
const MAX_RETRIES = 3;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const isRetryableGeminiError = (error) => {
  const message = error?.message || "";

  return (
    message.includes('"code":503') ||
    message.includes('"status":"UNAVAILABLE"') ||
    message.includes("503") ||
    message.toLowerCase().includes("high demand") ||
    message.toLowerCase().includes("unavailable")
  );
};

const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey.trim() === "") {
    throw new Error("GEMINI_API_KEY is missing in .env");
  }

  return new GoogleGenAI({ apiKey });
};

const getResponseSchema = () => ({
  type: Type.OBJECT,
  properties: {
    aiSummary: {
      type: Type.STRING
    },
    strengths: {
      type: Type.ARRAY,
      items: { type: Type.STRING }
    },
    weaknesses: {
      type: Type.ARRAY,
      items: { type: Type.STRING }
    },
    aiSuggestions: {
      type: Type.ARRAY,
      items: { type: Type.STRING }
    },
    improvedProjectBullets: {
      type: Type.ARRAY,
      items: { type: Type.STRING }
    },
    interviewQuestions: {
      type: Type.OBJECT,
      properties: {
        roleQuestions: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING },
              answer: { type: Type.STRING }
            },
            required: ["question", "answer"]
          }
        },
        skillQuestions: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING },
              answer: { type: Type.STRING }
            },
            required: ["question", "answer"]
          }
        },
        projectQuestions: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING },
              answer: { type: Type.STRING }
            },
            required: ["question", "answer"]
          }
        },
        hrQuestions: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING },
              answer: { type: Type.STRING }
            },
            required: ["question", "answer"]
          }
        }
      },
      required: [
        "roleQuestions",
        "skillQuestions",
        "projectQuestions",
        "hrQuestions"
      ]
    }
  },
  required: [
    "aiSummary",
    "strengths",
    "weaknesses",
    "aiSuggestions",
    "improvedProjectBullets",
    "interviewQuestions"
  ]
});

const buildPrompt = ({ parsedData, extractedText, selectedRole, analysis }) => {
  const limitedText = extractedText ? extractedText.slice(0, 3500) : "";

  return `
You are an expert AI resume analyzer and interview coach.

Analyze this candidate for the role: ${selectedRole}

Return ONLY valid JSON matching the given schema.

Parsed Resume Data:
${JSON.stringify(parsedData, null, 2)}

Existing Rule-Based Analysis:
${JSON.stringify(analysis, null, 2)}

Resume Text:
${limitedText}

Instructions:
1. Write a short professional AI summary in simple language.
2. Give 4 to 6 strengths.
3. Give 3 to 5 weaknesses or missing areas.
4. Give 5 to 8 practical AI suggestions.
5. Improve project bullets if projects exist.
6. Generate interview questions with short and simple answers:
   - roleQuestions
   - skillQuestions
   - projectQuestions
   - hrQuestions
7. Keep the output useful for a student project demo.
8. Do not add markdown, code fences, or extra explanation outside JSON.
`;
};

const normalizeGeminiResult = (result) => {
  return {
    aiSummary: result?.aiSummary || "",
    strengths: Array.isArray(result?.strengths) ? result.strengths : [],
    weaknesses: Array.isArray(result?.weaknesses) ? result.weaknesses : [],
    aiSuggestions: Array.isArray(result?.aiSuggestions)
      ? result.aiSuggestions
      : [],
    improvedProjectBullets: Array.isArray(result?.improvedProjectBullets)
      ? result.improvedProjectBullets
      : [],
    interviewQuestions: {
      roleQuestions: Array.isArray(result?.interviewQuestions?.roleQuestions)
        ? result.interviewQuestions.roleQuestions
        : [],
      skillQuestions: Array.isArray(result?.interviewQuestions?.skillQuestions)
        ? result.interviewQuestions.skillQuestions
        : [],
      projectQuestions: Array.isArray(result?.interviewQuestions?.projectQuestions)
        ? result.interviewQuestions.projectQuestions
        : [],
      hrQuestions: Array.isArray(result?.interviewQuestions?.hrQuestions)
        ? result.interviewQuestions.hrQuestions
        : []
    }
  };
};

export const getFallbackAIResumeInsights = (selectedRole = "mern developer") => ({
  aiSummary:
    "AI analysis is temporarily unavailable because the Gemini service is busy. Please try again shortly.",
  strengths: [
    "Basic resume parsing completed successfully",
    "Rule-based score and ATS score are still available"
  ],
  weaknesses: [
    "AI-generated strengths and weaknesses could not be fetched right now"
  ],
  aiSuggestions: [
    "Try the analysis again after a short wait",
    "Keep a clear skills section, project section, and contact details in your resume",
    `Add more keywords relevant to the selected role: ${selectedRole}`
  ],
  improvedProjectBullets: [],
  interviewQuestions: {
    roleQuestions: [],
    skillQuestions: [],
    projectQuestions: [],
    hrQuestions: []
  }
});

export const generateAIResumeInsights = async ({
  parsedData,
  extractedText,
  selectedRole,
  analysis
}) => {
  const ai = getGeminiClient();
  const prompt = buildPrompt({
    parsedData,
    extractedText,
    selectedRole,
    analysis
  });

  let lastError = null;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: DEFAULT_MODEL,
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: getResponseSchema()
        }
      });

      const rawText = response?.text?.trim();

      if (!rawText) {
        throw new Error("Gemini returned an empty response.");
      }

      const parsed = JSON.parse(rawText);
      return normalizeGeminiResult(parsed);
    } catch (error) {
      lastError = error;
      console.error(`Gemini attempt ${attempt} failed:`, error.message);

      if (!isRetryableGeminiError(error) || attempt === MAX_RETRIES) {
        break;
      }

      const delayMs = 1500 * attempt;
      await sleep(delayMs);
    }
  }

  throw new Error(lastError?.message || "Gemini request failed.");
};