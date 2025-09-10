import React from 'react';

interface Enhanced4DIconProps {
  type: string;
  className?: string;
  size?: number;
}

// Enhanced 4D Icon component with glass morphism effects
export default function Enhanced4DIcon({ type, className = '', size = 24 }: Enhanced4DIconProps) {
  const baseClasses = `
    relative inline-flex items-center justify-center
    bg-gradient-to-br from-cyan-400/20 via-blue-500/30 to-purple-600/20
    backdrop-blur-lg border border-white/30 dark:border-white/10
    rounded-xl shadow-2xl
    before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent
    before:rounded-xl before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300
    transform transition-all duration-300 hover:scale-110 hover:rotate-1
    cursor-pointer group
  `;

  const iconStyle = {
    width: size,
    height: size,
  };

  const renderIcon = () => {
    switch (type) {
      case 'shield':
        return (
          <svg viewBox="0 0 24 24" fill="none" className="w-3/5 h-3/5 text-cyan-300 group-hover:text-white transition-colors">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" fill="url(#shieldGradient)" />
            <defs>
              <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="currentColor" stopOpacity="0.8" />
                <stop offset="100%" stopColor="currentColor" stopOpacity="0.4" />
              </linearGradient>
            </defs>
          </svg>
        );
      case 'lock':
        return (
          <svg viewBox="0 0 24 24" fill="none" className="w-3/5 h-3/5 text-blue-300 group-hover:text-white transition-colors">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="2" fill="url(#lockGradient)" />
            <path d="m7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="2" />
            <defs>
              <linearGradient id="lockGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="currentColor" stopOpacity="0.6" />
                <stop offset="100%" stopColor="currentColor" stopOpacity="0.2" />
              </linearGradient>
            </defs>
          </svg>
        );
      case 'brain':
        return (
          <svg viewBox="0 0 24 24" fill="none" className="w-3/5 h-3/5 text-purple-300 group-hover:text-white transition-colors">
            <path d="M9.5 2A2.5 2.5 0 0 0 7 4.5c0 .51.15 1.03.44 1.5A2.5 2.5 0 0 0 5 8.5c0 .51.15 1.03.44 1.5A2.5 2.5 0 0 0 3 12.5c0 .51.15 1.03.44 1.5A2.5 2.5 0 0 0 1 16.5C1 18.43 2.57 20 4.5 20s3.5-1.57 3.5-3.5c0-.51-.15-1.03-.44-1.5A2.5 2.5 0 0 0 10 13c.51 0 1.03.15 1.5.44.47-.29 1-.44 1.5-.44a2.5 2.5 0 0 0 2.44-1.5c-.29-.47-.44-1-.44-1.5a2.5 2.5 0 0 0 2.44-1.5c-.29-.47-.44-1-.44-1.5A2.5 2.5 0 0 0 19.5 4.5c0-1.93-1.57-3.5-3.5-3.5s-3.5 1.57-3.5 3.5c0 .51.15 1.03.44 1.5A2.5 2.5 0 0 0 9.5 2z" stroke="currentColor" strokeWidth="2" fill="url(#brainGradient)" />
            <defs>
              <linearGradient id="brainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="currentColor" stopOpacity="0.8" />
                <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
              </linearGradient>
            </defs>
          </svg>
        );
      case 'target':
        return (
          <svg viewBox="0 0 24 24" fill="none" className="w-3/5 h-3/5 text-red-300 group-hover:text-white transition-colors">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
            <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="2" fill="url(#targetGradient)" />
            <circle cx="12" cy="12" r="2" fill="currentColor" />
            <defs>
              <radialGradient id="targetGradient" cx="50%" cy="50%">
                <stop offset="0%" stopColor="currentColor" stopOpacity="0.1" />
                <stop offset="100%" stopColor="currentColor" stopOpacity="0.4" />
              </radialGradient>
            </defs>
          </svg>
        );
      case 'eye':
        return (
          <svg viewBox="0 0 24 24" fill="none" className="w-3/5 h-3/5 text-green-300 group-hover:text-white transition-colors">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" fill="url(#eyeGradient)" />
            <circle cx="12" cy="12" r="3" fill="currentColor" />
            <defs>
              <radialGradient id="eyeGradient" cx="50%" cy="50%">
                <stop offset="0%" stopColor="currentColor" stopOpacity="0.1" />
                <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
              </radialGradient>
            </defs>
          </svg>
        );
      case 'bot':
        return (
          <svg viewBox="0 0 24 24" fill="none" className="w-3/5 h-3/5 text-indigo-300 group-hover:text-white transition-colors">
            <rect x="3" y="8" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="2" fill="url(#botGradient)" />
            <path d="M12 2v6" stroke="currentColor" strokeWidth="2" />
            <circle cx="8.5" cy="14" r="1.5" fill="currentColor" />
            <circle cx="15.5" cy="14" r="1.5" fill="currentColor" />
            <defs>
              <linearGradient id="botGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="currentColor" stopOpacity="0.4" />
                <stop offset="100%" stopColor="currentColor" stopOpacity="0.1" />
              </linearGradient>
            </defs>
          </svg>
        );
      case 'zap':
        return (
          <svg viewBox="0 0 24 24" fill="none" className="w-3/5 h-3/5 text-yellow-300 group-hover:text-white transition-colors">
            <polygon points="13,2 3,14 12,14 11,22 21,10 12,10" stroke="currentColor" strokeWidth="2" fill="url(#zapGradient)" />
            <defs>
              <linearGradient id="zapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="currentColor" stopOpacity="0.8" />
                <stop offset="100%" stopColor="currentColor" stopOpacity="0.2" />
              </linearGradient>
            </defs>
          </svg>
        );
      case 'activity':
        return (
          <svg viewBox="0 0 24 24" fill="none" className="w-3/5 h-3/5 text-emerald-300 group-hover:text-white transition-colors">
            <polyline points="22,12 18,12 15,21 9,3 6,12 2,12" stroke="currentColor" strokeWidth="2" fill="none" />
          </svg>
        );
      default:
        return (
          <div className="w-3/5 h-3/5 bg-gradient-to-br from-gray-300 to-gray-500 rounded" />
        );
    }
  };

  return (
    <div className={`${baseClasses} ${className}`} style={iconStyle}>
      {renderIcon()}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/5 rounded-xl pointer-events-none" />
    </div>
  );
}