import Link from "next/link";
import { useState, useContext, useEffect } from "react";
import Logo from "./logo";
import classes from "./main-navigation.module.css";
import { useSession, signOut } from "next-auth/client";
import { useRouter } from "next/router";
import MenuButton from "../auth/menu-button";
import NotificationContext from "../../store/notification-context";
function MainNavigation() {
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [session, loading] = useSession();
  const router = useRouter();
  const notificationCtx = useContext(NotificationContext);

  let name, authorUsername;

  if (session) {
    console.log({ session }, "from-main");
    authorUsername = session.user.name.username;
    name = session.user.name.name;
  }

  function logoutHandler() {
    signOut();
    router.replace("/auth");
  }

  const { menuBtn, passOpen, updateOpen, uploadOpen, deleteAccount } =
    notificationCtx.profileData;
  const handlePasswordChange = () => {
    // setpassOpenValue(!passOpen);

    notificationCtx.profileDataHandler({
      menuBtn: menuBtn,
      passOpen: !passOpen,
      updateOpen: updateOpen ? !updateOpen : updateOpen,
      uploadOpen: uploadOpen ? !uploadOpen : uploadOpen,
      deleteAccount: deleteAccount ? !deleteAccount : deleteAccount,
    });
  };

  const handleUpdateRegDetails = () => {
    notificationCtx.profileDataHandler({
      menuBtn: menuBtn,
      passOpen: passOpen ? !passOpen : passOpen,
      updateOpen: !updateOpen,
      uploadOpen: uploadOpen ? !updateOpen : updateOpen,
      deleteAccount: deleteAccount ? !deleteAccount : deleteAccount,
    });
  };

  const handleImageUpload = () => {
    notificationCtx.profileDataHandler({
      menuBtn: menuBtn,
      passOpen: passOpen ? !passOpen : passOpen,
      updateOpen: updateOpen ? !updateOpen : updateOpen,
      deleteAccount: deleteAccount ? !deleteAccount : deleteAccount,
      uploadOpen: !uploadOpen,
    });
  };

  const handleDeleteAccount = () => {
    notificationCtx.profileDataHandler({
      menuBtn: menuBtn,
      passOpen: passOpen ? !passOpen : passOpen,
      updateOpen: updateOpen ? !updateOpen : updateOpen,
      uploadOpen: uploadOpen ? !uploadOpen : uploadOpen,
      deleteAccount: !deleteAccount,
    });
  };

  return (
    <nav className={classes.navigation}>
      {/* <a href="/" className="brand-name">
        MacroSoft
      </a> */}
      <Link href="/">
        <a className={classes.brandName}>
          <Logo />
        </a>
      </Link>
      <button
        className={classes.hamburger}
        onClick={() => {
          setIsNavExpanded(!isNavExpanded);
        }}
      >
        {/* icon from heroicons.com */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="white"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div
        className={`${classes.navigationMenu}  ${
          isNavExpanded ? classes.expanded : classes.notexpanded
        }`}
      >
        <ul>
          <li>
            {/* <a href="/home">Home</a> */}
            <Link href="/posts">
              <a> Posts</a>
            </Link>
          </li>
          <li>
            {/* <a href="/about">About</a> */}
            <Link href="/writers">
              <a>Authors</a>
            </Link>
          </li>
          {session && (
            <li>
              <Link href="/posts/create-post">
                <a>Create Post</a>
              </Link>
            </li>
          )}
          <li>
            <Link href="/contact">
              <a>Contact</a>
            </Link>
          </li>
          {!session && !loading && (
            <li>
              <Link href="/auth">
                <a>Login</a>
              </Link>
            </li>
          )}
          {session && (
            <li>
              <Link href={`/profile/${authorUsername}`}>
                <a>Profile</a>
              </Link>
            </li>
          )}
          {session && (
            <li>
              <a onClick={logoutHandler}>Logout</a>
            </li>
          )}
          {session && router.pathname.indexOf("/profile") > -1 ? (
            <li>
              <a onClick={handlePasswordChange}>Change Password</a>
            </li>
          ) : null}
          {session && router.pathname.indexOf("/profile") > -1 ? (
            <li>
              <a onClick={handleUpdateRegDetails}>
                Update Registration details
              </a>
            </li>
          ) : null}

          {session && router.pathname.indexOf("/profile") > -1 ? (
            <li>
              <a onClick={handleImageUpload}>Upload Image</a>
            </li>
          ) : null}

          {session && router.pathname.indexOf("/profile") > -1 ? (
            <li>
              <a onClick={handleDeleteAccount}>Delete Account</a>
            </li>
          ) : null}

          {session && (
            <li>
              <a className={classes.welcome}>Welcome {authorUsername} </a>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
export default MainNavigation;

//<div className={`${classes.verticalmenu} ${classes.displaybox}`}>
//   <Button onClick={handlePasswordChange}>Change Password</Button>
//   <Button onClick={handleUpdateRegDetails}>
//     Update Registration details
//   </Button>
//   <Button onClick={handleProfileImageUpload}>Upload Profile Image</Button>
//   <Button onClick={handleDeleteAccount}>Delete Account</Button>
// </div>
