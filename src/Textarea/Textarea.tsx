import * as React from "react";
import PropTypes from "prop-types";
import {
  unstable_useId as useId,
  unstable_capitalize as capitalize,
} from "@mui/utils";
import { OverridableComponent } from "@mui/types";
import { useSlotProps, EventHandlers } from "@mui/base/utils";
import composeClasses from "@mui/base/composeClasses";
import FormLabel from "../FormLabel";
import FormHelperText from "../FormHelperText";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import { styled, useThemeProps } from "../styles";
import {
  TextareaTypeMap,
  TextareaProps,
  TextareaOwnerState,
} from "./TextareaProps";
import textareaClasses, { getTextareaUtilityClass } from "./textareaClasses";
import useForwardedInput from "../Input/useForwardedInput";

const useUtilityClasses = (ownerState: TextareaOwnerState) => {
  const { disabled, variant, color, size } = ownerState;

  const slots = {
    root: [
      "root",
      disabled && "disabled",
      variant && `variant${capitalize(variant)}`,
      color && `color${capitalize(color)}`,
      size && `size${capitalize(size)}`,
    ],
    textarea: ["textarea"],
    startDecorator: ["startDecorator"],
    endDecorator: ["endDecorator"],
  };

  return composeClasses(slots, getTextareaUtilityClass, {});
};

const TextareaRoot = styled("div", {
  name: "RadTextarea",
  slot: "Root",
  overridesResolver: (_props, styles) => styles.root,
})<{ ownerState: TextareaProps }>(({ theme, ownerState }) => {
  const variantStyle =
    theme.variants[`${ownerState.variant!}`]?.[ownerState.color!];
  return [
    {
      ...variantStyle,
      "--FormLabel-margin": "0 0 0.25rem 0",
      "--FormHelperText-margin": "0.25rem 0 0 0",
      "--FormLabel-asterisk-color": theme.vars.palette.danger[500],
      "--FormHelperText-color": theme.vars.palette[ownerState.color!]?.[500],
      ...(ownerState.size === "sm" && {
        "--FormHelperText-fontSize": theme.vars.fontSize.xs,
        "--FormLabel-fontSize": theme.vars.fontSize.xs,
      }),
      [`&.${textareaClasses.error}`]: {
        "--FormHelperText-color": theme.vars.palette.danger[500],
      },
      [`&.${textareaClasses.disabled}`]: {
        "--FormLabel-color":
          theme.vars.palette[ownerState.color || "neutral"]
            ?.plainDisabledColor + " !important",
        "--FormHelperText-color":
          theme.vars.palette[ownerState.color || "neutral"]?.plainDisabledColor,
      },
      "--Textarea-radius": theme.vars.radius.xs, //sm
      "--Textarea-gap": "0.5rem",
      "--Textarea-placeholderOpacity": 0.5,
      "--Textarea-focusedThickness": "0.5px", //2px
      "--Textarea-focusedHighlight":
        theme.vars.palette[
          ownerState.color === "neutral" ? "primary" : ownerState.color!
        ]?.[500],
      ...(ownerState.size === "sm" && {
        "--Textarea-minHeight": "4rem", //2rem
        "--Textarea-paddingBlock":
          "calc(0.5rem - var(--variant-borderWidth, 0px))", // to match Input because <textarea> does not center the text at the middle like <input>
        "--Textarea-paddingInline": "0.75rem", //"0.5rem",
        "--Textarea-decorator-childHeight":
          "min(1.5rem, var(--Textarea-minHeight))",
        "--Icon-fontSize": "1rem", //1.25
      }),
      // ...(ownerState.size === "md" && {
      //   "--Textarea-minHeight": "2.5rem",
      //   "--Textarea-paddingBlock":
      //     "calc(0.5rem - var(--variant-borderWidth, 0px))",
      //   "--Textarea-paddingInline": "0.75rem",
      //   "--Textarea-decorator-childHeight":
      //     "min(2rem, var(--Textarea-minHeight))",
      //   "--Icon-fontSize": "1.5rem",
      // }),
      // ...(ownerState.size === "lg" && {
      //   "--Textarea-minHeight": "3rem",
      //   "--Textarea-paddingBlock":
      //     "calc(0.75rem - var(--variant-borderWidth, 0px))",
      //   "--Textarea-paddingInline": "1rem",
      //   "--Textarea-gap": "0.75rem",
      //   "--Textarea-decorator-childHeight":
      //     "min(2.375rem, var(--Textarea-minHeight))",
      //   "--Icon-fontSize": "1.75rem",
      // }),
      // variables for controlling child components
      "--internal-paddingBlock":
        "max((var(--Textarea-minHeight) - 2 * var(--variant-borderWidth) - var(--Textarea-decorator-childHeight)) / 2, 0px)",
      "--Textarea-decorator-childRadius":
        "max(var(--Textarea-radius) - var(--internal-paddingBlock), min(var(--internal-paddingBlock) / 2, var(--Textarea-radius) / 2))",
      "--Button-minHeight": "var(--Textarea-decorator-childHeight)",
      "--IconButton-size": "var(--Textarea-decorator-childHeight)",
      "--Button-radius": "var(--Textarea-decorator-childRadius)",
      "--IconButton-radius": "var(--Textarea-decorator-childRadius)",
      boxSizing: "border-box",
      minWidth: 0,
      minHeight: "var(--Textarea-minHeight)",
      cursor: "text",
      position: "relative",
      display: "flex",
      flexDirection: "column",
      paddingInlineStart: `var(--Textarea-paddingInline)`, // the paddingInlineEnd is added to the textarea. It looks better when the scrollbar appears.
      paddingBlock: "var(--Textarea-paddingBlock)",
      borderRadius: "var(--Textarea-radius)",
      // ...(!variantStyle?.backgroundColor && {
      //   backgroundColor: theme.vars.palette.background.surface,
      // }),
      fontFamily: theme.vars.fontFamily.body,
      fontSize: theme.vars.fontSize.sm, //md
      lineHeight: theme.vars.lineHeight.sm, //md
      // ...(ownerState.size === "sm" && {
      //   fontSize: theme.vars.fontSize.sm,
      //   lineHeight: theme.vars.lineHeight.sm,
      // }),
      transition:
        "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
      "&:before": {
        boxSizing: "border-box",
        content: '""',
        display: "block",
        position: "absolute",
        pointerEvents: "none",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
        borderRadius: "inherit",
        margin: "calc(var(--variant-borderWidth) * -1)", // for outlined variant
      },
    },
    theme.variants[`${ownerState.variant!}`]?.[ownerState.color!],
    {
      // variant styles
      ...variantStyle,
      // "&:hover": {
      //   ...theme.variants[`${ownerState.variant!}Hover`]?.[ownerState.color!],
      //   cursor: "text",
      // },
      [`&.${textareaClasses.disabled}`]:
        theme.variants[`${ownerState.variant!}Disabled`]?.[ownerState.color!],
    },
    // This style has to come after the global variant to set the background to surface
    ownerState.variant !== "solid" && {
      [`&.${textareaClasses.focused}`]: {
        backgroundColor: "initial", //theme.vars.palette.background.surface,
        "&:before": {
          boxShadow: `inset 0 0 0 var(--Textarea-focusedThickness) var(--Textarea-focusedHighlight)`,
        },
      },
    },
    ownerState.disabled && {
      backgroundColor: theme.vars.palette.neutral[50],
    },
  ];
});

