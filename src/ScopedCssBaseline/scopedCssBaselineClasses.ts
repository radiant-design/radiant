import { generateUtilityClass, generateUtilityClasses } from "../className";

export interface ScopedCssBaselineClasses {
  /** Styles applied to the root element. */
  root: string;
}

export type ScopedCssBaselineClassKey = keyof ScopedCssBaselineClasses;

export function getScopedCssBaselineUtilityClass(slot: string): string {
  return generateUtilityClass("RadScopedCssBaseline", slot);
}

const scopedCssBaselineClasses = generateUtilityClasses(
  "RadScopedCssBaseline",
  ["root"]
);

export default scopedCssBaselineClasses;
