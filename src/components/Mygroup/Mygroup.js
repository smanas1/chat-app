import React from "react";
import "../Style/home-page.css";
import "./mygroup.css";
import Button from "@mui/material/Button";
import { MdGroups } from "react-icons/md";
import { MygroupData } from "./Data";
const Mygroup = () => {
  return (
    <>
      <div className="grouplist home-item">
        <div className="home-header">
          <h4>My Groups</h4>
        </div>
        <div className="scroll my-group-scrool">
          {MygroupData.map((item, i) => {
            return (
              <div key={i} className="home-items-wrapper">
                <div className="home-items-img mygroup-item-img">
                  <MdGroups />
                  <picture>
                    <img className="mygroup-img" src={item.img} alt="" />
                  </picture>
                </div>
                <div className="home-items-title">
                  <h4>{item.name}</h4>
                  <p>this will next</p>
                </div>
                <div className="home-items-btn">
                  <Button variant="contained" size="small">
                    Leave
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Mygroup;
