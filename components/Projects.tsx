import React, { useMemo, useState } from "react";

import { animated, Spring } from "react-spring/renderprops.cjs";
import styled, { css, keyframes } from "styled-components";
import Image from "next/image";
import { houseWallPictureWrapperWidthCalculator } from "../functions/houseFunctions";
import useWindowSize from "../hooks/useWindowSize";
import HouseWallSvg from "../public/HouseWall";
import PictureFrame from "../public/PictureFrame";
import ReactLogo from "../public/logos/React";
import ExpressLogo from "../public/logos/Express";
import MongoLogo from "../public/logos/Mongo";
import GraphQlLogo from "../public/logos/GraphQl";
import Neo4jLogo from "../public/logos/Neo";
import PhaserLogo from "../public/logos/Phaser";
import NestLogo from "../public/logos/Nest";
import NextLogo from "../public/logos/Next";
import TypescriptLogo from "../public/logos/Typescript";
// const Archos = dynamic(() => import("/Archos.png"), {
//   loading: () => <div>loading</div>,
// });

const projectsData = [
  {
    name: "Gazelle.ai",
    src: "/Gazelle.png",
    url: "https://gazelle.ai/",
    Technologies: [
      { name: "React", logo: ReactLogo },
      { name: "Neo4j", logo: Neo4jLogo },
      { name: "GraphQl", logo: GraphQlLogo },
      { name: "Express", logo: ExpressLogo },
      { name: "MongoDB", logo: MongoLogo },
      { name: "Typescript", logo: TypescriptLogo },
    ],
    about: `Gazelle.ai (now part of Lightcast.io) is an AI-powered business intelligence platform that provides advanced search capabilities across a database of over 9 million business records. I contributed to this project for 1.5 years, leading the complete rewrite of the user-facing application, which comprised 60,000 lines of code. My responsibilities spanned the entire development lifecycle, from initial planning and architecture to deployment in production. The project leveraged the GRAND stack (GraphQL, React, Apollo, and Neo4j Database) to deliver a highly scalable and performant solution `,
  },

  {
    name: "Profairgames",
    src: "/Profairgames.png",
    url: "https://profairgames.com/",
    Technologies: [
      { name: "Phaser", logo: PhaserLogo },
      { name: "NestJs", logo: NestLogo },
      { name: "React", logo: ReactLogo },
      { name: "Typescript", logo: TypescriptLogo },
    ],
    about: `Profairgames is a gambling game provider where I worked for a year, participating in every stage of game development, from design and planning to coding, testing, and deployment. We used Phaser.js for game development and NestJS for the back end, where I was responsible for implementing and maintaining the back-end architecture.

I also contributed to building mathematical models and calculating probabilities to ensure game fairness. Additionally, I played a key role in expanding the development team, conducting over 30 technical interviews and supervising new hires during my time there.`,
  },
  {
    name: "Chronolog",
    src: "/Chronolog.png",
    url: "https://chronolog.io",
    Technologies: [
      { name: "Next", logo: NextLogo },
      { name: "GraphQl", logo: GraphQlLogo },
      { name: "Typescript", logo: TypescriptLogo },
    ],
    about:
      "Chronolog in an environment monitoring service. It allows it's customers to place photo stations, where passers by are allowed to align their mobile phones and take pictures. The pictures are processed, filtered and added to the right chronolog to create timelapses. I worked on this project for 8 months. We were using Next.js, alongside AWS amplify and GraphQL. My responsibilities included working on UI, as well as API related tasks. I worked on implementing WYSIWYG editor, fixing layout related issues, as well as adding new API endpoints.",
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
  hovered: boolean;
}

const StyledPictureFrame = styled.div<StyledPictureFrameProps>`
  width: ${(props) => (props.ratioSmall ? "20%" : "15%")};
  z-index: ${(props) => (props.hovered ? 100 : 1)};
  margin: 0 5%;
  position: relative;
  transform: translateY(-20%);
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
  flex-wrap: wrap;
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
                  hovered={hovered}
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
                        alt={picture.name}
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
