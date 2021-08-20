import styled from "styled-components";
import { theme } from "../../model/data";

export default function PrimaryButton(props) {
  return (
    <Wrapper onClick={props.onClick} type={props.type} disabled={props.disabled} width={props.width}>
      {props.title}
    </Wrapper>
  );
}

const Wrapper = styled.button`
  background-color: ${theme.light.primaryColor};
  border-radius: 8px;
  border-style: none;
  box-sizing: border-box;
  color: #ffffff;
  cursor: pointer;
  display: inline-block;
  font-family: "Haas Grot Text R Web", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 14px;
  font-weight: 500;
  height: 40px;
  width: ${(props) => (props.width ? props.width : "100%")};
  line-height: 20px;
  list-style: none;
  margin: 0;
  outline: none;
  padding: 10px 16px;
  position: relative;
  text-align: center;
  text-decoration: none;
  transition: 0.2s ease-out;
  vertical-align: baseline;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  :disabled {
    background-color: ${theme.light.lightPurple};
  }
  :hover,
  :focus {
    background-color: ${theme.light.secondaryColor};
  }
`;
