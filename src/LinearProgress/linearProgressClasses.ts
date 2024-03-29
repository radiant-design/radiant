import { generateUtilityClass, generateUtilityClasses } from "../className";

export interface LinearProgressClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if `determinate` is true. */
  determinate: string;
  /** Styles applied to the `progress` element. */
  progress: string;
  /** Styles applied to the root element if `color="primary"`. */
  colorPrimary: string;
  /** Styles applied to the root element if `color="neutral"`. */
  colorNeutral: string;
  /** Styles applied to the root element if `color="danger"`. */
  colorDanger: string;
  /** Styles applied to the root element if `color="info"`. */
  colorInfo: string;
  /** Styles applied to the root element if `color="success"`. */
  colorSuccess: string;
  /** Styles applied to the root element if `color="warning"`. */
  colorWarning: string;
  /** Styles applied to the root element if `size="sm"`. */
  sizeSm: string;
  /** Styles applied to the root element if `size="md"`. */
  sizeMd: string;
  /** Styles applied to the root element if `size="lg"`. */
  sizeLg: string;
  /** Styles applied to the root element if `variant="plain"`. */
  variantPlain: string;
  /** Styles applied to the root element if `variant="outlined"`. */
  variantOutlined: string;
  /** Styles applied to the root element if `variant="soft"`. */
  variantSoft: string;
  /** Styles applied to the root element if `variant="solid"`. */
  variantSolid: string;
}

export type LinearProgressClassKey = keyof LinearProgressClasses;

export function getLinearProgressUtilityClass(slot: string): string {
  return generateUtilityClass("RadLinearProgress", slot);
}

const linearProgressClasses: LinearProgressClasses = generateUtilityClasses(
  "RadLinearProgress",
  [
    "root",
    "determinate",
    "progress",
    "colorPrimary",
    "colorNeutral",
    "colorDanger",
    "colorInfo",
    "colorSuccess",
    "colorWarning",
    "sizeSm",
    "sizeMd",
    "sizeLg",
    "variantPlain",
    "variantOutlined",
    "variantSoft",
    "variantSolid",
  ]
);

export default linearProgressClasses;
