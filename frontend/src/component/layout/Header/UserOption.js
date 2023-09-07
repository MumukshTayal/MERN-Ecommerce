import React, { Fragment, useState } from "react";
import "./Header.css";
import { SpeedDial, SpeedDialAction } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { useNavigate } from "react-router-dom";
// import { useAlert } from "react-alert";
import { toast } from "react-toastify";
import { logout } from "../../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import zIndex from "@mui/material/styles/zIndex";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const UserOption = ({ user }) => {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const history = useNavigate();
  const [open, setOpen] = useState(false);
  // const alert = useAlert();
  const options = [
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    {
      icon: (
        <ShoppingCartIcon
          style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}
        />
      ),
      name: `Cart(${cartItems.length})`,
      func: cart,
    },
    { icon: <PersonIcon />, name: "Profile", func: account },
    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
  ];
  console.log(user.role);
  if (user.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }
  function dashboard() {
    history("/dashboard");
  }
  function orders() {
    history("/orders");
  }
  function account() {
    history("/profile");
  }
  function logoutUser() {
    dispatch(logout());
    toast.success("Logout Successfully");
  }
  function cart() {
    history("/cart");
  }
  return (
    <Fragment>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        style={{ zIndex: "11" }}
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        direction="down"
        className="speedDial"
        icon={
          <img
            className="speedDialIcon"
            src={user.avatar.url ? user.avatar.url : "/Profile.png"}
            alt="Profile"
          />
        }
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}
      </SpeedDial>
    </Fragment>
  );
};

export default UserOption;
