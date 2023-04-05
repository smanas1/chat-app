import React, { useState } from "react";
import "../Style/home-page.css";
import "./mygroup.css";
import Button from "@mui/material/Button";
import { MdGroups } from "react-icons/md";
import { MygroupData } from "./Data";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import TextField from "@mui/material/TextField";
import { useSelector } from "react-redux";
const Mygroup = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [groupname, setGroupname] = useState("");
  const [grouptagline, setGrouptagline] = useState("");

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",

    boxShadow: 24,
    p: 4,
  };

  const db = getDatabase();
  const user = useSelector((users) => users.login.loggedin);

  const handleCreate = () => {
    set(push(ref(db, "Groups/")), {
      groupname: groupname,
      grouptagline: grouptagline,
      adminName: user.displayName,
      adminid: user.uid,
    });
    setOpen(false);
  };
  return (
    <>
      <div className="grouplist home-item">
        <div className="home-header">
          <div className="my-group-header">
            <h4>My Groups</h4>
            <Button size="small" onClick={handleOpen} color="secondary">
              Create Group
            </Button>
          </div>
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="group-modal">
          <h3 className="group-modal">Create Your Group</h3>
          <TextField
            fullWidth
            label="Group Name"
            id="fullWidth"
            margin="normal"
            onChange={(e) => {
              setGroupname(e.target.value);
            }}
          />
          <TextField
            fullWidth
            label="Group Tagline"
            id="fullWidth"
            margin="normal"
            onChange={(e) => {
              setGrouptagline(e.target.value);
            }}
          />
          <div className="group-modal-btn-wrapper">
            <Button
              variant="contained"
              className="group-modal-btn"
              onClick={handleCreate}
            >
              Create Group
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default Mygroup;
