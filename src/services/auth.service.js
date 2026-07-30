import apiClient from "./axios";

/**
 * Auth service placeholder — wires up the shape the login/dashboard
 * flow will eventually call. No real backend is connected yet.
 */
export const authService = {
  /**
   * @param {{ email: string, password: string }} credentials
   * @returns {Promise<{ user: Object, token: string }>}
   */
  async login(credentials) {
    // TODO: Connect Login API
    // return apiClient.post("/auth/login", credentials).then((res) => res.data);
    return Promise.resolve({
      user: { name: "کاربر مهمان", email: credentials?.email ?? "" },
      token: "mock-token",
    });
  },

  /**
   * @returns {Promise<void>}
   */
  async logout() {
    // TODO: Connect Logout API
    // return apiClient.post("/auth/logout");
    return Promise.resolve();
  },
};

export default authService;
