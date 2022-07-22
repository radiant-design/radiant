import { unstable_createCssVarsProvider as createCssVarsProvider } from "@mui/system";
import extendTheme from "./extendTheme";
import type { DefaultColorScheme, ExtendedColorScheme } from "./types";

const shouldSkipGeneratingVar = (keys: string[]) =>
  !!keys[0].match(/(typography|variants|focus|breakpoints)/);

const { CssVarsProvider, useColorScheme, getInitColorSchemeScript } =
  createCssVarsProvider<DefaultColorScheme | ExtendedColorScheme>({
    theme: extendTheme(),
    attribute: "data-rad-color-scheme",
    modeStorageKey: "rad-mode",
    colorSchemeStorageKey: "rad-color-scheme",
    defaultColorScheme: {
      light: "light",
      dark: "dark",
    },
    shouldSkipGeneratingVar,
  });

export {
  CssVarsProvider,
  useColorScheme,
  getInitColorSchemeScript,
  shouldSkipGeneratingVar,
};
