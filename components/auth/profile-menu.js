import React from "react";
import classes from "./profile-menu.module.css";
import NotificationContext from "../../store/notification-context";
import { useState, useContext, useEffect } from "react";
import Button from "../ui/button";
export default function ProfileMenu() {
  const notificationCtx = useContext(NotificationContext);

  const [passOpenValue, setpassOpenValue] = useState(false);
  const [updateOpenValue, setregDetailsOpen] = useState(false);

  const { menuBtn, passOpen, updateOpen, uploadOpen, deleteAccount } =
    notificationCtx.profileData;
  const handlePasswordChange = () => {
    setpassOpenValue(!passOpen);

    notificationCtx.profileDataHandler({
      menuBtn: menuBtn,
      passOpen: !passOpen,
      updateOpen: updateOpen ? !updateOpen : updateOpen,
      uploadOpen: uploadOpen ? !uploadOpen : uploadOpen,
      deleteAccount: deleteAccount ? !deleteAccount : deleteAccount,
    });
  };

  const handleUpdateRegDetails = () => {
    notificationCtx.profileDataHandler({
      menuBtn: menuBtn,
      passOpen: passOpen ? !passOpen : passOpen,
      updateOpen: !updateOpen,
      uploadOpen: uploadOpen ? !updateOpen : updateOpen,
      deleteAccount: deleteAccount ? !deleteAccount : deleteAccount,
    });
  };

  const handleProfileImageUpload = () => {
    notificationCtx.profileDataHandler({
      menuBtn: menuBtn,
      passOpen: passOpen ? !passOpen : passOpen,
      updateOpen: updateOpen ? !updateOpen : updateOpen,
      deleteAccount: deleteAccount ? !deleteAccount : deleteAccount,
      uploadOpen: !uploadOpen,
    });
  };

  const handleDeleteAccount = () => {
    notificationCtx.profileDataHandler({
      menuBtn: menuBtn,
      passOpen: passOpen ? !passOpen : passOpen,
      updateOpen: updateOpen ? !updateOpen : updateOpen,
      uploadOpen: uploadOpen ? !uploadOpen : uploadOpen,
      deleteAccount: !deleteAccount,
    });
  };

  return (
    <div className={`${classes.verticalmenu} ${classes.displaybox}`}>
      <Button onClick={handlePasswordChange}>Change Password</Button>
      <Button onClick={handleUpdateRegDetails}>
        Update Registration details
      </Button>
      <Button onClick={handleProfileImageUpload}>Upload Profile Image</Button>
      <Button onClick={handleDeleteAccount}>Delete Account</Button>
    </div>
  );
}
