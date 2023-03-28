import React, { useEffect, useState } from "react";
import "./friendrequest.css";
import Button from "@mui/material/Button";
import "../Style/home-page.css";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import { useSelector } from "react-redux";
//handle Cancle
const FriendRequest = () => {
  const [frndreq, setFriendreq] = useState([]);
  const [frndcancle, setFrndcancle] = useState([]);
  const db = getDatabase();
  const user = useSelector((users) => users.login.loggedin);
  //friend req show cancle
  useEffect(() => {
    const starCountRef = ref(db, "FriendReq/");
    onValue(starCountRef, (snapshot) => {
      let frndarr = [];
      snapshot.forEach((item) => {
        if (item.val().senderId == user.uid) {
          frndarr.push({ ...item.val(), id: item.key });
        }
      });
      setFrndcancle(frndarr);
    });
  }, []);
  //friend req show
  useEffect(() => {
    const starCountRef = ref(db, "FriendReq/");
    onValue(starCountRef, (snapshot) => {
      let frndarr = [];
      snapshot.forEach((item) => {
        if (item.val().reciverId == user.uid) {
          frndarr.push({ ...item.val(), id: item.key });
        }
      });
      setFriendreq(frndarr);
    });
  }, []);
  // accept handle
  const handleAccept = (data) => {
    set(push(ref(db, "Friends/")), {
      ...data,
    }).then(() => {
      remove(ref(db, "FriendReq/" + data.id));
    });
  };

  // reject request
  const handleReject = (data) => {
    remove(ref(db, "FriendReq/" + data.id));
  };

  //handle Cancle
  const handleCancle = (data) => {
    remove(ref(db, "FriendReq/" + data.id));
  };
  return (
    <>
      <div className="grouplist home-item friend-req-mt">
        <div className="home-header">
          <h4>Friend Request</h4>
        </div>
        <div className="scroll friend-req-scroll">
          {frndreq.map((item, i) => (
            <div className="home-items-wrapper" key={i}>
              <div className="home-items-img friend-req-color"> </div>
              <div className="home-items-title friend-req-title">
                <h4>{item.sendername}</h4>
                <p>this will next</p>
              </div>
              <div className="home-items-btn friend-req-btn">
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => handleAccept(item)}
                >
                  Accept
                </Button>
                <Button
                  className="friend-req-btn-2 "
                  variant="contained"
                  size="small"
                  onClick={() => handleReject(item)}
                >
                  Reject
                </Button>
              </div>
            </div>
          ))}
          {frndcancle.map((item, i) => {
            return (
              <div key={i} className="home-items-wrapper">
                <div className="home-items-img mygroup-item-img">
                  <picture>
                    <img
                      className="mygroup-img"
                      src={
                        "https://images.pexels.com/photos/15913584/pexels-photo-15913584.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                      }
                      alt=""
                    />
                  </picture>
                </div>
                <div className="home-items-title">
                  <h4>{item.recivername}</h4>
                  <p>this will next</p>
                </div>
                <div className="home-items-btn frnd-req-cancle-btn">
                  <Button
                    variant="outlined"
                    size="small"
                    color="error"
                    onClick={() => handleCancle(item)}
                  >
                    cancle
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

export default FriendRequest;
