declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GITHUB_ID: string;
      GITHUB_SECRET: string;
      GOOGLE_ID: string;
      GOOGLE_SECRET: string;
      NEXT_PUBLIC_SUPABASE_URL: string;
      NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
    }
  }
}
export {};
