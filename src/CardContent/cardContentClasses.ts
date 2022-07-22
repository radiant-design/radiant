import { generateUtilityClass, generateUtilityClasses } from "../className";

export interface CardContentClasses {
  /** Styles applied to the root element. */
  root: string;
}

export type CardContentClassKey = keyof CardContentClasses;

export function getCardContentUtilityClass(slot: string): string {
  return generateUtilityClass("RadCardContent", slot);
}

const cardClasses: CardContentClasses = generateUtilityClasses(
  "RadCardContent",
  ["root"]
);

export default cardClasses;
