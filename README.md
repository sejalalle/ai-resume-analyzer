# AI Resume Analyzer 🚀

An AI-powered Resume Analysis platform built using the MERN Stack and Google Gemini AI. The application evaluates resumes, extracts skills, calculates ATS-style scores, and provides personalized improvement suggestions to help users optimize their resumes for job applications.

## ✨ Features

* 📄 Resume PDF Upload
* 🤖 AI-Powered Resume Analysis using Google Gemini API
* 🎯 ATS-Style Resume Scoring
* 🛠 Skill Extraction
* 📊 Resume Strength & Weakness Analysis
* 💡 Personalized Improvement Suggestions
* 🔍 Keyword Optimization Recommendations
* 🌐 Modern Responsive User Interface

---

## 🏗 Tech Stack

### Frontend

* React.js
* Axios
* CSS

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas

### AI Integration

* Google Gemini API

### Other Tools

* Multer
* PDF-Parse
* CORS

---

## 📸 Screenshots

### Home Page

(Add Screenshot Here)

### Resume Upload

(Add Screenshot Here)

### Analysis Results

(Add Screenshot Here)

---

## 🚀 Live Demo

Frontend:

```text
https://your-vercel-url.vercel.app
```

Backend:

```text
https://your-render-url.onrender.com
```

---

## 📂 Project Structure

```bash
AI-Resume-Analyzer/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── config/
│   ├── routes/
│   ├── controllers/
│   ├── uploads/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/sejalalle/ai-resume-analyzer.git
cd ai-resume-analyzer
```

---

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

GEMINI_API_KEY=your_google_gemini_api_key
```

Start Backend:

```bash
npm run dev
```

---

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

Application runs at:

```text
http://localhost:3000
```

---

## 🔥 How It Works

1. User uploads a resume PDF.
2. PDF content is extracted using PDF-Parse.
3. Resume text is sent to Google Gemini API.
4. AI analyzes:

   * Skills
   * ATS compatibility
   * Missing keywords
   * Resume quality
5. Results are displayed with score and recommendations.

---

## 📈 Future Enhancements

* Multiple Resume Templates
* Resume Builder
* Job Description Matching
* Resume Comparison
* Authentication & User Dashboard
* Resume History Tracking
* Download Optimized Resume

---

## 👨‍💻 Author

**Sejal Alle**

* GitHub: https://github.com/sejalalle
* LinkedIn: Add Your LinkedIn URL

---

## ⭐ Support

If you found this project useful, please consider giving it a ⭐ on GitHub.
