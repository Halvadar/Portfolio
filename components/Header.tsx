import React, { useEffect, useLayoutEffect, useState } from "react";
import styled from "styled-components";
import Animation from "./Animation";

const StyledHeader = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background: #6ae7ff;
`;

interface HeaderProps {}

const Header: React.FunctionComponent<HeaderProps> = ({}) => {
  const [clientHydrated, setClientHydrated] = useState(false);

  useEffect(() => {
    setClientHydrated(true);
  }, []);

  return <StyledHeader>{clientHydrated && <Animation />}</StyledHeader>;
};

export default Header;
