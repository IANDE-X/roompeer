import { MailOutlineRounded, PhoneRounded } from "@material-ui/icons";
import styled from "styled-components";
import { theme } from "../../model/data";

export default function FlatContacts(props) {
  const user = props.data;
  const refNumber = props.refNumber;
  return (
    <Wrapper>
      <ContactsWrapper>
        <ContactButton>
          {props.data === null ? (
            <Contact
              href={`mailto:support@roompeer.com?subject=Flat Enquiry,Reference Number:#${refNumber}&body=Hello, %0D%0A%0D%0AI would like to know if this property with reference number #${refNumber} is still available ?
        %0D%0A// you can add more details here%0D%0A%0D%0A`}
            >
              <MailOutlineRounded />
              Email
            </Contact>
          ) : (
            <Contact
              href={`mailto:support@roompeer.com?subject=Flat Enquiry,Reference Number:#${refNumber}&body=Hello%0D%0A%0D%0AMy name is ${user.firstname} ${user.lastname},I would like to know if this property with reference number #${refNumber} is still available ?
        %0D%0A// you can add more details here%0D%0A%0D%0AMy Info%0D%0A email: ${user.email}
        %0D%0A phone: ${user.phone_number} %0D%0A$prefered area: ${user.prefered_area}%0D%0A$price minimum: ${user.budget_low}
        %0D%0A$price maximum: ${user.budget_high}%0D%0A$prefered contract lenght: ${user.prefered_contract_lenght}`}
            >
              <MailOutlineRounded />
              Email
            </Contact>
          )}
        </ContactButton>
        <ContactButton>
          <Contact href="tel:+36303519547">
            <PhoneRounded />
            Mobile
          </Contact>
        </ContactButton>
      </ContactsWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div``;

const ContactsWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const ContactButton = styled.div`
  background-color: black;
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
  min-width: 200px;
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
    opacity: 70%;
  }
`;

const Contact = styled.a`
  display: flex;
  gap: 5px;
  font-weight: bold;
  justify-content: center;
  align-items: center;
`;
