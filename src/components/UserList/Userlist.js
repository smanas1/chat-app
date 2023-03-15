import React, { useEffect, useState } from "react";
import "../Style/home-page.css";
import "../UserList/userlist.css";
import Button from "@mui/material/Button";
import { MdGroups } from "react-icons/md";

import { getDatabase, ref, onValue } from "firebase/database";

const Userlist = () => {
  const [userarrs, setUserarrs] = useState([]);
  const db = getDatabase();
  useEffect(() => {
    const starCountRef = ref(db, "users/");
    onValue(starCountRef, (snapshot) => {
      let userarr = [];
      snapshot.forEach((userlist) => {
        userarr.push(userlist.val());
      });
      setUserarrs(userarr);
    });
  }, []);
  console.log(userarrs);
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
                  <Button variant="contained" size="small">
                    Add Friend
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

export default Userlist;
