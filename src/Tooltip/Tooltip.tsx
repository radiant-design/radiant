import * as React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  unstable_capitalize as capitalize,
  unstable_useControlled as useControlled,
  unstable_useEventCallback as useEventCallback,
  unstable_useForkRef as useForkRef,
  unstable_useIsFocusVisible as useIsFocusVisible,
  unstable_useId as useId,
} from "@mui/utils";
import {
  PopperUnstyled,
  unstable_composeClasses as composeClasses,
} from "@mui/base";
import { useSlotProps } from "@mui/base/utils";
import { WithCommonProps } from "@mui/base/utils/mergeSlotProps";
import { MUIStyledCommonProps } from "@mui/system";
import { OverridableComponent } from "@mui/types";
import styled from "../styles/styled";
import useThemeProps from "../styles/useThemeProps";
import { getTooltipUtilityClass } from "./tooltipClasses";
import {
  TooltipComponentsPropsOverrides,
  TooltipProps,
  TooltipOwnerState,
  TooltipTypeMap,
} from "./TooltipProps";

const useUtilityClasses = (ownerState: TooltipOwnerState) => {
  const { arrow, variant, color, size, placement, touch } = ownerState;

  const slots = {
    root: [
      "root",
      arrow && "tooltipArrow",
      touch && "touch",
      size && `size${capitalize(size)}`,
      color && `color${capitalize(color)}`,
      variant && `variant${capitalize(variant)}`,
      `tooltipPlacement${capitalize(placement!.split("-")[0])}`,
    ],
    arrow: ["arrow"],
  };

  return composeClasses(slots, getTooltipUtilityClass, {});
};

const TooltipRoot = styled("div", {
  name: "RadTooltip",
  slot: "Root",
  overridesResolver: (_props, styles) => styles.root,
})<{ ownerState: TooltipOwnerState }>(({ ownerState, theme }) => {
  const variantStyle = theme.variants[ownerState.variant!]?.[ownerState.color!];
  return {
    ...(ownerState.size === "sm" && {
      "--Icon-fontSize": "1rem",
      "--Tooltip-arrow-size": "8px",
      padding: "4px 8px !important", //theme.spacing(0.5, 0.625),
      fontSize: theme.vars.fontSize.sm, //xs
    }),
    ...(ownerState.size === "md" && {
      "--Icon-fontSize": "1.125rem",
      "--Tooltip-arrow-size": "10px",
      padding: "8px 16px !important", // theme.spacing(0.625, 0.75),
      fontSize: theme.vars.fontSize.md, //sm
    }),
    ...(ownerState.size === "lg" && {
      "--Icon-fontSize": "1.25rem",
      "--Tooltip-arrow-size": "12px",
      padding: theme.spacing(0.75, 1),
      fontSize: theme.vars.fontSize.lg, //md
    }),
    zIndex: 1500,
    pointerEvents: "none",
    borderRadius: theme.vars.radius.xs,
    // boxShadow: theme.vars.shadow.sm,
    fontFamily: theme.vars.fontFamily.body,
    fontWeight: theme.vars.fontWeight.sm, //md
    lineHeight: theme.vars.lineHeight.sm,
    wordWrap: "break-word",
    position: "relative",
    ...(!ownerState.disableInteractive && {
      pointerEvents: "auto",
    }),
    ...(!ownerState.open && {
      pointerEvents: "none",
    }),
    ...variantStyle,
    ...(!variantStyle.backgroundColor && {
      backgroundColor: theme.vars.palette.background.surface,
    }),
    "&::before": {
      // acts as a invisible connector between the element and the tooltip
      // so that the cursor can move to the tooltip without losing focus.
      content: '""',
      display: "block",
      position: "absolute",
      width: ownerState.placement?.match(/(top|bottom)/)
        ? "100%"
        : // 10px equals the default offset popper config
          "calc(10px + var(--variant-borderWidth, 0px))",
      height: ownerState.placement?.match(/(top|bottom)/)
        ? "calc(10px + var(--variant-borderWidth, 0px))"
        : "100%",
    },
    '&[data-popper-placement*="bottom"]::before': {
      top: 0,
      left: 0,
      transform: "translateY(-100%)",
    },
    '&[data-popper-placement*="left"]::before': {
      top: 0,
      right: 0,
      transform: "translateX(100%)",
    },
    '&[data-popper-placement*="right"]::before': {
      top: 0,
      left: 0,
      transform: "translateX(-100%)",
    },
    '&[data-popper-placement*="top"]::before': {
      bottom: 0,
      left: 0,
      transform: "translateY(100%)",
    },
  };
});

