import axios from "axios";

/**
 * Central Axios instance for Robot Market.
 * Every future API call (orders, consultation requests, product sync, ...)
 * should go through this instance so headers, base URL and error
 * handling only need to be configured in one place.
 */
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.robotmarket.ir/v1",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach an auth token automatically, if one is available client-side.
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = window.localStorage.getItem("rm_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Normalize errors so components can rely on a consistent shape.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error?.response?.data?.message || error?.message || "خطای ناشناخته در ارتباط با سرور";
    return Promise.reject({ ...error, message });
  }
);

/**
 * Example future usage:
 *   submitConsultationRequest({ name, phone, city })
 */
export async function submitConsultationRequest(payload) {
  const { data } = await api.post("/leads/consultation", payload);
  return data;
}

/**
 * Example future usage:
 *   fetchProducts()
 */
export async function fetchProducts() {
  const { data } = await api.get("/products");
  return data;
}

export default api;
