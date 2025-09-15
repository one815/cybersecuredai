import React from 'react';

interface CustomIconProps {
  className?: string;
  size?: number;
  style?: React.CSSProperties;
}

export const CustomCheckIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src="/assets/Checkmark.webp" 
    alt="Check" 
    className={className}
    style={{ width: size, height: size }}
  />
);

export const CustomClipboardCheckIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src="/assets/Clipboard Check Mark.webp" 
    alt="Clipboard Check" 
    className={className}
    style={{ width: size, height: size }}
  />
);

export const CustomDatabaseIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src="/assets/Database.webp" 
    alt="Database" 
    className={className}
    style={{ width: size, height: size }}
  />
);

export const CustomFileTextIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src="/assets/FileText.webp" 
    alt="File" 
    className={className}
    style={{ width: size, height: size }}
  />
);

export const CustomHeadphonesIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src="/assets/Headphones.webp" 
    alt="Support" 
    className={className}
    style={{ width: size, height: size }}
  />
);

export const CustomSettingsIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src="/assets/Settings.webp" 
    alt="Settings" 
    className={className}
    style={{ width: size, height: size }}
  />
);

export const CustomTargetIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src="/assets/Target.webp" 
    alt="Target" 
    className={className}
    style={{ width: size, height: size }}
  />
);

export const CustomUserIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src="/assets/User.webp" 
    alt="User" 
    className={className}
    style={{ width: size, height: size }}
  />
);

// Additional cybersecurity-themed icons
export const CustomShieldIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src="/assets/Shield.webp" 
    alt="Shield" 
    className={className}
    style={{ width: size, height: size }}
  />
);

export const CustomLockIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src="/assets/Lock.webp" 
    alt="Lock" 
    className={className}
    style={{ width: size, height: size }}
  />
);

export const CustomSecuredLockIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src="/assets/Secured Lock.webp" 
    alt="Secured Lock" 
    className={className}
    style={{ width: size, height: size }}
  />
);

export const CustomBotIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src="/assets/Cypher AI Asst. webp_1757949055406.webp" 
    alt="Cypher AI Assistant" 
    className={`rounded-full ${className}`}
    style={{ width: size, height: size }}
  />
);

export const CustomBot2Icon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src="/assets/Cypher AI Asst. webp_1757949055406.webp" 
    alt="Cypher AI Assistant" 
    className={`rounded-full ${className}`}
    style={{ width: size, height: size }}
  />
);

export const CustomBrainIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <div className={`relative inline-block ${className}`} style={{ width: size, height: size }}>
    <img 
      src="/assets/Cypher AI Gen_1757949055407.webp" 
      alt="Cypher AI Genetic Model" 
      className="w-full h-full object-contain rounded-full filter drop-shadow-lg"
      style={{ 
        filter: 'drop-shadow(0 0 8px rgba(168, 85, 247, 0.6)) drop-shadow(0 0 15px rgba(168, 85, 247, 0.4))' 
      }}
    />
    <div 
      className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full animate-pulse"
      style={{ 
        background: 'radial-gradient(circle at 30% 30%, rgba(168, 85, 247, 0.3), transparent 70%)'
      }}
    />
  </div>
);

