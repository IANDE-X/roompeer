import styled from "styled-components";
import { getInfo, graphCmsClient } from "../../model/graphcms";
import { RichText } from "@graphcms/rich-text-react-renderer";
import { theme } from "../../model/data";

export default function InfoPage({ data }) {
  const { coverPhoto, title, subtitle, body } = data.info;
  return (
    <Wrapper>
      <ContentWrapper>
        <Title>{title}</Title>
        <SubTitle>{subtitle}</SubTitle>
        <RichText content={body.raw} />
      </ContentWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  justify-content: center;
  align-items: center;
  padding: 20px;
  min-height: 100vh;
`;

const ContentWrapper = styled.div``;

const Title = styled.h1`
  font-size: 30px;
`;
const SubTitle = styled.h3`
  color: ${theme.light.primaryColor};
`;

export const getServerSideProps = async (context) => {
  const query = getInfo(context.locale, context.params.slug);
  let data = await graphCmsClient.request(query);
  return {
    props: { data },
  };
};
