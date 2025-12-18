import { GoogleGenAI, Content } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";
import { Message } from "../types";

const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

if (!apiKey) {
  throw new Error("VITE_GOOGLE_API_KEY is missing");
}

const ai = new GoogleGenAI({ apiKey });


export const distillPriorities = async (history: Message[], newText: string, newFiles: { mimeType: string; data: string }[]) => {
  try {
    const modelId = "gemini-3-pro-preview";

    // Convert internal Message format to Gemini Content format
    const contents: Content[] = history.map(msg => {
      if (msg.role === 'user') {
        const parts: any[] = [{ text: msg.text }];
        if (msg.files) {
          msg.files.forEach(f => {
             parts.push({
               inlineData: {
                 mimeType: f.mimeType,
                 data: f.data
               }
             });
          });
        }
        return { role: 'user', parts };
      } else {
        return { role: 'model', parts: [{ text: msg.text }] };
      }
    });

    // Add the new message
    const currentParts: any[] = [{ text: newText }];
    newFiles.forEach(f => {
      currentParts.push({
        inlineData: {
          mimeType: f.mimeType,
          data: f.data
        }
      });
    });

    contents.push({ role: 'user', parts: currentParts });

    const response = await ai.models.generateContent({
      model: modelId,
      contents: contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.4, // Low temperature for consistent, authoritative tone
      }
    });

    return response.text || "De-Still could not generate a response. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};