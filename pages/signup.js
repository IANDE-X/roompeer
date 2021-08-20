import React from "react";
import styled from "styled-components";
import SingUpForm from "../components/forms/SignUpForm";

export default function SignUp() {
  return (
    <Wrapper>
      <SingUpForm />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
