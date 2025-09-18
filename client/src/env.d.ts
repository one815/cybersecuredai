/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL?: string;
  readonly BASE_URL?: string;
  // add other env vars you expect
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module "@assets/*" {
  const value: string;
  export default value;
}

declare module "@shared/*" {
  const value: any;
  export = value;
}
