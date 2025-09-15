import React, { Suspense, lazy } from 'react';
import { DynamicLazyImage, LazyImage } from './LazyImage';

// Define the icon configuration with direct /assets/ paths
const ICON_CONFIGS = {
  // Basic icons
  checkmark: '/assets/Checkmark.webp',
  clipboardCheck: '/assets/Clipboard Check Mark.webp',
  database: '/assets/Database.webp',
  fileText: '/assets/FileText.webp',
  headphones: '/assets/Headphones.webp',
  settings: '/assets/Settings.webp',
  target: '/assets/Target.webp',
  user: '/assets/User.webp',
  
  // Security icons - using WebP for Cypher AI, JPG for others
  shield: '/assets/Shield.webp',
  lock: '/assets/Lock.webp',
  securedLock: '/assets/Secured Lock.webp',
  bot: '/assets/Cypher AI Asst. webp_1757949055406.webp', // Using WebP
  bot2: '/assets/Cypher AI Asst. webp_1757949055406.webp', // Using WebP
  brain: '/assets/Cypher AI Gen_1757949055407.webp', // Using WebP
  cypherAiGen: '/assets/Cypher AI Gen_1757949055407.webp', // Using WebP
  cypherAiAssist: '/assets/Cypher AI Asst. webp_1757949055406.webp', // Using WebP
  eye: '/assets/Eye.webp',
  lightning: '/assets/Lightning.webp',
  zap: '/assets/Zap.webp',
  cypherAI: '/assets/Cypher AI.webp',
  cyberSecureBadge: '/assets/CyberSecure Shield Badge.webp',
  authentication: '/assets/Authentication.webp',
  fileSharing: '/assets/File Sharing.webp',
  activity: '/assets/Activity.webp',
  alertSignal: '/assets/Alert Signal.webp',
  yellowWarning: '/assets/Yellow Warning Triangle.webp',
  redWarning: '/assets/Red Warning Triangle.webp',
  globe: '/assets/Globe.webp',
  rocket: '/assets/Rocket.webp',
  trendingUp: '/assets/Trending Up.webp',
  flag: '/assets/Flag.webp',
  search: '/assets/Search.webp',
  infrastructure: '/assets/Infrastructure.webp',
  advancedThreat: '/assets/Advanced Threat Management.webp',
  fingerprint: '/assets/Fingerprint.webp',
  scan: '/assets/Scan.webp',
  secured: '/assets/Secured.webp',
  verifying: '/assets/Verifying.webp',
  checkBadge: '/assets/Check Badge.webp',
  bug: '/assets/Bug.webp',
  clock: '/assets/Clock.webp',
  mail: '/assets/Mail.webp',
  bell: '/assets/Bell.webp',
  phone: '/assets/Phone.webp',
  smartphone: '/assets/Smartphone.webp',
  calendar: '/assets/Calendar.webp',
  graduationCap: '/assets/Graduation Cap.webp',
  verificationGraduate: '/assets/Verification Graduate Cap.webp',
  power: '/assets/Power.webp',
  rightArrow: '/assets/Right Arrow.webp',
  leftArrow: '/assets/Left Arrow.webp',
  desktop: '/assets/Desktop.webp',
  location: '/assets/Location.webp'
};

interface IconProps {
  iconKey: keyof typeof ICON_CONFIGS;
  alt: string;
  className?: string;
  size?: number;
  style?: React.CSSProperties;
  loading?: 'lazy' | 'eager';
}

// Generic lazy icon component
function LazyIcon({ iconKey, alt, className = '', size = 24, style, loading = 'lazy' }: IconProps) {
  const iconPath = ICON_CONFIGS[iconKey];
  
  if (!iconPath) {
    console.warn(`Icon key "${iconKey}" not found in ICON_CONFIGS`);
    return null;
  }

  return (
    <DynamicLazyImage
      imagePath={iconPath}
      alt={alt}
      className={`inline-block ${className}`}
      style={{
        width: size,
        height: size,
        ...style
      }}
      loading={loading}
      loadingComponent={
        <div 
          className={`inline-block bg-gray-200 dark:bg-gray-700 rounded animate-pulse ${className}`}
          style={{ width: size, height: size, ...style }}
        />
      }
      errorComponent={
        <div 
          className={`inline-block bg-red-100 dark:bg-red-900 rounded flex items-center justify-center text-red-500 text-xs ${className}`}
          style={{ width: size, height: size, ...style }}
        >
          !
        </div>
      }
    />
  );
}