const TooltipArrow = styled("span", {
  name: "RadTooltip",
  slot: "Arrow",
  overridesResolver: (_props, styles) => styles.arrow,
})<{ ownerState: TooltipOwnerState }>(({ theme, ownerState }) => {
  const variantStyle = theme.variants[ownerState.variant!]?.[ownerState.color!];
  return {
    "--unstable_Tooltip-arrow-rotation": 0,
    width: "var(--Tooltip-arrow-size)",
    height: "var(--Tooltip-arrow-size)",
    boxSizing: "border-box",
    // use psuedo element because Popper controls the `transform` property of the arrow.
    "&:before": {
      content: '""',
      display: "block",
      position: "absolute",
      width: 0,
      height: 0,
      border: "calc(var(--Tooltip-arrow-size) / 2) solid",
      borderLeftColor: "transparent",
      borderBottomColor: "transparent",
      borderTopColor:
        variantStyle?.backgroundColor ?? theme.vars.palette.background.surface,
      borderRightColor:
        variantStyle?.backgroundColor ?? theme.vars.palette.background.surface,
      borderRadius: `0px 2px 0px 0px`,
      boxShadow: `var(--variant-borderWidth) calc(-1 * var(--variant-borderWidth)) 0px 0px ${variantStyle.borderColor}`,
      transformOrigin: "center center",
      transform:
        "rotate(calc(-45deg + 90deg * var(--unstable_Tooltip-arrow-rotation)))",
    },
    '[data-popper-placement*="bottom"] &': {
      top: "calc(0.5px + var(--Tooltip-arrow-size) * -1 / 2)", // 0.5px is for perfect overlap with the Tooltip
    },
    '[data-popper-placement*="top"] &': {
      "--unstable_Tooltip-arrow-rotation": 2,
      bottom: "calc(0.5px + var(--Tooltip-arrow-size) * -1 / 2)",
    },
    '[data-popper-placement*="left"] &': {
      "--unstable_Tooltip-arrow-rotation": 1,
      right: "calc(0.5px + var(--Tooltip-arrow-size) * -1 / 2)",
    },
    '[data-popper-placement*="right"] &': {
      "--unstable_Tooltip-arrow-rotation": 3,
      left: "calc(0.5px + var(--Tooltip-arrow-size) * -1 / 2)",
    },
  };
});

let hystersisOpen = false;
let hystersisTimer: ReturnType<typeof setTimeout> | null = null;

export function testReset() {
  hystersisOpen = false;
  if (hystersisTimer) {
    clearTimeout(hystersisTimer);
  }
}

function composeMouseEventHandler(
  handler: (event: React.MouseEvent<HTMLElement>) => void,
  eventHandler: (event: React.MouseEvent<HTMLElement>) => void
) {
  return (event: React.MouseEvent<HTMLElement>) => {
    if (eventHandler) {
      eventHandler(event);
    }
    handler(event);
  };
}

function composeFocusEventHandler(
  handler: (event: React.FocusEvent<HTMLElement>) => void,
  eventHandler: (event: React.FocusEvent<HTMLElement>) => void
) {
  return (event: React.FocusEvent<HTMLElement>) => {
    if (eventHandler) {
      eventHandler(event);
    }
    handler(event);
  };
}

