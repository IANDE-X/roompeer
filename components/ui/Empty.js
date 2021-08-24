import styled from "styled-components";

export default function Empty() {
  return (
    <Wrapper>
      <h1>Nothing Found !</h1>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;
