import React from "react";
import styled from "styled-components";
import GalleryPro from "../../components/ui/GalleryPro";
import { getFlatDataQuery, graphCmsClient } from "../../model/graphcms";
import PhotoGallery from "../../components/ui/Gallery";
import FlatContacts from "../../components/ui/FlatContacts";
import { useAuth } from "../../context/Auth";
import { Divider } from "@material-ui/core";
import BoolIndicator from "../../components/ui/BoolIndicator";
import { theme } from "../../model/data";

export default function FlatDetail({ data }) {
  const { address, availableFrom, description, listingType, rooms, location, price, pictures, title, referenceNumber, airConditioner, balcony, commuityFee, pets, shutter, garage, elevetor, plasticDoorsAndWindows } = data.flat;
  const { userData } = useAuth();
  return (
    <Wrapper>
      <ContentWrapper>
        <GalleryWrapper>
          {/* <GalleryPro images={pictures} /> */}
          <PhotoGallery images={pictures} />
        </GalleryWrapper>
        <DetailsWrapper>
          <h1>{title}</h1>
          <Divider />
          <H2>Details</H2>
          <Row>
            <H3>Price</H3>
            <h3>{price} HUF/Month</h3>
          </Row>
          <Row>
            <H3>Location</H3>
            <h4>{location}</h4>
          </Row>
          <Row>
            <H3>Address</H3>
            <h4>{address}</h4>
          </Row>
          <Row>
            <H3>Description</H3>
            <h4>{description}</h4>
          </Row>
          <Row>
            <H3>For</H3>
            <h4>{listingType}</h4>
          </Row>
          <Row>
            <H3>Available From</H3>
            <h4>{availableFrom}</h4>
          </Row>
          <Row>
            <H3>Rooms</H3>
            <h4>{rooms}</h4>
          </Row>
          <Divider />
          <H2>Property Features</H2>
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
          <H2>Contact Us</H2>
          <FlatContacts data={userData} refNumber={referenceNumber} />
        </DetailsWrapper>
      </ContentWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 20px;
`;

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 600px auto;
  gap: 20px;
  padding: 15px;
  @media (max-width: 1100px) {
    grid-template-columns: auto;
    justify-content: center;
    gap: 15px;
  }
`;

const GalleryWrapper = styled.div`
  max-width: 800px;
  @media (max-width: 1100px) {
    max-width: 100%;
  }
  max-height: 1000px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 7px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background-color: gray;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    padding: 15px;
  }
`;
const DetailsWrapper = styled.div`
  padding: 15px;
  border-radius: 15px;
  min-height: 80vh;
  background-color: white;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 200px auto;
  justify-items: save;
  gap: 10px;

  @media (max-width: 800px) {
    grid-template-columns: auto;
    gap: 0px;
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
