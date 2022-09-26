import { generateUtilityClass, generateUtilityClasses } from "../className";

export interface FormLabelClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the asterisk element. */
  asterisk: string;
  disabled: string;
}

export type FormLabelClassKey = keyof FormLabelClasses;

export function getFormLabelUtilityClass(slot: string): string {
  return generateUtilityClass("RadFormLabel", slot);
}

const formLabelClasses: FormLabelClasses = generateUtilityClasses(
  "RadFormLabel",
  ["root", "asterisk", "disabled"]
);

export default formLabelClasses;
