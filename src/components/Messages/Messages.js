import React, { useEffect, useState } from "react";
import "./messages.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineCamera } from "react-icons/ai";
import { AiOutlineLink } from "react-icons/ai";
import SendIcon from "@mui/icons-material/Send";
import { BiMicrophone } from "react-icons/bi";
import { Divider, InputAdornment } from "@mui/material";
import TextField from "@mui/material/TextField";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import Button from "@mui/material/Button";
import ModalImage from "react-modal-image";
import { useSelector } from "react-redux";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import moment from "moment/moment";

const Messages = () => {
  const [msg, setMsg] = useState("");
  const [msglist, setMsglist] = useState([]);

  const db = getDatabase();
  const activeChatName = useSelector((active) => active.ActiveChat.active);
  const user = useSelector((users) => users.login.loggedin);

  const actions = [
    { icon: <AiOutlineCamera />, name: "Camera" },
    { icon: <BiMicrophone />, name: "Voice" },
    { icon: <AiOutlineLink />, name: "File" },
  ];

  const handleMsg = () => {
    if (activeChatName.status == "single") {
      if (msg != "") {
        set(push(ref(db, "singlemsg/")), {
          whosendname: user.displayName,
          whosendid: user.uid,
          message: msg,
          whoreciveid: activeChatName.id,
          whorecivename: activeChatName.name,
          date: `${new Date().getDate()}-${
            new Date().getMonth() + 1
          }-${new Date().getFullYear()} : ${new Date().getSeconds()}:${new Date().getMinutes()}:${new Date().getHours()}`,
        });
        setMsg("");
      }
    } else {
      console.log("grpmsg");
    }
  };
  const handleKey = (e) => {
    if (e.key == "Enter") {
      handleMsg();
    }
  };

  //get all message
  useEffect(() => {
    const starCountRef = ref(db, "singlemsg/");
    onValue(starCountRef, (snapshot) => {
      let singlemsgarr = [];
      snapshot.forEach((item) => {
        if (
          (item.val().whosendid == user.uid &&
            item.val().whoreciveid == activeChatName.id) ||
          (item.val().whoreciveid == user.uid &&
            activeChatName.id == item.val().whosendid)
        ) {
          singlemsgarr.push(item.val());
        }
      });
      setMsglist(singlemsgarr);
    });
  }, [activeChatName?.id]);

  return (
    <div className="messages-wrapper">
      {/* Message Top */}
      <div className="message-top">
        <div className="top-info">
          <div className="top-img">
            <picture>
              <img
                src={activeChatName?.photo || "../img/avatar-login.webp"}
                alt=""
              />
            </picture>
          </div>
          <div className="top-content">
            <h2>{activeChatName?.name}</h2>
            <p>Online</p>
          </div>
        </div>
        <div className="top-btns">
          <BsThreeDotsVertical />
        </div>
      </div>
      <Divider />
      {/* Messages */}
      <div className="messages">
        {/*  left message */}
        {activeChatName?.status == "single"
          ? msglist.map((item, i) =>
              item.whosendid == user.uid ? (
                item.message ? (
                  <div className="right-msg" key={i}>
                    <div className="right-text">
                      <p>{item.message}</p>
                    </div>
                    <p className="right-time">
                      {moment(item.date, "DDMMYYYY ss:mm:hh").fromNow()}
                    </p>
                  </div>
                ) : (
                  "img"
                )
              ) : item.message ? (
                <div className="left-msg" key={i}>
                  <div className="left-text">
                    <p>{item.message}</p>
                  </div>
                  <p className="left-time">
                    {moment(item.date, "DDMMYYYY ss:mm:hh").fromNow()}
                  </p>
                </div>
              ) : (
                "img"
              )
            )
          : "grp Msg"}
        {/* <div className="left-msg">
          <div className="left-text">
            <p>hi</p>
          </div>
          <p className="left-time">Today, 2:01pm</p>
        </div> */}
        {/* Left Img */}
        {/* <div className="left-msg">
          <div className="left-img">
            <picture>
              <ModalImage
                small={
                  "https://images.pexels.com/photos/16388789/pexels-photo-16388789.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
                }
                medium={
                  "https://images.pexels.com/photos/16388789/pexels-photo-16388789.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
                }
                large={
                  "https://images.pexels.com/photos/16388789/pexels-photo-16388789.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
                }
              />
            </picture>
            <p className="left-time">Today, 2:01pm</p>
          </div>
        </div> */}
        {/* left Audio */}
        {/* <div className="left-msg">
          <audio className="right-audio" src="" controls></audio>
          <p className="left-time">Today, 2:01pm</p>
        </div> */}
        {/* Left Video */}
        {/* <div className="left-msg">
          <video className="right-video" src="" controls></video>
          <p className="left-time">Today, 2:01pm</p>
        </div> */}
        {/* Right Message */}
        {/* <div className="right-msg">
          <div className="right-text">
            <p>hlw</p>
          </div>
          <p className="right-time">Today, 2:01pm</p>
        </div> */}
        {/* Right Img */}
        {/* <div className="right-msg">
          <div className="right-img">
            <picture>
              <ModalImage
                small={
                  "https://images.pexels.com/photos/341970/pexels-photo-341970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                }
                large={
                  "https://images.pexels.com/photos/341970/pexels-photo-341970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                }
              />
            </picture>
            <p className="right-time">Today, 2:01pm</p>
          </div>
        </div> */}
        {/* Right Audio */}
        {/* <div className="right-msg">
          <audio className="right-audio" src="" controls></audio>
          <p className="right-time">Today, 2:01pm</p>
        </div> */}
        {/* Right Video */}
        {/* <div className="right-msg">
          <video className="right-video" src="" controls></video>
          <p className="right-time">Today, 2:01pm</p>
        </div>*/}
      </div>

      {/* Messages Bottom */}
      <Divider />
      <div className="message-bottom">
        <div className="message-center">
          <div className="message-inputs">
            <TextField
              onKeyPress={(e) => handleKey(e)}
              value={msg}
              autoComplete="off"
              onChange={(e) => setMsg(e.target.value)}
              hiddenLabel
              id="filled-hidden-label-small"
              type="text"
              variant="filled"
              placeholder="Message"
              fullWidth
              InputProps={{
                disableUnderline: true,
                endAdornment: (
                  <InputAdornment position="end">
                    <SpeedDial
                      className="speeddile"
                      ariaLabel="SpeedDial basic example"
                      sx={{
                        position: "absolute",
                        bottom: 9,
                        right: 16,
                        width: "30px",
                      }}
                      icon={<SpeedDialIcon />}
                    >
                      {actions.map((action) => (
                        <SpeedDialAction
                          className="speeddial-action"
                          key={action.name}
                          icon={action.icon}
                          tooltipTitle={action.name}
                        />
                      ))}
                    </SpeedDial>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className="send-btn">
            <Button variant="contained" onClick={() => handleMsg()}>
              <SendIcon />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
