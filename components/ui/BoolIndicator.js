import styled from "styled-components";
import { CheckCircleRounded, RemoveCircleRounded } from "@material-ui/icons";

export default function BoolIndicator(props) {
  return (
    <Wrapper>
      <p>{props.title}:</p>
      <ContentWrapper>
        {props.bool ? (
          <IndicatorWrapper bool={props.bool}>
            <CheckCircleRounded style={{ width: 15, height: 15 }} />
            <p>Yes</p>
          </IndicatorWrapper>
        ) : (
          <IndicatorWrapper bool={props.bool}>
            <RemoveCircleRounded style={{ width: 15, height: 15 }} />
            <p>No</p>
          </IndicatorWrapper>
        )}
      </ContentWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  height: 35px;
`;

const ContentWrapper = styled.div`
  display: flex;
  height: 35px;
  align-items: center;
  color: white;
`;

const IndicatorWrapper = styled.div`
  display: flex;
  align-items: center;
  color: ${(props) => (props.bool ? "green" : "red")};
  font-size: 10px;
  gap: 2px;
`;
