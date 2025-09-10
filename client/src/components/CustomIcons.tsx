import React from 'react';

// Updated cybersecurity-themed icons
import CheckmarkIcon from '@assets/Checkmark.jpg';
import ClipboardCheckIcon from '@assets/Clipboard Check Mark.jpg';
import DatabaseIcon from '@assets/Database.jpg';
import FileTextIcon from '@assets/FileText.jpg';
import HeadphonesIcon from '@assets/Headphones.jpg';
import SettingsIcon from '@assets/Settings.jpg';
import TargetIcon from '@assets/Target.jpg';
import UserIcon from '@assets/User.jpg';

// Additional cybersecurity icons
import ShieldIcon from '@assets/Shield.jpg';
import LockIcon from '@assets/Lock.jpg';
import SecuredLockIcon from '@assets/Secured Lock.jpg';
import BotIcon from '@assets/Bot.jpg';
import Bot2Icon from '@assets/Bot (2).jpg';
import BrainIcon from '@assets/Brain.jpg';
import cypherAiGenImage from '@assets/Cypher AI Gen_1757277451468.jpg';
import cypherAiAssistImage from '@assets/Cypher AI Assist_1757277458129.jpg';
import EyeIcon from '@assets/Eye.jpg';
import LightningIcon from '@assets/Lightning.jpg';
import ZapIcon from '@assets/Zap.jpg';
import CypherAIIcon from '@assets/Cypher AI.jpg';
import CyberSecureBadgeIcon from '@assets/CyberSecure Shield Badge.jpg';
import AuthenticationIcon from '@assets/Authentication.jpg';
import FileSharingIcon from '@assets/File Sharing.jpg';
import ActivityIcon from '@assets/Activity.jpg';
import AlertSignalIcon from '@assets/Alert Signal.jpg';
import YellowWarningIcon from '@assets/Yellow Warning Triangle.jpg';
import RedWarningIcon from '@assets/Red Warning Triangle.jpg';
import GlobeIcon from '@assets/Globe.jpg';
import RocketIcon from '@assets/Rocket.jpg';
import TrendingUpIcon from '@assets/Trending Up.jpg';
import FlagIcon from '@assets/Flag.jpg';
import SearchIcon from '@assets/Search.jpg';
import InfrastructureIcon from '@assets/Infrastructure.jpg';
import AdvancedThreatIcon from '@assets/Advanced Threat Management.jpg';
import FingerprintIcon from '@assets/Fingerprint.jpg';
import ScanIcon from '@assets/Scan.jpg';
import SecuredIcon from '@assets/Secured.jpg';
import VerifyingIcon from '@assets/Verifying.jpg';
import CheckBadgeIcon from '@assets/Check Badge.jpg';
import BugIcon from '@assets/Bug.jpg';
import ClockIcon from '@assets/Clock.jpg';
import MailIcon from '@assets/Mail.jpg';
import BellIcon from '@assets/Bell.jpg';
import PhoneIcon from '@assets/Phone.jpg';
import SmartphoneIcon from '@assets/Smartphone.jpg';
import CalendarIcon from '@assets/Calendar.jpg';
import GraduationCapIcon from '@assets/Graduation Cap.jpg';
import VerificationGraduateIcon from '@assets/Verification Graduate Cap.jpg';
import PowerIcon from '@assets/Power.jpg';
import RightArrowIcon from '@assets/Right Arrow.jpg';
import LeftArrowIcon from '@assets/Left Arrow.jpg';
import DesktopIcon from '@assets/Desktop.jpg';
import LocationIcon from '@assets/Location.jpg';

interface CustomIconProps {
  className?: string;
  size?: number;
  style?: React.CSSProperties;
}

export const CustomCheckIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src={CheckmarkIcon} 
    alt="Check" 
    className={className}
    style={{ width: size, height: size }}
  />
);

export const CustomClipboardCheckIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src={ClipboardCheckIcon} 
    alt="Clipboard Check" 
    className={className}
    style={{ width: size, height: size }}
  />
);

