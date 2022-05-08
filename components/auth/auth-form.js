import { useState, useRef, useContext, useEffect } from "react";
import { signIn } from "next-auth/client";
import { useRouter } from "next/router";
//import NotificationContext from "../../store/notification-context";
import NotificationContext from "../../store/notification-context";
import classes from "./auth-form.module.css";
import { useSession, signOut } from "next-auth/client";
async function createUser(email, password, name, interest, username) {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
      name,
      interest,
      moderated: false,
      username,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }

  return data;
}

function AuthForm() {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const nameInputRef = useRef();
  const interestInputRef = useRef();
  const usernameInputRef = useRef();

  const [isLogin, setIsLogin] = useState(true);
  const [regValue, setregValue] = useState(false);
  const router = useRouter();
  const [session, loading] = useSession();
  const notificationCtx = useContext(NotificationContext);
  //const { menuBtn, passOpen, regDetailsOpen } = notificationCtx.profileData;

  // useEffect(() => {
  //   if (router.pathname === "/profile") {
  //     setIsLogin(false);
  //   }
  // }, []);

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

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  async function submitHandler(event) {
    let enteredName;
    let enteredInterest;
    let enteredEmail;
    event.preventDefault();

    const enteredPassword = passwordInputRef.current.value;
    const enteredUsername = usernameInputRef.current.value;

    if (!isLogin) {
      enteredName = nameInputRef.current.value;
      enteredInterest = interestInputRef.current.value;
      enteredEmail = emailInputRef.current.value;
    }

    if (isLogin) {
      notificationCtx.showNotification({
        title: "Sending login...",
        message: "You are currently being loged in.",
        status: "pending",
      });
    } else {
      notificationCtx.showNotification({
        title: "Sending Registration details...",
        message:
          "Your Registration details is currently being stored into a database.",
        status: "pending",
      });
    }

    // optional: Add validation

    if (isLogin) {
      const result = await signIn("credentials", {
        redirect: false,
        username: enteredUsername,
        password: enteredPassword,
      });

      if (!result.error) {
        // set some auth state
        notificationCtx.showNotification({
          title: "Success!",
          message: "Login was successful!",
          status: "success",
        });
        router.push(`/writers`);
      } else {
        notificationCtx.showNotification({
          title: "Error!",
          message: result.error || "Something went wrong!",
          status: "error",
        });
      }
    } else {
      try {
        const result = await createUser(
          enteredEmail,
          enteredPassword,
          enteredName,
          enteredInterest,
          enteredUsername
        );
        console.log(result);

        notificationCtx.showNotification({
          title: "Success!",
          message:
            "Registration was successful! You can now login with your password and username",
          status: "success",
        });
        setIsLogin(true);
        passwordInputRef.current.value = "";
        // router.push("/");
      } catch (error) {
        console.log(error);
        notificationCtx.showNotification({
          title: "Error!",
          message: error.message || "Something went wrong!",
          status: "error",
        });
      }
    }
  }

  // const handleUpdateFormClose = () => {
  //   setregValue(!regDetailsOpen);
  // return () => {
  //   cleanup
  // }
  // };

  return (
    <section className={`${classes.auth}`}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>

      <form onSubmit={submitHandler}>
        {/* <div className={classes.control}>
          <label htmlFor="username">Your Username</label>
          <input type="text" id="username" required ref={usernameInputRef} />
        </div> */}
        {!isLogin && (
          <div className={classes.control}>
            <label htmlFor="name">Your Name</label>
            <input type="text" id="name" required ref={nameInputRef} />
          </div>
        )}

        <div className={classes.control}>
          <label htmlFor="user-name">Your User Name</label>
          <input type="text" id="user-name" required ref={usernameInputRef} />
        </div>

        {!isLogin && (
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input type="email" id="email" required ref={emailInputRef} />
          </div>
        )}
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        {!isLogin && (
          <div className={classes.control}>
            <label htmlFor="interest">Your Area Of Specialization</label>
            <textarea
              type="text"
              id="interest"
              required
              ref={interestInputRef}
              rows={10}
              cols={20}
              placeholder="Introduce yourself. Briefly Describe what you like writing about.
               What you like reading about.
               For instance, My name is Bede 
              and i blog about the sciences and programming"
            ></textarea>
          </div>
        )}
        <div className={classes.actions}>
          <button>{isLogin ? "Login" : "Create Account"}</button>

          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