// Enhanced 4D Network Icon Component
export const Enhanced4DNetworkIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <div className={`relative inline-block ${className}`} style={{ width: size, height: size }}>
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      className="filter drop-shadow-lg"
      style={{ 
        filter: 'drop-shadow(0 0 8px rgba(34, 197, 94, 0.6)) drop-shadow(0 0 15px rgba(34, 197, 94, 0.4))' 
      }}
    >
      <circle cx="12" cy="5" r="3" stroke="currentColor" strokeWidth="2" fill="rgba(34, 197, 94, 0.2)"/>
      <circle cx="5" cy="19" r="3" stroke="currentColor" strokeWidth="2" fill="rgba(34, 197, 94, 0.2)"/>
      <circle cx="19" cy="19" r="3" stroke="currentColor" strokeWidth="2" fill="rgba(34, 197, 94, 0.2)"/>
      <path d="M12 8l-7 8" stroke="currentColor" strokeWidth="2"/>
      <path d="M12 8l7 8" stroke="currentColor" strokeWidth="2"/>
      <path d="M8 19h8" stroke="currentColor" strokeWidth="2"/>
      <circle cx="12" cy="12" r="1.5" fill="rgba(34, 197, 94, 0.8)" className="animate-pulse"/>
    </svg>
    <div 
      className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-cyan-400/20 rounded-full animate-pulse"
      style={{ 
        background: 'radial-gradient(circle at 50% 50%, rgba(34, 197, 94, 0.3), transparent 70%)'
      }}
    />
  </div>
);

// Enhanced 4D Brain Icon Component with Cypher AI Gen image
export const Enhanced4DBrainIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <div className={`relative inline-block ${className}`} style={{ width: size, height: size }}>
    <img 
      src="/assets/Cypher AI Gen_1757949055407.webp" 
      alt="Cypher AI Genetic Model" 
      className="w-full h-full object-contain rounded-full filter drop-shadow-lg"
      style={{ 
        filter: 'drop-shadow(0 0 8px rgba(168, 85, 247, 0.6)) drop-shadow(0 0 15px rgba(168, 85, 247, 0.4))' 
      }}
    />
    <div 
      className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full animate-pulse"
      style={{ 
        background: 'radial-gradient(circle at 30% 30%, rgba(168, 85, 247, 0.3), transparent 70%)'
      }}
    />
  </div>
);

export const CustomEyeIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src="/assets/Eye.webp" 
    alt="Monitoring" 
    className={className}
    style={{ width: size, height: size }}
  />
);

export const CustomLightningIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src="/assets/Lightning.webp" 
    alt="Lightning" 
    className={className}
    style={{ width: size, height: size }}
  />
);

export const CustomZapIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src="/assets/Zap.webp" 
    alt="Zap" 
    className={className}
    style={{ width: size, height: size }}
  />
);

export const CustomCypherAIIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src="/assets/Cypher AI.webp" 
    alt="Cypher AI" 
    className={className}
    style={{ width: size, height: size }}
  />
);

export const CustomCyberSecureBadgeIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src="/assets/CyberSecure Shield Badge.webp" 
    alt="CyberSecure Badge" 
    className={className}
    style={{ width: size, height: size }}
  />
);

export const CustomAuthenticationIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src="/assets/Authentication.webp" 
    alt="Authentication" 
    className={className}
    style={{ width: size, height: size }}
  />
);

export const CustomFileSharingIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src="/assets/File Sharing.webp" 
    alt="File Sharing" 
    className={className}
    style={{ width: size, height: size }}
  />
);

export const CustomActivityIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src="/assets/Activity.webp" 
    alt="Activity" 
    className={className}
    style={{ width: size, height: size }}
  />
);

export const CustomAlertSignalIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src="/assets/Alert Signal.webp" 
    alt="Alert" 
    className={className}
    style={{ width: size, height: size }}
  />
);

export const CustomYellowWarningIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src="/assets/Yellow Warning Triangle.webp" 
    alt="Warning" 
    className={className}
    style={{ width: size, height: size }}
  />
);

export const CustomRedWarningIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src="/assets/Red Warning Triangle.webp" 
    alt="High Alert" 
    className={className}
    style={{ width: size, height: size }}
  />
);

export const CustomGlobeIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src="/assets/Globe.webp" 
    alt="Global" 
    className={className}
    style={{ width: size, height: size }}
  />
);

export const CustomRocketIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src="/assets/Rocket.webp" 
    alt="Rocket" 
    className={className}
    style={{ width: size, height: size }}
  />
);

export const CustomTrendingUpIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src="/assets/Trending Up.webp" 
    alt="Trending Up" 
    className={className}
    style={{ width: size, height: size }}
  />
);

