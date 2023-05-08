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
  const [groupreq, setGroupreq] = useState([]);
  const [groupreqid, setGroupreqid] = useState([]);
  const [groupmember, setGroupmember] = useState([]);
  const [groupmemberid, setGroupmemberid] = useState([]);
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

  useEffect(() => {
    const starCountRef = ref(db, "GroupJoinReq/");
    onValue(starCountRef, (snapshot) => {
      let groupreq = [];
      let groupreqid = [];
      snapshot.forEach((item) => {
        groupreq.push(item.val().groupid + item.val().userid);
        groupreqid.push({ ...item.val(), id: item.key });
      });
      setGroupreq(groupreq);
      setGroupreqid(groupreqid);
    });
  }, []);
  useEffect(() => {
    const starCountRef = ref(db, "GroupsMembers/");
    onValue(starCountRef, (snapshot) => {
      let GroupsMembersArr = [];
      let GroupsMembersid = [];
      snapshot.forEach((item) => {
        GroupsMembersArr.push(item.val().groupid + item.val().userid);
        GroupsMembersid.push({ ...item.val(), id: item.key });
      });
      setGroupmember(GroupsMembersArr);
      setGroupmemberid(GroupsMembersid);
    });
  }, []);
  const handleleave = (data) => {
    console.log(data);
    groupmemberid.map((item) => {
      if (data.ids == item.groupid) {
        remove(ref(db, "GroupsMembers/" + item.id));
      }
      console.log(item);
    });
  };
  console.log(groupmemberid);
  const handlejoin = (data) => {
    set(push(ref(db, "GroupJoinReq/")), {
      adminname: data.adminName,
      adminid: data.adminid,
      groupname: data.groupname,
      groupid: data.ids,
      grouptag: data.grouptagline,
      userid: user.uid,
      photo: user.photoURL,
      username: user.displayName,
    });
  };

  const handleReqCancle = (data) => {
    groupreqid.map((item) => {
      if (data.ids == item.groupid) {
        remove(ref(db, "GroupJoinReq/" + item.id));
      }
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
                {groupreq.includes(item.ids + user.uid) ? (
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleReqCancle(item)}
                  >
                    cancle
                  </Button>
                ) : groupmember.includes(item.ids + user.uid) ||
                  groupmember.includes(user.uid + item.ids) ? (
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleleave(item)}
                  >
                    Leave
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handlejoin(item)}
                  >
                    join
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Grouplist;
