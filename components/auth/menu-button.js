import React, { useState, useContext, useEffect } from "react";
import classes from "./menu-button.module.css";
import NotificationContext from "../../store/notification-context";
export default function MenuButton() {
  const [classPresent, setclassPresent] = useState(true);
  const notificationCtx = useContext(NotificationContext);
  const { passOpen, updateOpen, uploadOpen } = notificationCtx.profileData;
  const addClassHandler = () => {
    setclassPresent(!classPresent);
    // notificationCtx.profileDataHandler({
    //   menuBtn: classPresent,
    // });
  };

  //console.log({ classPresent });
  useEffect(() => {
    // setclassPresent(true);
    notificationCtx.profileDataHandler({
      menuBtn: classPresent,
      passOpen: passOpen,
      updateOpen: updateOpen,
      uploadOpen: uploadOpen,
    });
    // return () => {
    //   cleanup
    // }
  }, [classPresent]);

  return (
    <div
      className={`${classes.container} ${classPresent ? "" : classes.change}`}
      onClick={addClassHandler}
    >
      <div className={classes.bar1}></div>
      <div className={classes.bar2}></div>
      <div className={classes.bar3}></div>
    </div>
  );
}
