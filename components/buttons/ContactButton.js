import { MailOutlineRounded } from "@material-ui/icons";
import styled from "styled-components";

export default function ContactButton(props) {
  const user = props.data;
  const refNumber = props.refNumber;
  return (
    <Wrapper>
      {props.data === null ? (
        <ContentWrapper
          href={`mailto:support@roompeer.com?subject=Flat Enquiry,Reference Number:#${refNumber}&body=Hello, %0D%0A%0D%0AI would like to know if this property with reference number #${refNumber} is still available ?
        %0D%0A// you can add more details here%0D%0A%0D%0A`}
        >
          <MailOutlineRounded />
        </ContentWrapper>
      ) : (
        <ContentWrapper
          href={`mailto:support@roompeer.com?subject=Flat Enquiry,Reference Number:#${refNumber}&body=Hello%0D%0A%0D%0AMy name is ${user.firstname} ${user.lastname},I would like to know if this property with reference number #${refNumber} is still available ?
        %0D%0A// you can add more details here%0D%0A%0D%0AMy Info%0D%0A email: ${user.email}
        %0D%0A phone: ${user.phone_number} %0D%0A$prefered area: ${user.prefered_area}%0D%0A$price minimum: ${user.budget_low}
        %0D%0A$price maximum: ${user.budget_high}%0D%0A$prefered contract lenght: ${user.prefered_contract_lenght}`}
        >
          <MailOutlineRounded />
        </ContentWrapper>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: #536dfe;
  border-radius: 8px;
  border-style: none;
  box-sizing: border-box;
  color: #ffffff;
  cursor: pointer;
  display: inline-block;
  font-family: "Haas Grot Text R Web", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 14px;
  font-weight: 500;
  height: 40px;
  width: 100%;
  line-height: 20px;
  list-style: none;
  margin: 0;
  outline: none;
  padding: 10px 16px;
  position: relative;
  text-align: center;
  text-decoration: none;
  transition: 0.2s ease-out;
  vertical-align: baseline;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;

  :hover,
  :focus {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
  }
`;

const ContentWrapper = styled.a`
  display: flex;
  gap: 5px;
  justify-content: center;
  align-items: center;
`;
