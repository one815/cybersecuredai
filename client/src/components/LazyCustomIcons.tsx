import React, { Suspense, lazy } from 'react';
import Enhanced4DIcon from './Enhanced4DIcon';

interface IconProps {
  className?: string;
  size?: number;
  style?: React.CSSProperties;
  loading?: 'lazy' | 'eager';
}

// Enhanced 4D lazy icon components using the new Enhanced4DIcon system
export function CustomCheckmarkIcon({ className, size, style, loading }: IconProps) {
  return <Enhanced4DIcon type="checkCircle" className={className} size={size} style={style} />;
}

export function CustomCheckIcon({ className, size, style, loading }: IconProps) {
  return <Enhanced4DIcon type="check" className={className} size={size} style={style} />;
}

export function CustomClipboardCheckIcon({ className, size, style, loading }: IconProps) {
  return <Enhanced4DIcon type="checkCircle" className={className} size={size} style={style} />;
}

export function CustomDatabaseIcon({ className, size, style, loading }: IconProps) {
  return <Enhanced4DIcon type="database" className={className} size={size} style={style} />;
}

export function CustomFileTextIcon({ className, size, style, loading }: IconProps) {
  return <Enhanced4DIcon type="file" className={className} size={size} style={style} />;
}

export function CustomHeadphonesIcon({ className, size, style, loading }: IconProps) {
  return <Enhanced4DIcon type="phone" className={className} size={size} style={style} />;
}

export function CustomSettingsIcon({ className, size, style, loading }: IconProps) {
  return <Enhanced4DIcon type="server" className={className} size={size} style={style} />;
}

export function CustomTargetIcon({ className, size, style, loading }: IconProps) {
  return <Enhanced4DIcon type="target" className={className} size={size} style={style} />;
}

export function CustomUserIcon({ className, size, style, loading }: IconProps) {
  return <Enhanced4DIcon type="user" className={className} size={size} style={style} />;
}

export function CustomShieldIcon({ className, size, style, loading }: IconProps) {
  return <Enhanced4DIcon type="shield" className={className} size={size} style={style} />;
}

export function CustomLockIcon({ className, size, style, loading }: IconProps) {
  return <Enhanced4DIcon type="lock" className={className} size={size} style={style} />;
}

export function CustomBotIcon({ className, size, style, loading }: IconProps) {
  return <Enhanced4DIcon type="bot" className={className} size={size} style={style} />;
}

export function CustomBrainIcon({ className, size, style, loading }: IconProps) {
  return <Enhanced4DIcon type="brain" className={className} size={size} style={style} />;
}

export function CustomEyeIcon({ className, size, style, loading }: IconProps) {
  return <Enhanced4DIcon type="eye" className={className} size={size} style={style} />;
}

export function CustomZapIcon({ className, size, style, loading }: IconProps) {
  return <Enhanced4DIcon type="zap" className={className} size={size} style={style} />;
}

export function CustomActivityIcon({ className, size, style, loading }: IconProps) {
  return <Enhanced4DIcon type="activity" className={className} size={size} style={style} />;
}

export function CustomGlobeIcon({ className, size, style, loading }: IconProps) {
  return <Enhanced4DIcon type="globe" className={className} size={size} style={style} />;
}

export function CustomTrendingUpIcon({ className, size, style, loading }: IconProps) {
  return <Enhanced4DIcon type="trendingUp" className={className} size={size} style={style} />;
}

export function CustomFlagIcon({ className, size, style, loading }: IconProps) {
  return <Enhanced4DIcon type="star" className={className} size={size} style={style} />;
}

export function CustomGraduationCapIcon({ className, size, style, loading }: IconProps) {
  return <Enhanced4DIcon type="crown" className={className} size={size} style={style} />;
}

export function CustomAuthenticationIcon({ className, size, style, loading }: IconProps) {
  return <Enhanced4DIcon type="lock" className={className} size={size} style={style} />;
}

export function CustomAlertSignalIcon({ className, size, style, loading }: IconProps) {
  return <Enhanced4DIcon type="warning" className={className} size={size} style={style} />;
}

export function CustomBellIcon({ className, size, style, loading }: IconProps) {
  return <Enhanced4DIcon type="warning" className={className} size={size} style={style} />;
}

export function CustomClockIcon({ className, size, style, loading }: IconProps) {
  return <Enhanced4DIcon type="activity" className={className} size={size} style={style} />;
}

export function CustomBugIcon({ className, size, style, loading }: IconProps) {
  return <Enhanced4DIcon type="alertTriangle" className={className} size={size} style={style} />;
}

