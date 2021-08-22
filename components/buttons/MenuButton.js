import React from "react";
import Link from "next/dist/client/link";
import styled from "styled-components";
import { theme } from "../../model/data";

export default function MenuButton(props) {
  return (
    <Link href={props.link || "/"}>
      <MenuItem title={props.title}>{props.title}</MenuItem>
    </Link>
  );
}

const MenuItem = styled.div`
  color: black;
  padding: 10px;
  cursor: pointer;
  border-radius: 10px;
  transition: 0.5s ease-out;
  font-size: 15px;
  font-weight: bold;
  :hover {
    color: ${theme.light.primaryColor};
    background: rgba(255, 255, 255, 0.1);
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1), inset 0px 0px 0px 0.5px rgba(255, 255, 255, 0.2);
  }
`;
