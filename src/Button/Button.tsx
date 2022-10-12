import * as React from "react";
import PropTypes from "prop-types";
import { useButton } from "@mui/base/ButtonUnstyled";
import composeClasses from "@mui/base/composeClasses";
import { useSlotProps } from "@mui/base/utils";
import {
  unstable_capitalize as capitalize,
  unstable_useForkRef as useForkRef,
} from "@mui/utils";
import { styled, useThemeProps } from "../styles";
import CircularProgress from "../CircularProgress";
import buttonClasses, { getButtonUtilityClass } from "./buttonClasses";
import { ButtonOwnerState, ButtonTypeMap, ExtendButton } from "./ButtonProps";

const useUtilityClasses = (ownerState: ButtonOwnerState) => {
  const {
    color,
    disabled,
    focusVisible,
    focusVisibleClassName,
    fullWidth,
    size,
    variant,
    loading,
  } = ownerState;

  const slots = {
    root: [
      "root",
      disabled && "disabled",
      focusVisible && "focusVisible",
      fullWidth && "fullWidth",
      variant && `variant${capitalize(variant)}`,
      color && `color${capitalize(color)}`,
      size && `size${capitalize(size)}`,
      loading && "loading",
    ],
    startDecorator: ["startDecorator"],
    endDecorator: ["endDecorator"],
    loadingIndicatorCenter: ["loadingIndicatorCenter"],
  };

  const composedClasses = composeClasses(slots, getButtonUtilityClass, {});

  if (focusVisible && focusVisibleClassName) {
    composedClasses.root += ` ${focusVisibleClassName}`;
  }

  return composedClasses;
};

const ButtonStartDecorator = styled("span", {
  name: "RadButton",
  slot: "StartDecorator",
  overridesResolver: (_props, styles) => styles.startDecorator,
})<{ ownerState: ButtonOwnerState }>({
  "--Icon-margin": "0 0 0 calc(var(--Button-gap) / -2)",
  "--CircularProgress-margin": "0 0 0 calc(var(--Button-gap) / -2)",
  display: "inherit",
  marginRight: "var(--Button-gap)",
});

const ButtonEndDecorator = styled("span", {
  name: "RadButton",
  slot: "EndDecorator",
  overridesResolver: (_props, styles) => styles.endDecorator,
})<{ ownerState: ButtonOwnerState }>({
  "--Icon-margin": "0 calc(var(--Button-gap) / -2) 0 0",
  "--CircularProgress-margin": "0 calc(var(--Button-gap) / -2) 0 0",
  display: "inherit",
  marginLeft: "var(--Button-gap)",
});

const ButtonLoadingCenter = styled("span", {
  name: "RadButton",
  slot: "LoadingCenter",
  overridesResolver: (_props, styles) => styles.loadingIndicatorCenter,
})<{ ownerState: ButtonOwnerState }>(({ theme, ownerState }) => ({
  display: "inherit",
  position: "absolute",
  left: "50%",
  transform: "translateX(-50%)",
  color: theme.variants[ownerState.variant!]?.[ownerState.color!]?.color,
  ...(ownerState.disabled && {
    color:
      theme.variants[`${ownerState.variant!}Disabled`]?.[ownerState.color!]
        ?.color,
  }),
}));

