import styled from "styled-components";
import { theme } from "../../model/data";

export default function AboutUsSection() {
  return (
    <Wrapper>
      <h1>About Us</h1>
      <ContentWrapper>
        <Text>
          Roompeer is an online matchmaker platform for searching for flats and flatmates. We provide a feed of rooms and peers to scroll through so that they can easily pick up your choice accordingly. We know all the ups and downs the student
          encounters when studying abroad. And we have done a lot of research to ease the difficulty and we came up with the best option for the students. We list all the benefits of each accommodation and the prices, as well as the facilities they
          have to offer. This means you can find a flat mate or Accommodation with ease and compare them on our site, no matter what criteria is most important to you.
        </Text>
        <Heading>Our Mission</Heading>
        <Text>
          The Roompeer mission is to provide the best platform for finding a flatmate and accommodation to the people by creating trust with our customers. We exist to attract and maintain customers. When we adhere to this maxim, everything else will
          fall into place. Our services will exceed the expectations of our customers. To innovate in the real estate market by building trust and providing the best experience when it comes to finding a flat and flatmate. When we adhere to this
          maxim, everything else will fall into place. Our services will meet the expectations of our customers.
        </Text>
        <Heading>Our Vision</Heading>
        <Text>
          · To make Roompeer an icon brand.
          <br /> · To develop an effective, well placed Website and Application that would ease the life of people in regards to finding flatmates and Accommodations.
          <br /> · To launch a laser-focused marketing campaign in a controllable and measurable market that will drive customer's toward the company's website.
          <br /> · To create an infrastructure for the fulfilment of Web-based Rent Services.
        </Text>
        <Heading>Our Values</Heading>
        <Text>
          We exist to satisfy the customers' needs.
          <br /> We value diversity. <br />
          We build trust. <br />
          We are innovative.
        </Text>
      </ContentWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: #f0f0f0;
  padding: 20px;
`;

const ContentWrapper = styled.div``;

const Heading = styled.h3`
  color: ${theme.light.primaryColor};
`;
const Text = styled.p``;
