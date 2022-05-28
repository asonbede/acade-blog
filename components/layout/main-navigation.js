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
    // router.replace("/auth");
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

  <button
    class="btn btn-primary btn-lg"
    data-bs-toggle="modal"
    data-bs-target="#enroll"
  >
    Start The Enrollment
  </button>;

  return (
    <nav
      className="navbar navbar-expand-lg  navbar-dark"
      id="nav-bar"
      style={{ backgroundColor: "#ff4d67" }}
    >
      <div className="container-fluid">
        <Link href="/">
          <a className={`${classes["navbar-brand"]}`}>Asonbiditeck</a>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapsibleNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse`} id="collapsibleNavbar">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link href="/posts">
                <a className="nav-link"> Posts</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/writers">
                <a className="nav-link">Authors</a>
              </Link>
            </li>
            {session && (
              <li className="nav-item">
                <Link href="/posts/create-post">
                  <a className="nav-link">Create Post</a>
                </Link>
              </li>
            )}
            <li className="nav-item">
              <Link href="/contact">
                <a className="nav-link">Contact</a>
              </Link>
            </li>
            {!session && !loading && (
              <li className="nav-item">
                <Link href="/auth">
                  <a className="nav-link">Login</a>
                </Link>
              </li>
            )}

            {session && (
              <li className="nav-item">
                <Link href={`/profile/${authorUsername}`}>
                  <a className="nav-link">Profile</a>
                </Link>
              </li>
            )}

            {session && (
              <li className="nav-item">
                <a onClick={logoutHandler} className="nav-link">
                  Logout
                </a>
              </li>
            )}
            {session && router.pathname.indexOf("/profile") > -1 ? (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  My account
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <button
                      // class="btn btn-primary btn-sm"
                      data-bs-toggle="modal"
                      data-bs-target="#enroll"
                      // onClick={handlePasswordChange}
                      className="dropdown-item"
                    >
                      Change Password
                    </button>
                  </li>

                  <li>
                    <button
                      onClick={handleUpdateRegDetails}
                      className="dropdown-item"
                    >
                      Update Registration details
                    </button>
                  </li>
                  <li>
                    <button
                      // onClick={handleImageUpload}

                      data-bs-toggle="modal"
                      data-bs-target="#imageupload"
                      className="dropdown-item"
                    >
                      Upload Image
                    </button>
                  </li>
                  <li>
                    <button
                      data-bs-toggle="modal"
                      data-bs-target="#reviewTestimonial"
                      className="dropdown-item"
                    >
                      Write Review
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={handleDeleteAccount}
                      className="dropdown-item"
                    >
                      Delete Account
                    </button>
                  </li>
                </ul>
              </li>
            ) : null}
            {session && (
              <span class="navbar-text">Welcome {authorUsername}</span>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
export default MainNavigation;
// <nav className={classes.navigation}>
//   {/* <a href="/" className="brand-name">
//     MacroSoft
//   </a> */}
//   <Link href="/">
//     <a className={classes.brandName}>
//       <Logo />
//     </a>
//   </Link>
//   <button
//     className={classes.hamburger}
//     onClick={() => {
//       setIsNavExpanded(!isNavExpanded);
//     }}
//   >
//     {/* icon from heroicons.com */}
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       className="h-5 w-5"
//       viewBox="0 0 20 20"
//       fill="white"
//     >
//       <path
//         fillRule="evenodd"
//         d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
//         clipRule="evenodd"
//       />
//     </svg>
//   </button>
//   <div
//     className={`${classes.navigationMenu}  ${
//       isNavExpanded ? classes.expanded : classes.notexpanded
//     }`}
//   >
//     <ul>
//       <li>
//         {/* <a href="/home">Home</a> */}
//         <Link href="/posts">
//           <a> Posts</a>
//         </Link>
//       </li>
//       <li>
//         {/* <a href="/about">About</a> */}
//         <Link href="/writers">
//           <a>Authors</a>
//         </Link>
//       </li>
//       {session && (
//         <li>
//           <Link href="/posts/create-post">
//             <a>Create Post</a>
//           </Link>
//         </li>
//       )}
//       <li>
//         <Link href="/contact">
//           <a>Contact</a>
//         </Link>
//       </li>
//       {!session && !loading && (
//         <li>
//           <Link href="/auth">
//             <a>Login</a>
//           </Link>
//         </li>
//       )}
//       {session && (
//         <li>
//           <Link href={`/profile/${authorUsername}`}>
//             <a>Profile</a>
//           </Link>
//         </li>
//       )}
//       {session && (
//         <li>
//           <a onClick={logoutHandler}>Logout</a>
//         </li>
//       )}
//       {session && router.pathname.indexOf("/profile") > -1 ? (
//         <li>
//           <a onClick={handlePasswordChange}>Change Password</a>
//         </li>
//       ) : null}
//       {session && router.pathname.indexOf("/profile") > -1 ? (
//         <li>
//           <a onClick={handleUpdateRegDetails}>
//             Update Registration details
//           </a>
//         </li>
//       ) : null}

//       {session && router.pathname.indexOf("/profile") > -1 ? (
//         <li>
//           <a onClick={handleImageUpload}>Upload Image</a>
//         </li>
//       ) : null}

//       {session && router.pathname.indexOf("/profile") > -1 ? (
//         <li>
//           <a onClick={handleDeleteAccount}>Delete Account</a>
//         </li>
//       ) : null}

//       {session && (
//         <li>
//           <a className={classes.welcome}>Welcome {authorUsername} </a>
//         </li>
//       )}
//     </ul>
//   </div>
// </nav>
// csss
