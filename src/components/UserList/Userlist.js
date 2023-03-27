import React, { useEffect, useState } from "react";
import "../Style/home-page.css";
import "../UserList/userlist.css";
import Button from "@mui/material/Button";
import { MdGroups } from "react-icons/md";

import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import { useSelector } from "react-redux";

const Userlist = () => {
  const user = useSelector((users) => users.login.loggedin);
  const [userarrs, setUserarrs] = useState([]);
  const [frndreq, setFriendreq] = useState([]);
  const [frndlist, setFrndlist] = useState([]);
  const db = getDatabase();
  useEffect(() => {
    const starCountRef = ref(db, "users/");
    onValue(starCountRef, (snapshot) => {
      let userarr = [];
      snapshot.forEach((userlist) => {
        if (user.uid != userlist.key) {
          userarr.push({ ...userlist.val(), id: userlist.key });
        }
      });
      setUserarrs(userarr);
    });
  }, []);

  const handlesendreq = (item) => {
    set(push(ref(db, "FriendReq/")), {
      sendername: user.displayName,
      senderId: user.uid,
      reciverId: item.id,
      recivername: item.username,
    });
  };
  //friend req
  useEffect(() => {
    const starCountRef = ref(db, "FriendReq/");
    onValue(starCountRef, (snapshot) => {
      let frndarr = [];
      snapshot.forEach((item) => {
        frndarr.push(item.val().reciverId + item.val().senderId);
        frndarr.push({ ...item, id: item.key });
      });
      setFriendreq(frndarr);
    });
  }, []);

  // red friend list
  useEffect(() => {
    const starCountRef = ref(db, "Friends/");
    onValue(starCountRef, (snapshot) => {
      let frndarr = [];
      snapshot.forEach((item) => {
        frndarr.push(item.val().reciverId + item.val().senderId);
      });
      setFrndlist(frndarr);
    });
  }, []);
  console.log(frndlist);
  return (
    <>
      <div className="grouplist home-item userlist">
        <div className="home-header">
          <h4>Users List</h4>
        </div>
        <div className="scroll userlist-scrool">
          {userarrs.map((item, i) => {
            return (
              <div key={i} className="home-items-wrapper">
                <div className="home-items-img mygroup-item-img">
                  <MdGroups />
                  <picture>
                    <img className="mygroup-img" src={item.img} alt="" />
                  </picture>
                </div>
                <div className="home-items-title">
                  <h4>{item.username}</h4>
                  <p>this will next</p>
                </div>
                <div className="home-items-btn">
                  {frndreq.includes(user.uid + item.id) ||
                  frndreq.includes(item.id + user.uid) ? (
                    <Button variant="contained" size="small">
                      pending
                    </Button>
                  ) : frndlist.includes(user.uid + item.id) ||
                    frndlist.includes(item.id + user.uid) ? (
                    <Button variant="contained" size="small">
                      Friend
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handlesendreq(item)}
                    >
                      Add
                    </Button>
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

export default Userlist;
