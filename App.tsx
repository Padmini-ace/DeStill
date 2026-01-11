import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Sparkles, ArrowRight } from "lucide-react";

export default function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const distillChaos = async () => {
    setLoading(true);
    try {
      // 1. Fetch key from Vite environment
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `Distill this messy thought into one priority and one next step: ${input}`;
      const response = await model.generateContent(prompt);
      setResult(response.response.text());
    } catch (error) {
      console.error("Distill Error:", error);
      alert("Failed to distill. Check your API key in Vercel!");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen p-8 max-w-2xl mx-auto">
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-slate-900">DeStill</h1>
        <p className="text-slate-500">Chaos to Clarity in one click.</p>
      </header>

      <div className="space-y-4">
        <label htmlFor="chaos-input" className="block font-medium text-slate-700">What's on your mind?</label>
        <textarea
          id="chaos-input" // Fixed the ID warning!
          name="chaos-input" // Fixed the Name warning!
          className="w-full h-40 p-4 rounded-xl border border-slate-200 bg-white shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          placeholder="I have an exam, I need to workout, and I'm stressed about..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        
        <button 
          onClick={distillChaos}
          disabled={loading || !input}
          className="w-full bg-slate-900 text-white p-4 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-slate-800 disabled:opacity-50"
        >
          {loading ? "Distilling..." : <><Sparkles size={20} /> Distill</>}
        </button>
      </div>

      {result && (
        <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-100 animate-in fade-in slide-in-from-bottom-4">
          <p className="text-blue-900 whitespace-pre-wrap">{result}</p>
        </div>
      )}
    </div>
  );
}