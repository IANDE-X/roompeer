import React from "react";
import styled from "styled-components";
import { getFlatDataQuery, graphCmsClient } from "../../model/graphcms";
import PhotoGallery from "../../components/ui/Gallery";
import FlatContacts from "../../components/ui/FlatContacts";
import { useAuth } from "../../context/Auth";
import { Divider } from "@material-ui/core";
import BoolIndicator from "../../components/ui/BoolIndicator";
import { theme } from "../../model/data";
import useTranslation from "next-translate/useTranslation";

export default function FlatDetail({ data }) {
  const { address, availableFrom, description, listingType, rooms, location, price, pictures, title, referenceNumber, airConditioner, balcony, commuityFee, pets, shutter, garage, elevetor, plasticDoorsAndWindows } = data.flat;
  const { userData } = useAuth();
  let { t } = useTranslation();
  return (
    <Wrapper>
      <ContentWrapper>
        <GalleryWrapper>
          <PhotoGallery images={pictures} />
        </GalleryWrapper>
        <DetailsWrapper>
          <h1>{title}</h1>
          <Divider />
          <H2>{t("common:details")}</H2>
          <Row>
            <H3>{t("common:price")}</H3>
            <h3>
              {price} {t("common:huf-per-month")}
            </h3>
          </Row>
          <Row>
            <H3>{t("common:location")}</H3>
            <h4>{location}</h4>
          </Row>
          <Row>
            <H3>{t("common:address")}</H3>
            <h4>{address}</h4>
          </Row>
          <Row>
            <H3>{t("common:desc")}</H3>
            <h4>{description}</h4>
          </Row>
          <Row>
            <H3>{t("common:for")}</H3>
            <h4>{listingType}</h4>
          </Row>
          <Row>
            <H3>{t("common:available_from")}</H3>
            <h4>{availableFrom}</h4>
          </Row>
          <Row>
            <H3>{t("common:rooms")}</H3>
            <h4>{rooms}</h4>
          </Row>
          <Divider />
          <H2>{t("common:property_features")}</H2>
          <FeaturesWrapper>
            <BoolIndicator title="Air Conditioner" bool={airConditioner} />
            <BoolIndicator title="Pets" bool={pets} />
            <BoolIndicator title="Balcony" bool={balcony} />
            <BoolIndicator title="Community Fee" bool={commuityFee} />
            <BoolIndicator title="Shutter" bool={shutter} />
            <BoolIndicator title="Garage" bool={garage} />
            <BoolIndicator title="Elevator" bool={elevetor} />
            <BoolIndicator title="Plastic Doors and Windows" bool={plasticDoorsAndWindows} />
          </FeaturesWrapper>
          <Divider />
          <H2>{t("common:contact_us")}</H2>
          <FlatContacts data={userData} refNumber={referenceNumber} />
        </DetailsWrapper>
      </ContentWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 20px;
`;

const ContentWrapper = styled.div``;

const GalleryWrapper = styled.div`
  position: relative;
`;
const DetailsWrapper = styled.div`
  padding: 15px;
  border-radius: 15px;
  min-height: 80vh;
  background-color: white;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 100px auto;
  @media (max-width: 800px) {
    grid-template-columns: auto;
  }
`;

const FeaturesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  padding: 10px;
`;

const H2 = styled.h2`
  color: ${theme.light.primaryColor};
`;

const H3 = styled.h3`
  color: gray;
`;

export const getServerSideProps = async (context) => {
  let refNumber = context.params.id;
  const query = getFlatDataQuery(refNumber, context.locale);
  let data = await graphCmsClient.request(query);
  return {
    props: { data },
  };
};