const Tooltip = React.forwardRef(function Tooltip(inProps, ref) {
  const props = useThemeProps<typeof inProps & TooltipProps>({
    props: inProps,
    name: "RadTooltip",
  });

  const {
    children,
    className,
    arrow = false,
    components = {},
    componentsProps = {},
    describeChild = false,
    disableFocusListener = false,
    disableHoverListener = false,
    disableInteractive: disableInteractiveProp = false,
    disableTouchListener = false,
    enterDelay = 100,
    enterNextDelay = 0,
    enterTouchDelay = 700,
    followCursor = false,
    id: idProp,
    leaveDelay = 0,
    leaveTouchDelay = 1500,
    onClose,
    onOpen,
    open: openProp,
    placement = "bottom",
    title,
    color = "primary",
    variant = "solid",
    size = "md",
    ...other
  } = props;

  const [childNode, setChildNode] = React.useState<HTMLElement>();
  const [arrowRef, setArrowRef] = React.useState<HTMLSpanElement | null>(null);
  const ignoreNonTouchEvents = React.useRef(false);

  const disableInteractive = disableInteractiveProp || followCursor;

  const closeTimer: React.MutableRefObject<
    ReturnType<typeof setTimeout> | undefined
  > = React.useRef();
  const enterTimer: React.MutableRefObject<
    ReturnType<typeof setTimeout> | undefined
  > = React.useRef();
  const leaveTimer: React.MutableRefObject<
    ReturnType<typeof setTimeout> | undefined
  > = React.useRef();
  const touchTimer: React.MutableRefObject<
    ReturnType<typeof setTimeout> | undefined
  > = React.useRef();

  const [openState, setOpenState] = useControlled({
    controlled: openProp,
    default: false,
    name: "Tooltip",
    state: "open",
  });

  let open = openState;

  const id = useId(idProp);

  const prevUserSelect: React.MutableRefObject<string | undefined> =
    React.useRef();
  const stopTouchInteraction = React.useCallback(() => {
    if (prevUserSelect.current !== undefined) {
      (
        document.body.style as unknown as { WebkitUserSelect?: string }
      ).WebkitUserSelect = prevUserSelect.current;
      prevUserSelect.current = undefined;
    }
    clearTimeout(touchTimer.current);
  }, []);

  React.useEffect(() => {
    return () => {
      clearTimeout(closeTimer.current);
      clearTimeout(enterTimer.current);
      clearTimeout(leaveTimer.current);
      stopTouchInteraction();
    };
  }, [stopTouchInteraction]);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    if (hystersisTimer) {
      clearTimeout(hystersisTimer);
    }
    hystersisOpen = true;

    // The mouseover event will trigger for every nested element in the tooltip.
    // We can skip rerendering when the tooltip is already open.
    // We are using the mouseover event instead of the mouseenter event to fix a hide/show issue.
    setOpenState(true);

    if (onOpen && !open) {
      onOpen(event);
    }
  };

  const handleClose = useEventCallback(
    (event: React.SyntheticEvent | Event) => {
      if (hystersisTimer) {
        clearTimeout(hystersisTimer);
      }
      hystersisTimer = setTimeout(() => {
        hystersisOpen = false;
      }, 800 + leaveDelay);
      setOpenState(false);

      if (onClose && open) {
        onClose(event);
      }

      clearTimeout(closeTimer.current);
      closeTimer.current = setTimeout(() => {
        ignoreNonTouchEvents.current = false;
      }, 150);
    }
  );

  const handleEnter = (event: React.MouseEvent<HTMLElement>) => {
    if (ignoreNonTouchEvents.current && event.type !== "touchstart") {
      return;
    }

    // Remove the title ahead of time.
    // We don't want to wait for the next render commit.
    // We would risk displaying two tooltips at the same time (native + this one).
    if (childNode) {
      (childNode as HTMLElement).removeAttribute("title");
    }

    clearTimeout(enterTimer.current);
    clearTimeout(leaveTimer.current);
    if (enterDelay || (hystersisOpen && enterNextDelay)) {
      enterTimer.current = setTimeout(
        () => {
          handleOpen(event);
        },
        hystersisOpen ? enterNextDelay : enterDelay
      );
    } else {
      handleOpen(event);
    }
  };

  const handleLeave = (event: React.MouseEvent<HTMLElement>) => {
    clearTimeout(enterTimer.current);
    clearTimeout(leaveTimer.current);
    leaveTimer.current = setTimeout(() => {
      handleClose(event);
    }, leaveDelay);
  };

  const {
    isFocusVisibleRef,
    onBlur: handleBlurVisible,
    onFocus: handleFocusVisible,
    ref: focusVisibleRef,
  } = useIsFocusVisible();
  // We don't necessarily care about the focusVisible state (which is safe to access via ref anyway).
  // We just need to re-render the Tooltip if the focus-visible state changes.
  const [, setChildIsFocusVisible] = React.useState(false);
  const handleBlur = (
    event: React.FocusEvent<HTMLElement> | React.MouseEvent<HTMLElement>
  ) => {
    handleBlurVisible(event as React.FocusEvent<HTMLElement>);
    if (isFocusVisibleRef.current === false) {
      setChildIsFocusVisible(false);
      handleLeave(event as React.MouseEvent<HTMLElement>);
    }
  };

  const handleFocus = (
    event: React.FocusEvent<HTMLElement> | React.MouseEvent<HTMLElement>
  ) => {
    // Workaround for https://github.com/facebook/react/issues/7769
    // The autoFocus of React might trigger the event before the componentDidMount.
    // We need to account for this eventuality.
    if (!childNode) {
      setChildNode(event.currentTarget);
    }

    handleFocusVisible(event as React.FocusEvent<HTMLElement>);
    if (isFocusVisibleRef.current === true) {
      setChildIsFocusVisible(true);
      handleEnter(event as React.MouseEvent<HTMLElement>);
    }
  };

  const detectTouchStart = (event: React.TouchEvent<HTMLElement>) => {
    ignoreNonTouchEvents.current = true;

    const childrenProps = children.props;
    if (childrenProps.onTouchStart) {
      childrenProps.onTouchStart(event);
    }
  };

  const handleMouseOver = handleEnter;
  const handleMouseLeave = handleLeave;

  const handleTouchStart = (event: React.TouchEvent<HTMLElement>) => {
    detectTouchStart(event);
    clearTimeout(leaveTimer.current);
    clearTimeout(closeTimer.current);
    stopTouchInteraction();

    prevUserSelect.current = (
      document.body.style as unknown as { WebkitUserSelect?: string }
    ).WebkitUserSelect;
    // Prevent iOS text selection on long-tap.
    (
      document.body.style as unknown as { WebkitUserSelect?: string }
    ).WebkitUserSelect = "none";

    touchTimer.current = setTimeout(() => {
      (
        document.body.style as unknown as { WebkitUserSelect?: string }
      ).WebkitUserSelect = prevUserSelect.current;
      handleEnter(event as unknown as React.MouseEvent<HTMLElement>);
    }, enterTouchDelay);
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLElement>) => {
    if (children.props.onTouchEnd) {
      children.props.onTouchEnd(event);
    }

    stopTouchInteraction();
    clearTimeout(leaveTimer.current);
    leaveTimer.current = setTimeout(() => {
      handleClose(event);
    }, leaveTouchDelay);
  };

  React.useEffect(() => {
    if (!open) {
      return undefined;
    }

    function handleKeyDown(nativeEvent: KeyboardEvent) {
      // IE11, Edge (prior to using Bink?) use 'Esc'
      if (nativeEvent.key === "Escape" || nativeEvent.key === "Esc") {
        handleClose(nativeEvent);
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleClose, open]);

  const handleUseRef = useForkRef(setChildNode, ref);
  const handleFocusRef = useForkRef(focusVisibleRef, handleUseRef);
  const handleRef = useForkRef(
    (children as unknown as { ref: React.Ref<HTMLElement> }).ref,
    handleFocusRef
  );

  // There is no point in displaying an empty tooltip.
  if (typeof title !== "number" && !title) {
    open = false;
  }

  const positionRef = React.useRef({ x: 0, y: 0 });
  const popperRef = React.useRef(null);

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const childrenProps = children.props;
    if (childrenProps.onMouseMove) {
      childrenProps.onMouseMove(event);
    }

    positionRef.current = { x: event.clientX, y: event.clientY };

    if (popperRef.current) {
      (popperRef.current as { update: () => void }).update();
    }
  };

  const nameOrDescProps: {
    title?: string | null;
    ["aria-describedby"]?: string | null;
    ["aria-label"]?: string | null;
    ["aria-labelledby"]?: string | null;
  } = {};
  const titleIsString = typeof title === "string";
  if (describeChild) {
    nameOrDescProps.title =
      !open && titleIsString && !disableHoverListener ? title : null;
    nameOrDescProps["aria-describedby"] = open ? id : null;
  } else {
    nameOrDescProps["aria-label"] = titleIsString ? title : null;
    nameOrDescProps["aria-labelledby"] = open && !titleIsString ? id : null;
  }

  const childrenProps = {
    ...nameOrDescProps,
    ...other,
    ...children.props,
    className: clsx(className, children.props.className),
    onTouchStart: detectTouchStart,
    ref: handleRef,
    ...(followCursor ? { onMouseMove: handleMouseMove } : {}),
  };

  const interactiveWrapperListeners: {
    onMouseOver?: (event: React.MouseEvent<HTMLElement>) => void;
    onMouseLeave?: (event: React.MouseEvent<HTMLElement>) => void;
    onFocus?: (event: React.FocusEvent<HTMLElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLElement>) => void;
  } = {};

  if (!disableTouchListener) {
    childrenProps.onTouchStart = handleTouchStart;
    childrenProps.onTouchEnd = handleTouchEnd;
  }

  if (!disableHoverListener) {
    childrenProps.onMouseOver = composeMouseEventHandler(
      handleMouseOver,
      childrenProps.onMouseOver
    );

    childrenProps.onMouseLeave = composeMouseEventHandler(
      handleMouseLeave,
      childrenProps.onMouseLeave
    );

    if (!disableInteractive) {
      interactiveWrapperListeners.onMouseOver = handleMouseOver;
      interactiveWrapperListeners.onMouseLeave = handleMouseLeave;
    }
  }

  if (!disableFocusListener) {
    childrenProps.onFocus = composeFocusEventHandler(
      handleFocus,
      childrenProps.onFocus
    );
    childrenProps.onBlur = composeFocusEventHandler(
      handleBlur,
      childrenProps.onBlur
    );

    if (!disableInteractive) {
      interactiveWrapperListeners.onFocus = handleFocus;
      interactiveWrapperListeners.onBlur = handleBlur;
    }
  }

  const popperOptions = React.useMemo(() => {
    const tooltipModifiers = [
      {
        name: "arrow",
        enabled: Boolean(arrowRef),
        options: {
          element: arrowRef,
          // https://popper.js.org/docs/v2/modifiers/arrow/#padding
          // make the arrow looks nice with the Tooltip's border radius
          padding: 6,
        },
      },
      {
        name: "offset",
        options: {
          offset: [0, 10],
        },
      },
    ];

    return {
      modifiers: tooltipModifiers,
    };
  }, [arrowRef]);

  const ownerState = {
    ...props,
    arrow,
    disableInteractive,
    placement,
    touch: ignoreNonTouchEvents.current,
    color,
    variant,
    size,
  };

  const classes = useUtilityClasses(ownerState);

  const RootComponent = components.Root ?? TooltipRoot;
  const ArrowComponent = components.Arrow ?? TooltipArrow;

  const rootProps = useSlotProps({
    elementType: RootComponent,
    externalSlotProps: componentsProps.root,
    ownerState,
    className: clsx(classes.root, componentsProps.root?.className),
  });

  const tooltipArrowProps = useSlotProps({
    elementType: ArrowComponent,
    externalSlotProps: componentsProps.arrow as WithCommonProps<
      React.HTMLProps<HTMLSpanElement> &
        MUIStyledCommonProps &
        TooltipComponentsPropsOverrides
    >,
    ownerState,
    className: clsx(classes.arrow, componentsProps.arrow?.className),
  });

  return (
    <React.Fragment>
      {React.isValidElement(children) &&
        React.cloneElement(children, childrenProps)}
      <PopperUnstyled
        component={RootComponent}
        placement={placement}
        anchorEl={
          followCursor
            ? {
                getBoundingClientRect: () =>
                  ({
                    top: positionRef.current.y,
                    left: positionRef.current.x,
                    right: positionRef.current.x,
                    bottom: positionRef.current.y,
                    width: 0,
                    height: 0,
                  } as DOMRect),
              }
            : childNode
        }
        popperRef={popperRef}
        open={childNode ? open : false}
        id={id}
        {...interactiveWrapperListeners}
        {...rootProps}
        popperOptions={popperOptions}
        ownerState={ownerState}
      >
        {title}
        {arrow ? (
          <TooltipArrow
            {...tooltipArrowProps}
            className={clsx(classes.arrow, componentsProps.arrow?.className)}
            ref={setArrowRef}
            ownerState={ownerState}
          />
        ) : null}
      </PopperUnstyled>
    </React.Fragment>
  );
}) as OverridableComponent<TooltipTypeMap>;

