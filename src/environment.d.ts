declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV?: string;
    PORT: string;
    MONGODB_URI: string;
  }
}
