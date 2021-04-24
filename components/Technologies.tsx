import React from "react";
import styled from "styled-components";
import { Spring, animated } from "react-spring/renderprops.cjs";

import CssLogo from "../public/logos/Css";
import ExpressLogo from "../public/logos/Express";
import GraphqlLogo from "../public/logos/GraphQl";
import HtmlLogo from "../public/logos/Html";
import JSLogo from "../public/logos/JS";
import MongoLogo from "../public/logos/Mongo";
import NextLogo from "../public/logos/Next";
import NodeLogo from "../public/logos/Node";
import ReactLogo from "../public/logos/React";
import ReduxLogo from "../public/logos/Redux";
import logoCoordinates from "../public/logoCoordinates";

const logos = [
  ReactLogo,
  JSLogo,
  HtmlLogo,
  CssLogo,
  ReduxLogo,
  NodeLogo,
  ExpressLogo,
  NextLogo,
  GraphqlLogo,
  MongoLogo,
];

interface StyledLogoProps {
  left: number;
  top: number;
  width: number;
  hovered: boolean;
}

const StyledLogoContainer = styled(animated.div)`
  z-index: 2;
  width: 100%;
  height: 100%;
  position: absolute;
`;
const StyledLogo = styled(animated.div)<StyledLogoProps>`
  position: absolute;
  left: ${(props) => `${props.left}%`};
  top: ${(props) => `${props.top}%`};
  width: ${(props) => `${props.width}%`};

  > svg {
    display: block;
  }
  cursor: pointer;
`;
const ShineAnimation = styled(animated.div)`
  width: 100%;
  border-radius: 50%;
  bottom: 0;
  height: 85%;
  position: absolute;
  overflow: hidden;
`;

const PassingLight = styled(animated.div)`
  height: 100%;
  position: absolute;
  width: 20%;
  left: -32%;
  transform: skewX(-30deg);
  background: white;
  opacity: 0.5;
`;

// transform: scale(1.3) translateY(10%);
interface TechnologiesProps {
  technologiesSelected: boolean;
  currentTechnologySelected: number;
  setCurrentTechnologySelected: React.Dispatch<React.SetStateAction<number>>;
}

const Technologies: React.FunctionComponent<TechnologiesProps> = ({
  technologiesSelected,
  currentTechnologySelected,
  setCurrentTechnologySelected,
}) => {
  return (
    <Spring
      native
      from={{ opacity: 0 }}
      to={{ opacity: technologiesSelected ? 1 : 0 }}
    >
      {(props) => (
        <StyledLogoContainer style={props}>
          {logos.map((Logo, index) => {
            const logoProps = logoCoordinates[index];

            return (
              <Spring
                native
                from={{ transform: "scale(1) translateY(0%)", left: "-32%" }}
                to={{
                  transform:
                    currentTechnologySelected === index
                      ? "scale(1.3) translateY(10%)"
                      : "scale(1) translateY(0%)",
                  left: currentTechnologySelected === index ? "132%" : "-32%",
                }}
              >
                {({ transform, left }) => (
                  <StyledLogo
                    style={{ transform: transform }}
                    hovered={currentTechnologySelected === index}
                    onMouseEnter={() => setCurrentTechnologySelected(index)}
                    onMouseLeave={() => setCurrentTechnologySelected(null)}
                    width={logoProps.width}
                    left={logoProps.left - 50}
                    top={logoProps.top}
                    key={logoProps.id}
                  >
                    <Logo />
                    <ShineAnimation>
                      <PassingLight style={{ left: left }} />
                    </ShineAnimation>
                  </StyledLogo>
                )}
              </Spring>
            );
          })}
        </StyledLogoContainer>
      )}
    </Spring>
  );
};

export default Technologies;
