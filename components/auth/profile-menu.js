import React from "react";
import classes from "./profile-menu.module.css";
export default function ProfileMenu() {
  return (
    <div className={`${classes.verticalmenu} ${classes.displaybox}`}>
      <button>Change Password</button>
      <button>Update Registration details</button>
      <button>Upload Profile Image</button>
    </div>
  );
}
