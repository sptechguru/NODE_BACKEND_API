const express = require("express");
require("dotenv").config();
const dotenvFlow = require("dotenv-flow");
dotenvFlow.config();
const router = new express.Router();
const fetch = require("node-fetch");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.CHAT_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//////////////////Add Ai chatBoat Features///////////////////////

const SYSTEM_PROMPT = `You are an AI assistant embedded in Santosh Pal's developer portfolio website.
Santosh is a JavaScript Full Stack Developer skilled in React.js, Node.js, Express, MongoDB, and more.
Answer visitor questions about Santosh's work, skills, and projects in a friendly, concise tone.
If asked something unrelated, gently steer back to portfolio-related topics.
Keep responses short and readable — ideally 2-4 sentences unless a detailed list is requested.`;

router.post("/ai-chatBoat", async (req, res) => {
  const { messages } = req.body;
  console.log("Received messages for AI chatBoat:", messages);
  console.log("Anthropic API Key:", process.env.OPENROUTEKEY);
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "messages array is required" });
  }
  try {
    const apiBaseUrl = "https://api.anthropic.com/v1/messages";
    const OPENROUTERURL = "https://openrouter.ai/api/v1/chat/completions"
    const response = await fetch(OPENROUTERURL,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENROUTEKEY}`,
        // "x-api-key": process.env.ANTHROPIC_API_KEY,
        // "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        // model: "claude-3-sonnet-20240229",
        // model: "claude-sonnet-4-20250514",
        // model:"mistralai/mistral-7b-instruct", // ✅ FREE
        // "model": "mistral/mistral-7b-instruct",
        // // max_tokens: 1000,
          system: SYSTEM_PROMPT,
          model: "meta-llama/llama-3-8b-instruct", // ✅ FIXED
          messages:messages.map((msg) => ({   // antrophic 
          role: msg.role,
          content: msg.content,
        })),
      })
    });
    const data = await response.json();
    if (!response.ok) {
    //   console.error("Claude API error response 500:", data);
      return res.status(500).json({ error: data?.error?.message || "Api Error" });
    }
    // const reply = data?.content?.[0]?.text || "No response."; //antrophic
    const reply = data?.choices?.[0]?.message?.content || "No response from AI";
    // console.log("AI chatBoat reply:", reply);
    res.json({ reply });
  } catch (err) {
    // console.error("catch block API error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


const generte = async (prompt) => {
  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    res.status(501).send(error);
  }
};

router.post("/google-api", async (req, res) => {
  try {
    const data = req.body.question;
    const result = await generte(data);
    res.status(201).send(result);
  } catch (error) {
    res.status(501).send({
      message: "Server Error",
      error: error,
    });
  }
});

module.exports = router;

