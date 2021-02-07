export const PRODUCTION_BACKEND_URL = process.env.production;

export const BACKEND_URL = PRODUCTION_BACKEND_URL
  ? PRODUCTION_BACKEND_URL
  : 'http://localhost:8081/mywiki_war';
