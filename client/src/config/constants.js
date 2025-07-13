export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_BASE_URL || "http://localhost:3001",

  // API endpoints
  ENDPOINTS: {
    PATIENTS: "/api/v1/patients",
    CLINICIANS: "/api/v1/clinicians",
    VISITS: "/api/v1/visits",
    AUTH: "/api/v1/auth",
  },
};

export const buildApiUrl = (endpoint, params = "") => {
  return `${API_CONFIG.BASE_URL}${endpoint}${params}`;
};

export const ENV_CONFIG = {
  isDevelopment: process.env.NODE_ENV === "development",
  isProduction: process.env.NODE_ENV === "production",
  apiTimeout: process.env.REACT_APP_API_TIMEOUT || 5000,
};

const FOREIGN_KEY_ERROR_CODE = {
  PATIENT_ID: "INVALID_PATIENT_FK",
  PATIENT_NAME: "INVALID_PATIENT_NAME_FK",
  CLINICIAN_ID: "INVALID_CLINICIAN_FK",
};
