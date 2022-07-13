import { emphasize } from "@mui/system";
import PropTypes from "prop-types";
import * as React from "react";
import Button from "../Button";
import MoreHorizIcon from "../internal/svg-icons/MoreHoriz";
import styled from "../styles/styled";
import { BreadcrumbsProps } from "./BreadcrumbsProps";

const BreadcrumbCollapsedButton = styled(Button)<{
  ownerState: BreadcrumbsProps;
}>(({ theme }) => ({
  display: "flex",
  marginLeft: `calc(${theme.spacing(1)} * 0.5)`,
  marginRight: `calc(${theme.spacing(1)} * 0.5)`,
  borderRadius: 2,
}));

const BreadcrumbCollapsedIcon = styled(MoreHorizIcon)<{
  ownerState: BreadcrumbsProps;
}>({
  width: 24,
  height: 16,
});

/**
 * @ignore - internal component.
 */

function BreadcrumbCollapsed(props: BreadcrumbsProps) {
  const ref = React.useRef<HTMLButtonElement>(null);
  const ownerState = props;

  return (
    <li>
      <BreadcrumbCollapsedButton
        {...props}
        color={"primary"}
        ownerState={ownerState}
        ref={ref}
      >
        <BreadcrumbCollapsedIcon ownerState={ownerState} />
      </BreadcrumbCollapsedButton>
    </li>
  );
}

BreadcrumbCollapsed.propTypes = {
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
};

export default BreadcrumbCollapsed;
