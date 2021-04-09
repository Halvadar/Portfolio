import React from "react";
import { animated, Spring } from "react-spring/renderprops.cjs";

import styled from "styled-components";
import WindowSvg from "../public/Window";
import windowCoordinates from "../public/windowCoordinates";

interface StyledWindowProps {
  left: number;
  top: number;
  width: number;
}

const StyledWindow = styled(animated.div)<StyledWindowProps>`
  position: absolute;
  width: ${(props) => `${props.width}%`};
  left: ${(props) => `${props.left}%`};
  top: ${(props) => `${props.top}%`};
  > svg {
    display: block;
  }
  z-index: 2;
`;

interface WindowComponentProps {}

const WindowComponent: React.FunctionComponent<WindowComponentProps> = ({}) => {
  return (
    <StyledWindow
      width={windowCoordinates.width}
      left={windowCoordinates.left}
      top={windowCoordinates.top}
    >
      <WindowSvg />
    </StyledWindow>
  );
};

export default WindowComponent;
