import isString from "lodash/isString.js";
import isNumber from "lodash/isNumber.js";

const FALSE_STRINGS = <string[]>["FALSE", "NO", "0"];

/**
 * Converts to a boolean.
 * Returns false if the value is falsy.
 * If it is truthy it checks it by converting to a string,
 * trimming, upcasing, and checking if the value is not in FALSE_STRINGS.
 *
 * @param x
 */
export const parseBoolean = (x: any): boolean => {
  if (true === x) return true;
  if (!x) return false;
  if (!isString(x) && !isNumber(x)) return false;

  const str = `${x}`.toUpperCase().trim();
  return !FALSE_STRINGS.includes(str);
};