// Exported icon components (same API as before, but lazy-loaded)
export function CustomCheckmarkIcon({ className, size, style, loading }: Omit<IconProps, 'iconKey' | 'alt'>) {
  return <LazyIcon iconKey="checkmark" alt="Checkmark" className={className} size={size} style={style} loading={loading} />;
}

export function CustomCheckIcon({ className, size, style, loading }: Omit<IconProps, 'iconKey' | 'alt'>) {
  return <LazyIcon iconKey="checkmark" alt="Check" className={className} size={size} style={style} loading={loading} />;
}

export function CustomClipboardCheckIcon({ className, size, style, loading }: Omit<IconProps, 'iconKey' | 'alt'>) {
  return <LazyIcon iconKey="clipboardCheck" alt="Clipboard Check" className={className} size={size} style={style} loading={loading} />;
}

export function CustomDatabaseIcon({ className, size, style, loading }: Omit<IconProps, 'iconKey' | 'alt'>) {
  return <LazyIcon iconKey="database" alt="Database" className={className} size={size} style={style} loading={loading} />;
}

export function CustomFileTextIcon({ className, size, style, loading }: Omit<IconProps, 'iconKey' | 'alt'>) {
  return <LazyIcon iconKey="fileText" alt="File Text" className={className} size={size} style={style} loading={loading} />;
}

export function CustomHeadphonesIcon({ className, size, style, loading }: Omit<IconProps, 'iconKey' | 'alt'>) {
  return <LazyIcon iconKey="headphones" alt="Headphones" className={className} size={size} style={style} loading={loading} />;
}

export function CustomSettingsIcon({ className, size, style, loading }: Omit<IconProps, 'iconKey' | 'alt'>) {
  return <LazyIcon iconKey="settings" alt="Settings" className={className} size={size} style={style} loading={loading} />;
}

export function CustomTargetIcon({ className, size, style, loading }: Omit<IconProps, 'iconKey' | 'alt'>) {
  return <LazyIcon iconKey="target" alt="Target" className={className} size={size} style={style} loading={loading} />;
}

export function CustomUserIcon({ className, size, style, loading }: Omit<IconProps, 'iconKey' | 'alt'>) {
  return <LazyIcon iconKey="user" alt="User" className={className} size={size} style={style} loading={loading} />;
}

export function CustomShieldIcon({ className, size, style, loading }: Omit<IconProps, 'iconKey' | 'alt'>) {
  return <LazyIcon iconKey="shield" alt="Shield" className={className} size={size} style={style} loading={loading} />;
}

export function CustomLockIcon({ className, size, style, loading }: Omit<IconProps, 'iconKey' | 'alt'>) {
  return <LazyIcon iconKey="lock" alt="Lock" className={className} size={size} style={style} loading={loading} />;
}

export function CustomBotIcon({ className, size, style, loading }: Omit<IconProps, 'iconKey' | 'alt'>) {
  return <LazyIcon iconKey="bot" alt="Cypher AI Assistant" className={`rounded-full ${className}`} size={size} style={style} loading={loading} />;
}

export function CustomBrainIcon({ className, size, style, loading }: Omit<IconProps, 'iconKey' | 'alt'>) {
  return <LazyIcon iconKey="brain" alt="Cypher AI Genetic Model" className={`rounded-full ${className}`} size={size} style={style} loading={loading} />;
}

export function CustomEyeIcon({ className, size, style, loading }: Omit<IconProps, 'iconKey' | 'alt'>) {
  return <LazyIcon iconKey="eye" alt="Eye" className={className} size={size} style={style} loading={loading} />;
}

export function CustomZapIcon({ className, size, style, loading }: Omit<IconProps, 'iconKey' | 'alt'>) {
  return <LazyIcon iconKey="zap" alt="Zap" className={className} size={size} style={style} loading={loading} />;
}

