import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

export default function InfoCard(props) {
  const { coverPhoto, title, subtitle, slug } = props.info;
  return (
    <Link href={`/info/${slug}`}>
      <Wrapper>
        <Thumbnail src={coverPhoto.url} width={coverPhoto.width} height={coverPhoto.height} />
        <ContentWrapper>
          <Title>{title}</Title>
          <SubTitle>{subtitle}</SubTitle>
        </ContentWrapper>
      </Wrapper>
    </Link>
  );
}

const Wrapper = styled.div`
  background-color: white;
  width: 300px;
  border: thin solid white;
  border-radius: 15px;
  cursor: pointer;
  transition: 0.3s ease-in-out;
  :hover {
    border: thin solid black;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  }
`;
const ContentWrapper = styled.div`
  padding: 20px;
`;

const Thumbnail = styled(Image)`
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
`;

const Title = styled.h2``;

const SubTitle = styled.p`
  color: gray;
  font-size: 10px;
`;
