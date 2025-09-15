import React, { Suspense, lazy } from 'react';
import { DynamicLazyImage, LazyImage } from './LazyImage';

// Define the icon configuration with paths
const ICON_CONFIGS = {
  // Basic icons
  checkmark: '@assets/Checkmark.jpg',
  clipboardCheck: '@assets/Clipboard Check Mark.jpg',
  database: '@assets/Database.jpg',
  fileText: '@assets/FileText.jpg',
  headphones: '@assets/Headphones.jpg',
  settings: '@assets/Settings.jpg',
  target: '@assets/Target.jpg',
  user: '@assets/User.jpg',
  
  // Security icons
  shield: '@assets/Shield.jpg',
  lock: '@assets/Lock.jpg',
  securedLock: '@assets/Secured Lock.jpg',
  bot: '@assets/Bot.jpg',
  bot2: '@assets/Bot (2).jpg',
  brain: '@assets/Brain.jpg',
  cypherAiGen: '@assets/Cypher AI Gen_1757277451468.jpg',
  cypherAiAssist: '@assets/Cypher AI Assist_1757277458129.jpg',
  eye: '@assets/Eye.jpg',
  lightning: '@assets/Lightning.jpg',
  zap: '@assets/Zap.jpg',
  cypherAI: '@assets/Cypher AI.jpg',
  cyberSecureBadge: '@assets/CyberSecure Shield Badge.jpg',
  authentication: '@assets/Authentication.jpg',
  fileSharing: '@assets/File Sharing.jpg',
  activity: '@assets/Activity.jpg',
  alertSignal: '@assets/Alert Signal.jpg',
  yellowWarning: '@assets/Yellow Warning Triangle.jpg',
  redWarning: '@assets/Red Warning Triangle.jpg',
  globe: '@assets/Globe.jpg',
  rocket: '@assets/Rocket.jpg',
  trendingUp: '@assets/Trending Up.jpg',
  flag: '@assets/Flag.jpg',
  search: '@assets/Search.jpg',
  infrastructure: '@assets/Infrastructure.jpg',
  advancedThreat: '@assets/Advanced Threat Management.jpg',
  fingerprint: '@assets/Fingerprint.jpg',
  scan: '@assets/Scan.jpg',
  secured: '@assets/Secured.jpg',
  verifying: '@assets/Verifying.jpg',
  checkBadge: '@assets/Check Badge.jpg',
  bug: '@assets/Bug.jpg',
  clock: '@assets/Clock.jpg',
  mail: '@assets/Mail.jpg',
  bell: '@assets/Bell.jpg',
  phone: '@assets/Phone.jpg',
  smartphone: '@assets/Smartphone.jpg',
  calendar: '@assets/Calendar.jpg',
  graduationCap: '@assets/Graduation Cap.jpg',
  verificationGraduate: '@assets/Verification Graduate Cap.jpg',
  power: '@assets/Power.jpg',
  rightArrow: '@assets/Right Arrow.jpg',
  leftArrow: '@assets/Left Arrow.jpg'
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
  return <LazyIcon iconKey="bot" alt="Bot" className={className} size={size} style={style} loading={loading} />;
}

export function CustomBrainIcon({ className, size, style, loading }: Omit<IconProps, 'iconKey' | 'alt'>) {
  return <LazyIcon iconKey="brain" alt="Brain" className={className} size={size} style={style} loading={loading} />;
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