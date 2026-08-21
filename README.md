# ResumeAI — AI Resume Builder (MERN Stack)

A full-stack resume builder with AI-assisted writing, built with MongoDB, Express, React, and Node.js.
White + light-green UI, fully responsive, with a navbar (Home / About / Testimonials / Contact),
a guided resume builder (personal info, experience, projects, education, skills), a live preview,
and one-click PDF download.

## Project structure

```
mern-ai-resume-builder/
├── client/     React (Vite) frontend
└── server/     Express + MongoDB backend
```

## Features

- 🔐 JWT authentication (register/login)
- 📝 Guided resume builder: personal info, experience, projects, education, skills
- ✨ AI assistant: generates summaries, bullet points, and skill suggestions
  (uses OpenAI if `OPENAI_API_KEY` is set, otherwise falls back to built-in suggestions
  so the app works out of the box)
- 👀 Live resume preview as you type
- ⬇ One-click PDF download (client-side, via jsPDF + html2canvas)
- 📱 Fully responsive navbar and layout, white/light-green design system
- 💾 Multiple saved resumes per user (dashboard)
- 📬 Contact form wired to the backend

## Prerequisites

- Node.js 18+
- A MongoDB database (local install or a free MongoDB Atlas cluster)
- (Optional) An OpenAI API key for real AI-generated suggestions

## 1. Backend setup

```bash
cd server
cp .env.example .env
# edit .env: set MONGO_URI, JWT_SECRET, and optionally OPENAI_API_KEY
npm install
npm run dev
```

The API runs on `http://localhost:5000` by default.

## 2. Frontend setup

```bash
cd client
npm install
npm run dev
```

The app runs on `http://localhost:5173` and proxies `/api` requests to the backend.

## 3. Using the app

1. Open `http://localhost:5173`, click **Get started**, and create an account.
2. From the **Dashboard**, click **New resume**.
3. Fill in Personal Info, Experience, Projects, Education, and Skills.
4. Click **✨ Ask AI** next to the summary or any description field to get AI-written suggestions,
   then **Use this** to apply one.
5. Your resume autosaves as you type. Click **Download PDF** any time to export it.

## Environment variables (server/.env)

| Variable         | Description                                      |
|-------------------|--------------------------------------------------|
| `PORT`            | API port (default 5000)                          |
| `MONGO_URI`       | MongoDB connection string                         |
| `JWT_SECRET`      | Secret used to sign auth tokens                    |
| `OPENAI_API_KEY`  | Optional — enables real AI suggestions            |
| `CLIENT_URL`      | Frontend origin, for CORS (default `http://localhost:5173`) |

## Notes

- Without `OPENAI_API_KEY`, the `/api/ai/generate` endpoint still responds with useful
  template-based suggestions, so the whole flow is testable without any paid API.
- To deploy: host `server/` (e.g. Render, Railway) with a MongoDB Atlas URI, then host
  `client/` (e.g. Vercel, Netlify) and point its API calls at your deployed backend URL.
