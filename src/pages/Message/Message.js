import React from "react";
import "./message.css";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import MsgGrp from "../../components/MsgGrp/MsgGrp";
import MsgFrnd from "../../components/MsgFrnd/MsgFrnd";

const Message = () => {
  return (
    <Box className="msg-content-wrapper">
      <Grid container spacing={5} className="">
        <Grid item xs={4}>
          <MsgGrp />
          <MsgFrnd />
        </Grid>
        <Grid item xs={7} className="msg-grp-wrapper"></Grid>
      </Grid>
    </Box>
  );
};

export default Message;
