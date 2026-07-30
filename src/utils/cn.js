/**
 * Tiny classNames combinator so we avoid a template-literal mess
 * across components. Falsy values are filtered out.
 * @param  {...(string|false|null|undefined)} classes
 * @returns {string}
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
