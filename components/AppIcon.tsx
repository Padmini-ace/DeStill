import React from 'react';

const AppIcon: React.FC<{ className?: string }> = ({ className = "w-20 h-20" }) => {
  return (
    <svg 
      viewBox="0 0 200 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      <defs>
        <radialGradient id="dropGradient" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(100 130) rotate(90) scale(60)">
          <stop offset="0%" stopColor="#FFF7CC" />
          <stop offset="40%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#5C4D18" />
        </radialGradient>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <linearGradient id="rippleGradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#D4AF37" stopOpacity="0" />
          <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
        </linearGradient>
      </defs>
      
      {/* Animated Ripples (Water Disruption Effect) */}
      <g>
        {/* Ripple 1 */}
        <ellipse cx="100" cy="165" rx="10" ry="3" stroke="url(#rippleGradient)" strokeWidth="1" opacity="0">
          <animate attributeName="rx" values="10;85" dur="4s" repeatCount="indefinite" begin="0s" />
          <animate attributeName="ry" values="3;22" dur="4s" repeatCount="indefinite" begin="0s" />
          <animate attributeName="opacity" values="0;0.7;0" dur="4s" repeatCount="indefinite" begin="0s" />
          <animate attributeName="stroke-width" values="2;0.5" dur="4s" repeatCount="indefinite" begin="0s" />
        </ellipse>
        
        {/* Ripple 2 */}
        <ellipse cx="100" cy="165" rx="10" ry="3" stroke="url(#rippleGradient)" strokeWidth="1" opacity="0">
          <animate attributeName="rx" values="10;85" dur="4s" repeatCount="indefinite" begin="1.3s" />
          <animate attributeName="ry" values="3;22" dur="4s" repeatCount="indefinite" begin="1.3s" />
          <animate attributeName="opacity" values="0;0.7;0" dur="4s" repeatCount="indefinite" begin="1.3s" />
          <animate attributeName="stroke-width" values="2;0.5" dur="4s" repeatCount="indefinite" begin="1.3s" />
        </ellipse>
        
        {/* Ripple 3 */}
        <ellipse cx="100" cy="165" rx="10" ry="3" stroke="url(#rippleGradient)" strokeWidth="1" opacity="0">
          <animate attributeName="rx" values="10;85" dur="4s" repeatCount="indefinite" begin="2.6s" />
          <animate attributeName="ry" values="3;22" dur="4s" repeatCount="indefinite" begin="2.6s" />
          <animate attributeName="opacity" values="0;0.7;0" dur="4s" repeatCount="indefinite" begin="2.6s" />
          <animate attributeName="stroke-width" values="2;0.5" dur="4s" repeatCount="indefinite" begin="2.6s" />
        </ellipse>
      </g>

      {/* Main Drop */}
      <path 
        d="M100 40 C100 40 145 100 145 130 C145 154.853 124.853 175 100 175 C75.1472 175 55 154.853 55 130 C55 100 100 40 100 40 Z" 
        fill="url(#dropGradient)"
        filter="url(#glow)"
      />
      
      {/* Sharp Highlight */}
      <path 
        d="M85 115 Q90 135 80 150" 
        stroke="white" 
        strokeWidth="2" 
        strokeOpacity="0.4" 
        strokeLinecap="round" 
      />
      
      {/* Top Sparkle */}
      <circle cx="100" cy="40" r="1.5" fill="white" opacity="0.8">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="3s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
};

export default AppIcon;