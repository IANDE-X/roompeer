import React from "react";
import styled from "styled-components";
import GalleryPro from "../../components/ui/GalleryPro";
import { getFlatDataQuery, graphCmsClient } from "../../model/graphcms";
import PhotoGallery from "../../components/ui/Gallery";
import ContactButton from "../../components/buttons/ContactButton";
import { useAuth } from "../../context/Auth";

export default function FlatDetail({ data }) {
  const { address, availableFrom, description, listingType, rooms, location, price, pictures, title, referenceNumber } = data.flat;
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
          <h2>{price}</h2>
          <h4>{location}</h4>
          <h4>{address}</h4>
          <h4>{description}</h4>
          <h4>for {listingType}</h4>
          <h4>{availableFrom}</h4>
          <h4>Rooms: {rooms}</h4>
          <ContactButton data={userData} refNumber={referenceNumber} />
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
  grid-template-columns: 800px auto;
  align-items: flex-start;
  min-height: 80vh;

  @media (max-width: 800px) {
    grid-template-columns: auto;
  }
`;

const GalleryWrapper = styled.div`
  max-width: 800px;
  padding: 0px 15px 0px 0px;
`;
const DetailsWrapper = styled.div`
  padding: 15px;
  border-radius: 15px;
  background-color: white;
`;

export const getServerSideProps = async (context) => {
  let refNumber = context.params.id;
  const query = getFlatDataQuery(refNumber, context.locale);
  let data = await graphCmsClient.request(query);
  return {
    props: { data },
  };
};
