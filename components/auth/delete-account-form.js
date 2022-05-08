import { useState, useRef, useContext, useEffect } from "react";
//import { signIn } from "next-auth/client";
import { useRouter } from "next/router";
//import NotificationContext from "../../store/notification-context";
import NotificationContext from "../../store/notification-context";
import classes from "./auth-update-form.module.css";
import { useSession, signOut } from "next-auth/client";
import Modal from "../ui/modal/modal";
import Button from "../ui/button";

async function deleteUser(
  password,

  username
) {
  console.log("update rannnnnooooo000");

  const response = await fetch("/api/delete-account/delete-account", {
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
  const [showDeleteModal, setshowDeleteModal] = useState(false);

  const router = useRouter();

  const [session, loading] = useSession();

  const notificationCtx = useContext(NotificationContext);

  useEffect(() => {
    setshowDeleteModal(false);
  }, []);

  //   useEffect(() => {
  //     fetch("/api/restrict-route/")
  //       .then((response) => response.json())
  //       .then((data) => {
  //         //console.log(data);
  //         setcheckBoxShow(data.message);
  //       })
  //       .catch((error) => {
  //         notificationCtx.showNotification({
  //           title: "Error!",
  //           message: error.message || "Something went wrong!",
  //           status: "error",
  //         });
  //       });
  //   }, [session]);
  //   console.log({ moderated });
  function deleteHandler(event) {
    event.preventDefault();
    setshowDeleteModal(true);
  }

  async function submitHandler() {
    // let enteredName;
    // let enteredInterest;
    //event.preventDefault();
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

      setshowDeleteModal(false);
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
  const { menuBtn, passOpen, updateOpen, deleteAccount } =
    notificationCtx.profileData;
  const handleDeleteAccountFormClose = () => {
    notificationCtx.profileDataHandler({
      menuBtn: menuBtn,
      passOpen: passOpen,
      updateOpen: updateOpen,
      deleteAccount: !deleteAccount,
    });
  };

  return (
    <>
      {showDeleteModal && (
        <Modal
          deletePostHandler={submitHandler}
          text={`Do you really want to delete your account?
           Deleting your account will also delete 
           all the blogs you had created. In addition, all the
           questions and comments associated with those blogs will also be deleted!`}
          setshowDeleteModal={setshowDeleteModal}
          showDeleteModal={showDeleteModal}
        />
      )}

      <section className={`${classes.auth} ${classes.displaybox}`}>
        <span
          onClick={handleDeleteAccountFormClose}
          className={classes.displayTopRight}
          title="close"
        >
          &times;
        </span>
        <h1>Delete Account</h1>

        <form onSubmit={deleteHandler}>
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
          {session && (
            <div className={classes.actions}>
              <Button>Delete Account</Button>
            </div>
          )}
        </form>
      </section>
    </>
  );
}

export default DeleteAccountForm;
