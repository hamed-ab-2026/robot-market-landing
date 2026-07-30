import axios from "axios";

/**
 * Single Axios instance for the whole app. Every service file
 * imports this instead of calling axios directly, so base URL,
 * headers, and interceptors only need to be configured once.
 */
const apiClient = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "https://api.robotmarket.example.com",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach the auth token (once real login exists) to every request.
apiClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = window.localStorage.getItem("rm_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Centralized error normalization so services/components can rely
// on a consistent error shape regardless of what the backend sends.
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const normalized = {
      message:
        error?.response?.data?.message ||
        error?.message ||
        "خطای غیرمنتظره‌ای رخ داد.",
      status: error?.response?.status || 500,
    };
    return Promise.reject(normalized);
  }
);

export default apiClient;
