# 🤖 AI Developer Assistant

An AI-powered web application that helps developers understand, debug, optimize, and analyze source code using Google's Gemini AI.

## 🌐 Live Demo

https://ai-developer-assistant-bl65g9tv3-sahithya05.vercel.app/

## 🚀 Features

- 🧠 AI-powered code explanation
- 🐞 Bug detection and debugging suggestions
- ⚡ Code optimization recommendations
- 📊 Time & Space Complexity analysis
- 🌍 Multiple programming language support
- 🎯 Beginner, Intermediate & Advanced response styles
- 📋 Copy AI response
- ⬇ Download AI response
- 🔒 Secure backend with environment variables

## 🛠 Tech Stack

### Frontend
- React
- Vite
- Monaco Editor
- CSS

### Backend
- Node.js
- Express.js

### AI
- Google Gemini 3.1 Flash Lite API

## 📂 Project Structure

```
ai-developer-assistant
│
├── backend
│   ├── server.js
│   └── .env
│
├── src
│   ├── components
│   └── App.jsx
│
├── public
├── package.json
└── vite.config.js
```

## ⚙ Installation

Clone the repository
```bash
git clone https://github.com/Sahithya-Kotni/ai-developer-assistant.git
```

Install dependencies
```bash
npm install
```

Install backend dependencies
```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder:
```
GEMINI_API_KEY=YOUR_API_KEY
```

Run backend
```bash
node server.js
```

Run frontend
```bash
npm run dev
```

## 📈 Future Improvements

- Authentication
- Chat History
- PDF Export
- Code Sharing
