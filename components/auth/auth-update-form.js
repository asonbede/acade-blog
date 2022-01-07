import { useState, useRef, useContext, useEffect } from "react";
//import { signIn } from "next-auth/client";
import { useRouter } from "next/router";
//import NotificationContext from "../../store/notification-context";
import NotificationContext from "../../store/notification-context";
import classes from "./auth-update-form.module.css";
import { useSession, signOut } from "next-auth/client";
async function updateUser(password, name, interest, moderated, actionType) {
  console.log("update rannnnnooooo000");

  const response = await fetch("/api/auth/signup", {
    method: "PATCH",
    body: JSON.stringify({ password, name, interest, moderated, actionType }),
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

function UpdateAuthForm() {
  // const emailInputRef = useRef();
  // const passwordInputRef = useRef();

  // const nameInputRef = useRef();
  // const interestInputRef = useRef();

  const [isLogin, setIsLogin] = useState(true);
  const [regValue, setregValue] = useState(false);
  const [name, setname] = useState();
  const [interest, setinterest] = useState();
  const [moderated, setmoderated] = useState(false);
  const [password, setpassword] = useState();
  const [actionType, setactionType] = useState("updateInterestAndName");
  const router = useRouter();

  const [session, loading] = useSession();

  let nameValue, interestValue;

  const notificationCtx = useContext(NotificationContext);
  //const { menuBtn, passOpen, regDetailsOpen } = notificationCtx.profileData;

  useEffect(() => {
    if (session) {
      nameValue = session.user.name;
      setname(nameValue);
      interestValue = session.user.image.split("??")[1];
      setinterest(interestValue);
      // imageLink = session.user.image.split("??")[0];
      // queryStr = `?name=${name}&description=${interest}&imageLink=${imageLink}`;
    }
  }, [session]);

  // useEffect(() => {
  //   notificationCtx.profileDataHandler({
  //     menuBtn: menuBtn,
  //     passOpen: passOpen,
  //     regDetailsOpen: regValue,
  //   });
  // return () => {
  //   cleanup;
  // };
  // }, [regDetailsOpen]);

  async function submitHandler(event) {
    // let enteredName;
    // let enteredInterest;
    event.preventDefault();

    // const enteredEmail = emailInputRef.current.value;
    // const enteredPassword = passwordInputRef.current.value;

    // enteredName = nameInputRef.current.value;
    // enteredInterest = interestInputRef.current.value;

    notificationCtx.showNotification({
      title: "Sending Update details...",
      message:
        "Your Registration update details are currently being stored into a database.",
      status: "pending",
    });

    try {
      const result = await updateUser(
        password,
        name,
        interest,
        moderated,
        actionType
      );
      console.log(result);

      notificationCtx.showNotification({
        title: "Success!",
        message:
          "Registration Update was successful! You can now login with your password and email",
        status: "success",
      });
      signOut();
      //setIsLogin(true);
      // passwordInputRef.current.value = "";
      router.push("/auth");
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
  const handleUpdateFormClose = () => {
    notificationCtx.profileDataHandler({
      menuBtn: menuBtn,
      passOpen: passOpen,
      updateOpen: !updateOpen,
    });
  };

  return (
    <section className={`${classes.auth} ${classes.displaybox}`}>
      <span
        onClick={handleUpdateFormClose}
        className={classes.displayTopRight}
        title="close"
      >
        &times;
      </span>
      <h1>Update Name And Interest</h1>

      <form onSubmit={submitHandler}>
        {/* <div className={classes.control}>
          <label htmlFor="username">Your Username</label>
          <input type="text" id="username" required ref={usernameInputRef} />
        </div> */}

        {/* <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div> */}
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
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            id="name"
            required
            value={name}
            onChange={(e) => setname(e.target.value)}
          />
        </div>

        <div className={classes.control}>
          <label htmlFor="interest">Your Area Of Specialization</label>
          <textarea
            type="text"
            id="interest"
            value={interest}
            required
            onChange={(e) => setinterest(e.target.value)}
            rows={10}
            cols={20}
            placeholder="Introduce yourself. Briefly Describe what you like writing about.
               What you like reading about.
               For instance, My name is Bede 
              and i blog about the sciences and programming"
          ></textarea>
        </div>

        <div className={classes.actions}>
          <button>Update Account</button>
        </div>
      </form>
    </section>
  );
}

export default UpdateAuthForm;
