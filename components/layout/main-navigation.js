import Link from "next/link";

import Logo from "./logo";
import classes from "./main-navigation.module.css";
import { useSession, signOut } from "next-auth/client";
import { useRouter } from "next/router";
import MenuButton from "../auth/menu-button";
function MainNavigation() {
  const [session, loading] = useSession();
  const router = useRouter();
  console.log({ session });
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
            <Link href="/posts">Posts</Link>
          </li>
          {session && (
            <li>
              <Link href="/posts/create-post">Create Post</Link>
            </li>
          )}
          <li>
            <Link href="/contact">Contact</Link>
          </li>
          {!session && !loading && (
            <li>
              <Link href="/auth">Login</Link>
            </li>
          )}
          {session && (
            <li>
              <Link href="/profile">Profile</Link>
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
          {session && router.pathname === "/profile" ? (
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
