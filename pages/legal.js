import styled from "styled-components";

export default function EULA() {
  return (
    <Wrapper>
      <EulaWrapper id="eula">
        <p>End User Licence Agreement</p>
      </EulaWrapper>
      <PolicyWrapper id="policy">
        <p>Privacy Policy</p>
      </PolicyWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div``;
const EulaWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const PolicyWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
