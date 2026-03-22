import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_KEY,
});


  // OFFLINE AI FUNCTION

const offlineAI = (prompt) => {
  prompt = prompt.toLowerCase();

  
  if (prompt.includes("hello") || prompt.includes("hi")) {
    return "Hello 👋 How can I help you today?";
  }

  if (prompt.includes("how are you")) {
    return "I am working perfectly and ready to help you 😄";
  }

  // intro
  if (prompt.includes("who are you")) {
    return "I am an AI chatbot built using React and Gemini API.";
  }

  if (prompt.includes("your name")) {
    return "I am Gemini AI Clone 🤖 built by a CSE student.";
  }

  // web dev
  if (prompt.includes("what is react?")) {
    return "React (often called React) is a JavaScript library used to build user interfaces (UIs)—especially for web applications.It was developed by Meta and is widely used for creating fast, interactive, and dynamic websites.";
  }

  if (prompt.includes("what is node?")) {
    return "Node.js allows JavaScript to run on the server side.";
  }

  if (prompt.includes("what is express?")) {
    return "Express.js is a backend framework for Node.js used to create APIs.";
  }

  if (prompt.includes("what is mongodb?")) {
    return "MongoDB is a NoSQL database that stores data in JSON-like format.";
  }

  if (prompt.includes("what is mern?")) {
    return "MERN stack stands for MongoDB, Express, React, and Node.js.";
  }

  // programming
  if (prompt.includes("what is javascript?")) {
    return "JavaScript is used for building web applications.";
  }

  if (prompt.includes("what is python?")) {
    return "Python is widely used in AI, data science, and web development.";
  }

  if (prompt.includes("what is java?")) {
    return "Java is an object-oriented language used for enterprise and Android apps.";
  }

  // dsa
  if (prompt.includes("what is dsa?") || prompt.includes("data structure")) {
    return "Data Structures and Algorithms help solve problems efficiently.";
  }

  if (prompt.includes("what is array?")) {
    return "Array is a collection of elements stored in contiguous memory.";
  }

  if (prompt.includes("what is stack?")) {
    return "Stack follows LIFO (Last In First Out).";
  }

  if (prompt.includes("what is queue?")) {
    return "Queue follows FIFO (First In First Out).";
  }

  // AI
  if (prompt.includes("what is ai?")) {
    return "Artificial Intelligence simulates human intelligence in machines.";
  }

  if (prompt.includes("machine learning")) {
    return "Machine Learning allows systems to learn from data.";
  }

  // project
  if (prompt.includes("project")) {
    return "This is a Gemini AI Clone built using React with an offline fallback system.";
  }

  if (prompt.includes("college")) {
    return "This project demonstrates AI chatbot functionality for academic purposes.";
  }

 
  return "⚠️ API limit reached. Switched to offline AI mode.";
};


export const runChat = async (prompt) => {
  try {
    const result = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    });

    const text =
      result?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response from AI.";

    return text;

  } catch (error) {
    console.error("Gemini Error:", error);

    // fallback
    return offlineAI(prompt);
  }
};