/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APPLICATION_INSIGHTS_CONNECTION_STRING: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
