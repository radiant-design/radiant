import * as React from "react";
import PropTypes from "prop-types";
import { GlobalStyles } from "@mui/system";
import { Theme, DefaultColorScheme, ColorSystem } from "../styles/types";
import { CssBaselineProps } from "./CssBaselineProps";

/**
 * Kickstart an elegant, consistent, and simple baseline to build upon.
 */
function CssBaseline({
  children,
  disableColorScheme = false,
}: CssBaselineProps) {
  return (
    <React.Fragment>
      <GlobalStyles
        styles={(theme: Theme) => {
          const colorSchemeStyles: Record<string, any> = {};
          if (!disableColorScheme) {
            // The CssBaseline is wrapped inside a CssVarsProvider
            (
              Object.entries(theme.colorSchemes) as Array<
                [DefaultColorScheme, ColorSystem]
              >
            ).forEach(([key, scheme]) => {
              colorSchemeStyles[
                theme.getColorSchemeSelector(key).replace(/\s*&/, "")
              ] = {
                colorScheme: scheme.palette?.mode,
              };
            });
          }
          return {
            html: {
              WebkitFontSmoothing: "antialiased",
              MozOsxFontSmoothing: "grayscale",
              // Change from `box-sizing: content-box` so that `width`
              // is not affected by `padding` or `border`.
              boxSizing: "border-box",
              // Fix font resize problem in iOS
              WebkitTextSizeAdjust: "100%",
            },
            "*, *::before, *::after": {
              boxSizing: "inherit",
            },
            "strong, b": {
              fontWeight: "bold",
            },
            body: {
              margin: 0, // Remove the margin in all browsers.
              color: theme.vars.palette.text.primary,
              ...(theme.typography.body1 as any),
              backgroundColor: theme.vars.palette.background.body,
              "@media print": {
                // Save printer ink.
                backgroundColor: theme.vars.palette.common.white,
              },
              // Add support for document.body.requestFullScreen().
              // Other elements, if background transparent, are not supported.
              "&::backdrop": {
                backgroundColor: theme.vars.palette.background.backdrop,
              },
            },
            ...colorSchemeStyles,
          };
        }}
      />
      {children}
    </React.Fragment>
  );
}

CssBaseline.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * You can wrap a node.
   */
  children: PropTypes.node,
  /**
   * Disable `color-scheme` CSS property.
   *
   * For more details, check out https://developer.mozilla.org/en-US/docs/Web/CSS/color-scheme
   * For browser support, check out https://caniuse.com/?search=color-scheme
   * @default false
   */
  disableColorScheme: PropTypes.bool,
} as any;

export default CssBaseline;
