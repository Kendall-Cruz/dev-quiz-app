declare namespace NodeJS {
  interface ProcessEnv {
    // API Configuration
    EXPO_PUBLIC_API_BASE_URL: string;
    EXPO_PUBLIC_AUTH_REGISTER_URL: string;
    EXPO_PUBLIC_AUTH_LOGIN_URL: string;
    EXPO_PUBLIC_CATEGORIES_URL: string;
    EXPO_PUBLIC_USERS_URL:string;
    EXPO_PUBLIC_QUESTIONS:string
  }
}