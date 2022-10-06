import * as React from "react";
import PropTypes from "prop-types";
import { OverridableComponent } from "@mui/types";
import composeClasses from "@mui/base/composeClasses";
import { useSlotProps } from "@mui/base/utils";
import { styled, useThemeProps } from "../styles";
import { FormLabelProps, FormLabelTypeMap } from "./FormLabelProps";
import formLabelClasses, { getFormLabelUtilityClass } from "./formLabelClasses";

const useUtilityClasses = () => {
  const slots = {
    root: ["root"],
    asterisk: ["asterisk"],
  };

  return composeClasses(slots, getFormLabelUtilityClass, {});
};

const FormLabelRoot = styled("label", {
  name: "RadFormLabel",
  slot: "Root",
  overridesResolver: (_props, styles) => styles.root,
})<{ ownerState: FormLabelProps }>(({ theme, ownerState }) => ({
  WebkitTapHighlightColor: "transparent",
  alignSelf: "var(--FormLabel-alignSelf)",
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
  fontFamily: theme.vars.fontFamily.display,
  fontSize: `var(--FormLabel-fontSize, ${theme.vars.fontSize.sm})`,
  fontWeight: theme.vars.fontWeight.md,
  lineHeight: theme.vars.lineHeight.md,
  // color: `var(--FormLabel-color, ${theme.vars.palette.text.primary})`,
  color: ownerState.disabled
    ? theme.vars.palette[ownerState.color || "neutral"]?.plainDisabledColor
    : `var(--FormLabel-color, ${theme.vars.palette.text.primary})`,
  margin: "var(--FormLabel-margin, 0 0 0.25rem 0)",
  [`&.${formLabelClasses.disabled}`]: {
    "--FormLabel-color":
      theme.vars.palette[ownerState.color || "neutral"]?.plainDisabledColor,
  },
}));

const AsteriskComponent = styled("span", {
  name: "RadFormLabel",
  slot: "Asterisk",
  overridesResolver: (_props, styles) => styles.asterisk,
})<{ ownerState: FormLabelProps }>({
  color: "#FF5757",
});

const FormLabel = React.forwardRef(function FormLabel(inProps, ref) {
  const props = useThemeProps<
    typeof inProps & { component?: React.ElementType }
  >({
    props: inProps,
    name: "RadFormLabel",
  });

  const {
    children,
    component = "label",
    componentsProps = {},
    required = false,
    disabled = false,
    ...other
  } = props;

  const ownerState = {
    ...props,
    required,
    disabled,
  };

  const classes = useUtilityClasses();
  const rootProps = useSlotProps({
    elementType: FormLabelRoot,
    externalSlotProps: componentsProps.root,
    externalForwardedProps: other,
    ownerState,
    additionalProps: {
      ref,
      as: component,
    },
    className: classes.root,
  });

  const asteriskProps = useSlotProps({
    elementType: AsteriskComponent,
    externalSlotProps: componentsProps.asterisk,
    ownerState,
    additionalProps: {
      "aria-hidden": true,
    },
    className: classes.asterisk,
  });

  return (
    <FormLabelRoot {...rootProps}>
      {children}
      {required && (
        <AsteriskComponent {...asteriskProps}>&thinsp;{"*"}</AsteriskComponent>
      )}
    </FormLabelRoot>
  );
}) as OverridableComponent<FormLabelTypeMap>;

FormLabel.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The content of the component.
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
   * The asterisk is added if required=`true`
   */
  required: PropTypes.bool,
  disabled: PropTypes.bool,
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

export default FormLabel;