export const CustomDatabaseIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src={DatabaseIcon} 
    alt="Database" 
    className={className}
    style={{ width: size, height: size }}
  />
);

export const CustomFileTextIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src={FileTextIcon} 
    alt="File" 
    className={className}
    style={{ width: size, height: size }}
  />
);

export const CustomHeadphonesIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src={HeadphonesIcon} 
    alt="Support" 
    className={className}
    style={{ width: size, height: size }}
  />
);

export const CustomSettingsIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src={SettingsIcon} 
    alt="Settings" 
    className={className}
    style={{ width: size, height: size }}
  />
);

export const CustomTargetIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src={TargetIcon} 
    alt="Target" 
    className={className}
    style={{ width: size, height: size }}
  />
);

export const CustomUserIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src={UserIcon} 
    alt="User" 
    className={className}
    style={{ width: size, height: size }}
  />
);

// Additional cybersecurity-themed icons
export const CustomShieldIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src={ShieldIcon} 
    alt="Shield" 
    className={className}
    style={{ width: size, height: size }}
  />
);

export const CustomLockIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src={LockIcon} 
    alt="Lock" 
    className={className}
    style={{ width: size, height: size }}
  />
);

export const CustomSecuredLockIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src={SecuredLockIcon} 
    alt="Secured Lock" 
    className={className}
    style={{ width: size, height: size }}
  />
);

export const CustomBotIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src={cypherAiAssistImage} 
    alt="Cypher AI Assistant" 
    className={`rounded-full ${className}`}
    style={{ width: size, height: size }}
  />
);

export const CustomBot2Icon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src={cypherAiAssistImage} 
    alt="Cypher AI Assistant" 
    className={`rounded-full ${className}`}
    style={{ width: size, height: size }}
  />
);

export const CustomBrainIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <div className={`relative inline-block ${className}`} style={{ width: size, height: size }}>
    <img 
      src={cypherAiGenImage} 
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
      src={cypherAiGenImage} 
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
    src={EyeIcon} 
    alt="Monitoring" 
    className={className}
    style={{ width: size, height: size }}
  />
);

export const CustomLightningIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src={LightningIcon} 
    alt="Lightning" 
    className={className}
    style={{ width: size, height: size }}
  />
);

export const CustomZapIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src={ZapIcon} 
    alt="Zap" 
    className={className}
    style={{ width: size, height: size }}
  />
);

export const CustomCypherAIIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src={CypherAIIcon} 
    alt="Cypher AI" 
    className={className}
    style={{ width: size, height: size }}
  />
);

export const CustomCyberSecureBadgeIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src={CyberSecureBadgeIcon} 
    alt="CyberSecure Badge" 
    className={className}
    style={{ width: size, height: size }}
  />
);

export const CustomAuthenticationIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src={AuthenticationIcon} 
    alt="Authentication" 
    className={className}
    style={{ width: size, height: size }}
  />
);

export const CustomFileSharingIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src={FileSharingIcon} 
    alt="File Sharing" 
    className={className}
    style={{ width: size, height: size }}
  />
);

export const CustomActivityIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src={ActivityIcon} 
    alt="Activity" 
    className={className}
    style={{ width: size, height: size }}
  />
);

export const CustomAlertSignalIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src={AlertSignalIcon} 
    alt="Alert" 
    className={className}
    style={{ width: size, height: size }}
  />
);

export const CustomYellowWarningIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src={YellowWarningIcon} 
    alt="Warning" 
    className={className}
    style={{ width: size, height: size }}
  />
);

export const CustomRedWarningIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src={RedWarningIcon} 
    alt="High Alert" 
    className={className}
    style={{ width: size, height: size }}
  />
);

export const CustomGlobeIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src={GlobeIcon} 
    alt="Global" 
    className={className}
    style={{ width: size, height: size }}
  />
);

export const CustomRocketIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src={RocketIcon} 
    alt="Rocket" 
    className={className}
    style={{ width: size, height: size }}
  />
);

