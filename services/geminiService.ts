
import { GoogleGenAI } from "@google/genai";

// Strictly follow required initialization format
// Use process.env.API_KEY directly as specified in guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateLessonPlan = async (subject: string, grade: string, topic: string) => {
  if (!process.env.API_KEY) {
    console.error("Gemini API Key is missing. Lesson plan generation is disabled.");
    return "AI features are currently unavailable. Please check your configuration.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a detailed lesson plan for a South African ${grade} student. 
      Subject: ${subject}. 
      Topic: ${topic}. 
      Include: Learning objectives, key concepts, a 45-minute structure, and 3 practice questions suitable for CAPS/IEB curriculum.`,
      config: {
        temperature: 0.7,
        topP: 0.95,
      }
    });
    return response.text || "I'm sorry, I couldn't generate a lesson plan at this moment.";
  } catch (error) {
    console.error("Error generating lesson plan:", error);
    return "Error: Unable to connect to AI services. Please try again later.";
  }
};

export const chatWithAITutor = async (history: { role: 'user' | 'model', parts: { text: string }[] }[], message: string) => {
  if (!process.env.API_KEY) {
    console.error("Gemini API Key is missing. AI Buddy chat is disabled.");
    return "The Study Buddy is currently offline due to a missing API configuration.";
  }

  try {
    const chatWithHistory = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: "You are 'TutorConnect AI', a helpful and encouraging South African tutor. You are expert in the CAPS and IEB curricula. Assist students with their homework and explain complex concepts simply. Use South African English and occasional local references to make the student feel at home.",
      },
      history: history.length > 0 ? history : undefined,
    });

    const result = await chatWithHistory.sendMessage({ message });
    return result.text || "I'm sorry, I'm having trouble thinking right now.";
  } catch (error) {
    console.error("Error in AI tutor chat:", error);
    return "I'm experiencing some technical difficulties. Let's try again in a bit!";
  }
};
