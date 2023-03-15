import React from "react";
import "./friendrequest.css";
import Button from "@mui/material/Button";
import "../Style/home-page.css";

const FriendRequest = () => {
  let list = (
    <div className="home-items-wrapper">
      <div className="home-items-img friend-req-color"> </div>
      <div className="home-items-title friend-req-title">
        <h4>Anas</h4>
        <p>this will next</p>
      </div>
      <div className="home-items-btn friend-req-btn">
        <Button variant="contained" size="small">
          Accept
        </Button>
        <Button className="friend-req-btn-2 " variant="contained" size="small">
          Reject
        </Button>
      </div>
    </div>
  );
  return (
    <>
      <div className="grouplist home-item friend-req-mt">
        <div className="home-header">
          <h4>Friend Request</h4>
        </div>
        <div className="scroll friend-req-scroll">
          {list}
          {list}
          {list}
          {list}
          {list}
          {list}
          {list}
          {list}
          {list}
          {list}
        </div>
      </div>
    </>
  );
};

export default FriendRequest;
