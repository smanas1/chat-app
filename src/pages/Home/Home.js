import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import "./home.css";
import Search from "../../components/Search/Search";
import Grouplist from "../../components/Grouplist/Grouplist";
import FriendRequest from "../../components/FriendRequest/FriendRequest";
import Friends from "../../components/Friends/Friends";
import Mygroup from "../../components/Mygroup/Mygroup";
import Userlist from "../../components/UserList/Userlist";
import Blockuser from "../../components/BlockedUsers/Blockuser";
const Home = () => {
  return (
    <Box sx={{ flexGrow: 1 }} className="home-page">
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Search />
          <Grouplist />
          <FriendRequest />
        </Grid>
        <Grid item xs={4}>
          <Friends />
          <Mygroup />
        </Grid>
        <Grid item xs={4} className="grid-right">
          <Userlist />
          <Blockuser />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
