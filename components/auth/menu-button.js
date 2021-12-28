import React, { useState, useContext, useEffect } from "react";
import classes from "./menu-button.module.css";
import NotificationContext from "../../store/notification-context";
export default function MenuButton() {
  const [classPresent, setclassPresent] = useState(true);
  const addClassHandler = () => {
    setclassPresent(!classPresent);
    notificationCtx.profileDataHandler({
      menuBtn: classPresent,
    });
  };

  const notificationCtx = useContext(NotificationContext);
  console.log({ classPresent });
  useEffect(() => {
    notificationCtx.profileDataHandler({
      menuBtn: classPresent,
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
