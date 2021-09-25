import { TextField, MenuItem } from "@material-ui/core";

export default function SelectButton(props) {
  return (
    <TextField label={props.label} variant="outlined" select disabled={props.disabled} placeholder={props.placeholder} fullWidth {...props.input}>
      <MenuItem value={""}>{"None"}</MenuItem>
      {props.array.map((option, idx) => (
        <MenuItem key={idx} value={option}>
          {option}
        </MenuItem>
      ))}
    </TextField>
  );
}
