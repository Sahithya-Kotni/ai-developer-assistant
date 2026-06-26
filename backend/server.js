require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { GoogleGenAI } = require("@google/genai");

const app = express();

app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const PORT = 5000;

app.post("/api/analyze", async (req, res) => {
  try {
    const { code, question, responseStyle } = req.body;

    let levelInstruction = "";

    if (responseStyle === "Beginner") {
      levelInstruction = "Explain in simple words suitable for beginners.";
    } else if (responseStyle === "Intermediate") {
      levelInstruction = "Explain with moderate technical depth.";
    } else {
      levelInstruction =
        "Provide an advanced software engineering explanation.";
    }

    const prompt = `
You are an AI Developer Assistant.

${levelInstruction}

Question:
${question}

Code:
${code}

Instructions:
- Respond ONLY in this format.

Purpose:
- ...

How it works:
- ...

Complexity:
- Time: O(...)
- Space: O(...)

- Maximum 100 words.
- Do not write paragraphs.
- Use bullet points.
- Do not add examples unless asked.
- Explain only what the user asked.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: prompt,
      config: {
        maxOutputTokens: 200,
        temperature: 0.3,
      },
    });

    res.json({
      response: response.text,
    });

  } catch (error) {
    console.error("FULL ERROR:");
    console.error(error);

    if (error.status === 429) {
      return res.status(429).json({
        response:
          "❌ Gemini API quota exceeded. Please try again later or tomorrow.",
      });
    }

    if (error.status === 401) {
      return res.status(401).json({
        response:
          "❌ Invalid Gemini API key. Please check your API key.",
      });
    }

    if (error.status ===400) {
      return res.status(400).json({
        response:
          "❌ Invalid request sent to Gemini API.",
      });
    }

    return res.status(500).json({
      response:
        "❌ Internal Server Error. Please try again.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});