export const ButtonRoot = styled("button", {
  name: "RadButton",
  slot: "Root",
  overridesResolver: (_props, styles) => styles.root,
})<{ ownerState: ButtonOwnerState }>(({ theme, ownerState }) => {
  return [
    {
      "--Icon-margin": "initial", // reset the icon's margin.
      "--CircularProgress-size": "var(--Icon-fontSize)",
      ...(ownerState.size === "sm" && {
        "--Icon-fontSize": "1rem", //1.25
        "--Button-gap": "0.25rem", //0.375
        minHeight: "var(--Button-minHeight, 2rem)",
        minWidth: "var(--Button-minWidth, 6.125rem)", //98px
        fontSize: theme.vars.fontSize.xs, //sm -->since xs is 11px
        paddingBlock: "2px",
        paddingInline: "1rem", //0.75
      }),
      ...(ownerState.size === "md" && {
        "--Icon-fontSize": "1.25rem", // 1.5 // control the SvgIcon font-size
        "--Button-gap": "0.25rem", //0.5
        minHeight: "var(--Button-minHeight, 2.5rem)", // use min-height instead of height to make the button resilient to its content
        minWidth: "var(--Button-minWidth, 7.5rem)", //120px
        fontSize: theme.vars.fontSize.sm, //sm -- 12px
        paddingBlock: "0.25rem", // the padding-block act as a minimum spacing between content and root element
        paddingInline: "1.5rem", //1
      }),
      ...(ownerState.size === "lg" && {
        "--Icon-fontSize": "1.5rem", //1.75
        "--Button-gap": "0.5rem", //0.75
        minHeight: "var(--Button-minHeight, 3rem)", //48px
        minWidth: "var(--Button-minWidth, 10.0625rem)", //161px
        fontSize: theme.vars.fontSize.lg, //md
        paddingBlock: "0.375rem",
        paddingInline: "2rem", //1.5
      }),
      WebkitTapHighlightColor: "transparent",
      borderRadius: `var(--Button-radius, ${theme.vars.radius.xs})`, // to be controlled by other components, eg. Input
      margin: `var(--Button-margin)`, // to be controlled by other components, eg. Input
      border: "none",
      backgroundColor: "transparent",
      cursor: "pointer",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      textDecoration: "none", // prevent user agent underline when used as anchor
      // TODO: discuss the transition approach in a separate PR. This value is copied from mui-material Button.
      transition:
        "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
      fontFamily: theme.vars.fontFamily.display, //body
      fontWeight:
        ownerState.size === "lg"
          ? theme.vars.fontWeight.lg
          : theme.vars.fontWeight.md, //theme.vars.fontWeight.md
      lineHeight: 1,
      ...(ownerState.fullWidth && {
        width: "100%",
      }),
      [theme.focus.selector]: theme.focus.default,
    },
    theme.variants[ownerState.variant!]?.[ownerState.color!],
    {
      "&:hover":
        theme.variants[`${ownerState.variant!}Hover`]?.[ownerState.color!],
    },
    {
      "&:active":
        theme.variants[`${ownerState.variant!}Active`]?.[ownerState.color!],
    },
    {
      [`&.${buttonClasses.disabled}`]:
        theme.variants[`${ownerState.variant!}Disabled`]?.[ownerState.color!],
      ...(ownerState.loadingPosition === "center" && {
        [`&.${buttonClasses.loading}`]: {
          transition:
            "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
          color: "transparent",
        },
      }),
    },
  ];
});