export const CustomFlagIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src="/assets/Flag.webp" 
    alt="Flag" 
    className={className}
    style={{ width: size, height: size }}
  />
);

export const CustomSearchIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src="/assets/Search.webp" 
    alt="Search" 
    className={className}
    style={{ width: size, height: size }}
  />
);

export const CustomInfrastructureIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src="/assets/Infrastructure.webp" 
    alt="Infrastructure" 
    className={className}
    style={{ width: size, height: size }}
  />
);

export const CustomAdvancedThreatIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src="/assets/Advanced Threat Management.webp" 
    alt="Advanced Threat" 
    className={className}
    style={{ width: size, height: size }}
  />
);

export const CustomFingerprintIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src="/assets/Fingerprint.webp" 
    alt="Fingerprint" 
    className={className}
    style={{ width: size, height: size }}
  />
);

export const CustomScanIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src="/assets/Scan.webp" 
    alt="Scan" 
    className={className}
    style={{ width: size, height: size }}
  />
);

export const CustomSecuredIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src="/assets/Secured.webp" 
    alt="Secured" 
    className={className}
    style={{ width: size, height: size }}
  />
);

export const CustomVerifyingIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src="/assets/Verifying.webp" 
    alt="Verifying" 
    className={className}
    style={{ width: size, height: size }}
  />
);

export const CustomCheckBadgeIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src="/assets/Check Badge.webp" 
    alt="Check Badge" 
    className={className}
    style={{ width: size, height: size }}
  />
);

export const CustomBugIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src="/assets/Bug.webp" 
    alt="Bug" 
    className={className}
    style={{ width: size, height: size }}
  />
);

export const CustomClockIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src="/assets/Clock.webp" 
    alt="Clock" 
    className={className}
    style={{ width: size, height: size }}
  />
);

export const CustomMailIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src="/assets/Mail.webp" 
    alt="Mail" 
    className={className}
    style={{ width: size, height: size }}
  />
);

export const CustomBellIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src="/assets/Bell.webp" 
    alt="Bell" 
    className={className}
    style={{ width: size, height: size }}
  />
);

export const CustomPhoneIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src="/assets/Phone.webp" 
    alt="Phone" 
    className={className}
    style={{ width: size, height: size }}
  />
);

export const CustomSmartphoneIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src="/assets/Smartphone.webp" 
    alt="Smartphone" 
    className={className}
    style={{ width: size, height: size }}
  />
);

export const CustomCalendarIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src="/assets/Calendar.webp" 
    alt="Calendar" 
    className={className}
    style={{ width: size, height: size }}
  />
);

export const CustomGraduationCapIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src="/assets/Graduation Cap.webp" 
    alt="Education" 
    className={className}
    style={{ width: size, height: size }}
  />
);

export const CustomVerificationGraduateIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src="/assets/Verification Graduate Cap.webp" 
    alt="Verified Education" 
    className={className}
    style={{ width: size, height: size }}
  />
);

export const CustomPowerIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src="/assets/Power.webp" 
    alt="Power" 
    className={className}
    style={{ width: size, height: size }}
  />
);

export const CustomRightArrowIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src="/assets/Right Arrow.webp" 
    alt="Right Arrow" 
    className={className}
    style={{ width: size, height: size }}
  />
);

export const CustomLeftArrowIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src="/assets/Left Arrow.webp" 
    alt="Left Arrow" 
    className={className}
    style={{ width: size, height: size }}
  />
);

export const CustomDesktopIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src="/assets/Desktop.webp" 
    alt="Desktop" 
    className={className}
    style={{ width: size, height: size }}
  />
);

export const CustomLocationIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src="/assets/Location.webp" 
    alt="Location" 
    className={className}
    style={{ width: size, height: size }}
  />
);

