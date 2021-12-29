import React, { useContext } from "react";
import classes from "./profile-image-upload-form.module.css";
//import NotificationContext from "../../store/notification-context";
import NotificationContext from "../../store/notification-context";
export default function ProfileImageUploadform() {
  const notificationCtx = useContext(NotificationContext);
  const { menuBtn, passOpen, updateOpen, uploadOpen } =
    notificationCtx.profileData;
  const handleUploadImageFormClose = () => {
    notificationCtx.profileDataHandler({
      menuBtn: menuBtn,
      passOpen: passOpen,
      updateOpen: updateOpen,
      uploadOpen: !uploadOpen,
    });
    // return () => {
    //   cleanup
    // }
  };
  return (
    <>
      <form className={`${classes.form} ${classes.displaybox}`}>
        <span
          onClick={handleUploadImageFormClose}
          className={classes.displayTopRight}
          title="close"
        >
          &times;
        </span>
        <div className={classes.control}>
          <label htmlFor="myFile">Select File</label>
          <input type="file" id="myFile" name="filename" />
        </div>
        <div className={classes.action}>
          <button>Submit</button>
        </div>
      </form>
    </>
  );
}
