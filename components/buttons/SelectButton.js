import { TextField, MenuItem } from "@material-ui/core";
import styled from "styled-components";

export default function (props) {
  return (
    <Wrapper width={props.width}>
      <TextField label={props.label} variant="outlined" {...props.input} select disabled={props.disabled} fullWidth placeholder={props.placeholder}>
        {props.array.map((option, idx) => (
          <MenuItem key={idx} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: ${(props) => (props.width ? props.width : "230px")};
`;
