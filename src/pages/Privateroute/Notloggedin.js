import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Home from "../Home/Home";

export default function Notloggedinuser() {
  const user = useSelector((users) => users.login.loggedin);
  return user ? <Navigate to="/" /> : <Outlet />;
}
