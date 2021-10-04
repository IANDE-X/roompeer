import styled from "styled-components";
import useTranslation from "next-translate/useTranslation";
import InfoCard from "../../components/ui/InfoCard";
import { getAllInfos, graphCmsClient } from "../../model/graphcms";

export default function Info({ data }) {
  let { t } = useTranslation();
  return (
    <Wrapper>
      <h1>{t("common:useful_info")}</h1>
      <ContentWrapper>
        {data.infos.map((item, idx) => (
          <InfoCard key={idx} info={item} />
        ))}
      </ContentWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 15px;
  background-color: #f0f0f0;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: space-evenly;
`;

export const getServerSideProps = async (context) => {
  const query = getAllInfos(context.locale);
  let data = await graphCmsClient.request(query);
  return {
    props: { data },
  };
};
