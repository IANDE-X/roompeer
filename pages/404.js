import styled from "styled-components";

export default function NotFound() {
  return (
    <Wrapper>
      <h1>Ooops, Can't find this page!</h1>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
