import { GoogleGenAI } from "@google/genai";
import { apikey } from "../../key";

// 1. Pass the apiKey inside the object
const ai = new GoogleGenAI({
  apiKey: apikey // Fetch key from .env file
});

async function main(text) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash", // Updated to a confirmed stable model version
      contents: text,
    });
    
    return response.text
  } catch (error) {
    console.error("Generation failed:", error);
  }
}

export {main}