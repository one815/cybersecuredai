import React from 'react';

import CheckmarkIcon from '@assets/Checkmark_1756078997677.png';
import ClipboardCheckIcon from '@assets/Clipboard Check Mark_1756078997678.png';
import DatabaseIcon from '@assets/Database_1756078997678.png';
import FileTextIcon from '@assets/FileText_1756078997678.png';
import HeadphonesIcon from '@assets/Headphones_1756078997679.png';
import SettingsIcon from '@assets/Settings_1756078997679.png';
import TargetIcon from '@assets/Target_1756078997679.png';
import UserIcon from '@assets/User_1756078997680.png';

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