import { useRef, useContext } from "react";
import { useRouter } from "next/router";
import classes from "./profile-form.module.css";
//import NotificationContext from "../../store/notification-context";
import NotificationContext from "../../store/notification-context";

import { useSession, signOut } from "next-auth/client";

function ProfileForm(props) {
  const oldPasswordRef = useRef();
  const newPasswordRef = useRef();
  const notificationCtx = useContext(NotificationContext);
  const [session, loading] = useSession();
  const router = useRouter();
  console.log({ session });
  function logoutHandler() {
    signOut();
  }
  async function submitHandler(event) {
    event.preventDefault();

    const enteredOldPassword = oldPasswordRef.current.value;
    const enteredNewPassword = newPasswordRef.current.value;

    // optional: Add validation

    notificationCtx.showNotification({
      title: "Changing password...",
      message: "Your password is currently being changed, please wait...",
      status: "pending",
    });

    try {
      await props.onChangePassword({
        oldPassword: enteredOldPassword,
        newPassword: enteredNewPassword,
      });

      notificationCtx.showNotification({
        title: "Success!",
        message: "Your password was successfully changed!",
        status: "success",
      });
      // router.push("/");
      logoutHandler();
      // router.push("/auth");
    } catch (error) {
      notificationCtx.showNotification({
        title: "Error!",
        message: error.message || "Something went wrong!",
        status: "error",
      });
    }
  }
  const { menuBtn, passOpen, updateOpen } = notificationCtx.profileData;

  const handlePasswordFormClose = () => {
    notificationCtx.profileDataHandler({
      menuBtn: menuBtn,
      passOpen: !passOpen,
      updateOpen: updateOpen,
    });
    // return () => {
    //   cleanup
    // }
  };

  return (
    <>
      <form
        className={`${classes.form} ${classes.displaybox}`}
        onSubmit={submitHandler}
      >
        <span
          onClick={handlePasswordFormClose}
          className={classes.displayTopRight}
          title="close"
        >
          &times;
        </span>
        <div className={classes.control}>
          <label htmlFor="new-password">New Password</label>
          <input type="password" id="new-password" ref={newPasswordRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="old-password">Old Password</label>
          <input type="password" id="old-password" ref={oldPasswordRef} />
        </div>
        <div className={classes.action}>
          <button>Change Password</button>
        </div>
      </form>
    </>
  );
}

export default ProfileForm;