export const CustomTrendingUpIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src={TrendingUpIcon} 
    alt="Trending Up" 
    className={className}
    style={{ width: size, height: size }}
  />
);

export const CustomFlagIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src={FlagIcon} 
    alt="Flag" 
    className={className}
    style={{ width: size, height: size }}
  />
);

export const CustomSearchIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src={SearchIcon} 
    alt="Search" 
    className={className}
    style={{ width: size, height: size }}
  />
);

export const CustomInfrastructureIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src={InfrastructureIcon} 
    alt="Infrastructure" 
    className={className}
    style={{ width: size, height: size }}
  />
);

export const CustomAdvancedThreatIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src={AdvancedThreatIcon} 
    alt="Advanced Threat" 
    className={className}
    style={{ width: size, height: size }}
  />
);

export const CustomFingerprintIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src={FingerprintIcon} 
    alt="Fingerprint" 
    className={className}
    style={{ width: size, height: size }}
  />
);

export const CustomScanIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src={ScanIcon} 
    alt="Scan" 
    className={className}
    style={{ width: size, height: size }}
  />
);

export const CustomSecuredIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src={SecuredIcon} 
    alt="Secured" 
    className={className}
    style={{ width: size, height: size }}
  />
);

export const CustomVerifyingIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src={VerifyingIcon} 
    alt="Verifying" 
    className={className}
    style={{ width: size, height: size }}
  />
);

export const CustomCheckBadgeIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src={CheckBadgeIcon} 
    alt="Check Badge" 
    className={className}
    style={{ width: size, height: size }}
  />
);

export const CustomBugIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src={BugIcon} 
    alt="Bug" 
    className={className}
    style={{ width: size, height: size }}
  />
);

export const CustomClockIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src={ClockIcon} 
    alt="Clock" 
    className={className}
    style={{ width: size, height: size }}
  />
);

export const CustomMailIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src={MailIcon} 
    alt="Mail" 
    className={className}
    style={{ width: size, height: size }}
  />
);

export const CustomBellIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src={BellIcon} 
    alt="Bell" 
    className={className}
    style={{ width: size, height: size }}
  />
);

export const CustomPhoneIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src={PhoneIcon} 
    alt="Phone" 
    className={className}
    style={{ width: size, height: size }}
  />
);

export const CustomSmartphoneIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src={SmartphoneIcon} 
    alt="Smartphone" 
    className={className}
    style={{ width: size, height: size }}
  />
);

export const CustomCalendarIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src={CalendarIcon} 
    alt="Calendar" 
    className={className}
    style={{ width: size, height: size }}
  />
);

export const CustomGraduationCapIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src={GraduationCapIcon} 
    alt="Education" 
    className={className}
    style={{ width: size, height: size }}
  />
);

export const CustomVerificationGraduateIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src={VerificationGraduateIcon} 
    alt="Verified Education" 
    className={className}
    style={{ width: size, height: size }}
  />
);

export const CustomPowerIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src={PowerIcon} 
    alt="Power" 
    className={className}
    style={{ width: size, height: size }}
  />
);

export const CustomRightArrowIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src={RightArrowIcon} 
    alt="Right Arrow" 
    className={className}
    style={{ width: size, height: size }}
  />
);

export const CustomLeftArrowIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src={LeftArrowIcon} 
    alt="Left Arrow" 
    className={className}
    style={{ width: size, height: size }}
  />
);

export const CustomDesktopIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src={DesktopIcon} 
    alt="Desktop" 
    className={className}
    style={{ width: size, height: size }}
  />
);

export const CustomLocationIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src={LocationIcon} 
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
      src={cypherAiAssistImage} 
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
    <circle cx="12" cy="15" r="1" fill="currentColor" className="animate-pulse"/>
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
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="currentColor" strokeWidth="2" fill="rgba(34, 197, 94, 0.2)"/>
    <circle cx="12" cy="12" r="1" fill="currentColor" className="animate-pulse"/>
  </svg>
);