Tooltip.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * If `true`, adds an arrow to the tooltip.
   * @default false
   */
  arrow: PropTypes.bool,
  /**
   * Tooltip reference element.
   */
  children: PropTypes.element.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
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
   * The components used for each slot inside the Tooltip.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: PropTypes.shape({
    Arrow: PropTypes.elementType,
    Root: PropTypes.elementType,
  }),
  /**
   * The props used for each slot inside the Tooltip.
   * Note that `componentsProps.root` prop values win over `RootProps` if both are applied.
   * @default {}
   */
  componentsProps: PropTypes.shape({
    arrow: PropTypes.object,
    root: PropTypes.object,
  }),
  /**
   * Set to `true` if the `title` acts as an accessible description.
   * By default the `title` acts as an accessible label for the child.
   * @default false
   */
  describeChild: PropTypes.bool,
  /**
   * Do not respond to focus-visible events.
   * @default false
   */
  disableFocusListener: PropTypes.bool,
  /**
   * Do not respond to hover events.
   * @default false
   */
  disableHoverListener: PropTypes.bool,
  /**
   * Makes a tooltip not interactive, i.e. it will close when the user
   * hovers over the tooltip before the `leaveDelay` is expired.
   * @default false
   */
  disableInteractive: PropTypes.bool,
  /**
   * Do not respond to long press touch events.
   * @default false
   */
  disableTouchListener: PropTypes.bool,
  /**
   * The number of milliseconds to wait before showing the tooltip.
   * This prop won't impact the enter touch delay (`enterTouchDelay`).
   * @default 100
   */
  enterDelay: PropTypes.number,
  /**
   * The number of milliseconds to wait before showing the tooltip when one was already recently opened.
   * @default 0
   */
  enterNextDelay: PropTypes.number,
  /**
   * The number of milliseconds a user must touch the element before showing the tooltip.
   * @default 700
   */
  enterTouchDelay: PropTypes.number,
  /**
   * If `true`, the tooltip follow the cursor over the wrapped element.
   * @default false
   */
  followCursor: PropTypes.bool,
  /**
   * This prop is used to help implement the accessibility logic.
   * If you don't provide this prop. It falls back to a randomly generated id.
   */
  id: PropTypes.string,
  /**
   * The number of milliseconds to wait before hiding the tooltip.
   * This prop won't impact the leave touch delay (`leaveTouchDelay`).
   * @default 0
   */
  leaveDelay: PropTypes.number,
  /**
   * The number of milliseconds after the user stops touching an element before hiding the tooltip.
   * @default 1500
   */
  leaveTouchDelay: PropTypes.number,
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   */
  onClose: PropTypes.func,
  /**
   * Callback fired when the component requests to be open.
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   */
  onOpen: PropTypes.func,
  /**
   * If `true`, the component is shown.
   */
  open: PropTypes.bool,
  /**
   * Tooltip placement.
   * @default 'bottom'
   */
  placement: PropTypes.oneOf([
    "bottom-end",
    "bottom-start",
    "bottom",
    "left-end",
    "left-start",
    "left",
    "right-end",
    "right-start",
    "right",
    "top-end",
    "top-start",
    "top",
  ]),
  /**
   * The size of the component.
   * @default 'md'
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(["lg", "md", "sm"]),
    PropTypes.string,
  ]),
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
   * Tooltip title. Zero-length titles string, undefined, null and false are never displayed.
   */
  title: PropTypes.node,
  /**
   * The variant to use.
   * @default 'soft'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(["outlined", "plain", "soft", "solid"]),
    PropTypes.string,
  ]),
} as any;

export default Tooltip;
