import React, { useMemo } from "react";
import { animated, Spring } from "react-spring/renderprops.cjs";
import styled from "styled-components";
import { houseWallPictureWrapperWidthCalculator } from "../functions/houseFunctions";
import useWindowSize from "../hooks/useWindowSize";
import HouseWallSvg from "../public/HouseWall";
import PictureFrame from "../public/PictureFrame";

interface StyledHouseWallProps {}

const StyledHouseWall = styled(animated.div)<StyledHouseWallProps>`
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface StyledPictureFrameProps {
  ratioSmall: boolean;
}

const StyledPictureFrame = styled.div<StyledPictureFrameProps>`
  width: ${(props) => (props.ratioSmall ? "20%" : "10%")};
  z-index: 1;
  margin: 0 5%;
  transform: translateY(-50%);
`;

interface StyledHouseWallSvgProps {
  width: number;
}

const StyledHouseWallSvg = styled.div<StyledHouseWallSvgProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: ${(props) => `${props.width}%`};
`;

interface PictureWrapperInterface {
  width: number;
  height: number;
}

const PictureWrapper = styled.div<PictureWrapperInterface>`
  width: ${(props) => `${props.width}%`};
  height: ${(props) => `${props.height}%`};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

interface ProjectsProps {
  projectsSelected: boolean;
}

const Projects: React.FunctionComponent<ProjectsProps> = ({
  projectsSelected,
}) => {
  const [
    windowWidth,
    windowHeight,
    windowHeightIsGreater,
    windowRatio,
  ] = useWindowSize();
  const houseWallPictureWrapperWidthHeight = useMemo(
    () =>
      houseWallPictureWrapperWidthCalculator(
        windowHeightIsGreater,
        windowHeight,
        windowWidth
      ),
    [windowHeightIsGreater, windowHeight, windowWidth]
  );
  const ratioSmall = useMemo(() => windowRatio > 0.5, [windowRatio]);

  return (
    <Spring from={{ opacity: 0 }} to={{ opacity: projectsSelected ? 1 : 0 }}>
      {(props) => (
        <StyledHouseWall style={props}>
          <PictureWrapper
            width={houseWallPictureWrapperWidthHeight.pictureWrapper.width}
            height={houseWallPictureWrapperWidthHeight.pictureWrapper.height}
          >
            <StyledPictureFrame ratioSmall={ratioSmall}>
              <PictureFrame />
            </StyledPictureFrame>
            <StyledPictureFrame ratioSmall={ratioSmall}>
              <PictureFrame />
            </StyledPictureFrame>
            <StyledPictureFrame ratioSmall={ratioSmall}>
              <PictureFrame />
            </StyledPictureFrame>
          </PictureWrapper>

          <StyledHouseWallSvg
            width={houseWallPictureWrapperWidthHeight.houseWall.width}
          >
            <HouseWallSvg />
          </StyledHouseWallSvg>
        </StyledHouseWall>
      )}
    </Spring>
  );
};

export default Projects;
