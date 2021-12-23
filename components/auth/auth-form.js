import { useState, useRef, useContext } from "react";
import { signIn } from "next-auth/client";
import { useRouter } from "next/router";
//import NotificationContext from "../../store/notification-context";
import NotificationContext from "../../store/notification-context";
import classes from "./auth-form.module.css";

async function createUser(email, password) {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password }),
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

  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }
  const notificationCtx = useContext(NotificationContext);
  async function submitHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
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
        email: enteredEmail,
        password: enteredPassword,
      });

      if (!result.error) {
        // set some auth state
        notificationCtx.showNotification({
          title: "Success!",
          message: "Login was successful!",
          status: "success",
        });
        router.replace("/profile");
      } else {
        notificationCtx.showNotification({
          title: "Error!",
          message: result.error || "Something went wrong!",
          status: "error",
        });
      }
    } else {
      try {
        const result = await createUser(enteredEmail, enteredPassword);
        console.log(result);

        notificationCtx.showNotification({
          title: "Success!",
          message: "Registration was successful!",
          status: "success",
        });
        router.push("/");
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

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
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
