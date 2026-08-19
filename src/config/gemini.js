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

  // INTRO
  if (prompt.includes("who are you")) {
    return "I am an AI chatbot built using React and Gemini API.";
  }

  if (prompt.includes("your name")) {
    return "I am Gemini AI Clone 🤖 built by a CSE student.";
  }

  // WEB DEVELOPMENT
  if (prompt.includes("what is react")) {
    return "React is a JavaScript library used to build user interfaces and interactive web applications.";
  }

  if (prompt.includes("what is node")) {
    return "Node.js allows JavaScript to run outside the browser, commonly on the server side.";
  }

  if (prompt.includes("what is express")) {
    return "Express.js is a backend framework for Node.js used to build APIs and web servers.";
  }

  if (prompt.includes("what is mongodb")) {
    return "MongoDB is a NoSQL database that stores data in flexible document-based structures.";
  }

  if (prompt.includes("what is mern")) {
    return "MERN stands for MongoDB, Express.js, React, and Node.js.";
  }

  // PROGRAMMING
  if (prompt.includes("what is javascript")) {
    return "JavaScript is a programming language widely used for building interactive web applications.";
  }

  if (prompt.includes("what is python")) {
    return "Python is a popular programming language used in AI, data science, automation, and web development.";
  }

  if (prompt.includes("what is java")) {
    return "Java is an object-oriented programming language widely used for enterprise applications and Android development.";
  }

  // DSA
  if (prompt.includes("what is dsa") || prompt.includes("data structure")) {
    return "Data Structures and Algorithms help organize data and solve programming problems efficiently.";
  }

  if (prompt.includes("what is array")) {
    return "An array is a data structure used to store multiple elements in an ordered collection.";
  }

  if (prompt.includes("what is stack")) {
    return "A stack follows LIFO: Last In, First Out.";
  }

  if (prompt.includes("what is queue")) {
    return "A queue follows FIFO: First In, First Out.";
  }

  // AI
  if (prompt.includes("what is ai")) {
    return "Artificial Intelligence enables machines to perform tasks that normally require human intelligence.";
  }

  if (prompt.includes("machine learning")) {
    return "Machine Learning allows computers to learn patterns from data and make predictions or decisions.";
  }

  // PROJECT
  if (prompt.includes("project")) {
    return "This is a Gemini AI Clone built using React with Gemini API and an offline fallback system.";
  }

  if (prompt.includes("college")) {
    return "This project demonstrates AI chatbot functionality for academic purposes.";
  }

  return "⚠️ Gemini API is currently unavailable. Switched to offline AI mode.";
};


// GEMINI CHAT FUNCTION
export const runChat = async (prompt) => {
  try {
    // Check API key
    if (!import.meta.env.VITE_GEMINI_KEY) {
      throw new Error("VITE_GEMINI_KEY is missing. Check your .env file.");
    }

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return result.text || "No response from AI.";

  } catch (error) {
    console.error("Gemini API Error:", error);
    console.error("Error message:", error?.message);
    console.error("Error status:", error?.status);

    return offlineAI(prompt);
  }
};
