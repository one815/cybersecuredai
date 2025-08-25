import React from 'react';

// Updated cybersecurity-themed icons
import CheckmarkIcon from '@assets/Checkmark.png';
import ClipboardCheckIcon from '@assets/Clipboard Check Mark.png';
import DatabaseIcon from '@assets/Database.png';
import FileTextIcon from '@assets/FileText.png';
import HeadphonesIcon from '@assets/Headphones.png';
import SettingsIcon from '@assets/Settings.png';
import TargetIcon from '@assets/Target.png';
import UserIcon from '@assets/User.png';

// Additional cybersecurity icons
import ShieldIcon from '@assets/Shield.png';
import LockIcon from '@assets/Lock.png';
import SecuredLockIcon from '@assets/Secured Lock.png';
import BotIcon from '@assets/Bot.png';
import Bot2Icon from '@assets/Bot (2).png';
import BrainIcon from '@assets/Brain.png';
import EyeIcon from '@assets/Eye.png';
import LightningIcon from '@assets/Lightning.png';
import ZapIcon from '@assets/Zap.png';
import CypherAIIcon from '@assets/Cypher AI.png';
import CyberSecureBadgeIcon from '@assets/CyberSecure Shield Badge.png';
import AuthenticationIcon from '@assets/Authentication.png';
import FileSharingIcon from '@assets/File Sharing.png';
import ActivityIcon from '@assets/Activity.png';
import AlertSignalIcon from '@assets/Alert Signal.png';
import YellowWarningIcon from '@assets/Yellow Warning Triangle.png';
import RedWarningIcon from '@assets/Red Warning Triangle.png';
import GlobeIcon from '@assets/Globe.png';
import RocketIcon from '@assets/Rocket.png';
import TrendingUpIcon from '@assets/Trending Up.png';
import FlagIcon from '@assets/Flag.png';
import SearchIcon from '@assets/Search.png';
import InfrastructureIcon from '@assets/Infrastructure.png';
import AdvancedThreatIcon from '@assets/Advanced Threat Management.png';
import FingerprintIcon from '@assets/Fingerprint.png';
import ScanIcon from '@assets/Scan.png';
import SecuredIcon from '@assets/Secured.png';
import VerifyingIcon from '@assets/Verifying.png';
import CheckBadgeIcon from '@assets/Check Badge.png';
import BugIcon from '@assets/Bug.png';
import ClockIcon from '@assets/Clock.png';
import MailIcon from '@assets/Mail.png';
import BellIcon from '@assets/Bell.png';
import PhoneIcon from '@assets/Phone.png';
import SmartphoneIcon from '@assets/Smartphone.png';
import CalendarIcon from '@assets/Calendar.png';
import GraduationCapIcon from '@assets/Graduation Cap.png';
import VerificationGraduateIcon from '@assets/Verification Graduate Cap.png';
import PowerIcon from '@assets/Power.png';
import RightArrowIcon from '@assets/Right Arrow.png';
import LeftArrowIcon from '@assets/Left Arrow.png';
import DesktopIcon from '@assets/Desktop.png';
import LocationIcon from '@assets/Location.png';

interface CustomIconProps {
  className?: string;
  size?: number;
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
    src={BotIcon} 
    alt="AI Bot" 
    className={className}
    style={{ width: size, height: size }}
  />
);

export const CustomBot2Icon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src={Bot2Icon} 
    alt="AI Bot" 
    className={className}
    style={{ width: size, height: size }}
  />
);

export const CustomBrainIcon: React.FC<CustomIconProps> = ({ className, size = 24 }) => (
  <img 
    src={BrainIcon} 
    alt="AI Brain" 
    className={className}
    style={{ width: size, height: size }}
  />
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