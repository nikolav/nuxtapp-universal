import mri from "mri";
import type { Options } from "mri";
import isString from "lodash/isString";

export const parseShell = (input: string | string[], options?: Options) =>
  mri(isString(input) ? input.split(/\s+/g) : input, options);