export function CustomActivityIcon({ className, size, style, loading }: Omit<IconProps, 'iconKey' | 'alt'>) {
  return <LazyIcon iconKey="activity" alt="Activity" className={className} size={size} style={style} loading={loading} />;
}

export function CustomGlobeIcon({ className, size, style, loading }: Omit<IconProps, 'iconKey' | 'alt'>) {
  return <LazyIcon iconKey="globe" alt="Globe" className={className} size={size} style={style} loading={loading} />;
}

export function CustomTrendingUpIcon({ className, size, style, loading }: Omit<IconProps, 'iconKey' | 'alt'>) {
  return <LazyIcon iconKey="trendingUp" alt="Trending Up" className={className} size={size} style={style} loading={loading} />;
}

export function CustomFlagIcon({ className, size, style, loading }: Omit<IconProps, 'iconKey' | 'alt'>) {
  return <LazyIcon iconKey="flag" alt="Flag" className={className} size={size} style={style} loading={loading} />;
}

export function CustomGraduationCapIcon({ className, size, style, loading }: Omit<IconProps, 'iconKey' | 'alt'>) {
  return <LazyIcon iconKey="graduationCap" alt="Graduation Cap" className={className} size={size} style={style} loading={loading} />;
}

export function CustomAuthenticationIcon({ className, size, style, loading }: Omit<IconProps, 'iconKey' | 'alt'>) {
  return <LazyIcon iconKey="authentication" alt="Authentication" className={className} size={size} style={style} loading={loading} />;
}

export function CustomAlertSignalIcon({ className, size, style, loading }: Omit<IconProps, 'iconKey' | 'alt'>) {
  return <LazyIcon iconKey="alertSignal" alt="Alert Signal" className={className} size={size} style={style} loading={loading} />;
}

export function CustomBellIcon({ className, size, style, loading }: Omit<IconProps, 'iconKey' | 'alt'>) {
  return <LazyIcon iconKey="bell" alt="Bell" className={className} size={size} style={style} loading={loading} />;
}

export function CustomClockIcon({ className, size, style, loading }: Omit<IconProps, 'iconKey' | 'alt'>) {
  return <LazyIcon iconKey="clock" alt="Clock" className={className} size={size} style={style} loading={loading} />;
}

export function CustomBugIcon({ className, size, style, loading }: Omit<IconProps, 'iconKey' | 'alt'>) {
  return <LazyIcon iconKey="bug" alt="Bug" className={className} size={size} style={style} loading={loading} />;
}

export function CustomCheckBadgeIcon({ className, size, style, loading }: Omit<IconProps, 'iconKey' | 'alt'>) {
  return <LazyIcon iconKey="checkBadge" alt="Check Badge" className={className} size={size} style={style} loading={loading} />;
}

export function CustomDesktopIcon({ className, size, style, loading }: Omit<IconProps, 'iconKey' | 'alt'>) {
  return <LazyIcon iconKey="desktop" alt="Desktop" className={className} size={size} style={style} loading={loading} />;
}

export function CustomLocationIcon({ className, size, style, loading }: Omit<IconProps, 'iconKey' | 'alt'>) {
  return <LazyIcon iconKey="location" alt="Location" className={className} size={size} style={style} loading={loading} />;
}

// Create a lazy component for the heavy icons that are rarely seen
export const LazyEnhanced4DIcon = lazy(() => import('./Enhanced4DIcon').catch(() => ({ 
  default: ({ className, size }: { className?: string, size?: number }) => 
    <div className={`bg-gradient-to-br from-blue-500 to-purple-600 rounded ${className}`} 
         style={{ width: size || 24, height: size || 24 }} />
})));

// Enhanced 4D Icons (lazy loaded versions)
export function Enhanced4DShieldIcon({ className, size = 24 }: { className?: string, size?: number }) {
  return (
    <Suspense fallback={<div className={`bg-gray-200 dark:bg-gray-700 rounded animate-pulse ${className}`} style={{ width: size, height: size }} />}>
      <LazyEnhanced4DIcon type="shield" className={className} size={size} />
    </Suspense>
  );
}

