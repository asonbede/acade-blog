import { useState, useRef, useContext, useEffect } from "react";
//import { signIn } from "next-auth/client";
import { useRouter } from "next/router";
//import NotificationContext from "../../store/notification-context";
import NotificationContext from "../../store/notification-context";
import classes from "./auth-update-form.module.css";
import { useSession, signOut } from "next-auth/client";
async function deleteUser(
  password,

  username
) {
  console.log("update rannnnnooooo000");

  const response = await fetch("/api/auth/delete-account", {
    method: "PATCH",
    body: JSON.stringify({
      password,
      username,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log("update rannnnn111");
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }
  console.log("update rannnnn");

  return data;
}

function DeleteAccountForm(props) {
  const [password, setpassword] = useState();

  const [username, setusername] = useState();
  const [checkBoxShow, setcheckBoxShow] = useState();

  const router = useRouter();

  const [session, loading] = useSession();

  const notificationCtx = useContext(NotificationContext);

  //   useEffect(() => {
  //     setname(props.name);
  //     setinterest(props.description);
  //     if (moderated) {
  //       setemail(props.email);
  //     }
  //   }, [session, moderated]);

  useEffect(() => {
    fetch("/api/restrict-route/")
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        setcheckBoxShow(data.message);
      })
      .catch((error) => {
        notificationCtx.showNotification({
          title: "Error!",
          message: error.message || "Something went wrong!",
          status: "error",
        });
      });
  }, [session]);
  //   console.log({ moderated });

  async function submitHandler(event) {
    // let enteredName;
    // let enteredInterest;
    event.preventDefault();
    // console.log({ moderated }, "twoo");
    // console.log({ moderated });
    // const actionType = moderated ? "approve-profile" : "updateInterestAndName";
    notificationCtx.showNotification({
      title: "Sending Update details...",
      message:
        "Your Registration update details are currently being stored into a database.",
      status: "pending",
    });

    try {
      const result = await deleteUser(
        password,

        username
      );
      console.log(result);

      notificationCtx.showNotification({
        title: "Success!",
        message:
          "Registration Update was successful! You can now login with your password and email",
        status: "success",
      });

      router.push("/writers");
    } catch (error) {
      console.log(error);
      notificationCtx.showNotification({
        title: "Error!",
        message: error.message || "Something went wrong!",
        status: "error",
      });
    }
  }
  const { menuBtn, passOpen, updateOpen } = notificationCtx.profileData;
  const handleDeleteAccountFormClose = () => {
    notificationCtx.profileDataHandler({
      menuBtn: menuBtn,
      passOpen: passOpen,
      updateOpen: updateOpen,
      deleteAccount: !deleteAccount,
    });
  };

  return (
    <section className={`${classes.auth} ${classes.displaybox}`}>
      <span
        onClick={handleDeleteAccountFormClose}
        className={classes.displayTopRight}
        title="close"
      >
        &times;
      </span>
      <h1>Delete Account</h1>

      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            value={password}
            required
            onChange={(e) => setpassword(e.target.value)}
          />
        </div>

        <div className={classes.control}>
          <label htmlFor="username">Your Username</label>
          <input
            type="text"
            id="username"
            required
            value={username}
            onChange={(e) => setusername(e.target.value)}
          />
        </div>
        {checkBoxShow ||
          session(
            <div className={classes.actions}>
              <button>Delete Account</button>
            </div>
          )}
      </form>
    </section>
  );
}

export default DeleteAccountForm;