const Button = React.forwardRef(function Button(inProps, ref) {
  const props = useThemeProps<
    typeof inProps & { component?: React.ElementType }
  >({
    props: inProps,
    name: "RadButton",
  });

  const {
    children,
    action,
    component = "button",
    componentsProps = {},
    color = "primary",
    variant = "solid",
    size = "md",
    fullWidth = false,
    startDecorator,
    endDecorator,
    loading = false,
    loadingPosition = "center",
    loadingIndicator: loadingIndicatorProp,
    disabled,
    ...other
  } = props as any;

  const buttonRef = React.useRef<HTMLElement | null>(null);
  const handleRef = useForkRef(buttonRef, ref);

  const { focusVisible, setFocusVisible, getRootProps } = useButton({
    ...props,
    ref: handleRef,
  });
  const loadingIndicator = loadingIndicatorProp ?? (
    <CircularProgress
      color={color}
      thickness={{ sm: 2, md: 3, lg: 4 }[size] || 3}
    />
  );

  React.useImperativeHandle(
    action,
    () => ({
      focusVisible: () => {
        setFocusVisible(true);
        buttonRef.current?.focus();
      },
    }),
    [setFocusVisible]
  );

  const ownerState = {
    ...props,
    component,
    color,
    fullWidth,
    variant,
    size,
    focusVisible,
    loading,
    loadingPosition,
    disabled: disabled || loading,
  };

  const classes = useUtilityClasses(ownerState);

  const rootProps = useSlotProps({
    elementType: ButtonRoot,
    externalSlotProps: componentsProps.root,
    ownerState,
    getSlotProps: getRootProps,
    externalForwardedProps: other,
    additionalProps: {
      as: component,
    },
    className: classes.root,
  });

  const startDecoratorProps = useSlotProps({
    elementType: ButtonStartDecorator,
    externalSlotProps: componentsProps.startDecorator,
    ownerState,
    className: classes.startDecorator,
  });

  const endDecoratorProps = useSlotProps({
    elementType: ButtonEndDecorator,
    externalSlotProps: componentsProps.endDecorator,
    ownerState,
    className: classes.endDecorator,
  });

  const loadingIndicatorCenterProps = useSlotProps({
    elementType: ButtonLoadingCenter,
    externalSlotProps: componentsProps.loadingIndicatorCenter,
    ownerState,
    className: classes.loadingIndicatorCenter,
  });

  return (
    <ButtonRoot {...rootProps}>
      {(startDecorator || (loading && loadingPosition === "start")) && (
        <ButtonStartDecorator {...startDecoratorProps}>
          {loading && loadingPosition === "start"
            ? loadingIndicator
            : startDecorator}
        </ButtonStartDecorator>
      )}

      {children}
      {loading && loadingPosition === "center" && (
        <ButtonLoadingCenter {...loadingIndicatorCenterProps}>
          {loadingIndicator}
        </ButtonLoadingCenter>
      )}
      {(endDecorator || (loading && loadingPosition === "end")) && (
        <ButtonEndDecorator {...endDecoratorProps}>
          {loading && loadingPosition === "end"
            ? loadingIndicator
            : endDecorator}
        </ButtonEndDecorator>
      )}
    </ButtonRoot>
  );
}) as unknown as ExtendButton<ButtonTypeMap>;

Button.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * A ref for imperative actions. It currently only supports `focusVisible()` action.
   */
  action: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.shape({
        focusVisible: PropTypes.func.isRequired,
      }),
    }),
  ]),
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'primary'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf([
      "danger",
      "info",
      "neutral",
      "primary",
      "success",
      "warning",
    ]),
    PropTypes.string,
  ]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The props used for each slot inside the component.
   * @default {}
   */
  componentsProps: PropTypes.shape({
    endDecorator: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    loadingIndicatorCenter: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.object,
    ]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    startDecorator: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * Element placed after the children.
   */
  endDecorator: PropTypes.node,
  /**
   * @ignore
   */
  focusVisibleClassName: PropTypes.string,
  /**
   * If `true`, the button will take up the full width of its container.
   * @default false
   */
  fullWidth: PropTypes.bool,
  /**
   * If `true`, the loading indicator is shown.
   * @default false
   */
  loading: PropTypes.bool,
  /**
   * The node should contain an element with `role="progressbar"` with an accessible name.
   * By default we render a `CircularProgress` that is labelled by the button itself.
   * @default <CircularProgress />
   */
  loadingIndicator: PropTypes.node,
  /**
   * The loading indicator can be positioned on the start, end, or the center of the button.
   * @default 'center'
   */
  loadingPosition: PropTypes.oneOf(["center", "end", "start"]),
  /**
   * The size of the component.
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(["sm", "md", "lg"]),
    PropTypes.string,
  ]),
  /**
   * Element placed before the children.
   */
  startDecorator: PropTypes.node,
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
  /**
   * @default 0
   */
  tabIndex: PropTypes.number,
  /**
   * The variant to use.
   * @default 'solid'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(["outlined", "plain", "soft", "solid"]),
    PropTypes.string,
  ]),
} as any;

export default Button;