// Enhanced 4D Server Icon with glass morphism effects
export const Enhanced4DServerIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={`glass-icon ${className}`}
  >
    <rect x="2" y="3" width="20" height="4" rx="1" stroke="currentColor" strokeWidth="2" fill="rgba(59, 130, 246, 0.2)"/>
    <rect x="2" y="9" width="20" height="4" rx="1" stroke="currentColor" strokeWidth="2" fill="rgba(59, 130, 246, 0.2)"/>
    <rect x="2" y="15" width="20" height="4" rx="1" stroke="currentColor" strokeWidth="2" fill="rgba(59, 130, 246, 0.2)"/>
    <circle cx="6" cy="5" r="1" fill="currentColor" className="animate-pulse"/>
    <circle cx="6" cy="11" r="1" fill="currentColor" className="animate-pulse"/>
    <circle cx="6" cy="17" r="1" fill="currentColor" className="animate-pulse"/>
  </svg>
);

// Enhanced 4D Search Icon with glass morphism effects
export const Enhanced4DSearchIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={`glass-icon ${className}`}
  >
    <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" fill="rgba(34, 211, 238, 0.1)"/>
    <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2"/>
    <circle cx="11" cy="11" r="1" fill="currentColor" className="animate-pulse"/>
  </svg>
);

// Enhanced 4D Bell Icon with glass morphism effects
export const Enhanced4DBellIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={`glass-icon ${className}`}
  >
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" stroke="currentColor" strokeWidth="2" fill="rgba(251, 146, 60, 0.1)"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" strokeWidth="2"/>
    <circle cx="12" cy="10" r="1" fill="currentColor" className="animate-pulse"/>
  </svg>
);

// Enhanced 4D AlertTriangle Icon with glass morphism effects
export const Enhanced4DAlertTriangleIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={`glass-icon ${className}`}
  >
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" stroke="currentColor" strokeWidth="2" fill="rgba(239, 68, 68, 0.1)"/>
    <path d="M12 9v4" stroke="currentColor" strokeWidth="2"/>
    <circle cx="12" cy="17" r="1" fill="currentColor" className="animate-pulse"/>
  </svg>
);

// Enhanced 4D CheckCircle Icon with glass morphism effects
export const Enhanced4DCheckCircleIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={`glass-icon ${className}`}
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" strokeWidth="2" fill="rgba(34, 197, 94, 0.1)"/>
    <path d="m9 11 3 3L22 4" stroke="currentColor" strokeWidth="2"/>
    <circle cx="12" cy="12" r="1" fill="currentColor" className="animate-pulse"/>
  </svg>
);

// Enhanced 4D Users Icon with glass morphism effects
export const Enhanced4DUsersIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={`glass-icon ${className}`}
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" fill="rgba(168, 85, 247, 0.1)"/>
    <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" fill="rgba(168, 85, 247, 0.1)"/>
    <path d="m22 21v-2a4 4 0 0 0-3-3.87" stroke="currentColor" strokeWidth="2"/>
    <path d="m16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2"/>
    <circle cx="9" cy="9" r="1" fill="currentColor" className="animate-pulse"/>
  </svg>
);

// Enhanced 4D Settings Icon with glass morphism effects
export const Enhanced4DSettingsIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={`glass-icon ${className}`}
  >
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" fill="rgba(156, 163, 175, 0.2)"/>
    <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1m18-6h-4.5M12 11H1" stroke="currentColor" strokeWidth="2"/>
    <circle cx="12" cy="12" r="1" fill="currentColor" className="animate-pulse"/>
  </svg>
);

// Enhanced 4D TrendingUp Icon with glass morphism effects
export const Enhanced4DTrendingUpIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={`glass-icon ${className}`}
  >
    <polyline points="22,7 13.5,15.5 8.5,10.5 2,17" stroke="currentColor" strokeWidth="2" fill="none"/>
    <polyline points="16,7 22,7 22,13" stroke="currentColor" strokeWidth="2" fill="rgba(34, 197, 94, 0.2)"/>
    <circle cx="13.5" cy="15.5" r="1" fill="currentColor" className="animate-pulse"/>
  </svg>
);

