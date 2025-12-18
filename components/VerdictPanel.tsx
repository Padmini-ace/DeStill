import React from 'react';
import { VerdictParsed } from '../types';

interface VerdictPanelProps {
  rawText: string;
}

const parseVerdict = (text: string): VerdictParsed => {
  const sections = {
    topPriority: '',
    whyThisMatters: '',
    whatCanWait: '',
    firstAction: ''
  };

  // Simple regex parsing based on the strict headers
  const priorityMatch = text.match(/Top Priority:\s*([\s\S]*?)(?=Why this matters now:|$)/i);
  const whyMatch = text.match(/Why this matters now:\s*([\s\S]*?)(?=What can wait:|$)/i);
  const waitMatch = text.match(/What can wait:\s*([\s\S]*?)(?=First action:|$)/i);
  const actionMatch = text.match(/First action:\s*([\s\S]*?)(?=$)/i);

  if (priorityMatch) sections.topPriority = priorityMatch[1].trim();
  if (whyMatch) sections.whyThisMatters = whyMatch[1].trim();
  if (waitMatch) sections.whatCanWait = waitMatch[1].trim();
  if (actionMatch) sections.firstAction = actionMatch[1].trim();

  // Fallback if parsing fails heavily (shouldn't with good system prompt)
  if (!sections.topPriority) sections.topPriority = text;

  return sections;
};

const VerdictPanel: React.FC<VerdictPanelProps> = ({ rawText }) => {
  const verdict = parseVerdict(rawText);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-12 animate-fadeIn fade-in">
      
      {/* Top Priority - Dominates the UI */}
      <section className="text-center space-y-4">
        <h2 className="text-[#8C7326] text-xs font-bold tracking-[0.2em] uppercase">Top Priority</h2>
        <div className="text-3xl md:text-4xl leading-tight font-serif text-[#D4AF37] drop-shadow-md">
          {verdict.topPriority}
        </div>
        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-8 opacity-50"></div>
      </section>

      {/* Why this matters */}
      <section className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-6 text-left items-start border-l border-[#1E293B] pl-6 md:pl-0 md:border-l-0">
        <h3 className="text-[#8C7326] text-xs font-bold tracking-widest uppercase mt-1.5 md:text-right">Why Now</h3>
        <p className="text-slate-300 leading-relaxed font-light text-lg">
          {verdict.whyThisMatters}
        </p>
      </section>

      {/* What can wait */}
      <section className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-6 text-left items-start border-l border-[#1E293B] pl-6 md:pl-0 md:border-l-0 opacity-70">
        <h3 className="text-[#8C7326] text-xs font-bold tracking-widest uppercase mt-1.5 md:text-right">Ignore</h3>
        <p className="text-slate-400 leading-relaxed font-light text-lg">
          {verdict.whatCanWait}
        </p>
      </section>

      {/* First Action */}
      <section className="bg-[#0B1526] border border-[#D4AF37]/30 p-8 rounded-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-[#D4AF37]"></div>
        <div className="flex flex-col md:flex-row gap-6 md:items-center">
          <h3 className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase whitespace-nowrap min-w-[120px]">
            First Action
          </h3>
          <p className="text-white text-xl font-serif leading-snug">
            {verdict.firstAction}
          </p>
        </div>
      </section>

    </div>
  );
};

export default VerdictPanel;