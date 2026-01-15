interface ViteTypeOptions {
  strictImportMetaEnv: unknown
}

interface ImportMetaEnv {
  readonly VITE_POSTGREST_URL: string  
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}