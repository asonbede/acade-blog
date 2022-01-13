import Link from "next/link";

import Logo from "./logo";
import classes from "./main-navigation.module.css";
import { useSession, signOut } from "next-auth/client";
import { useRouter } from "next/router";
import MenuButton from "../auth/menu-button";
function MainNavigation() {
  const [session, loading] = useSession();
  const router = useRouter();
  //console.log({ session });
  let name, interest, imageLink, queryStr;
  if (session) {
    name = session.user.name;
    interest = session.user.image.split("??")[1];
    imageLink = session.user.image.split("??")[0];
    //queryStr = `?name=${name}&description=${interest}&imageLink=${imageLink}`;
  }
  function logoutHandler() {
    signOut();
    // router.replace("/");
  }
  return (
    <header className={classes.header}>
      <Link href="/">
        <a>
          <Logo />
        </a>
      </Link>
      <nav>
        <ul>
          <li>
            <Link href="/posts">
              <a>Posts </a>
            </Link>
          </li>
          <li>
            <Link href="/writers">
              <a>Authors </a>
            </Link>
          </li>
          {session && (
            <li>
              <Link href="/posts/create-post">
                <a>Create Post </a>
              </Link>
            </li>
          )}
          <li>
            <Link href="/contact">
              <a>Contact </a>
            </Link>
          </li>
          {!session && !loading && (
            <li>
              <Link href="/auth">
                <a>Login </a>
              </Link>
            </li>
          )}
          {session && (
            <li>
              <Link href={`/profile/${session.user.email}`}>
                <a>Profile</a>
              </Link>
            </li>
          )}
          {session && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
          {session && (
            <li style={{ color: "white" }}>Welcome {session.user.name}</li>
          )}
          {session && router.pathname.indexOf("/profile") > -1 ? (
            <li style={{ color: "white" }}>
              <MenuButton />
            </li>
          ) : null}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
