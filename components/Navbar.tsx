import React, { useContext, useEffect, useState } from "react";

import { animated, useTrail } from "react-spring";
import styled from "styled-components";
import { AllAnimationFinished } from "./Header";
import Close from "../public/Close";
import useWindowSize from "../hooks/useWindowSize";

const navbarItems = [
  { name: "Technologies", id: 0 },
  { name: "Projects", id: 1 },
  { name: "About Me", id: 2 },
  { name: "Contact", id: 3 },
];

const StyledNavbar = styled.div`
  position: absolute;

  top: 2%;
  z-index: 10;
`;

interface StyledNavbarItemProps {
  animationfinished: boolean;
  mobileDevice: boolean;
  selected: boolean;
}

const StyledNavbarItem = styled(animated.div)<StyledNavbarItemProps>`
  transition: ${(props) =>
    props.animationfinished ? "padding-left 0.2s" : null};
  color: ${(props) => (props.selected ? "#95e1ff" : "#ffffff")};

  @media (max-width: 768px) {
    padding-left: 0.5rem;
    height: 20px;
    margin: 1em;
  }
  margin: 0.5em;
  font-size: 1.2rem;
  padding-left: 2rem;
  height: 40px;
  font-family: "Gabriela", serif;
  font-weight: 1000;
  text-shadow: -1px -1px 0px #000, 0px -1px 0px #000, 1px -1px 0px #000,
    -1px 0px 0px #000, 1px 0px 0px #000, -1px 1px 0px #000, 0px 1px 0px #000,
    1px 1px 0px #000;
  cursor: pointer;

  :hover {
    padding-left: ${(props) =>
      props.animationfinished && !props.mobileDevice ? "3rem" : null};
  }
`;

interface StyledBackProps {
  hidden: boolean;
  rightDistance: number;
}

const StyledBack = styled.div<StyledBackProps>`
  position: absolute;
  z-index: 10;
  max-width: 40px;
  min-width: 30px;
  transform: translateX(50%);

  @media (max-width: 768px) {
    top: 5%;
  }
  top: 2%;
  right: ${(props) => `${props.rightDistance}%`};
  cursor: pointer;
  color: white;
  visibility: ${(props) => (props.hidden ? "hidden" : null)};
`;

interface NavbarProps {
  groundAnimationFinished: boolean;
  currentNavItem: number;
  setCurrentNavItem: React.Dispatch<React.SetStateAction<number>>;
}

const Navbar: React.FunctionComponent<NavbarProps> = ({
  currentNavItem,
  setCurrentNavItem,
  groundAnimationFinished,
}) => {
  const { mobileDevice } = useWindowSize();
  const [trailAnimationFinished, setTrailAnimationFinished] = useState(false);
  const [navTrailProps, setNavTrailProps] = useTrail(
    navbarItems.length,
    () => ({
      enteringX: -200,
    })
  );

  useEffect(() => {
    if (groundAnimationFinished) {
      setNavTrailProps({
        enteringX: 0,
        onRest: () => setTrailAnimationFinished(true),
      });
    }
  }, [groundAnimationFinished, setNavTrailProps]);

  return (
    <>
      <StyledBack
        rightDistance={currentNavItem === 1 ? (mobileDevice ? 10 : 5) : 50}
        hidden={currentNavItem === null}
        onClick={() => setCurrentNavItem(null)}
      >
        <Close />
      </StyledBack>
      <StyledNavbar>
        {navTrailProps.map(({ enteringX }, index) => (
          <StyledNavbarItem
            selected={currentNavItem === index}
            mobileDevice={mobileDevice}
            key={navbarItems[index].id}
            onClick={() => setCurrentNavItem(index)}
            animationfinished={trailAnimationFinished}
            style={{
              transform: !trailAnimationFinished
                ? enteringX.interpolate(
                    (enteringProp) => `translateX(${enteringProp}px)`
                  )
                : null,
            }}
          >
            {navbarItems[index].name}
          </StyledNavbarItem>
        ))}
      </StyledNavbar>
    </>
  );
};

export default Navbar;
