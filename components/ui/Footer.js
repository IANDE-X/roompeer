import styled from "styled-components";
import Link from "next/link";
import { Instagram, Twitter, Facebook, MailOutlineRounded, PhoneRounded, WhatsApp, LinkedIn } from "@material-ui/icons";
import SocialButton from "../buttons/SocialButton";
import useTranslation from "next-translate/useTranslation";

export default function Footer() {
  let { t } = useTranslation();
  return (
    <Wrapper>
      <ContentWrapper>
        <Section>
          <Heading>{t("common:useful_info")}</Heading>
          <LinksWrapper>
            <Link href="/info">
              <a>{t("common:setup_internet")}</a>
            </Link>
            <Link href="/info">
              <a>{t("common:before_moving")}</a>
            </Link>
            <Link href="/info">
              <a>{t("common:after_moving")}</a>
            </Link>
            <Link href="/info">
              <a>{t("common:immigration_office")}</a>
            </Link>
          </LinksWrapper>
        </Section>
        <Section>
          <Heading>{t("common:content")}</Heading>
          <LinksWrapper>
            <Link href="flats/search?city=&type=&rooms=&price_low=&price_high=&page=1">
              <a>{t("common:search_rooms")}</a>
            </Link>
            <Link href="/peers/search?country=&age=&gender=&religion=&budget_high=">
              <a>{t("common:search_peers")}</a>
            </Link>
            <Link href="/about">
              <a>{t("common:about_us")}</a>
            </Link>
          </LinksWrapper>
        </Section>
        <Section>
          <Heading>{t("common:members_area")}</Heading>
          <LinksWrapper>
            <Link href="/signup">
              <a>{t("common:sign_up")}</a>
            </Link>
            <Link href="/login">
              <a>{t("common:sign_in")}</a>
            </Link>
          </LinksWrapper>
        </Section>
        <Section>
          <Heading>{t("common:contacts")}</Heading>
          <ContactsWrapper>
            <SocialButton href="" title="Facebook" color="#1877f2" icon={<Facebook />} />
            <SocialButton href="https://www.instagram.com/roompeer/" title="Instagram" color="#c32aa3" icon={<Instagram />} />
            <SocialButton href="" title="Twitter" color="#1da1f2" icon={<Twitter />} />
            <SocialButton href="https://wa.me/06204339457" title="WhatsApp" color="#25d366" icon={<WhatsApp />} />
            <SocialButton href="https://www.linkedin.com/company/roompeer/" title="LinkedIn" color="#0a66c2" icon={<LinkedIn />} />
            <SocialButton href="mailto:roompeerproject@gmail.com" title="Email" color="#a6b1b7" icon={<MailOutlineRounded />} />
            <SocialButton href="tel:06204339457" title="Phone" color="red" icon={<PhoneRounded />} />
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
  gap: 10px;
  flex-wrap: wrap;
`;

const Heading = styled.h3``;

const Copyright = styled.div`
  margin: 20px 0px 5px 0px;
  font-size: 10px;
`;
