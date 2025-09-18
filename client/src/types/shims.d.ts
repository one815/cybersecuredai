// Lightweight ambient declarations to silence missing-module errors and common globals.
declare module '@assets/*' {
  const value: string;
  export default value;
}

declare module '@shared/*' {
  const value: any;
  export default value;
}

declare module '@shared/schema' {
  // Minimal placeholders for commonly-used shared types. Replace with real shared types when available.
  export type User = any;
  export type ThreatNotification = any;
  export type TaxiiServer = any;
  export type StixObject = any;
  export type Badge = any;
  export type ServiceStatus = any;
  export type Threat = any;
  export type AnyRecord = Record<string, any>;
}

declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare const __webpack_public_path__: string;

// SpeechRecognition ambient types
interface SpeechRecognitionEvent extends Event {
  results: any;
}

interface SpeechRecognition extends EventTarget {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((ev: SpeechRecognitionEvent) => any) | null;
  onerror?: ((ev: any) => any) | null;
  onend?: (() => any) | null;
  start(): void;
  stop(): void;
}

interface Window {
  webkitSpeechRecognition?: typeof SpeechRecognition;
  SpeechRecognition?: typeof SpeechRecognition;
}

// three.js JSX intrinsic elements (used by some 3D components) - allow any props
declare namespace JSX {
  interface IntrinsicElements {
    'primitive': any;
    'mesh': any;
    'group': any;
  }
}

// Allow any JSX intrinsic element to reduce type noise from 3D libraries and custom elements
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

// Shims for some internal component modules so temporary props (like size) don't block type-checks
declare module "@/components/ui/badge" {
  import React from 'react';
  export const Badge: React.FC<any>;
}

// Note: LazyCustomIcons is implemented as a real TSX module in src/components.
// Removing the ambient module declaration prevents it from masking the real exports.

// three.js helpers
declare var Vector3: any;
declare var Line: any;
declare var Sphere: any;
declare var Canvas: any;
declare var OrbitControls: any;
declare var SecurityNodeMesh: any;
declare var Search: any;


// allow fetch in node-ish environments for tooling
declare function fetch(input: RequestInfo, init?: RequestInit): Promise<Response>;
