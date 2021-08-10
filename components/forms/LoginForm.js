import React from "react";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

export default function LoginForm() {
  const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        margin: theme.spacing(1),
        width: "25ch",
      },
    },
  }));

  const classes = useStyles();
  return (
    <Wrapper>
      <form noValidate autoComplete="off">
        <FormWrapper>
          <H1>Log In</H1>
          <TextField id="outlined-basic" label="Email" variant="outlined" />
          <TextField id="outlined-basic" label="Password" variant="outlined" />
        </FormWrapper>
      </form>
    </Wrapper>
  );
}

const Wrapper = styled.div``;

const FormWrapper = styled.div`
  display: grid;
  grid-template-rows: auto auto auto;
  gap: 20px;
  align-items: center;
  justify-content: center;
`;

const H1 = styled.h1`
  color: black;
  font-size: 25px;
`;
