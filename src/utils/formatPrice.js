/**
 * Product prices already arrive pre-formatted in Rial from the
 * data source (e.g. "ریال۳.۸۶۰.۰۰۰.۰۰۰"). This helper exists as a
 * single seam to change formatting once real API data lands.
 * @param {string} price
 * @returns {string}
 */
export function formatPrice(price) {
  return price;
}
