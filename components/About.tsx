import React, { useEffect, useRef, useState } from "react";
import {
  animated,
  interpolate,
  useChain,
  useSpring,
  useTrail,
} from "react-spring";
import { Spring } from "react-spring/renderprops.cjs";
import styled from "styled-components";
import useWindowSize from "../hooks/useWindowSize";

const about = `Hello, my name is Levan, I'm a 22 year old React Developer From Georgia. I got into web development about 2 years ago, starting off by learning the basics of HTML, CSS and Javascript, then moving on to React. My main frame of work revolves around React. I have a very nice understanding of How React works all around, its architecture, state, lifecycle, a good knowledge of its APIs (context, router) and proficiency of using hooks as well as Redux. Redux Alongside Typescript can be a very nice addition to a React project. Even though my main skillset consists of Front-end Technologies, I'm fully capable of working with Back-end as well. I've worked with Node.js and Express in my private projects, in which i've also made use of GraphQl apis and MongoDb database, so i have a good understanding of how the whole sequence of React project development goes, from start to finish. I Have a bit of understanding of React Native as well, but have not delved too far into it yet.  

`;
const aboutArray = about
  .match(/[^ ]* [^ ]* /gs)
  .map((words, index) => ({ words: words, id: words + index }));

interface MainContainerProps {
  height: number;
}

const MainContainer = styled.div<MainContainerProps>`
  position: absolute;
  box-sizing: border-box;
  width: 150%;
  max-width: 100vw;
  height: ${(props) => `${props.height}%`};
  bottom: 40%;
  z-index: 10;
  transform: translateX(-51%);
`;
const MainContainerAnimation = styled(animated.div)`
  height: 100%;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;
const TextBoxContainer = styled(animated.div)`
  width: 100%;
  height: 70%;
  position: relative;
  padding: 3% 1.5% 3% 3%;
  box-sizing: border-box;
  background: #8dfbff;
`;

const TextBox = styled(animated.div)`
  position: relative;
  height: 100%;
  width: 100%;
  padding: 1%;
  scrollbar-width: thin;
  scrollbar-color: gray;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 5px;
    background: #707070;
  }
  ::-webkit-scrollbar-thumb {
    background: #cccccc;
    border-radius: 3px;
  }

  box-sizing: border-box;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;
const Text = styled.div`
  font-family: "Itim", cursive;
  color: white;
  width: 100%;
  text-indent: 5%;
  text-shadow: -1px -1px 0px #000, 0px -1px 0px #000, 1px -1px 0px #000,
    -1px 0px 0px #000, 1px 0px 0px #000, -1px 1px 0px #000, 0px 1px 0px #000,
    1px 1px 0px #000;
`;
const BottomLineAnimationContainer = styled.div`
  height: 30%;
  width: 100%;
  display: flex;
  position: relative;
`;
const BottomLineContainer = styled.div<LineProps>`
  height: 100%;
  flex-grow: 1;
  position: relative;
  overflow: hidden;
  top: -1px;
  left: ${(props) => (props.left ? "1px" : "-1px")};
`;

interface LineProps {
  left?: boolean;
}

const BottomLine = styled(animated.div)<LineProps>`
  position: absolute;
  height: 100%;
  bottom: 99%;
  border-bottom: 2px solid black;
  background: #8dfbff;

  width: 150%;

  right: ${(props) => (!props.left ? "0" : null)};
  transform-origin: ${(props) => (props.left ? "top left" : "top right")};
`;

const SideLine = styled(animated.div)<LineProps>`
  position: absolute;
  bottom: 0;
  width: 2px;
  background: black;
  left: ${(props) => (props.left ? 0 : null)};
  right: ${(props) => (!props.left ? 0 : null)};
`;
const TopLine = styled(animated.div)<LineProps>`
  position: absolute;
  top: 0;
  height: 2px;
  background: black;

  left: ${(props) => (props.left ? 0 : null)};
  right: ${(props) => (!props.left ? 0 : null)};
`;

interface AboutProps {}

const About: React.FunctionComponent<AboutProps> = () => {
  const { windowRatio } = useWindowSize();
  const [wordVisibilityState, setWordVisibilityState] = useState(
    aboutArray.map(() => false)
  );

  const intervalRef = useRef(null);
  const timeOutRef = useRef(null);
  const currentWord = useRef(0);

  const LeftLineSpringAnimation = (left) =>
    useSpring({
      to: async (next) => {
        await next({ transform: `rotate(${left ? "10deg" : "-10deg"})` });
      },
      from: {
        transform: "rotate(0deg)",
      },
      delay: 500,
    });
  const mainContainerSpringAnimation = useSpring({
    from: { width: "0%" },
    to: { width: "100%" },
  });
  const SideLineAnimation = useSpring({
    from: { height: "0%" },
    to: { height: "100%" },
    delay: 400,
  });
  const TopLineAnimation = useSpring({
    from: { width: "0%" },
    to: { width: "100%" },

    delay: 400,
  });

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      const intervalId = setInterval(() => {
        if (currentWord.current <= aboutArray.length) {
          setWordVisibilityState((pastState) => {
            const newState = [...pastState];

            newState[currentWord.current] = true;

            return newState;
          });
          currentWord.current += 1;
        } else {
          clearInterval(intervalRef.current);
        }
      }, 10);

      intervalRef.current = intervalId;
    }, 1000);

    timeOutRef.current = timeOutId;

    return () => {
      clearTimeout(timeOutRef.current);
      clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <MainContainer height={windowRatio > 1 ? 70 : 50}>
      <MainContainerAnimation style={mainContainerSpringAnimation}>
        <TextBoxContainer>
          <TextBox>
            <Text>
              {aboutArray.map((item, index) => {
                return (
                  <span
                    key={item.id}
                    style={{
                      visibility: wordVisibilityState[index]
                        ? "visible"
                        : "hidden",
                    }}
                  >
                    {item.words}
                  </span>
                );
              })}
            </Text>
          </TextBox>

          <SideLine style={SideLineAnimation} left />
          <SideLine style={SideLineAnimation} />
          <TopLine style={TopLineAnimation} left />
          <TopLine style={TopLineAnimation} />
        </TextBoxContainer>

        <BottomLineAnimationContainer>
          <BottomLineContainer left>
            <BottomLine style={LeftLineSpringAnimation(true)} left />
          </BottomLineContainer>
          <BottomLineContainer>
            <BottomLine style={LeftLineSpringAnimation(false)} />
          </BottomLineContainer>
        </BottomLineAnimationContainer>
      </MainContainerAnimation>
    </MainContainer>
  );
};

export default About;
