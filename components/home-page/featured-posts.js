import React, { useState } from "react";
import PostsGrid from "../posts/posts-grid";
import classes from "./featured-posts.module.css";
import PostMenu from "../post-menu/post-menu";
import { useRouter } from "next/router";
import PostContent from "../posts/post-detail/post-content";
function FeaturedPosts(props) {
  const [post, setpost] = useState();
  const [gridControl, setgridControl] = useState(true);
  console.log({ post }, "from-featured");
  const router = useRouter();

  const onSelectMenu = (blogId) => {
    console.log("onselected called");
    console.log(blogId, "onselected called");
    console.log(router.pathname, "profile called");
    //setgridControl(false);
    const postObj = props.posts.find((item) => item.id === blogId);
    setpost(postObj);
  };

  return (
    <section
      className={`${classes.latest} ${
        router.pathname.indexOf("/profile") > -1 ? classes.displayProfile : ""
      }`}
    >
      <div>
        {router.pathname.indexOf("/profile") > -1 ? (
          <PostMenu
            posts={props.posts}
            onSelectMenu={onSelectMenu}
            className={classes.menuProfile}
          />
        ) : null}
      </div>
      <div
        className={`${
          router.pathname.indexOf("/profile") > -1
            ? classes.postcontandgridCont
            : ""
        }`}
      >
        {!post && (
          <section>
            {" "}
            <PostsGrid posts={props.posts} />{" "}
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
// @media (min-width: 768px) {
//   .latest h2 {
//     font-size: var(--size-16);
//   }
// }
