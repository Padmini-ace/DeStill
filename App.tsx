import React, { useState, useRef, useEffect } from 'react';
import ChaosInput from './components/ChaosInput';
import DecisionMoment from './components/DecisionMoment';
import VerdictPanel from './components/VerdictPanel';
import AppIcon from './components/AppIcon';
import { AppState, FileInput, Message } from './types';
import { distillPriorities } from './services/geminiService';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [history, setHistory] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Scroll to bottom helper
  const bottomRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (appState === AppState.VERDICT) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [appState, history]);

  const handleDistill = async (text: string, files: FileInput[]) => {
    setAppState(AppState.ANALYZING);
    setError(null);

    try {
      const responseText = await distillPriorities(history, text, files);

      const newUserMessage: Message = { role: 'user', text, files };
      const newModelMessage: Message = { role: 'model', text: responseText };

      setHistory(prev => [...prev, newUserMessage, newModelMessage]);
      setAppState(AppState.VERDICT);
    } catch (err) {
      console.error(err);
      setError("De-Still encountered noise in the connection. Please try again.");
      setAppState(AppState.IDLE); // Reset to allow retry
    }
  };

  const handleReset = () => {
    setHistory([]);
    setAppState(AppState.IDLE);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#050A14] text-slate-200 selection:bg-[#D4AF37] selection:text-[#050A14] flex flex-col">
      
      {/* Background Abstract Visual */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#D4AF37] rounded-full mix-blend-overlay opacity-[0.03] blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#0B1526] rounded-full mix-blend-multiply opacity-20 blur-[80px]"></div>
      </div>

      <main className="flex-grow z-10 w-full max-w-6xl mx-auto px-6 py-8 md:py-12 flex flex-col items-center">
        
        {/* Header - Always visible but smaller when content exists */}
        <header className={`flex flex-col items-center text-center transition-all duration-700 ${history.length > 0 ? 'mb-6 scale-90 opacity-80' : 'mb-8'}`}>
          <div onClick={handleReset} className="cursor-pointer hover:opacity-80 transition-all duration-500 mb-4 hover:scale-105">
            <AppIcon className="w-20 h-20 md:w-28 md:h-28 drop-shadow-[0_0_20px_rgba(212,175,55,0.15)]" />
          </div>
          <h1 
            onClick={handleReset}
            className="text-4xl md:text-5xl font-serif font-bold text-[#D4AF37] tracking-tight cursor-pointer hover:opacity-80 transition-opacity"
          >
            De-Still
          </h1>
          <p className="text-[#8C7326] mt-3 text-sm tracking-[0.2em] uppercase">
            From chaos to clear decisions
          </p>
        </header>

        {/* Core Content Flow */}
        <div className="w-full space-y-10">
          
          {/* Initial Input State */}
          {history.length === 0 && appState === AppState.IDLE && (
            <div className="fade-in">
              <ChaosInput onDistill={handleDistill} isProcessing={false} />
              {error && (
                <p className="text-red-400 text-center mt-6 text-sm font-light">{error}</p>
              )}
            </div>
          )}

          {/* Loading State */}
          {appState === AppState.ANALYZING && (
            <DecisionMoment />
          )}

          {/* Verdict State (Latest Message) */}
          {history.length > 0 && appState === AppState.VERDICT && (
            <div className="space-y-16">
              {/* Only show the LATEST model response as the verdict */}
              <VerdictPanel rawText={history[history.length - 1].text} />
              
              <div className="w-full h-[1px] bg-[#1E293B] mx-auto"></div>

              {/* Follow up Input */}
              <ChaosInput 
                onDistill={handleDistill} 
                isProcessing={false} 
                isFollowUp={true} 
              />
            </div>
          )}

        </div>
        
        <div ref={bottomRef} />
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-[#8C7326]/40 text-xs tracking-widest z-10">
        STRATEGIC ADVISOR PROTOTYPE
      </footer>
    </div>
  );
};

export default App;