import apiClient from "./axios";
import productsData from "@/data/products.json";

/**
 * Product service — every method returns a Promise so components
 * and Redux thunks can call it the same way once the real backend
 * exists. Until then, each method resolves with local mock data.
 */
export const productService = {
  /**
   * @returns {Promise<Array>} list of vending machine products
   */
  async getAll() {
    // TODO: Connect Product API
    // return apiClient.get("/products").then((res) => res.data);
    return Promise.resolve(productsData);
  },

  /**
   * @param {string} id
   * @returns {Promise<Object|undefined>}
   */
  async getById(id) {
    // TODO: Connect Product API
    // return apiClient.get(`/products/${id}`).then((res) => res.data);
    return Promise.resolve(productsData.find((product) => product.id === id));
  },
};

export default productService;
