import * as React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { OverridableComponent } from "@mui/types";
import { unstable_composeClasses as composeClasses } from "@mui/base";
import useThemeProps from "../styles/useThemeProps";
import styled from "../styles/styled";
import { DefaultColorScheme, ColorSystem } from "../styles/types";
import {
  ScopedCssBaselineTypeMap,
  ScopedCssBaselineOwnerState,
  ScopedCssBaselineProps,
} from "./ScopedCssBaselineProps";
import { getScopedCssBaselineUtilityClass } from "./scopedCssBaselineClasses";

const useUtilityClasses = () => {
  const slots = {
    root: ["root"],
  };

  return composeClasses(slots, getScopedCssBaselineUtilityClass, {});
};

const ScopedCssBaselineRoot = styled("div", {
  name: "RadScopedCssBaseline",
  slot: "Root",
  overridesResolver: (_props, styles) => styles.root,
})<{ ownerState: ScopedCssBaselineOwnerState }>(({ theme, ownerState }) => {
  const colorSchemeStyles: Record<string, any> = {};
  if (!ownerState.disableColorScheme && theme.colorSchemes) {
    (
      Object.entries(theme.colorSchemes) as Array<
        [DefaultColorScheme, ColorSystem]
      >
    ).forEach(([key, scheme]) => {
      colorSchemeStyles[
        `&${theme.getColorSchemeSelector(key).replace(/\s*&/, "")}`
      ] = {
        colorScheme: scheme.palette?.mode,
      };
    });
  }
  return {
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
    // Change from `box-sizing: content-box` so that `width`
    // is not affected by `padding` or `border`.
    boxSizing: "border-box",
    // Fix font resize problem in iOS
    WebkitTextSizeAdjust: "100%",
    color: theme.vars.palette.text.primary,
    ...theme.typography.body1,
    backgroundColor: theme.vars.palette.background.body,
    "@media print": {
      // Save printer ink.
      backgroundColor: theme.vars.palette.common.white,
    },
    "& *, & *::before, & *::after": {
      boxSizing: "inherit",
    },
    "& strong, & b": {
      fontWeight: "bold",
    },
    ...colorSchemeStyles,
  };
});

const ScopedCssBaseline = React.forwardRef(function ScopedCssBaseline(
  inProps,
  ref
) {
  const props = useThemeProps<typeof inProps & ScopedCssBaselineProps>({
    props: inProps,
    name: "RadScopedCssBaseline",
  });

  const {
    className,
    component = "div",
    disableColorScheme = false,
    ...other
  } = props;

  const ownerState = {
    ...props,
    component,
    disableColorScheme,
  };

  const classes = useUtilityClasses();

  return (
    <ScopedCssBaselineRoot
      as={component}
      className={clsx(classes.root, className)}
      ref={ref}
      ownerState={ownerState}
      {...other}
    />
  );
}) as OverridableComponent<ScopedCssBaselineTypeMap>;

ScopedCssBaseline.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * You can wrap a node.
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * Disable `color-scheme` CSS property.
   *
   * For more details, check out https://developer.mozilla.org/en-US/docs/Web/CSS/color-scheme
   * For browser support, check out https://caniuse.com/?search=color-scheme
   * @default false
   */
  disableColorScheme: PropTypes.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
} as any;

export default ScopedCssBaseline;
