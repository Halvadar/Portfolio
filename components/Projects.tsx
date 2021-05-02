import React, { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { animated, Spring } from "react-spring/renderprops.cjs";
import styled, { css, keyframes } from "styled-components";
import Image from "next/image";
import { houseWallPictureWrapperWidthCalculator } from "../functions/houseFunctions";
import useWindowSize from "../hooks/useWindowSize";
import HouseWallSvg from "../public/HouseWall";
import PictureFrame from "../public/PictureFrame";
import ReactLogo from "../public/logos/React";
import ReduxLogo from "../public/logos/Redux";
import NodeLogo from "../public/logos/Node";
import ExpressLogo from "../public/logos/Express";
import MongoLogo from "../public/logos/Mongo";
import GraphQlLogo from "../public/logos/GraphQl";

// const Archos = dynamic(() => import("/Archos.png"), {
//   loading: () => <div>loading</div>,
// });

const projectsData = [
  {
    name: "Archos",
    src: "/Archos.png",
    url: "https://archos.netlify.app/",
    Technologies: [
      { name: "React", logo: ReactLogo },
      { name: "Redux", logo: ReduxLogo },
      { name: "NodeJs", logo: NodeLogo },
      { name: "Express", logo: ExpressLogo },
      { name: "MongoDB", logo: MongoLogo },
      { name: "GraphQl", logo: GraphQlLogo },
    ],
    about: `
      This is a private Project I've worked on to test my skills. It took me about 3 months. This project utilizes MERN stack. Front-end is done by React. I used Redux for the state-management. Routing is done by React-router. Styling is done purely in css. Authentication natively as well as by google and facebook login api is available. Back-end is a combination of Express (NodeJs framework) GraphQl and Mongoose (MongoDb framework).       
    `,
  },
  {
    name: "Scandi",
    src: "/Scandi.png",
    url: "https://scandiapp.netlify.app/",
    Technologies: [{ name: "React", logo: ReactLogo }],
    about: `
      This is a small test/exercise project i did for the job application. It uses React. Routing is done by React-router on this one as well. This project was a learning experience in drawing graphics as i used the Canvas api for the first time here.
    `,
  },
];

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
  width: ${(props) => (props.ratioSmall ? "20%" : "15%")};
  z-index: 1;
  margin: 0 5%;
  transform: translateY(-50%);
  > svg {
    display: block;
  }
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
  padding: 0 10%;
  cursor: pointer;
`;
const ImageWrapper = styled.div`
  position: absolute;
  height: 92%;
  width: 90%;
  left: 5%;
  top: 4%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

interface AnimationImageWrapperProps {
  hovered: boolean;
}

const AnimationImageWrapper = styled.div<AnimationImageWrapperProps>`
  height: 100%;
  width: 100%;
  cursor: pointer;
  transform: scale(1);
  transition: 0.5s transform;
  transform: ${(props) => {
    return props.hovered ? "scale(1.2)" : "scale(1)";
  }};
`;

const AboutAnimation = keyframes`
  0%{
    width:0%;
    height:100%;
  }
  50%{
    height:100%;
    width:300%
  }
  100% {
    height:200%;
    width:300%;
  }
`;

interface AboutProps {
  lastHalfItem: boolean;
  hovered: boolean;
}

const About = styled.div<AboutProps>`
  position: absolute;
  top: 0;
  right: ${(props) => (props.lastHalfItem ? 0 : null)};
  background: rgb(250, 250, 250, 0.3);
  box-sizing: border-box;

  ${(props) =>
    props.hovered
      ? css`
          animation: ${AboutAnimation} 1s ease-in-out forwards;
        `
      : null};
`;

const ProjectDescAnimationLeft = keyframes`
   from {
    left:80%
  }
to {
  left:100%;
  visibility:visible;
}
`;
const ProjectDescAnimationRight = keyframes`
   from {
    right:80%
  }
to {
  right:100%;
  visibility:visible;
}
`;

interface ProjectDescProps {
  lastHalfItem: boolean;
}

const ProjectDesc = styled.div<ProjectDescProps>`
  position: absolute;
  height: 200%;
  width: 200%;
  top: 0;
  visibility: hidden;
  background: rgba(136, 158, 255, 0.7);
  font-size: 1.2rem;
  overflow-y: scroll;
  scrollbar-width: thin;
  scrollbar-color: gray;

  ::-webkit-scrollbar {
    width: 5px;
    background: #707070;
  }
  ::-webkit-scrollbar-thumb {
    background: #cccccc;
    border-radius: 3px;
  }
  font-family: "Itim", cursive;
  color: white;
  text-align: left;
  text-indent: 5%;
  font-weight: 500;
  padding: 10%;
  box-sizing: border-box;

  ${(props) =>
    css`
      animation: ${props.lastHalfItem
          ? ProjectDescAnimationRight
          : ProjectDescAnimationLeft}
        0.3s 1s ease-in-out forwards;
    `};
`;
const TechnologiesAnimation = keyframes`
  from {
  top:80%;
}
to {
  top:100%;
  visibility:visible;
}
`;
const Technologies = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 5%;
  box-sizing: border-box;
  background: rgb(141, 224, 235, 0.7);
  visibility: hidden;
  animation: ${TechnologiesAnimation} 0.3s 1s ease-in-out forwards;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  overflow-y: scroll;
  scrollbar-width: thin;
  scrollbar-color: gray;

  ::-webkit-scrollbar {
    width: 5px;
    background: #707070;
  }
  ::-webkit-scrollbar-thumb {
    background: #cccccc;
    border-radius: 3px;
  }
`;

const Technology = styled.div`
  display: flex;

  width: 100%;
  align-items: center;
`;

const TechnologyLogo = styled.div`
  width: 15%;
  margin: 0 10%;
`;
const ClickToGoAnimation = keyframes`
  from {
    top:7%;
    visibility:visible;
  }
  to{
    top:10%;
    visibility:visible;
  }
`;

const ClickToGo = styled.div`
  position: absolute;
  visibility: hidden;
  left: 50%;
  transform: translateX(-50%);
  animation: ${ClickToGoAnimation} 0.5s forwards alternate ease-in-out;
  color: #65c1ff;
  font-family: "Itim", cursive;
  text-shadow: -1px -1px 0px #000, 0px -1px 0px #000, 1px -1px 0px #000,
    -1px 0px 0px #000, 1px 0px 0px #000, -1px 1px 0px #000, 0px 1px 0px #000,
    1px 1px 0px #000;
`;

interface ProjectsProps {
  projectsSelected: boolean;
}

const Projects: React.FunctionComponent<ProjectsProps> = ({
  projectsSelected,
}) => {
  const {
    windowWidth,
    windowHeight,
    windowHeightIsGreater,
    windowRatio,
    mobileDevice,
  } = useWindowSize();
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
  const [currentProjectHovered, setCurrentProjectHovered] = useState(null);

  return (
    <Spring from={{ opacity: 0 }} to={{ opacity: projectsSelected ? 1 : 0 }}>
      {(props) => (
        <StyledHouseWall style={props}>
          <PictureWrapper
            width={houseWallPictureWrapperWidthHeight.pictureWrapper.width}
            height={houseWallPictureWrapperWidthHeight.pictureWrapper.height}
          >
            {projectsData.map((picture, index) => {
              const lastHalfItem = index >= projectsData.length / 2;
              const hovered = currentProjectHovered === index;

              return (
                <StyledPictureFrame
                  onMouseEnter={() =>
                    !mobileDevice && setCurrentProjectHovered(index)
                  }
                  onMouseLeave={() => setCurrentProjectHovered(null)}
                  ratioSmall={ratioSmall}
                  onClick={() =>
                    mobileDevice && !hovered
                      ? setCurrentProjectHovered(index)
                      : window.open(picture.url)
                  }
                >
                  <PictureFrame />
                  <ImageWrapper>
                    <AnimationImageWrapper hovered={hovered}>
                      <Image
                        src={picture.src}
                        layout="fill"
                        objectFit="cover"
                        objectPosition="center"
                      />
                    </AnimationImageWrapper>
                  </ImageWrapper>
                  <About hovered={hovered} lastHalfItem={lastHalfItem} />
                  {hovered && (
                    <>
                      <ClickToGo>Click To Go</ClickToGo>
                      <Technologies>
                        {picture.Technologies.map((technologyItem) => {
                          const TechnologyItemLogo = technologyItem.logo;

                          return (
                            <Technology>
                              <TechnologyLogo>
                                <TechnologyItemLogo />
                              </TechnologyLogo>
                              <div>{technologyItem.name}</div>
                            </Technology>
                          );
                        })}
                      </Technologies>
                      <ProjectDesc lastHalfItem={lastHalfItem}>
                        {picture.about}
                      </ProjectDesc>
                    </>
                  )}
                </StyledPictureFrame>
              );
            })}
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