const TextareaInput = styled(TextareaAutosize, {
  name: "RadTextarea",
  slot: "Textarea",
  overridesResolver: (_props, styles) => styles.textarea,
})<{ ownerState: TextareaOwnerState }>(({ theme, ownerState }) => ({
  resize: "none",
  border: "none", // remove the native textarea width
  minWidth: 0, // remove the native textarea width
  outline: 0, // remove the native textarea outline
  padding: 0, // remove the native textarea padding
  paddingInlineEnd: `var(--Textarea-paddingInline)`,
  flex: "auto",
  alignSelf: "stretch",
  color: "#1A1A1A", //"inherit",
  backgroundColor: "transparent",
  fontFamily: theme.vars.fontFamily.body,
  fontStyle: "inherit",
  fontWeight: "inherit",
  lineHeight: "inherit",
  "&:-webkit-autofill": {
    WebkitBackgroundClip: "text", // remove autofill background
    WebkitTextFillColor: "currentColor",
  },
  "&::-webkit-input-placeholder": {
    opacity: "var(--Textarea-placeholderOpacity)",
    color: "#666666", //"inherit",
  },
  "&::-moz-placeholder": {
    opacity: "var(--Textarea-placeholderOpacity)",
    color: "#666666", // "inherit",
  }, // Firefox 19+
  "&:-ms-input-placeholder": {
    opacity: "var(--Textarea-placeholderOpacity)",
    color: "#666666", // "inherit",
  }, // IE11
  "&::-ms-input-placeholder": {
    opacity: "var(--Textarea-placeholderOpacity)",
    color: "#666666", // "inherit",
  }, // Edge
}));

const TextareaStartDecorator = styled("div", {
  name: "RadTextarea",
  slot: "StartDecorator",
  overridesResolver: (_props, styles) => styles.startDecorator,
})<{ ownerState: TextareaOwnerState }>(({ theme }) => ({
  display: "flex",
  marginInlineStart:
    "calc(var(--Textarea-paddingBlock) - var(--Textarea-paddingInline))",
  marginInlineEnd: "var(--Textarea-paddingBlock)",
  marginBlockEnd: "var(--Textarea-gap)",
  // color: theme.vars.palette.text.tertiary,
}));

