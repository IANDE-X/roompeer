import styled from "styled-components";
import { Skeleton } from "@material-ui/lab";

export default function PeerSkeleton() {
  return (
    <Wrapper>
      <SkeletonWrapper>
        <Skeleton height={150} width={150} variant="circle" />
        <Skeleton height={50} />
        <Skeleton animation="wave" height={20} />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
      </SkeletonWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div``;

const SkeletonWrapper = styled.div`
  padding: 20px;
  min-width: 250px;
  min-height: 320px;
  border-radius: 10px;
  background-color: white;
  border: thin solid white;
`;
