import React, { useEffect, useState } from "react";
import "./friends.css";
import Button from "@mui/material/Button";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import { useSelector } from "react-redux";
const Friends = () => {
  const [frndlist, setFrndlist] = useState([]);
  const db = getDatabase();
  const user = useSelector((users) => users.login.loggedin);
  // friend list show
  useEffect(() => {
    const starCountRef = ref(db, "Friends/");
    onValue(starCountRef, (snapshot) => {
      let frndarr = [];
      snapshot.forEach((item) => {
        frndarr.push({ ...item.val(), ids: item.key });
      });
      setFrndlist(frndarr);
    });
  }, []);
  //handle Unfriend
  const handleUnfriend = (data) => {
    remove(ref(db, "Friends/" + data.ids));
    console.log(frndlist);
  };

  //handle Block

  const handleBlock = (item) => {
    if (user.uid == item.senderId) {
      set(push(ref(db, "Block/")), {
        block: item.recivername,
        blockid: item.reciverId,
        blockby: item.sendername,
        blockbyid: item.senderId,
      }).then(() => {
        remove(ref(db, "Friends/" + item.ids));
      });
    } else {
      set(push(ref(db, "Block/")), {
        blockid: item.senderId,
        block: item.sendername,
        blockbyid: item.reciverId,
        blockby: item.recivername,
      }).then(() => {
        remove(ref(db, "Friends/" + item.ids));
      });
    }
  };
  return (
    <>
      <div className="grouplist home-item friend-req-mt friend-item">
        <div className="home-header">
          <h4>Friends</h4>
        </div>
        <div className="scroll friend-scroll">
          {frndlist.map((item, i) => (
            <div className="home-items-wrapper" key={i}>
              <div className="home-items-img friend-img friend-req-color">
                {" "}
              </div>
              <div className="home-items-title friend-req-title friend-title">
                <h4>
                  {user.uid == item.senderId
                    ? item.recivername
                    : item.sendername}
                </h4>
                <p>this will next</p>
              </div>
              <div className="home-items-btn friend-req-btn friend-btn">
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => handleUnfriend(item)}
                >
                  Unfriend
                </Button>
                <Button
                  className="friend-req-btn-2 friend-btn-2"
                  variant="contained"
                  size="small"
                  onClick={() => handleBlock(item)}
                >
                  Block
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Friends;
