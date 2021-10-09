import styled from "styled-components";
import Image from "next/image";
import useTranslation from "next-translate/useTranslation";

export default function PartnerSection() {
  let { t } = useTranslation();
  return (
    <Wrapper>
      <Heading>
        <h1>{t("index:partners")}</h1>
      </Heading>
      <ContentWrapper>
        <Partner>
          <Image src="/partners/Vodafone.png" width={50} height={50} />
          <P>Vodafone</P>
        </Partner>
        <Partner>
          <Image src="/partners/upc.png" width={50} height={50} />
          <P>UPC</P>
        </Partner>
        <Partner>
          <Image src="/partners/easy_tramitt.jpg" width={50} height={50} />
          <P>Easy Tramitt</P>
        </Partner>
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
  gap: 20px;
  justify-content: space-evenly;
`;

const Heading = styled.div`
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Partner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const P = styled.p`
  font-size: large;
  font-weight: bold;
`;
