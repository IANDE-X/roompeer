import React from "react";
import styled, { keyframes } from "styled-components";
import SignUpForm from "../components/forms/SignUpForm";
import { theme } from "../model/data";
import Image from "next/dist/client/image";

export default function SignUp() {
  return (
    <Wrapper>
      <ContentWrapper>
        <Image src="/illustrations/sign-up.svg" width={250} height={250} />
        <H1>Join Our Network of Peers.</H1>
      </ContentWrapper>
      <SignUpForm />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  @media only screen and (max-width: 800px) {
    grid-template-columns: auto;
  }
  background-color: white;
`;

const animation = keyframes`
  from { opacity: 0; transform: translateY(-10px); filter: blur(10px); }
  to { opacity: 1; transform: translateY(0px); filter: blur(0px); }
`;

const ContentWrapper = styled.div`
  > * {
    :nth-child(1) {
      animation: ${animation} 1s 0s forwards;
    }
    :nth-child(2) {
      animation: ${animation} 1s 0.2s forwards;
    }
    :nth-child(3) {
      animation: ${animation} 1s 0.3s forwards;
    }
    :nth-child(4) {
      animation: ${animation} 1s 0.4s forwards;
    }
    :nth-child(5) {
      animation: ${animation} 1s 0.5s forwards;
    }
  }
  display: grid;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const H1 = styled.h1`
  font-size: 45px;
  color: ${theme.light.primaryColor};
  @media only screen and (max-width: 800px) {
    font-size: 30px;
  }
`;
