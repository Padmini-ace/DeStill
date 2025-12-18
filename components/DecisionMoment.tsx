import React, { useEffect, useState } from 'react';
import { LOADING_MESSAGES } from '../constants';

const DecisionMoment: React.FC = () => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 2000); // Change message every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-64 space-y-6 fade-in">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-t-2 border-[#D4AF37] rounded-full animate-spin"></div>
        <div className="absolute inset-2 border-r-2 border-[#8C7326] rounded-full animate-spin reverse-spin" style={{ animationDirection: 'reverse', animationDuration: '3s' }}></div>
      </div>
      <p className="text-[#D4AF37] text-lg font-serif tracking-widest uppercase opacity-80 animate-pulse">
        {LOADING_MESSAGES[messageIndex]}
      </p>
    </div>
  );
};

export default DecisionMoment;