// Enhanced 4D Lock Icon with glass morphism effects matching home page cards
export const Enhanced4DLockIcon: React.FC<CustomIconProps> = ({ className, size = 24, style }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={`glass-icon ${className}`}
    style={style}
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="2" fill="rgba(168, 85, 247, 0.2)"/>
    <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" fill="none"/>
    <circle cx="12" cy="16" r="1.5" fill="currentColor" className="animate-pulse"/>
  </svg>
);

// Enhanced 4D Shield Icon with glass morphism effects
export const Enhanced4DShieldIcon: React.FC<CustomIconProps> = ({ className, size = 24, style }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={`glass-icon ${className}`}
    style={style}
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" fill="rgba(34, 197, 94, 0.2)"/>
    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" fill="none" className="animate-pulse"/>
    <circle cx="12" cy="12" r="1" fill="currentColor" className="animate-pulse"/>
  </svg>
);

// Enhanced 4D Bot Icon with Cypher AI Assistant image
export const Enhanced4DBotIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <div className={`relative inline-block ${className}`} style={{ width: size, height: size }}>
    <img 
      src="/assets/Cypher AI Asst. webp_1757949055406.webp" 
      alt="Cypher AI Assistant" 
      className="w-full h-full object-contain rounded-full filter drop-shadow-lg"
      style={{ 
        filter: 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.6)) drop-shadow(0 0 15px rgba(59, 130, 246, 0.4))' 
      }}
    />
    <div 
      className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full animate-pulse"
      style={{ 
        background: 'radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.3), transparent 70%)'
      }}
    />
  </div>
);

// Enhanced 4D Eye Icon with glass morphism effects
export const Enhanced4DEyeIcon: React.FC<CustomIconProps> = ({ className, size = 24, style }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={`glass-icon ${className}`}
    style={style}
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" fill="rgba(34, 197, 94, 0.1)"/>
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" fill="rgba(34, 197, 94, 0.2)"/>
    <circle cx="12" cy="12" r="1" fill="currentColor" className="animate-pulse"/>
  </svg>
);

// Enhanced 4D Target Icon with glass morphism effects
export const Enhanced4DTargetIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={`glass-icon ${className}`}
  >
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="rgba(239, 68, 68, 0.1)"/>
    <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="2" fill="rgba(239, 68, 68, 0.2)"/>
    <circle cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="2" fill="currentColor" className="animate-pulse"/>
  </svg>
);

// Enhanced 4D Zap Icon with glass morphism effects
export const Enhanced4DZapIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={`glass-icon ${className}`}
  >
    <polygon points="13,2 3,14 12,14 11,22 21,10 12,10" stroke="currentColor" strokeWidth="2" fill="rgba(245, 158, 11, 0.2)"/>
    <circle cx="12" cy="12" r="1" fill="currentColor" className="animate-pulse"/>
  </svg>
);

// Enhanced 4D Activity Icon with glass morphism effects
export const Enhanced4DActivityIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={`glass-icon ${className}`}
  >
    <polyline points="22,12 18,12 15,21 9,3 6,12 2,12" stroke="currentColor" strokeWidth="2" fill="none"/>
    <circle cx="12" cy="12" r="1" fill="currentColor" className="animate-pulse"/>
  </svg>
);

// Enhanced 4D File/Document Icon with glass morphism effects
export const Enhanced4DFileIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={`glass-icon ${className}`}
  >
    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2Z" stroke="currentColor" strokeWidth="2" fill="rgba(34, 197, 94, 0.2)"/>
    <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="2" fill="none"/>
    <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" strokeWidth="2"/>
    <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" strokeWidth="2"/>
    <polyline points="10,9 9,9 8,9" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

// Enhanced 4D Globe Icon with glass morphism effects
export const Enhanced4DGlobeIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={`glass-icon ${className}`}
  >
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="rgba(34, 197, 94, 0.1)"/>
    <path d="M2 12h20" stroke="currentColor" strokeWidth="2"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="currentColor" strokeWidth="2"/>
    <circle cx="12" cy="12" r="1" fill="currentColor" className="animate-pulse"/>
  </svg>
);