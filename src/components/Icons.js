import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { AiOutlineMessage } from "react-icons/ai";
import { MdOutlineNotifications } from "react-icons/md";
import { BsGear } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import "./Sidebar/sidebar.css";

const Icons = () => {
  return (
    <>
      <div className="side-icons ">
        <NavLink className="home cal icons-overlay" to="/">
          <AiOutlineHome />
        </NavLink>
        <NavLink className="message icons-overlay-2" to="/message">
          <AiOutlineMessage />
        </NavLink>
        <div className="notification">
          <MdOutlineNotifications />
        </div>
        <div className="setting">
          <BsGear />
        </div>
      </div>
    </>
  );
};

export default Icons;
