import React from "react";
import styled from "styled-components";
import Image from "next/image";
import { CircularProgress } from "@material-ui/core";

export default function LoadingPage() {
  return (
    <Wrapper>
      <Image src="/branding/logo.JPG" width={100} height={100} />
      <CircularProgress color="primary" />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 20px;
  height: 100vh;
  background-color: white;
`;
