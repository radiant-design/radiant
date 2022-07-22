import { generateUtilityClass, generateUtilityClasses } from "../className";

export interface ListItemContentClasses {
  /** Styles applied to the root element. */
  root: string;
}

export type ListItemContentClassKey = keyof ListItemContentClasses;

export function getListItemContentUtilityClass(slot: string): string {
  return generateUtilityClass("RadListItemContent", slot);
}

const listItemContentClasses: ListItemContentClasses = generateUtilityClasses(
  "RadListItemContent",
  ["root"]
);

export default listItemContentClasses;
