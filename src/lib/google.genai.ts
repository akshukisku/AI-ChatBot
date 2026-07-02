import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API });

export async function GenAIResponse(language: string, context: string) {
  const systemPrompt =
    language === "Bengali"
      ? "You are a Helpful AI Assisstant. Always Reply in Bengali Language"
      : "You are a Helpful AI Assisstant. Always Reply in English Language";

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `${systemPrompt} user:${context}`,
  });

  return response?.text || "";
}
