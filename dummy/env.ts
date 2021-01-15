export const PRODUCTION_BACKEND_URL = process.env.production;

export const BACKEND_URL = PRODUCTION_BACKEND_URL
  ? PRODUCTION_BACKEND_URL
  : 'http://localhost:8080/project_wings_war';
