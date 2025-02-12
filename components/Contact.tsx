import React, { useMemo } from "react";
import { Spring } from "react-spring/renderprops.cjs";
import styled from "styled-components";
import useWindowSize from "../hooks/useWindowSize";

const contacts = [
  {
    name: "Linkedin",
    link: "https://www.linkedin.com/in/levan-baidoshvili-9958121a6",
    clickable: true,
  },
  { name: "Github", link: "https://github.com/Halvadar", clickable: true },
  {
    name: "Email",
    link: "Levanbaidoshvili@gmail.com",
    copyable: true,
    clickable: true,
  },
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
  padding: 8px 16px;
  border-radius: 4px;
  transition: background 0.2s ease;

  &:hover {
    background: ${(props) =>
      props.pointer ? "rgba(255, 255, 255, 0.1)" : "transparent"};
  }
`;

const ContactType = styled.div`
  color: #494949;
  font-weight: 500;
  margin-right: 8px;
`;

const ContactName = styled.div`
  color: #ffffff;
  font-weight: 400;
`;

interface ContactsProps {
  selected: boolean;
}

const Contact: React.FunctionComponent<ContactsProps> = ({ selected }) => {
  const { windowWidth } = useWindowSize();
  const vertical = useMemo(() => windowWidth <= 1000, [windowWidth]);

  const handleContactClick = (contact: typeof contacts[0]) => {
    if (contact.copyable) {
      navigator.clipboard.writeText(contact.link);
      alert(`${contact.link} copied to clipboard!`);
    } else if (contact.clickable) {
      window.open(contact.link, "_blank");
    }
  };

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
            contacts.map((contact, index) => (
              <ContactItem
                key={index}
                pointer={contact.clickable}
                onClick={() => handleContactClick(contact)}
              >
                <ContactName>{contact.name}</ContactName>
              </ContactItem>
            ))}
        </ContactContainer>
      )}
    </Spring>
  );
};

export default Contact;
