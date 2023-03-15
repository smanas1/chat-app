import React from "react";
import "./friends.css";
import Button from "@mui/material/Button";

const Friends = () => {
  let list = (
    <div className="home-items-wrapper">
      <div className="home-items-img friend-img friend-req-color"> </div>
      <div className="home-items-title friend-req-title friend-title">
        <h4>Anas</h4>
        <p>this will next</p>
      </div>
      <div className="home-items-btn friend-req-btn friend-btn">
        <Button variant="contained" size="small">
          Unfriend
        </Button>
        <Button
          className="friend-req-btn-2 friend-btn-2"
          variant="contained"
          size="small"
        >
          Block
        </Button>
      </div>
    </div>
  );
  return (
    <>
      <div className="grouplist home-item friend-req-mt friend-item">
        <div className="home-header">
          <h4>Friends</h4>
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

export default Friends;
