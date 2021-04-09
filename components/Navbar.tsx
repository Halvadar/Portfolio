import React, { useContext, useEffect, useState } from "react";

import { animated, useTrail } from "react-spring";
import styled from "styled-components";
import { AllAnimationFinished } from "./Header";
import Close from "../public/Close";

const navbarItems = [
  { name: "Technologies", id: 0 },
  { name: "Projects", id: 1 },
  { name: "About Me", id: 2 },
  { name: "Contact", id: 3 },
];

const StyledNavbar = styled.div`
  width: 12rem;
  height: 40%;
  position: absolute;
  top: 15%;
  z-index: 3;
`;

interface StyledNavbarItemProps {
  animationFinished: boolean;
}

const StyledNavbarItem = styled(animated.div)<StyledNavbarItemProps>`
  transition: ${(props) =>
    props.animationFinished ? "padding-left 0.2s" : null};
  color: #ffffff;

  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding-left: 1rem;
    height: 20px;
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
    padding-left: ${(props) => (props.animationFinished ? "3rem" : null)};
  }
`;

interface StyledBackProps {
  hidden: boolean;
}

const StyledBack = styled.div<StyledBackProps>`
  position: absolute;
  z-index: 3;
  width: 2rem;
  top: 5%;
  right: 30%;
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
        hidden={currentNavItem === null}
        onClick={() => setCurrentNavItem(null)}
      >
        <Close />
      </StyledBack>
      <StyledNavbar>
        {navTrailProps.map(({ enteringX }, index) => (
          <StyledNavbarItem
            key={navbarItems[index].id}
            onClick={() => setCurrentNavItem(index)}
            animationFinished={trailAnimationFinished}
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
