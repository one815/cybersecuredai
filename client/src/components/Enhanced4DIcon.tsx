import React from 'react';

interface Enhanced4DIconProps {
  type: string;
  className?: string;
  size?: number;
  style?: React.CSSProperties;
}

// 4D Glossy Futuristic Icon Component
const Enhanced4DIcon: React.FC<Enhanced4DIconProps> = ({ type, className = '', size = 24, style }) => {
  const baseClasses = `inline-block transition-all duration-300 hover:scale-110 hover:rotate-3 transform-gpu`;
  const glassEffect = `backdrop-blur-sm bg-gradient-to-br shadow-lg hover:shadow-xl`;
  
  const getIconContent = () => {
    switch (type) {
      case 'shield':
        return (
          <div className={`relative ${baseClasses} ${className}`} style={{ width: size, height: size, ...style }}>
            <div className={`w-full h-full rounded-full ${glassEffect} from-emerald-400/80 via-green-500/60 to-teal-600/80 border border-emerald-300/50 shadow-emerald-500/50`}>
              <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="absolute inset-0 p-1">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" 
                      stroke="white" 
                      strokeWidth="2" 
                      fill="url(#shieldGradient)" 
                      className="drop-shadow-lg" />
                <path d="M9 12l2 2 4-4" 
                      stroke="white" 
                      strokeWidth="2.5" 
                      fill="none" 
                      className="animate-pulse drop-shadow-md" />
                <defs>
                  <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(16, 185, 129, 0.4)" />
                    <stop offset="100%" stopColor="rgba(5, 150, 105, 0.6)" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/20 to-transparent animate-pulse"></div>
          </div>
        );

      case 'lock':
        return (
          <div className={`relative ${baseClasses} ${className}`} style={{ width: size, height: size, ...style }}>
            <div className={`w-full h-full rounded-full ${glassEffect} from-blue-400/80 via-indigo-500/60 to-purple-600/80 border border-blue-300/50 shadow-blue-500/50`}>
              <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="absolute inset-0 p-1">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" 
                      stroke="white" 
                      strokeWidth="2" 
                      fill="url(#lockGradient)" />
                <circle cx="12" cy="7" r="4" stroke="white" strokeWidth="2" fill="none"/>
                <circle cx="12" cy="16" r="2" fill="white" className="animate-pulse drop-shadow-md"/>
                <defs>
                  <linearGradient id="lockGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(59, 130, 246, 0.4)" />
                    <stop offset="100%" stopColor="rgba(124, 58, 237, 0.6)" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/20 to-transparent animate-pulse"></div>
          </div>
        );

      case 'brain':
      case 'ai':
        return (
          <div className={`relative ${baseClasses} ${className}`} style={{ width: size, height: size, ...style }}>
            <div className={`w-full h-full rounded-full ${glassEffect} from-purple-400/80 via-violet-500/60 to-pink-600/80 border border-purple-300/50 shadow-purple-500/50`}>
              <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="absolute inset-0 p-1">
                <path d="M9.5 2A2.5 2.5 0 0 0 7 4.5v15A2.5 2.5 0 0 0 9.5 22h5a2.5 2.5 0 0 0 2.5-2.5v-15A2.5 2.5 0 0 0 14.5 2h-5z" 
                      stroke="white" 
                      strokeWidth="2" 
                      fill="url(#brainGradient)" />
                <circle cx="9" cy="9" r="1.5" fill="white" className="animate-pulse"/>
                <circle cx="15" cy="9" r="1.5" fill="white" className="animate-pulse" style={{animationDelay: '0.5s'}}/>
                <path d="M9 15h6" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <defs>
                  <linearGradient id="brainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(147, 51, 234, 0.4)" />
                    <stop offset="100%" stopColor="rgba(219, 39, 119, 0.6)" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/20 to-transparent animate-pulse"></div>
          </div>
        );

      case 'bot':
      case 'robot':
        return (
          <div className={`relative ${baseClasses} ${className}`} style={{ width: size, height: size, ...style }}>
            <div className={`w-full h-full rounded-full ${glassEffect} from-cyan-400/80 via-blue-500/60 to-indigo-600/80 border border-cyan-300/50 shadow-cyan-500/50`}>
              <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="absolute inset-0 p-1">
                <rect x="4" y="6" width="16" height="12" rx="4" 
                      stroke="white" 
                      strokeWidth="2" 
                      fill="url(#botGradient)" />
                <circle cx="8.5" cy="10.5" r="1.5" fill="white" className="animate-pulse"/>
                <circle cx="15.5" cy="10.5" r="1.5" fill="white" className="animate-pulse" style={{animationDelay: '0.3s'}}/>
                <path d="M9 14h6" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="12" cy="3" r="1" fill="white"/>
                <path d="M12 3v3" stroke="white" strokeWidth="2"/>
                <defs>
                  <linearGradient id="botGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(34, 211, 238, 0.4)" />
                    <stop offset="100%" stopColor="rgba(79, 70, 229, 0.6)" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/20 to-transparent animate-pulse"></div>
          </div>
        );

      case 'target':
        return (
          <div className={`relative ${baseClasses} ${className}`} style={{ width: size, height: size, ...style }}>
            <div className={`w-full h-full rounded-full ${glassEffect} from-red-400/80 via-orange-500/60 to-yellow-600/80 border border-red-300/50 shadow-red-500/50`}>
              <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="absolute inset-0 p-1">
                <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="2" fill="url(#targetGradient1)"/>
                <circle cx="12" cy="12" r="6" stroke="white" strokeWidth="2" fill="url(#targetGradient2)"/>
                <circle cx="12" cy="12" r="3" stroke="white" strokeWidth="2" fill="url(#targetGradient3)"/>
                <circle cx="12" cy="12" r="1.5" fill="white" className="animate-pulse"/>
                <defs>
                  <linearGradient id="targetGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(248, 113, 113, 0.3)" />
                    <stop offset="100%" stopColor="rgba(251, 146, 60, 0.4)" />
                  </linearGradient>
                  <linearGradient id="targetGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(251, 146, 60, 0.4)" />
                    <stop offset="100%" stopColor="rgba(253, 224, 71, 0.5)" />
                  </linearGradient>
                  <linearGradient id="targetGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(253, 224, 71, 0.5)" />
                    <stop offset="100%" stopColor="rgba(248, 113, 113, 0.6)" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/20 to-transparent animate-pulse"></div>
          </div>
        );

      case 'eye':
        return (
          <div className={`relative ${baseClasses} ${className}`} style={{ width: size, height: size, ...style }}>
            <div className={`w-full h-full rounded-full ${glassEffect} from-emerald-400/80 via-teal-500/60 to-cyan-600/80 border border-emerald-300/50 shadow-emerald-500/50`}>
              <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="absolute inset-0 p-1">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" 
                      stroke="white" 
                      strokeWidth="2" 
                      fill="url(#eyeGradient)" />
                <circle cx="12" cy="12" r="3" stroke="white" strokeWidth="2" fill="url(#eyeInner)"/>
                <circle cx="12" cy="12" r="1.5" fill="white" className="animate-pulse"/>
                <defs>
                  <linearGradient id="eyeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(16, 185, 129, 0.3)" />
                    <stop offset="100%" stopColor="rgba(6, 182, 212, 0.5)" />
                  </linearGradient>
                  <linearGradient id="eyeInner" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(6, 182, 212, 0.5)" />
                    <stop offset="100%" stopColor="rgba(16, 185, 129, 0.6)" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/20 to-transparent animate-pulse"></div>
          </div>
        );

      case 'zap':
      case 'lightning':
        return (
          <div className={`relative ${baseClasses} ${className}`} style={{ width: size, height: size, ...style }}>
            <div className={`w-full h-full rounded-full ${glassEffect} from-yellow-400/80 via-orange-500/60 to-red-600/80 border border-yellow-300/50 shadow-yellow-500/50`}>
              <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="absolute inset-0 p-1">
                <polygon points="13,2 3,14 12,14 11,22 21,10 12,10" 
                         stroke="white" 
                         strokeWidth="2" 
                         fill="url(#zapGradient)" 
                         className="drop-shadow-lg" />
                <defs>
                  <linearGradient id="zapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(251, 191, 36, 0.6)" />
                    <stop offset="50%" stopColor="rgba(251, 146, 60, 0.7)" />
                    <stop offset="100%" stopColor="rgba(239, 68, 68, 0.8)" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/20 to-transparent animate-pulse"></div>
          </div>
        );

      case 'activity':
      case 'pulse':
        return (
          <div className={`relative ${baseClasses} ${className}`} style={{ width: size, height: size, ...style }}>
            <div className={`w-full h-full rounded-full ${glassEffect} from-green-400/80 via-emerald-500/60 to-teal-600/80 border border-green-300/50 shadow-green-500/50`}>
              <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="absolute inset-0 p-1">
                <polyline points="22,12 18,12 15,21 9,3 6,12 2,12" 
                          stroke="white" 
                          strokeWidth="3" 
                          fill="none" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                          className="drop-shadow-lg" />
                <circle cx="12" cy="12" r="1.5" fill="white" className="animate-pulse"/>
              </svg>
            </div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/20 to-transparent animate-pulse"></div>
          </div>
        );

      case 'users':
      case 'user':
        return (
          <div className={`relative ${baseClasses} ${className}`} style={{ width: size, height: size, ...style }}>
            <div className={`w-full h-full rounded-full ${glassEffect} from-indigo-400/80 via-purple-500/60 to-pink-600/80 border border-indigo-300/50 shadow-indigo-500/50`}>
              <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="absolute inset-0 p-1">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" 
                      stroke="white" 
                      strokeWidth="2" 
                      fill="url(#userGradient)" />
                <circle cx="12" cy="7" r="4" 
                        stroke="white" 
                        strokeWidth="2" 
                        fill="url(#userCircle)" />
                <defs>
                  <linearGradient id="userGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(99, 102, 241, 0.4)" />
                    <stop offset="100%" stopColor="rgba(219, 39, 119, 0.6)" />
                  </linearGradient>
                  <linearGradient id="userCircle" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(147, 51, 234, 0.5)" />
                    <stop offset="100%" stopColor="rgba(236, 72, 153, 0.6)" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/20 to-transparent animate-pulse"></div>
          </div>
        );

      case 'checkCircle':
      case 'check':
        return (
          <div className={`relative ${baseClasses} ${className}`} style={{ width: size, height: size, ...style }}>
            <div className={`w-full h-full rounded-full ${glassEffect} from-green-400/80 via-emerald-500/60 to-teal-600/80 border border-green-300/50 shadow-green-500/50`}>
              <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="absolute inset-0 p-1">
                <circle cx="12" cy="12" r="9" 
                        stroke="white" 
                        strokeWidth="2" 
                        fill="url(#checkGradient)" />
                <path d="M8 12l2.5 2.5L16 9" 
                      stroke="white" 
                      strokeWidth="3" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      className="drop-shadow-lg" />
                <defs>
                  <linearGradient id="checkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(34, 197, 94, 0.5)" />
                    <stop offset="100%" stopColor="rgba(20, 184, 166, 0.6)" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/20 to-transparent animate-pulse"></div>
          </div>
        );

      case 'alertTriangle':
      case 'warning':
        return (
          <div className={`relative ${baseClasses} ${className}`} style={{ width: size, height: size, ...style }}>
            <div className={`w-full h-full rounded-full ${glassEffect} from-yellow-400/80 via-orange-500/60 to-red-600/80 border border-yellow-300/50 shadow-orange-500/50`}>
              <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="absolute inset-0 p-1">
                <path d="M12 2L2 20h20L12 2z" 
                      stroke="white" 
                      strokeWidth="2" 
                      fill="url(#warningGradient)" />
                <path d="M12 8v5" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                <circle cx="12" cy="17" r="1.5" fill="white" className="animate-pulse"/>
                <defs>
                  <linearGradient id="warningGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(251, 191, 36, 0.5)" />
                    <stop offset="50%" stopColor="rgba(251, 146, 60, 0.6)" />
                    <stop offset="100%" stopColor="rgba(239, 68, 68, 0.7)" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/20 to-transparent animate-pulse"></div>
          </div>
        );

      case 'arrowRight':
      case 'arrow':
        return (
          <div className={`relative ${baseClasses} ${className}`} style={{ width: size, height: size, ...style }}>
            <div className={`w-full h-full rounded-full ${glassEffect} from-blue-400/80 via-cyan-500/60 to-teal-600/80 border border-blue-300/50 shadow-blue-500/50`}>
              <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="absolute inset-0 p-1">
                <path d="M5 12h14" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M12 5l7 7-7 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/20 to-transparent animate-pulse"></div>
          </div>
        );

      case 'externalLink':
      case 'link':
        return (
          <div className={`relative ${baseClasses} ${className}`} style={{ width: size, height: size, ...style }}>
            <div className={`w-full h-full rounded-full ${glassEffect} from-purple-400/80 via-indigo-500/60 to-blue-600/80 border border-purple-300/50 shadow-purple-500/50`}>
              <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="absolute inset-0 p-1">
                <path d="M18 8a6 6 0 0 0-6 6v8a6 6 0 0 1-6-6V8a6 6 0 0 1 6-6h8" 
                      stroke="white" 
                      strokeWidth="2" 
                      fill="none"/>
                <path d="M15 3h6v6" stroke="white" strokeWidth="2"/>
                <path d="M10 14L21 3" stroke="white" strokeWidth="2"/>
              </svg>
            </div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/20 to-transparent animate-pulse"></div>
          </div>
        );

      case 'trendingUp':
      case 'trending':
        return (
          <div className={`relative ${baseClasses} ${className}`} style={{ width: size, height: size, ...style }}>
            <div className={`w-full h-full rounded-full ${glassEffect} from-green-400/80 via-emerald-500/60 to-teal-600/80 border border-green-300/50 shadow-green-500/50`}>
              <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="absolute inset-0 p-1">
                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" 
                          stroke="white" 
                          strokeWidth="2.5" 
                          fill="none" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"/>
                <polyline points="16 7 22 7 22 13" 
                          stroke="white" 
                          strokeWidth="2" 
                          fill="none" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/20 to-transparent animate-pulse"></div>
          </div>
        );

      case 'globe':
      case 'world':
        return (
          <div className={`relative ${baseClasses} ${className}`} style={{ width: size, height: size, ...style }}>
            <div className={`w-full h-full rounded-full ${glassEffect} from-blue-400/80 via-cyan-500/60 to-teal-600/80 border border-blue-300/50 shadow-blue-500/50`}>
              <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="absolute inset-0 p-1">
                <circle cx="12" cy="12" r="9" 
                        stroke="white" 
                        strokeWidth="2" 
                        fill="url(#globeGradient)" />
                <path d="M2 12h20" stroke="white" strokeWidth="2"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" 
                      stroke="white" 
                      strokeWidth="2"/>
                <defs>
                  <linearGradient id="globeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(59, 130, 246, 0.3)" />
                    <stop offset="50%" stopColor="rgba(6, 182, 212, 0.4)" />
                    <stop offset="100%" stopColor="rgba(20, 184, 166, 0.5)" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/20 to-transparent animate-pulse"></div>
          </div>
        );

      case 'file':
      case 'document':
        return (
          <div className={`relative ${baseClasses} ${className}`} style={{ width: size, height: size, ...style }}>
            <div className={`w-full h-full rounded-full ${glassEffect} from-slate-400/80 via-gray-500/60 to-zinc-600/80 border border-slate-300/50 shadow-slate-500/50`}>
              <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="absolute inset-0 p-1">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" 
                      stroke="white" 
                      strokeWidth="2" 
                      fill="url(#fileGradient)" />
                <polyline points="14 2 14 8 20 8" stroke="white" strokeWidth="2"/>
                <line x1="16" y1="13" x2="8" y2="13" stroke="white" strokeWidth="1.5"/>
                <line x1="16" y1="17" x2="8" y2="17" stroke="white" strokeWidth="1.5"/>
                <line x1="10" y1="9" x2="8" y2="9" stroke="white" strokeWidth="1.5"/>
                <defs>
                  <linearGradient id="fileGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(148, 163, 184, 0.4)" />
                    <stop offset="100%" stopColor="rgba(113, 113, 122, 0.6)" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/20 to-transparent animate-pulse"></div>
          </div>
        );

      case 'server':
      case 'database':
        return (
          <div className={`relative ${baseClasses} ${className}`} style={{ width: size, height: size, ...style }}>
            <div className={`w-full h-full rounded-full ${glassEffect} from-gray-400/80 via-slate-500/60 to-zinc-600/80 border border-gray-300/50 shadow-gray-500/50`}>
              <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="absolute inset-0 p-1">
                <ellipse cx="12" cy="5" rx="9" ry="3" 
                         stroke="white" 
                         strokeWidth="2" 
                         fill="url(#serverGradient1)" />
                <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" stroke="white" strokeWidth="2"/>
                <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" stroke="white" strokeWidth="2"/>
                <circle cx="17" cy="8" r="1" fill="white" className="animate-pulse"/>
                <circle cx="17" cy="12" r="1" fill="white" className="animate-pulse" style={{animationDelay: '0.5s'}}/>
                <defs>
                  <linearGradient id="serverGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(156, 163, 175, 0.4)" />
                    <stop offset="100%" stopColor="rgba(113, 113, 122, 0.6)" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/20 to-transparent animate-pulse"></div>
          </div>
        );

      case 'building':
      case 'organization':
        return (
          <div className={`relative ${baseClasses} ${className}`} style={{ width: size, height: size, ...style }}>
            <div className={`w-full h-full rounded-full ${glassEffect} from-indigo-400/80 via-blue-500/60 to-purple-600/80 border border-indigo-300/50 shadow-indigo-500/50`}>
              <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="absolute inset-0 p-1">
                <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18z" 
                      stroke="white" 
                      strokeWidth="2" 
                      fill="url(#buildingGradient)" />
                <path d="M6 12h4" stroke="white" strokeWidth="1.5"/>
                <path d="M6 16h4" stroke="white" strokeWidth="1.5"/>
                <path d="M10 6h4" stroke="white" strokeWidth="1.5"/>
                <path d="M10 10h4" stroke="white" strokeWidth="1.5"/>
                <path d="M10 14h4" stroke="white" strokeWidth="1.5"/>
                <path d="M14 18h4" stroke="white" strokeWidth="1.5"/>
                <defs>
                  <linearGradient id="buildingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(99, 102, 241, 0.4)" />
                    <stop offset="100%" stopColor="rgba(147, 51, 234, 0.6)" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/20 to-transparent animate-pulse"></div>
          </div>
        );

      case 'network':
      case 'connection':
        return (
          <div className={`relative ${baseClasses} ${className}`} style={{ width: size, height: size, ...style }}>
            <div className={`w-full h-full rounded-full ${glassEffect} from-emerald-400/80 via-green-500/60 to-teal-600/80 border border-emerald-300/50 shadow-emerald-500/50`}>
              <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="absolute inset-0 p-1">
                <circle cx="12" cy="5" r="2" stroke="white" strokeWidth="2" fill="white"/>
                <circle cx="5" cy="19" r="2" stroke="white" strokeWidth="2" fill="white"/>
                <circle cx="19" cy="19" r="2" stroke="white" strokeWidth="2" fill="white"/>
                <path d="M12 7l-7 10" stroke="white" strokeWidth="2"/>
                <path d="M12 7l7 10" stroke="white" strokeWidth="2"/>
                <path d="M7 19h10" stroke="white" strokeWidth="2"/>
                <circle cx="12" cy="12" r="1" fill="white" className="animate-pulse"/>
              </svg>
            </div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/20 to-transparent animate-pulse"></div>
          </div>
        );

      case 'star':
      case 'favorite':
        return (
          <div className={`relative ${baseClasses} ${className}`} style={{ width: size, height: size, ...style }}>
            <div className={`w-full h-full rounded-full ${glassEffect} from-yellow-400/80 via-amber-500/60 to-orange-600/80 border border-yellow-300/50 shadow-yellow-500/50`}>
              <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="absolute inset-0 p-1">
                <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" 
                         stroke="white" 
                         strokeWidth="2" 
                         fill="url(#starGradient)" />
                <defs>
                  <linearGradient id="starGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(251, 191, 36, 0.6)" />
                    <stop offset="50%" stopColor="rgba(245, 158, 11, 0.7)" />
                    <stop offset="100%" stopColor="rgba(251, 146, 60, 0.8)" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/20 to-transparent animate-pulse"></div>
          </div>
        );

      case 'crown':
      case 'premium':
        return (
          <div className={`relative ${baseClasses} ${className}`} style={{ width: size, height: size, ...style }}>
            <div className={`w-full h-full rounded-full ${glassEffect} from-amber-400/80 via-yellow-500/60 to-orange-600/80 border border-amber-300/50 shadow-amber-500/50`}>
              <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="absolute inset-0 p-1">
                <path d="M2 20h20l-2-6H4l-2 6z" 
                      stroke="white" 
                      strokeWidth="2" 
                      fill="url(#crownGradient)" />
                <path d="M12 8l2-4 4 2-2 4-4-2z" 
                      stroke="white" 
                      strokeWidth="2" 
                      fill="url(#crownTop)" />
                <circle cx="12" cy="12" r="1" fill="white" className="animate-pulse"/>
                <defs>
                  <linearGradient id="crownGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(245, 158, 11, 0.6)" />
                    <stop offset="100%" stopColor="rgba(251, 146, 60, 0.8)" />
                  </linearGradient>
                  <linearGradient id="crownTop" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(251, 191, 36, 0.7)" />
                    <stop offset="100%" stopColor="rgba(245, 158, 11, 0.9)" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/20 to-transparent animate-pulse"></div>
          </div>
        );

      case 'phone':
      case 'contact':
        return (
          <div className={`relative ${baseClasses} ${className}`} style={{ width: size, height: size, ...style }}>
            <div className={`w-full h-full rounded-full ${glassEffect} from-green-400/80 via-emerald-500/60 to-teal-600/80 border border-green-300/50 shadow-green-500/50`}>
              <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="absolute inset-0 p-1">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" 
                      stroke="white" 
                      strokeWidth="2" 
                      fill="url(#phoneGradient)" />
                <defs>
                  <linearGradient id="phoneGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(34, 197, 94, 0.4)" />
                    <stop offset="100%" stopColor="rgba(20, 184, 166, 0.6)" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/20 to-transparent animate-pulse"></div>
          </div>
        );

      default:
        // Default futuristic icon for unknown types
        return (
          <div className={`relative ${baseClasses} ${className}`} style={{ width: size, height: size, ...style }}>
            <div className={`w-full h-full rounded-full ${glassEffect} from-gray-400/80 via-slate-500/60 to-zinc-600/80 border border-gray-300/50 shadow-gray-500/50`}>
              <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="absolute inset-0 p-1">
                <circle cx="12" cy="12" r="8" 
                        stroke="white" 
                        strokeWidth="2" 
                        fill="url(#defaultGradient)" />
                <circle cx="12" cy="12" r="3" stroke="white" strokeWidth="2"/>
                <circle cx="12" cy="12" r="1" fill="white" className="animate-pulse"/>
                <defs>
                  <linearGradient id="defaultGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(156, 163, 175, 0.4)" />
                    <stop offset="100%" stopColor="rgba(113, 113, 122, 0.6)" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/20 to-transparent animate-pulse"></div>
          </div>
        );
    }
  };

  return getIconContent();
};

export default Enhanced4DIcon;