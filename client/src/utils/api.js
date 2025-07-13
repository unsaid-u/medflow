import { API_CONFIG, buildApiUrl, ENV_CONFIG } from "../config/constants";

const defaultOptions = {
  headers: {
    "Content-Type": "application/json",
  },
  timeout: ENV_CONFIG.apiTimeout,
  credentials: "include", // for sending cookies
};

export const apiRequest = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      ...defaultOptions,
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    console.error("API Request Error:", error);
    return { data: null, error: error.message };
  }
};

export const authAPI = {
  login: async (credentials) => {
    const url = buildApiUrl(API_CONFIG.ENDPOINTS.AUTH, "/login");
    return apiRequest(url, {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },

  register: async (userData) => {
    const url = buildApiUrl(API_CONFIG.ENDPOINTS.AUTH, "/register");
    return apiRequest(url, {
      method: "POST",
      body: JSON.stringify(userData),
    });
  },
};

export const patientsAPI = {
  getById: async (id) => {
    const url = buildApiUrl(API_CONFIG.ENDPOINTS.PATIENTS, `/${id}`);
    return apiRequest(url);
  },

  getAll: async (page = 1, limit = 9) => {
    const url = buildApiUrl(
      API_CONFIG.ENDPOINTS.PATIENTS,
      `?pageNo=${page}&pageSize=${limit}`
    );
    return apiRequest(url);
  },
};

export const cliniciansAPI = {
  getById: async (id) => {
    const url = buildApiUrl(API_CONFIG.ENDPOINTS.CLINICIANS, `/${id}`);
    return apiRequest(url);
  },

  getAll: async (page = 1, limit = 9) => {
    const url = buildApiUrl(
      API_CONFIG.ENDPOINTS.CLINICIANS,
      `?pageNo=${page}&pageSize=${limit}`
    );
    return apiRequest(url);
  },
};

export const visitsAPI = {
  create: async (visitData) => {
    const url = buildApiUrl(API_CONFIG.ENDPOINTS.VISITS);
    return apiRequest(url, {
      method: "POST",
      body: JSON.stringify(visitData),
    });
  },

  getAll: async (page = 1, limit = 10) => {
    const url = buildApiUrl(
      API_CONFIG.ENDPOINTS.VISITS,
      `?pageNo=${page}&pageSize=${limit}`
    );
    return apiRequest(url);
  },
};