const TextareaEndDecorator = styled("div", {
  name: "RadTextarea",
  slot: "EndDecorator",
  overridesResolver: (_props, styles) => styles.endDecorator,
})<{ ownerState: TextareaOwnerState }>(({ theme }) => ({
  display: "flex",
  marginInlineStart:
    "calc(var(--Textarea-paddingBlock) - var(--Textarea-paddingInline))",
  marginInlineEnd: "var(--Textarea-paddingBlock)",
  marginBlockStart: "var(--Textarea-gap)",
  // color: theme.vars.palette.text.tertiary,
}));

const Textarea = React.forwardRef(function Textarea(inProps, ref) {
  const props = useThemeProps<
    typeof inProps & { component?: React.ElementType }
  >({
    props: inProps,
    name: "RadTextarea",
  });

  const {
    propsToForward,
    rootStateClasses,
    inputStateClasses,
    getRootProps,
    getInputProps,
    component,
    components = {},
    componentsProps = {},
    label,
    helperText,
    id: idOverride,
    focused,
    formControlContext,
    error: errorState,
    disabled = false,
    size = "sm",
    color = "neutral",
    variant = "outlined",
    startDecorator,
    endDecorator,
    required = false,
    minRows,
    maxRows,
    ...other
  } = useForwardedInput<TextareaProps>(props, textareaClasses);
  const id = useId(idOverride);
  const helperTextId = helperText && id ? `${id}-helper-text` : undefined;
  const formLabelId = label && id ? `${id}-label` : undefined;

  const ownerState = {
    ...props,
    label,
    helperText,
    color: errorState ? "danger" : color,
    disabled,
    error: errorState,
    focused,
    formControlContext: formControlContext!,
    size,
    variant,
  };

  const classes = useUtilityClasses(ownerState);

  const rootProps = useSlotProps({
    elementType: TextareaRoot,
    getSlotProps: getRootProps,
    externalSlotProps: componentsProps.root,
    externalForwardedProps: other,
    additionalProps: {
      ref,
      as: component,
    },
    ownerState,
    className: [classes.root, rootStateClasses],
  });

  const textareaProps = useSlotProps({
    elementType: TextareaInput,
    getSlotProps: (otherHandlers: EventHandlers) =>
      getInputProps({ ...otherHandlers, ...propsToForward }),
    externalSlotProps: {
      minRows,
      maxRows,
    },
    ownerState,
    className: [classes.textarea, inputStateClasses],
  });

  return (
    <>
      {label && (
        <FormLabel
          {...rootProps}
          htmlFor={id}
          id={formLabelId}
          disabled={disabled}
          required={ownerState.required}
          {...componentsProps.label}
          {...(components.Label && {
            component: components.Label,
          })}
        >
          {label}
        </FormLabel>
      )}
      <TextareaRoot {...rootProps}>
        {startDecorator && (
          <TextareaStartDecorator
            className={classes.startDecorator}
            ownerState={ownerState}
          >
            {startDecorator}
          </TextareaStartDecorator>
        )}

        {/* @ts-ignore onChange conflicts with html input */}
        <TextareaInput {...textareaProps} />
        {endDecorator && (
          <TextareaEndDecorator
            className={classes.endDecorator}
            ownerState={ownerState}
          >
            {endDecorator}
          </TextareaEndDecorator>
        )}
      </TextareaRoot>
      {helperText && (
        <FormHelperText
          id={helperTextId}
          {...componentsProps.helperText}
          {...(components.HelperText && {
            component: components.HelperText,
          })}
        >
          {helperText}
        </FormHelperText>
      )}
    </>
  );
}) as OverridableComponent<TextareaTypeMap>;

Textarea.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'neutral'
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
   * The props used for each slot inside the component.
   * @default {}
   */
  componentsProps: PropTypes.shape({
    endDecorator: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    startDecorator: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    textarea: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * Trailing adornment for this input.
   */
  endDecorator: PropTypes.node,
  /**
   * If `true`, the `input` will indicate an error.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  error: PropTypes.bool,
  /**
   * Maximum number of rows to display.
   */
  maxRows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * Minimum number of rows to display.
   * @default 1
   */
  minRows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * The size of the component.
   * @default 'md'
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(["sm", "md", "lg"]),
    PropTypes.string,
  ]),
  /**
   * Leading adornment for this input.
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
   * The variant to use.
   * @default 'outlined'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(["outlined", "plain", "soft", "solid"]),
    PropTypes.string,
  ]),
} as any;

export default Textarea;
