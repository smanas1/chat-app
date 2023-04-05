import React from "react";
import "./grouplist.css";
import "../Style/home-page.css";
import Button from "@mui/material/Button";
const Grouplist = () => {
  return (
    <>
      <div className="grouplist home-item">
        <div className="home-header">
          <h4>Groups List</h4>
        </div>
        <div className="scroll">
          <div className="home-items-wrapper">
            <div className="home-items-img"> </div>
            <div className="home-items-title">
              <h4>Mernian</h4>
              <p>this will next</p>
            </div>
            <div className="home-items-btn">
              <Button variant="contained" size="small">
                Join
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Grouplist;
