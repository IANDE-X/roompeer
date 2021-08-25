import styled from "styled-components";
import SocialButton from "../buttons/SocialButton";

export default function Socials(props) {
  const { facebook, instagram, twitter } = props.data;
  return (
    <Wrapper>
      {facebook === "" ? <></> : <SocialButton href={facebook} title="Facebook" color="blue" />}
      {instagram === "" ? <></> : <SocialButton href={instagram} title="Instagram" color="pink" />}
      {twitter === "" ? <></> : <SocialButton href={twitter} title="Twitter" />}
    </Wrapper>
  );
}

const Wrapper = styled.div``;
