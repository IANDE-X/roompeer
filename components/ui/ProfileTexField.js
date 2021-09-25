import React from "react";
import { TextField } from "@material-ui/core";

export default function ProfileTextField(props) {
  return <TextField variant="outlined" label={props.label} {...props.input} disabled={props.disabled} select={props.select} type={props.type} multiline={props.multiline} fullWidth={props.fullWidth} placeholder={props.placeholder}></TextField>;
}