export function Enhanced4DLockIcon({ className, size = 24 }: { className?: string, size?: number }) {
  return (
    <Suspense fallback={<div className={`bg-gray-200 dark:bg-gray-700 rounded animate-pulse ${className}`} style={{ width: size, height: size }} />}>
      <LazyEnhanced4DIcon type="lock" className={className} size={size} />
    </Suspense>
  );
}

export function Enhanced4DBrainIcon({ className, size = 24 }: { className?: string, size?: number }) {
  return (
    <Suspense fallback={<div className={`bg-gray-200 dark:bg-gray-700 rounded animate-pulse ${className}`} style={{ width: size, height: size }} />}>
      <LazyEnhanced4DIcon type="brain" className={className} size={size} />
    </Suspense>
  );
}

export function Enhanced4DTargetIcon({ className, size = 24 }: { className?: string, size?: number }) {
  return (
    <Suspense fallback={<div className={`bg-gray-200 dark:bg-gray-700 rounded animate-pulse ${className}`} style={{ width: size, height: size }} />}>
      <LazyEnhanced4DIcon type="target" className={className} size={size} />
    </Suspense>
  );
}

export function Enhanced4DEyeIcon({ className, size = 24 }: { className?: string, size?: number }) {
  return (
    <Suspense fallback={<div className={`bg-gray-200 dark:bg-gray-700 rounded animate-pulse ${className}`} style={{ width: size, height: size }} />}>
      <LazyEnhanced4DIcon type="eye" className={className} size={size} />
    </Suspense>
  );
}

export function Enhanced4DBotIcon({ className, size = 24 }: { className?: string, size?: number }) {
  return (
    <Suspense fallback={<div className={`bg-gray-200 dark:bg-gray-700 rounded animate-pulse ${className}`} style={{ width: size, height: size }} />}>
      <LazyEnhanced4DIcon type="bot" className={className} size={size} />
    </Suspense>
  );
}

export function Enhanced4DZapIcon({ className, size = 24 }: { className?: string, size?: number }) {
  return (
    <Suspense fallback={<div className={`bg-gray-200 dark:bg-gray-700 rounded animate-pulse ${className}`} style={{ width: size, height: size }} />}>
      <LazyEnhanced4DIcon type="zap" className={className} size={size} />
    </Suspense>
  );
}

export function Enhanced4DActivityIcon({ className, size = 24 }: { className?: string, size?: number }) {
  return (
    <Suspense fallback={<div className={`bg-gray-200 dark:bg-gray-700 rounded animate-pulse ${className}`} style={{ width: size, height: size }} />}>
      <LazyEnhanced4DIcon type="activity" className={className} size={size} />
    </Suspense>
  );
}

export function Enhanced4DCheckCircleIcon({ className, size = 24 }: { className?: string, size?: number }) {
  return (
    <Suspense fallback={<div className={`bg-gray-200 dark:bg-gray-700 rounded animate-pulse ${className}`} style={{ width: size, height: size }} />}>
      <LazyEnhanced4DIcon type="checkCircle" className={className} size={size} />
    </Suspense>
  );
}

export function Enhanced4DUsersIcon({ className, size = 24 }: { className?: string, size?: number }) {
  return (
    <Suspense fallback={<div className={`bg-gray-200 dark:bg-gray-700 rounded animate-pulse ${className}`} style={{ width: size, height: size }} />}>
      <LazyEnhanced4DIcon type="users" className={className} size={size} />
    </Suspense>
  );
}

export function Enhanced4DAlertTriangleIcon({ className, size = 24 }: { className?: string, size?: number }) {
  return (
    <Suspense fallback={<div className={`bg-gray-200 dark:bg-gray-700 rounded animate-pulse ${className}`} style={{ width: size, height: size }} />}>
      <LazyEnhanced4DIcon type="alertTriangle" className={className} size={size} />
    </Suspense>
  );
}

