import React, { useState } from "react";
import styled from "styled-components";
import { theme } from "../../model/data";
import FlatsFilter from "./FlatsFliter";
import PeersFilter from "./PeersFilter";

export default function FilterBox() {
  const [nav1, setNav1] = useState(true);
  const [nav2, setNav2] = useState(false);

  return (
    <Wrapper>
      <Nav>
        <NavButton
          onClick={() => {
            setNav1(true);
            setNav2(false);
          }}
          active={nav1}
          className="left"
        >
          Flats
        </NavButton>
        <NavButton
          onClick={() => {
            setNav1(false);
            setNav2(true);
          }}
          active={nav2}
          className="right"
        >
          Peers
        </NavButton>
      </Nav>
      <ContentWrapper>{nav1 ? <FlatsFilter /> : <PeersFilter />}</ContentWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div``;
const Nav = styled.div`
  display: flex;
  & .left {
    border-radius: 10px 0px 0px 0px;
  }
  & .right {
    border-radius: 0px 10px 0px 0px;
  }
`;
const NavButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 50px;
  font-weight: bold;
  cursor: pointer;
  color: ${(props) => (props.active ? theme.light.primaryColor : "white")};
  background-color: white;
  transition: 0.1s cubic-bezier(0.55, 0.055, 0.675, 0.19);

  :hover {
    color: ${theme.light.lightPurple};
  }
  background-color: ${(props) => (props.active ? "white" : theme.light.secondaryColor)};
`;

const ContentWrapper = styled.div`
  padding: 15px;
  border-radius: 0px 10px 10px 10px;
  background-color: white;
`;
