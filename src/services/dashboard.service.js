import apiClient from "./axios";

/**
 * Dashboard service placeholder. The navbar's "داشبورد" link is a
 * UI placeholder only — this file exists so the future dashboard
 * page has a clean, ready-made data-fetching seam.
 */
export const dashboardService = {
  /**
   * @returns {Promise<Object>} summary metrics for the dashboard home
   */
  async getSummary() {
    // TODO: Connect Dashboard API
    // return apiClient.get("/dashboard/summary").then((res) => res.data);
    return Promise.resolve({
      totalMachines: 0,
      totalRevenue: 0,
      activeLocations: 0,
    });
  },
};

export default dashboardService;
