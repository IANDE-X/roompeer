import styled from "styled-components";
import Link from "next/link";
import { Instagram, Twitter, Facebook, MailOutlineRounded, PhoneRounded, WhatsApp } from "@material-ui/icons";
import SocialButton from "../buttons/SocialButton";

export default function Footer() {
  return (
    <Wrapper>
      <ContentWrapper>
        <Section>
          <Heading>Useful Infomation</Heading>
          <LinksWrapper>
            <Link href="/info">
              <a>Set up Internet</a>
            </Link>
            <Link href="/info">
              <a>Before Moving in</a>
            </Link>
            <Link href="/info">
              <a>After Moving In</a>
            </Link>
            <Link href="/info">
              <a>Immigration Office</a>
            </Link>
          </LinksWrapper>
        </Section>
        <Section>
          <Heading>Content</Heading>
          <LinksWrapper>
            <Link href="flats/search?city=&type=&rooms=&price_low=&price_high=">
              <a>Search Flats</a>
            </Link>
            <Link href="/peers/search?country=&age=&gender=&religion=&budget_high=">
              <a>Search Peers</a>
            </Link>
            <Link href="/about">
              <a>About Us</a>
            </Link>
          </LinksWrapper>
        </Section>
        <Section>
          <Heading>Members Area</Heading>
          <LinksWrapper>
            <Link href="/signup">
              <a>Sign Up/Register</a>
            </Link>
            <Link href="/login">
              <a>Sign In/Login</a>
            </Link>
          </LinksWrapper>
        </Section>
        <Section>
          <Heading>Contacts</Heading>
          <ContactsWrapper>
            <SocialButton href="" title="Facebook" color="#1877f2" icon={<Facebook />} />
            <SocialButton href="https://www.instagram.com/roompeer/" title="Instagram" color="#c32aa3" icon={<Instagram />} />
            <SocialButton href="" title="Twitter" color="#1da1f2" icon={<Twitter />} />
            <SocialButton href="https://wa.me/" title="WhatsApp" color=" #25d366" icon={<WhatsApp />} />
            <SocialButton href="mailto:" title="Email" color="#a6b1b7" icon={<MailOutlineRounded />} />
            <SocialButton href="tel:" title="Phone" color="red" icon={<PhoneRounded />} />
          </ContactsWrapper>
        </Section>
      </ContentWrapper>
      <Copyright> &copy; Copyright Roompeer 2021</Copyright>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: #cfd8dc;
  padding: 20px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: space-around;
  align-items: flex-start;
`;

const Section = styled.div`
  display: grid;
  gap: 0px;
`;

const LinksWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContactsWrapper = styled.div`
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
`;

const Heading = styled.h3``;

const Copyright = styled.div`
  margin: 20px 0px 5px 0px;
  font-size: 10px;
`;
