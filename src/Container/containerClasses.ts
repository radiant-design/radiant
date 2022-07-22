import { ContainerClasses } from "@mui/system";
import { generateUtilityClass, generateUtilityClasses } from "../className";

export type { ContainerClassKey } from "@mui/system";
export type { ContainerClasses };

export function getContainerUtilityClass(slot: string): string {
  return generateUtilityClass("RadContainer", slot);
}

const containerClasses: ContainerClasses = generateUtilityClasses(
  "RadContainer",
  [
    "root",
    "disableGutters",
    "fixed",
    "maxWidthXs",
    "maxWidthSm",
    "maxWidthMd",
    "maxWidthLg",
    "maxWidthXl",
  ]
);

export default containerClasses;
