import React, { useEffect, useState } from "react";
import "../Style/home-page.css";

import Button from "@mui/material/Button";
import { MdGroups } from "react-icons/md";
import { getStorage, ref as Ref, getDownloadURL } from "firebase/storage";
import { AiOutlineSearch } from "react-icons/ai";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import Alert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import "../UserList/userlist.css";
import "./../MsgGrp/msggrp.css";
import "./msgFrnd.css";
import { ActiveChat } from "../../Redux/Slice/ActiveChatSlice";

const MsgFrnd = () => {
  const user = useSelector((users) => users.login.loggedin);

  const [grouplist, setGrouplist] = useState([]);
  const [search, setSearch] = useState("");
  const storage = getStorage();
  const db = getDatabase();
  const dispatch = useDispatch();
  const activeChatName = useSelector((active) => active.ActiveChat.active);

  useEffect(() => {
    const starCountRef = ref(db, "Friends/");
    onValue(starCountRef, (snapshot) => {
      let grouplistarr = [];
      snapshot.forEach((item) => {
        if (
          user.uid == item.val().reciverId ||
          user.uid == item.val().senderId
        ) {
          grouplistarr.push({ ...item.val(), ids: item.key });
        }
      });
      setGrouplist(grouplistarr);
    });
  }, []);

  // search item
  const groupsearch = grouplist.filter((item) => {
    let grp = user.uid == item.senderId ? item.recivername : item.sendername;
    if (search == "") {
      return item;
    } else if (grp.toLowerCase().includes(search.toLowerCase())) {
      return item;
    }
  });

  // data send in redux
  const handleActiveSingle = (item) => {
    if (item.reciverId == user.uid) {
      // localStorage.setItem("activeSingle", JSON.stringify(activeChatName));
      dispatch(
        ActiveChat({
          status: "single",
          id: item.senderId,
          name: item.sendername,
          photo: item.senderPhoto,
        })
      );
    } else {
      // localStorage.setItem("activeSingle", JSON.stringify(activeChatName));
      dispatch(
        ActiveChat({
          status: "single",
          id: item.reciverId,
          name: item.recivername,
          photo: item.profilePicture,
        })
      );
    }
    localStorage.setItem("activeSingle", JSON.stringify(activeChatName));
  };
  return (
    <div className="grouplist home-item userlist">
      <div className="home-header">
        <h4>Friends</h4>
      </div>
      <div className="search user-search">
        <div className="search-wrapper user-search-wrapper">
          <div className="search-icon">
            <AiOutlineSearch />
          </div>
          <input
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            className="search-input"
            placeholder="Search"
          />
        </div>
      </div>
      <div className="scroll userlist-scrool">
        {groupsearch.length == 0 ? (
          <div className="user-alart-wrapper">
            <div className="user-alart">
              <Alert severity="error">No User Found</Alert>
            </div>
          </div>
        ) : (
          groupsearch.map((item, i) => (
            <div key={i} className="home-items-wrapper">
              <div className="home-items-img mygroup-item-img">
                <picture>
                  {item.senderId == user.uid ? (
                    <img
                      className="home-items-img friend-req-color"
                      src={item.profilePicture || "./img/avatar-login.webp"}
                      alt=""
                    />
                  ) : (
                    <img
                      className="home-items-img friend-req-color"
                      src={item.senderPhoto || "./img/avatar-login.webp"}
                      alt=""
                    />
                  )}
                </picture>
              </div>
              <div className="home-items-title">
                <h4>
                  {user.uid == item.senderId
                    ? item.recivername
                    : item.sendername}
                </h4>
                <p>this will next</p>
              </div>
              <div className="home-items-btn">
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => handleActiveSingle(item)}
                >
                  message
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MsgFrnd;