// Enhanced 4D ExternalLink Icon with glass morphism effects
export const Enhanced4DExternalLinkIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={`glass-icon ${className}`}
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" stroke="currentColor" strokeWidth="2" fill="rgba(34, 211, 238, 0.1)"/>
    <polyline points="15,3 21,3 21,9" stroke="currentColor" strokeWidth="2" fill="rgba(34, 211, 238, 0.2)"/>
    <line x1="10" y1="14" x2="21" y2="3" stroke="currentColor" strokeWidth="2"/>
    <circle cx="15.5" cy="8.5" r="1" fill="currentColor" className="animate-pulse"/>
  </svg>
);

// Enhanced 4D ArrowRight Icon with glass morphism effects
export const Enhanced4DArrowRightIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={`glass-icon ${className}`}
  >
    <path d="M5 12h14" stroke="currentColor" strokeWidth="2"/>
    <path d="m12 5 7 7-7 7" stroke="currentColor" strokeWidth="2" fill="rgba(34, 211, 238, 0.2)"/>
    <circle cx="16" cy="12" r="1" fill="currentColor" className="animate-pulse"/>
  </svg>
);

// Enhanced 4D Building Icon with glass morphism effects
export const Enhanced4DBuildingIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={`glass-icon ${className}`}
  >
    <path d="M6 2h8v20H6z" stroke="currentColor" strokeWidth="2" fill="rgba(168, 85, 247, 0.1)"/>
    <path d="M14 2h6v20h-6z" stroke="currentColor" strokeWidth="2" fill="rgba(168, 85, 247, 0.2)"/>
    <path d="M8 6h2v2H8z" stroke="currentColor" strokeWidth="1" fill="rgba(168, 85, 247, 0.3)"/>
    <path d="M8 10h2v2H8z" stroke="currentColor" strokeWidth="1" fill="rgba(168, 85, 247, 0.3)"/>
    <path d="M8 14h2v2H8z" stroke="currentColor" strokeWidth="1" fill="rgba(168, 85, 247, 0.3)"/>
    <path d="M16 6h2v2h-2z" stroke="currentColor" strokeWidth="1" fill="rgba(168, 85, 247, 0.3)"/>
    <path d="M16 10h2v2h-2z" stroke="currentColor" strokeWidth="1" fill="rgba(168, 85, 247, 0.3)"/>
    <path d="M16 14h2v2h-2z" stroke="currentColor" strokeWidth="1" fill="rgba(168, 85, 247, 0.3)"/>
    <circle cx="12" cy="12" r="1" fill="currentColor" className="animate-pulse"/>
  </svg>
);

// Enhanced 4D Star Icon with glass morphism effects
export const Enhanced4DStarIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={`glass-icon ${className}`}
  >
    <polygon points="12,2 15.09,8.26 22,9 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9 8.91,8.26" stroke="currentColor" strokeWidth="2" fill="rgba(251, 191, 36, 0.2)"/>
    <circle cx="12" cy="12" r="1" fill="currentColor" className="animate-pulse"/>
  </svg>
);

// Enhanced 4D Crown Icon with glass morphism effects
export const Enhanced4DCrownIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={`glass-icon ${className}`}
  >
    <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14" stroke="currentColor" strokeWidth="2" fill="rgba(251, 191, 36, 0.2)"/>
    <circle cx="12" cy="8" r="1" fill="currentColor" className="animate-pulse"/>
  </svg>
);

// Enhanced 4D Phone Icon with glass morphism effects
export const Enhanced4DPhoneIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={`glass-icon ${className}`}
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="2" fill="rgba(34, 197, 94, 0.2)"/>
    <circle cx="15" cy="9" r="1" fill="currentColor" className="animate-pulse"/>
  </svg>
);

