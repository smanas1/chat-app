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
import { useSelector } from "react-redux";
import "../UserList/userlist.css";
import "./msggrp.css";

const MsgGrp = () => {
  const user = useSelector((users) => users.login.loggedin);
  const [member, setMember] = useState([]);
  const [grouplist, setGrouplist] = useState([]);
  const [search, setSearch] = useState("");
  const storage = getStorage();
  const db = getDatabase();
  useEffect(() => {
    const starCountRef = ref(db, "GroupsMembers/");
    onValue(starCountRef, (snapshot) => {
      let grouplistarr = [];
      snapshot.forEach((item) => {
        grouplistarr.push({ ...item.val(), ids: item.key });
      });
      setMember(grouplistarr);
    });
  }, []);

  useEffect(() => {
    const starCountRef = ref(db, "Groups/");
    // setTimeout(() => {
    onValue(starCountRef, (snapshot) => {
      let grouplistarr = [];
      snapshot.forEach((item) => {
        member.map((data) => {
          if (item.key == data.groupid) {
            grouplistarr.push({ ...item.val(), ids: item.key });
          }
        });
        console.log(item.val().adminid);
      });
      setGrouplist(grouplistarr);
    });
    // }, 1000);
  }, [member]);

  // search item
  const groupsearch = grouplist.filter((item) => {
    if (search == "") {
      return item;
    } else if (item.groupname.toLowerCase().includes(search.toLowerCase())) {
      return item;
    }
  });
  console.log(member);
  return (
    <div className="grouplist home-item userlist msg-grouplist">
      <div className="home-header">
        <h4>Groups</h4>
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
      <div className="scroll userlist-scrool msg-scroll">
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
                <MdGroups />
                <picture>
                  <img
                    className="mygroup-img"
                    src={item.profilePicture || "./img/avatar-login.webp"}
                    alt=""
                  />
                </picture>
              </div>
              <div className="home-items-title">
                <h4>{item.groupname}</h4>
                <p>{item.grouptagline}</p>
              </div>
              <div className="home-items-btn">
                <Button variant="contained" size="small">
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

export default MsgGrp;
