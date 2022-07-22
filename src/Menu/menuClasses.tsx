import { generateUtilityClass, generateUtilityClasses } from "../className";

export interface MenuClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the listbox element. */
  listbox: string;
}

export type MenuClassKey = keyof MenuClasses;

export function getMenuUtilityClass(slot: string): string {
  return generateUtilityClass("RadMenu", slot);
}

const menuClasses: MenuClasses = generateUtilityClasses("RadMenu", [
  "root",
  "listbox",
]);

export default menuClasses;
