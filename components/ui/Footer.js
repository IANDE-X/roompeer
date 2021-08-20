import styled from "styled-components";
import { theme } from "../../model/data";

export default function Footer() {
  return <Wrapper>Copyright Roompeer 2021</Wrapper>;
}

const Wrapper = styled.div`
  background-color: ${theme.light.lightPurple};
  padding: 20px;
`;
