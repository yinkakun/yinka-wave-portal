/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ALCHEMY_ID: string;
  readonly VITE_JSON_RPC_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
