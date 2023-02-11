import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Login from "../Login/Login";

export default function Loggedinuser() {
  const user = useSelector((users) => users.login.loggedin);
  return user ? <Outlet /> : <Login />;
}
