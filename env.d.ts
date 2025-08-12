declare namespace NodeJS {
  interface ProcessEnv {
    // API Configuration
    REACT_APP_API_BASE_URL: string;
    REACT_APP_AUTH_REGISTER_URL: string;
    REACT_APP_AUTH_LOGIN_URL: string;
    REACT_APP_CATEGORIES_URL: string;
    REACT_APP_USERS_URL:string;
  }
}