export function CustomCheckBadgeIcon({ className, size, style, loading }: IconProps) {
  return <Enhanced4DIcon type="checkCircle" className={className} size={size} style={style} />;
}

export function CustomDesktopIcon({ className, size, style, loading }: IconProps) {
  return <Enhanced4DIcon type="server" className={className} size={size} style={style} />;
}

export function CustomLocationIcon({ className, size, style, loading }: IconProps) {
  return <Enhanced4DIcon type="target" className={className} size={size} style={style} />;
}

// Enhanced 4D Icons (updated to use the new system)
export function Enhanced4DShieldIcon({ className, size = 24 }: { className?: string, size?: number }) {
  return <Enhanced4DIcon type="shield" className={className} size={size} />;
}

export function Enhanced4DLockIcon({ className, size = 24 }: { className?: string, size?: number }) {
  return <Enhanced4DIcon type="lock" className={className} size={size} />;
}

export function Enhanced4DBrainIcon({ className, size = 24 }: { className?: string, size?: number }) {
  return <Enhanced4DIcon type="brain" className={className} size={size} />;
}

export function Enhanced4DTargetIcon({ className, size = 24 }: { className?: string, size?: number }) {
  return <Enhanced4DIcon type="target" className={className} size={size} />;
}

export function Enhanced4DEyeIcon({ className, size = 24 }: { className?: string, size?: number }) {
  return <Enhanced4DIcon type="eye" className={className} size={size} />;
}

export function Enhanced4DBotIcon({ className, size = 24 }: { className?: string, size?: number }) {
  return <Enhanced4DIcon type="bot" className={className} size={size} />;
}

export function Enhanced4DZapIcon({ className, size = 24 }: { className?: string, size?: number }) {
  return <Enhanced4DIcon type="zap" className={className} size={size} />;
}

export function Enhanced4DActivityIcon({ className, size = 24 }: { className?: string, size?: number }) {
  return <Enhanced4DIcon type="activity" className={className} size={size} />;
}

export function Enhanced4DCheckCircleIcon({ className, size = 24 }: { className?: string, size?: number }) {
  return <Enhanced4DIcon type="checkCircle" className={className} size={size} />;
}

export function Enhanced4DUsersIcon({ className, size = 24 }: { className?: string, size?: number }) {
  return <Enhanced4DIcon type="users" className={className} size={size} />;
}

export function Enhanced4DAlertTriangleIcon({ className, size = 24 }: { className?: string, size?: number }) {
  return <Enhanced4DIcon type="alertTriangle" className={className} size={size} />;
}

export function Enhanced4DArrowRightIcon({ className, size = 24 }: { className?: string, size?: number }) {
  return <Enhanced4DIcon type="arrowRight" className={className} size={size} />;
}

export function Enhanced4DExternalLinkIcon({ className, size = 24 }: { className?: string, size?: number }) {
  return <Enhanced4DIcon type="externalLink" className={className} size={size} />;
}

export function Enhanced4DTrendingUpIcon({ className, size = 24 }: { className?: string, size?: number }) {
  return <Enhanced4DIcon type="trendingUp" className={className} size={size} />;
}

export function Enhanced4DGlobeIcon({ className, size = 24 }: { className?: string, size?: number }) {
  return <Enhanced4DIcon type="globe" className={className} size={size} />;
}

export function Enhanced4DFileIcon({ className, size = 24 }: { className?: string, size?: number }) {
  return <Enhanced4DIcon type="file" className={className} size={size} />;
}

export function Enhanced4DServerIcon({ className, size = 24 }: { className?: string, size?: number }) {
  return <Enhanced4DIcon type="server" className={className} size={size} />;
}

export function Enhanced4DBuildingIcon({ className, size = 24 }: { className?: string, size?: number }) {
  return <Enhanced4DIcon type="building" className={className} size={size} />;
}

export function Enhanced4DNetworkIcon({ className, size = 24 }: { className?: string, size?: number }) {
  return <Enhanced4DIcon type="network" className={className} size={size} />;
}

export function Enhanced4DStarIcon({ className, size = 24 }: { className?: string, size?: number }) {
  return <Enhanced4DIcon type="star" className={className} size={size} />;
}

export function Enhanced4DCrownIcon({ className, size = 24 }: { className?: string, size?: number }) {
  return <Enhanced4DIcon type="crown" className={className} size={size} />;
}

export function Enhanced4DPhoneIcon({ className, size = 24 }: { className?: string, size?: number }) {
  return <Enhanced4DIcon type="phone" className={className} size={size} />;
}