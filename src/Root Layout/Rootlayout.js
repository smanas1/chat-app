import React from "react";
import Grid from "@mui/material/Grid";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";

const Rootlayout = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={1}>
          <Sidebar />
        </Grid>
        <Grid item xs={4}>
          <Outlet />
        </Grid>
      </Grid>
    </>
  );
};

export default Rootlayout;
