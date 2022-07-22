import { generateUtilityClass, generateUtilityClasses } from "../className";

export interface CardOverflowClasses {
  /** Styles applied to the root element. */
  root: string;
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
  /** Styles applied to the root element if `variant="plain"`. */
  variantPlain: string;
  /** Styles applied to the root element if `variant="outlined"`. */
  variantOutlined: string;
  /** Styles applied to the root element if `variant="soft"`. */
  variantSoft: string;
  /** Styles applied to the root element if `variant="solid"`. */
  variantSolid: string;
}

export type CardOverflowClassKey = keyof CardOverflowClasses;

export function getCardOverflowUtilityClass(slot: string): string {
  return generateUtilityClass("RadCardOverflow", slot);
}

const aspectRatioClasses: CardOverflowClasses = generateUtilityClasses(
  "RadCardOverflow",
  [
    "root",
    "colorPrimary",
    "colorNeutral",
    "colorDanger",
    "colorInfo",
    "colorSuccess",
    "colorWarning",
    "variantPlain",
    "variantOutlined",
    "variantSoft",
    "variantSolid",
  ]
);

export default aspectRatioClasses;
