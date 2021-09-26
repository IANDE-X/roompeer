import styled from "styled-components";
import Image from "next/dist/client/image";

export default function NotFound() {
  return (
    <Wrapper>
      <Image src="/illustrations/404.svg" width={200} height={200} />
      <h1>Ooops, Can't find this page!</h1>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
