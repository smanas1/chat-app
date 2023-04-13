import React, { useEffect, useState } from "react";
import "./grouplist.css";
import "../Style/home-page.css";
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
const Grouplist = () => {
  const [grouplist, setGrouplist] = useState([]);
  const db = getDatabase();
  const user = useSelector((users) => users.login.loggedin);

  useEffect(() => {
    const starCountRef = ref(db, "Groups/");
    onValue(starCountRef, (snapshot) => {
      let grouplistarr = [];
      snapshot.forEach((item) => {
        if (item.val().adminid != user.uid) {
          grouplistarr.push({ ...item.val(), ids: item.key });
        }
      });
      setGrouplist(grouplistarr);
    });
  }, []);

  const handlejoin = (data) => {
    set(push(ref(db, "GroupJoinReq/")), {
      adminname: data.adminName,
      adminid: data.adminid,
      groupname: data.groupname,
      groupid: data.ids,
      grouptag: data.grouptagline,
      userid: user.uid,
      username: user.displayName,
    });
  };
  return (
    <>
      <div className="grouplist home-item">
        <div className="home-header">
          <h4>Groups List</h4>
        </div>
        <div className="scroll">
          {grouplist.map((item, i) => (
            <div className="home-items-wrapper" key={i}>
              <div className="home-items-img"> </div>
              <div className="home-items-title">
                <h4>{item.groupname}</h4>
                <p>{item.grouptagline}</p>
              </div>
              <div className="home-items-btn">
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => handlejoin(item)}
                >
                  Join
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Grouplist;
