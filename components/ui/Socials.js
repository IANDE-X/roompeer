import styled from "styled-components";
import SocialButton from "../buttons/SocialButton";
import { Instagram, Twitter, Facebook } from "@material-ui/icons";

export default function Socials(props) {
  const { facebook, instagram, twitter } = props.data;
  return (
    <Wrapper>
      {facebook === "" ? <></> : <SocialButton href={facebook} title="Facebook" color="blue" icon={<Facebook />} />}
      {instagram === "" ? <></> : <SocialButton href={instagram} title="Instagram" color="red" icon={<Instagram />} />}
      {twitter === "" ? <></> : <SocialButton href={twitter} title="Twitter" color="lightblue" icon={<Twitter />} />}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
`;
