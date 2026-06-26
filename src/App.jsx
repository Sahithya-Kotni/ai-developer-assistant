import { useState } from "react";
import CodeEditor from "./components/CodeEditor";
import QuestionInput from "./components/QuestionInput";
import ResponseBox from "./components/ResponseBox";
import "./App.css";

function App() {
  const [code, setCode] = useState("");
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("python");
  const [responseStyle, setResponseStyle] = useState("Beginner");

  const tasks = [
    { title: "📝 Explain", prompt: "Explain this code in simple terms." },
    { title: "🐞 Debug", prompt: "Find bugs in this code and suggest fixes." },
    { title: "⚡ Optimize", prompt: "Optimize this code for better performance." },
    { title: "📊 Complexity", prompt: "Find the time and space complexity." },
    { title: "🔄 Convert", prompt: "Convert this code to Java." },
    { title: "✨ Best Practices", prompt: "Suggest coding best practices." }
  ];

  const handleAnalyze = async () => {
    if (!code.trim() || !question.trim()) {
      setResponse("Please enter both code and a question.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("https://ai-developer-assistant-backend.onrender.com/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
          question,
          responseStyle,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setResponse(data.response);
        setLoading(false);
        return;
      }

      setResponse(data.response);
      setLoading(false);
    } catch (error) {
      setResponse(
        "❌ Unable to connect to the backend. Please make sure the server is running."
      );
      setLoading(false);
    }
  };

  const downloadResponse = () => {
    if (!response) return;

    const blob = new Blob([response], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "AI_Response.txt";
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="container">
      <div className="card">
        <h1>🤖 AI Developer Assistant</h1>

        <p className="subtitle">
          Your personal AI coding companion powered by Gemini
        </p>

        <div className="hero-badges">
          <span>⚡ Fast</span>
          <span>🐞 Debug</span>
          <span>🚀 Optimize</span>
          <span>📚 Explain</span>
        </div>

        <label>Language</label>

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="python">Python</option>
          <option value="javascript">JavaScript</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
          <option value="c">C</option>
        </select>

        <label>Paste Code</label>

        <CodeEditor
          code={code}
          setCode={setCode}
          language={language}
        />

        <label>Response Style</label>

        <select
          value={responseStyle}
          onChange={(e) => setResponseStyle(e.target.value)}
        >
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>

        <label>Quick AI Tasks</label>

        <div className="task-grid">
          {tasks.map((task, index) => (
            <div
              className="task-card"
              key={index}
              onClick={() => setQuestion(task.prompt)}
            >
              <h3>{task.title}</h3>
            </div>
          ))}
        </div>

        <label>Question</label>

        <QuestionInput
          question={question}
          setQuestion={setQuestion}
        />

        <div className="button-group">
          <button
            className="analyze-btn"
            onClick={handleAnalyze}
            disabled={loading}
          >
            {loading ? "⏳ Analyzing..." : "🚀 Analyze Code"}
          </button>

          <button
            className="clear-btn"
            onClick={() => {
              setCode("");
              setQuestion("");
              setResponse("");
            }}
          >
            🗑 Clear
          </button>
        </div>

        <div className="response-header">
          <h2>AI Response</h2>

          <div className="response-actions">
            <button
              className="copy-btn"
              onClick={() => navigator.clipboard.writeText(response)}
            >
              📋 Copy
            </button>

            <button
              className="download-btn"
              onClick={downloadResponse}
            >
              ⬇ Download
            </button>
          </div>
        </div>

        <ResponseBox response={response} />
      </div>
    </div>
  );
}

export default App;