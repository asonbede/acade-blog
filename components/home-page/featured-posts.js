import React, { useState, useEffect } from "react";
import PostsGrid from "../posts/posts-grid";
import classes from "./featured-posts.module.css";
import PostMenu from "../post-menu/post-menu";
import { useRouter } from "next/router";
import PostContent from "../posts/post-detail/post-content";
function FeaturedPosts(props) {
  const [post, setpost] = useState();
  const [gridControl, setgridControl] = useState(true);
  const [toggleMenu, settoggleMenu] = useState(false);
  const [selectId, setselectId] = useState();

  console.log({ post }, "from-featured");
  const router = useRouter();
  console.log({ toggleMenu });
  const onSelectMenu = (blogId) => {
    console.log("onselected called");
    console.log(blogId, "onselected called");
    console.log(router.pathname, "profile called");
    //setgridControl(false);
    const postObj = props.posts.find((item) => item.id === blogId);
    setselectId(blogId);
    setpost(postObj);
  };
  let localId;
  let localPost;

  if (
    typeof window !== "undefined" &&
    router.pathname.indexOf("/profile") > -1
  ) {
    localPost = JSON.parse(window.localStorage.getItem("post"));
    localId = JSON.parse(window.localStorage.getItem("blogid"));
    //setlocalStorageSet(!localStorageSet);
  }
  useEffect(() => {
    if (localId && router.pathname.indexOf("/profile") > -1) {
      console.log({ localPost });
      setpost(localPost);
      setselectId(localId);
      //onSelectMenu(localId);
      window.localStorage.setItem("post", null);
      window.localStorage.setItem("blogid", null);
    }
  }, [localId]);

  return (
    <section
      className={`${classes.latest} ${
        router.pathname.indexOf("/profile") > -1 ? classes.displayProfile : ""
      }`}
    >
      <div className={classes.menuProfile}>
        {router.pathname.indexOf("/profile") > -1 ? (
          <PostMenu
            posts={props.posts}
            onSelectMenu={onSelectMenu}
            setselectId={selectId}
          />
        ) : null}
      </div>
      <div
        className={`${
          router.pathname.indexOf("/profile") > -1
            ? classes.postcontandgridCont
            : ""
        }  ${toggleMenu ? classes.showmenu : classes.hidemenu}`}
      >
        {router.pathname.indexOf("/profile") > -1 && (
          <button onClick={() => settoggleMenu(!toggleMenu)}>
            {toggleMenu ? "Hide Menu" : "Show Menu"}
          </button>
        )}
        {router.pathname.indexOf("/profile") > -1 && post ? (
          <button
            onClick={() => {
              setpost(null);
              setselectId(null);
            }}
          >
            Author Cards
          </button>
        ) : null}
        {!post && (
          <section>
            {" "}
            <PostsGrid posts={props.posts} onSelectMenu={onSelectMenu} />{" "}
          </section>
        )}
        {post && (
          <article>
            <PostContent post={post} />
          </article>
        )}
      </div>
    </section>
  );
}

export default FeaturedPosts;
