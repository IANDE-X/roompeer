import styled from "styled-components";
import { theme } from "../../model/data";

export default function RoundButton(props) {
  return <ButtonWrapper onClick={props.onClick}>{props.title}</ButtonWrapper>;
}

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 25px;
  cursor: pointer;
  height: 50px;
  padding: 10px;
  min-width: 150px;
  color: white;
  background-color: ${theme.light.primaryColor};
  transition: 1s cubic-bezier(0.075, 0.82, 0.165, 1);
  :hover {
    background-color: ${theme.light.secondaryColor};
  }
`;
