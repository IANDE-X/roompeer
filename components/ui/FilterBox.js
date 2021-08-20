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
      <ContentWrapper>
        {nav1 ? <FlatsFilter /> : <PeersFilter />}
      </ContentWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div``;
const Nav = styled.div`
  display: flex;
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
  border-radius: 5px 5px 0px 0px;
  :hover {
    color: ${theme.light.lightPurple};
  }
  background-color: ${(props) =>
    props.active ? "white" : theme.light.secondaryColor};
`;

const ContentWrapper = styled.div`
  padding: 25px;
  border-radius: 0px 15px 15px 15px;
  background-color: white;
  box-shadow: 0px 100px 80px rgba(0, 0, 0, 0.07),
    0px 41.7776px 33.4221px rgba(0, 0, 0, 0.0503198),
    0px 22.3363px 17.869px rgba(0, 0, 0, 0.0417275),
    0px 12.5216px 10.0172px rgba(0, 0, 0, 0.035),
    0px 6.6501px 5.32008px rgba(0, 0, 0, 0.0282725),
    0px 2.76726px 2.21381px rgba(0, 0, 0, 0.0196802);
`;
