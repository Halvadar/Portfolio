import React, { useMemo, useRef, useState } from "react";
import { animated, config, useSpring, useSprings } from "react-spring";
import { Spring } from "react-spring/renderprops.cjs";

import styled from "styled-components";
import { technologiesListCoordinatesCalculator } from "../functions/technologiesFunctions";
import useWindowSize from "../hooks/useWindowSize";

const technologies = [
  { name: "React", id: 0, value: 93, color: [0, 92, 217] },
  { name: "JS", id: 1, value: 87, color: [247, 223, 30] },
  { name: "Css", id: 2, value: 85, color: [1, 112, 186] },
  { name: "Html", id: 3, value: 80, color: [228, 77, 38] },
  { name: "Redux", id: 4, value: 75, color: [246, 255, 140] },
  { name: "Node", id: 5, value: 70, color: [154, 224, 150] },
  { name: "Express", id: 6, value: 70, color: [255, 46, 51] },
  { name: "Next", id: 7, value: 65, color: [255, 255, 255] },
  { name: "Graphql", id: 8, value: 60, color: [229, 53, 171] },
  { name: "Mongo", id: 9, value: 60, color: [98, 218, 255] },
];

interface StyledListMainContainerProps {
  width: number;
  bottom: number;
  transform: string;
}

const StyledListMainContainer = styled(
  animated.div
)<StyledListMainContainerProps>`
  position: absolute;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  align-items: flex-end;
  z-index: 4;
  color: #dbffff;
  font-weight: 700;
  @media (max-width: 768px) {
    font-size: 1.7rem;
  }
  width: ${(props) => `${props.width}%`};
  bottom: ${(props) => `${props.bottom}%`};
  transform: ${(props) => props.transform};
  font-size: 1.5rem;
`;
const StyledListBlackInside = styled(animated.div)`
  position: absolute;
  right: 0;
  height: 100%;
  background: #42ffff;
  opacity: 0.5;
  border-radius: 5px;
  top: 0;
`;

interface StyledListItemProps {}

const StyledListItem = styled(animated.div)<StyledListItemProps>`
  position: relative;
  cursor: pointer;
  display: inline-block;
  text-justify: center;
  margin-right: 2px;
  text-shadow: -1px -1px 0px #000, 0px -1px 0px #000, 1px -1px 0px #000,
    -1px 0px 0px #000, 1px 0px 0px #000, -1px 1px 0px #000, 0px 1px 0px #000,
    1px 1px 0px #000;
  color: white;
`;

interface StyledListItemBarProps {
  itemIndex: number;
  hovered: boolean;
  bordercanbeset: boolean;
}

const StyledListItemBar = styled(animated.div)<StyledListItemBarProps>`
  display: flex;
  box-sizing: border-box;
  justify-content: flex-end;
  align-items: center;
  position: relative;
  right: 0;
  margin: 2px;
  border-radius: 3px;
  border: ${(props) => props.bordercanbeset && "1px solid black"};
  cursor: pointer;
  background: ${(props) => {
    const itemColor = technologies[props.itemIndex].color;
    const RGB = `rgb(${itemColor[0]},${itemColor[1]},${itemColor[2]},${
      props.hovered ? 0.7 : 1
    })`;

    return RGB;
  }};
  @media (max-width: 768px) {
    height: 1.8rem;
  }
  height: 1.6rem;
`;

interface TechnologiesListProps {
  currentTechnologySelected: number;
  setCurrentTechnologySelected: React.Dispatch<React.SetStateAction<number>>;
}

const TechnologiesList: React.FunctionComponent<TechnologiesListProps> = ({
  currentTechnologySelected,
  setCurrentTechnologySelected,
}) => {
  const [listAnimationStart, setListAnimationStart] = useState(false);
  const [
    windowWidth,
    windowHeight,
    windowHeightIsGreater,
    windowRatio,
  ] = useWindowSize();

  const technologiesListCoordinates = useMemo(
    () => technologiesListCoordinatesCalculator(windowRatio),
    [windowRatio]
  );
  const containerAnimation = useSpring({
    from: { right: `${technologiesListCoordinates.rightStart}%` },
    right: `${technologiesListCoordinates.rightFinish}%`,
    config: { velocity: 1 },
  });

  const insideAnimation = useSpring({
    from: { width: "100%" },
    to: async (next) => {
      next({ width: "0%" });
      setListAnimationStart(true);
    },
    delay: 300,
  });

  const listBarAnimation = useSprings(
    technologies.length,
    technologies.map((item) => ({
      width: listAnimationStart ? `${item.value}%` : "0%",
      config: config.slow,
    }))
  );

  return (
    <StyledListMainContainer
      width={technologiesListCoordinates.width}
      bottom={technologiesListCoordinates.bottom}
      transform={technologiesListCoordinates.transform}
      style={containerAnimation}
    >
      <StyledListBlackInside style={insideAnimation} />

      {listBarAnimation.map((props, index) => {
        const item = technologies[index];
        const hovered = currentTechnologySelected === index;

        return (
          <StyledListItemBar
            bordercanbeset={listAnimationStart}
            hovered={hovered}
            key={item.id}
            style={props}
            itemIndex={index}
            onMouseEnter={() => setCurrentTechnologySelected(index)}
            onMouseLeave={() => setCurrentTechnologySelected(null)}
          >
            <Spring
              from={{ right: "0%" }}
              to={{
                right: hovered ? "10%" : "0%",
              }}
            >
              {(itemProps) => (
                <StyledListItem style={itemProps}>{item.name}</StyledListItem>
              )}
            </Spring>
          </StyledListItemBar>
        );
      })}
    </StyledListMainContainer>
  );
};

export default TechnologiesList;
