import { generateUtilityClass, generateUtilityClasses } from "../className";

export interface AvatarGroupClasses {
  /** Styles applied to the root element. */
  root: string;
}

export type AvatarGroupClassKey = keyof AvatarGroupClasses;

export function getAvatarGroupUtilityClass(slot: string): string {
  return generateUtilityClass("RadAvatarGroup", slot);
}

const avatarGroupClasses: AvatarGroupClasses = generateUtilityClasses(
  "RadAvatarGroup",
  ["root"]
);

export default avatarGroupClasses;
