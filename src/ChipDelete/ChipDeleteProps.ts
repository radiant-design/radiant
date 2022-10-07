import * as React from "react";
import { OverridableStringUnion, OverrideProps } from "@mui/types";
import { ColorPaletteProp, VariantProp, SxProps } from "../styles/types";

export type ChipDeleteSlot = "root";

export interface ChipDeletePropsColorOverrides {}
export interface ChipDeletePropsVariantOverrides {}

export interface ChipDeleteTypeMap<
  P = {},
  D extends React.ElementType = "button"
> {
  props: P & {
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     * @default 'primary'
     */
    color?: OverridableStringUnion<
      ColorPaletteProp,
      ChipDeletePropsColorOverrides
    >;
    /**
     * If provided, it will replace the default icon.
     */
    children?: React.ReactNode;
    /**
     * If `true`, the component is disabled.
     * If `undefined`, the value inherits from the parent chip via a React context.
     */
    disabled?: boolean;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps;
    /**
     * The variant to use.
     * @default 'solid'
     */
    variant?: OverridableStringUnion<
      VariantProp,
      ChipDeletePropsVariantOverrides
    >;
  };
  defaultComponent: D;
}

export type ChipDeleteProps<
  D extends React.ElementType = ChipDeleteTypeMap["defaultComponent"],
  P = { component?: React.ElementType }
> = OverrideProps<ChipDeleteTypeMap<P, D>, D>;

export interface ChipDeleteOwnerState extends ChipDeleteProps {
  /**
   * If `true`, the element's focus is visible.
   */
  focusVisible?: boolean;
}
