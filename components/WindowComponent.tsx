import React from "react";
import { animated } from "react-spring/renderprops.cjs";

import styled from "styled-components";
import WindowSvg from "../public/Window";
import windowCoordinates from "../public/windowCoordinates";
import Projects from "./Projects";

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
  overflow: hidden;
`;

interface WindowComponentProps {
  projectsSelected: boolean;
}

const WindowComponent: React.FunctionComponent<WindowComponentProps> = ({
  projectsSelected,
}) => {
  return (
    <StyledWindow
      width={windowCoordinates.width}
      left={windowCoordinates.left}
      top={windowCoordinates.top}
    >
      <Projects projectsSelected={projectsSelected} />
      <WindowSvg />
    </StyledWindow>
  );
};

export default WindowComponent;
