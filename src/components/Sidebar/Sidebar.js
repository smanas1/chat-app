import { React, useState } from "react";
import Icons from "../Icons";
import "./sidebar.css";
import { TbLogout } from "react-icons/tb";
import { getAuth, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { Loginuser } from "../../Redux/Slice/LoginSlice";
import { AiOutlineCloudUpload } from "react-icons/ai";
import Popup from "../Popup/Popup";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const dispatch = useDispatch();
  const auth = getAuth();
  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("users");
        dispatch(Loginuser(null));
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const user = useSelector((users) => users.login.loggedin);
  return (
    <>
      <div className="sidebar">
        <div className="all-wrapper">
          <div className="sidebar-wrapper">
            <div className="logo" onClick={handleOpen}>
              <picture>
                <img src="./img/profile.png" alt="" />
              </picture>
              <div className="overlay">
                <AiOutlineCloudUpload />
              </div>
            </div>
            <div>
              <h4>{user.displayName}</h4>
            </div>
          </div>
          <div className="icons">
            <Icons />
          </div>
          <div className="log-out">
            <TbLogout onClick={handleLogOut} />
          </div>
        </div>
      </div>
      <Popup open={open} setOpen={setOpen} />
    </>
  );
};

export default Sidebar;
