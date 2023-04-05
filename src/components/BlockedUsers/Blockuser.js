import React, { useEffect, useState } from "react";
import "../Style/home-page.css";
import "./blockuser.css";
import Button from "@mui/material/Button";
import { MdGroups } from "react-icons/md";
import { MygroupData } from "../Mygroup/Data";
import { AiOutlineInfoCircle } from "react-icons/ai";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import { useSelector } from "react-redux";
const Blockuser = () => {
  const [blocklist, setBlocklist] = useState([]);
  const db = getDatabase();
  const user = useSelector((users) => users.login.loggedin);
  useEffect(() => {
    const starCountRef = ref(db, "Block/");
    onValue(starCountRef, (snapshot) => {
      let blockArr = [];
      snapshot.forEach((item) => {
        if (user.uid == item.val().blockbyid) {
          blockArr.push({
            id: item.key,
            block: item.val().block,
            blockid: item.val().blockid,
          });
        } else {
          blockArr.push({
            id: item.key,
            blockby: item.val().blockby,
            blockbyid: item.val().blockbyId,
          });
        }
      });
      setBlocklist(blockArr);
      console.log(blockArr);
    });
  }, []);

  const handleUnblock = (item) => {
    set(push(ref(db, "Friends/")), {
      sendername: user.displayName,
      senderId: user.uid,
      reciverId: item.blockid,
      recivername: item.block,
    }).then(() => {
      remove(ref(db, "Block/" + item.id));
    });
  };

  return (
    <>
      <div className="grouplist home-item blockeduser">
        <div className="home-header">
          <h4>Blocked Users</h4>
        </div>
        <div className="scroll blocked-scrool">
          {blocklist.map((item, i) => {
            return (
              <div key={i} className="home-items-wrapper">
                <div className="home-items-img mygroup-item-img">
                  <MdGroups />
                  <picture>
                    <img className="mygroup-img" src={item.img} alt="" />
                  </picture>
                </div>
                <div className="home-items-title">
                  <h4>{item.block}</h4>
                  <h4>{item.blockby}</h4>
                  <p>this will next</p>
                </div>
                <div className="home-items-btn">
                  {item.blockid ? (
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => {
                        handleUnblock(item);
                      }}
                    >
                      Unblock
                    </Button>
                  ) : (
                    <Tooltip title="You Are Blocked" placement="left">
                      <Button variant="contained" size="small">
                        <AiOutlineInfoCircle />
                      </Button>
                    </Tooltip>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Blockuser;