export function Enhanced4DArrowRightIcon({ className, size = 24 }: { className?: string, size?: number }) {
  return (
    <Suspense fallback={<div className={`bg-gray-200 dark:bg-gray-700 rounded animate-pulse ${className}`} style={{ width: size, height: size }} />}>
      <LazyEnhanced4DIcon type="arrowRight" className={className} size={size} />
    </Suspense>
  );
}

export function Enhanced4DExternalLinkIcon({ className, size = 24 }: { className?: string, size?: number }) {
  return (
    <Suspense fallback={<div className={`bg-gray-200 dark:bg-gray-700 rounded animate-pulse ${className}`} style={{ width: size, height: size }} />}>
      <LazyEnhanced4DIcon type="externalLink" className={className} size={size} />
    </Suspense>
  );
}

export function Enhanced4DTrendingUpIcon({ className, size = 24 }: { className?: string, size?: number }) {
  return (
    <Suspense fallback={<div className={`bg-gray-200 dark:bg-gray-700 rounded animate-pulse ${className}`} style={{ width: size, height: size }} />}>
      <LazyEnhanced4DIcon type="trendingUp" className={className} size={size} />
    </Suspense>
  );
}

export function Enhanced4DGlobeIcon({ className, size = 24 }: { className?: string, size?: number }) {
  return (
    <Suspense fallback={<div className={`bg-gray-200 dark:bg-gray-700 rounded animate-pulse ${className}`} style={{ width: size, height: size }} />}>
      <LazyEnhanced4DIcon type="globe" className={className} size={size} />
    </Suspense>
  );
}

export function Enhanced4DFileIcon({ className, size = 24 }: { className?: string, size?: number }) {
  return (
    <Suspense fallback={<div className={`bg-gray-200 dark:bg-gray-700 rounded animate-pulse ${className}`} style={{ width: size, height: size }} />}>
      <LazyEnhanced4DIcon type="file" className={className} size={size} />
    </Suspense>
  );
}

export function Enhanced4DServerIcon({ className, size = 24 }: { className?: string, size?: number }) {
  return (
    <Suspense fallback={<div className={`bg-gray-200 dark:bg-gray-700 rounded animate-pulse ${className}`} style={{ width: size, height: size }} />}>
      <LazyEnhanced4DIcon type="server" className={className} size={size} />
    </Suspense>
  );
}

export function Enhanced4DBuildingIcon({ className, size = 24 }: { className?: string, size?: number }) {
  return (
    <Suspense fallback={<div className={`bg-gray-200 dark:bg-gray-700 rounded animate-pulse ${className}`} style={{ width: size, height: size }} />}>
      <LazyEnhanced4DIcon type="building" className={className} size={size} />
    </Suspense>
  );
}

export function Enhanced4DNetworkIcon({ className, size = 24 }: { className?: string, size?: number }) {
  return (
    <Suspense fallback={<div className={`bg-gray-200 dark:bg-gray-700 rounded animate-pulse ${className}`} style={{ width: size, height: size }} />}>
      <LazyEnhanced4DIcon type="network" className={className} size={size} />
    </Suspense>
  );
}

export function Enhanced4DStarIcon({ className, size = 24 }: { className?: string, size?: number }) {
  return (
    <Suspense fallback={<div className={`bg-gray-200 dark:bg-gray-700 rounded animate-pulse ${className}`} style={{ width: size, height: size }} />}>
      <LazyEnhanced4DIcon type="star" className={className} size={size} />
    </Suspense>
  );
}

export function Enhanced4DCrownIcon({ className, size = 24 }: { className?: string, size?: number }) {
  return (
    <Suspense fallback={<div className={`bg-gray-200 dark:bg-gray-700 rounded animate-pulse ${className}`} style={{ width: size, height: size }} />}>
      <LazyEnhanced4DIcon type="crown" className={className} size={size} />
    </Suspense>
  );
}

export function Enhanced4DPhoneIcon({ className, size = 24 }: { className?: string, size?: number }) {
  return (
    <Suspense fallback={<div className={`bg-gray-200 dark:bg-gray-700 rounded animate-pulse ${className}`} style={{ width: size, height: size }} />}>
      <LazyEnhanced4DIcon type="phone" className={className} size={size} />
    </Suspense>
  );
}