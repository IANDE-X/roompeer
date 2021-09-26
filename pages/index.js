import Head from "next/head";
import useTranslation from "next-translate/useTranslation";
import styled from "styled-components";
import LoadingPage from "../components/ui/LoadingPage";
import { firebaseInstance } from "../model/firebase-config";
import HeroSection from "../components/sections/HeroSection";
import FlatsSection from "../components/sections/FlatsSection";
import PeersSection from "../components/sections/PeersSection";
import WhyUsSection from "../components/sections/WhyUsSection";
import PartnerSection from "../components/sections/PartnersSection";
import { getLatestFlatsQuery, graphCmsClient } from "../model/graphcms";

export default function HomePage({ latestFlats }) {
  let { t } = useTranslation();

  return (
    <Wrapper>
      <Head>
        <title>Roompeer</title>
        <meta name="description" content="Find Roomates and Flats Online" />
        <link rel="icon" href="/branding/favicon.ico" />
      </Head>
      {firebaseInstance ? (
        <Wrapper>
          <HeroSection />
          <FlatsSection data={latestFlats} />
          <PeersSection />
          <WhyUsSection />
          <PartnerSection />
        </Wrapper>
      ) : (
        <LoadingPage />
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div``;

export const getServerSideProps = async (context) => {
  let query = getLatestFlatsQuery(context.locale);
  let latestFlats = await graphCmsClient.request(query);
  return {
    props: { latestFlats },
  };
};
