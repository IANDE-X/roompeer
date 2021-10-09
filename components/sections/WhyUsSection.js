import styled from "styled-components";
import WhyUsCard from "../ui/WhyUsCard";
import useTranslation from "next-translate/useTranslation";

export default function WhyUsSection() {
  let { t } = useTranslation();
  return (
    <Wrapper>
      <Heading>
        <h1>{t("index:why-us")}</h1>
      </Heading>
      <ContentWrapper>
        <WhyUsCard image="/illustrations/find_peers.svg" title={t("index:why-us-1.title")} subtitle={t("index:why-us-1.subtitle")} />
        <WhyUsCard image="/illustrations/detailed_listing.svg" title={t("index:why-us-2.title")} subtitle={t("index:why-us-2.subtitle")} />
        <WhyUsCard image="/illustrations/find_useful_info.svg" title={t("index:why-us-3.title")} subtitle={t("index:why-us-3.subtitle")} />
      </ContentWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: #f0f0f0;
  padding: 20px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  justify-content: space-evenly;
`;

const Heading = styled.div`
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
