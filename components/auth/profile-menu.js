import React from "react";
import classes from "./profile-menu.module.css";
import NotificationContext from "../../store/notification-context";
import { useState, useContext, useEffect } from "react";
export default function ProfileMenu() {
  const notificationCtx = useContext(NotificationContext);
  // const {
  //   menuBtn,
  //   passOpen: passOpenValue,
  //   regDetailsOpen: regDetailsOpenValue,
  // } = notificationCtx.profileData;
  const [passOpenValue, setpassOpenValue] = useState(false);
  const [updateOpenValue, setregDetailsOpen] = useState(false);
  // const [regDetailsOpen, setregDetailsOpen] = useState(regDetailsOpenValue);

  const { menuBtn, passOpen, updateOpen } = notificationCtx.profileData;
  const handlePasswordChange = () => {
    setpassOpenValue(!passOpen);
    // setregDetailsOpen(!updateOpenValue);
    notificationCtx.profileDataHandler({
      menuBtn: menuBtn,
      passOpen: !passOpen,
      updateOpen: updateOpen,
    });
  };

  const handleUpdateRegDetails = () => {
    // setpassOpenValue(!passOpenValue);
    // setregDetailsOpen(!updateOpen);
    notificationCtx.profileDataHandler({
      menuBtn: menuBtn,
      passOpen: passOpen,
      updateOpen: !updateOpen,
    });
  };

  // useEffect(() => {
  //   notificationCtx.profileDataHandler({
  //     menuBtn: menuBtn,
  //     passOpen: passOpenValue,
  //     updateOpen: updateOpenValue,
  //   });
  // }, [passOpenValue, updateOpenValue]);

  return (
    <div className={`${classes.verticalmenu} ${classes.displaybox}`}>
      <button onClick={handlePasswordChange}>Change Password</button>
      <button onClick={handleUpdateRegDetails}>
        Update Registration details
      </button>
      <button>Upload Profile Image</button>
    </div>
  );
}
