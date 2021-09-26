import styled from "styled-components";
import Image from "next/dist/client/image";

export default function Empty() {
  return (
    <Wrapper>
      <Image src="/illustrations/no_result.svg" width={200} height={200} />
      <h1>No Results !</h1>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;
