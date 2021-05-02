import React, { useMemo } from "react";
import { Spring } from "react-spring/renderprops.cjs";
import styled from "styled-components";
import useWindowSize from "../hooks/useWindowSize";

const contacts = [
  { type: "Email", name: "Levanbaidoshvili@gmail.com" },
  { type: "Facebook", name: "https://www.facebook.com/Halvadar" },
  { type: "Github", name: "https://github.com/Halvadar" },
];

interface ContactContainerProps {
  mobile: boolean;
  selected: boolean;
}

const ContactContainer = styled.div<ContactContainerProps>`
  position: absolute;
  z-index: 4;
  bottom: 0;
  background: rgb(138, 228, 255, 0.9);
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;

  flex-direction: ${(props) => (props.mobile ? "column" : "row")};
`;

interface ContactItemProps {
  pointer: boolean;
}

const ContactItem = styled.div<ContactItemProps>`
  display: flex;
  cursor: ${(props) => (props.pointer ? "pointer" : null)};
`;
const ContactType = styled.div`
  color: #494949;
`;
const ContactName = styled.div`
  color: #ffffff;
`;

interface ContactsProps {
  selected: boolean;
}

const Contact: React.FunctionComponent<ContactsProps> = ({ selected }) => {
  const { windowWidth } = useWindowSize();
  const vertical = useMemo(() => windowWidth <= 1000, [windowWidth]);

  return (
    <Spring
      from={{ height: "0%", padding: "0%" }}
      to={{
        height: selected ? "20%" : "0%",
        padding: selected ? "3%" : "0%",
      }}
    >
      {(styles) => (
        <ContactContainer style={styles} selected={selected} mobile={vertical}>
          {selected &&
            contacts.map((contact, index) => {
              const clickable = index === 1 || index === 2;

              return (
                <ContactItem
                  pointer={clickable}
                  onClick={() => clickable && window.open(contact.name)}
                >
                  <ContactType>{contact.type}</ContactType>
                  :&nbsp;&nbsp;&nbsp;
                  <ContactName>{contact.name}</ContactName>
                </ContactItem>
              );
            })}
        </ContactContainer>
      )}
    </Spring>
  );
};

export default Contact;
