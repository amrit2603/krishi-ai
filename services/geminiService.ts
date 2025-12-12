import { GoogleGenAI, Type } from "@google/genai";
import { DiagnosisResult } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

// Helper to convert file to base64
export const fileToGenerativePart = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
      const base64Data = base64String.split(',')[1];
      resolve(base64Data);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const analyzePlantDisease = async (base64Image: string, language: string = 'English'): Promise<DiagnosisResult> => {
  if (!apiKey) throw new Error("API Key is missing");

  const prompt = `You are an expert plant pathologist. Analyze this image of a plant leaf. 
  Identify the specific disease if present, or confirm if it is healthy.
  Provide treatments (chemical and organic) and prevention methods.
  IMPORTANT: Respond strictly in ${language} language.
  Return strictly JSON matching the schema.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: base64Image
            }
          },
          { text: prompt }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            diseaseName: { type: Type.STRING },
            confidence: { type: Type.NUMBER, description: "Confidence score between 0 and 100" },
            isHealthy: { type: Type.BOOLEAN },
            description: { type: Type.STRING, description: "Short diagnosis description" },
            treatments: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "List of recommended treatments (organic and chemical)" 
            },
            preventions: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["diseaseName", "confidence", "isHealthy", "description", "treatments", "preventions"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as DiagnosisResult;
    }
    throw new Error("No response text generated");
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
};

export const chatWithBotanist = async (message: string, language: string, context?: string): Promise<string> => {
  if (!apiKey) return "Error: API Key missing.";
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `You are a helpful agricultural assistant for farmers. 
      Keep answers short, practical, and easy to understand.
      IMPORTANT: Respond in ${language} language.
      User asks: ${message}
      ${context ? `Context: ${context}` : ''}`
    });
    return response.text || "I couldn't generate a response.";
  } catch (error) {
    console.error("Chat Error:", error);
    return "Sorry, I am having trouble connecting to the server.";
  }
};
