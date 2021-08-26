import styled from "styled-components";

export default function SocialButton(props) {
  return (
    <Wrapper>
      <SocialLink href={props.href} target="_blank" color={props.color}>
        {props.icon}
      </SocialLink>
    </Wrapper>
  );
}

const Wrapper = styled.div``;

const SocialLink = styled.a`
  border-radius: 50%;
  width: 44px;
  height: 44px;
  display: grid;
  justify-content: center;
  align-content: center;
  transition: 0.3s ease-in-out;
  color: black;
  border: thin solid white;
  :hover {
    transform: scale(1.2);
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;
    transform: translateY(-3px);
    border: thin solid black;
    color: ${(props) => props.color};
  }
`;
