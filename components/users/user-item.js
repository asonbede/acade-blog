import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import classes from "./user-item.module.css";
//import DisplayEditorContent from "../rich-text-editor/display-editor-content";
async function sendAuthData(authDetails, setFunc) {
  const response = await fetch("/api/moderating-post", {
    method: "POST",
    body: JSON.stringify(authDetails),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  //console.log({ data }, "authDetails");
  if (!response.ok) {
    // throw new Error(data.message || "Something went wrong!");
    setFunc(false);
  } else {
    setFunc(data.message);
  }
}

function UserItem(props) {
  const { id, email, name, interest, imageLink } = props.post;

  const [moderatedValue, setmoderatedValue] = useState();

  //const adminArray = [process.env.admin_1, process.env.admin_2];
  //console.log(props.post, "content333");
  // const { authorId } = post;
  //   useEffect(() => {
  //     const result = sendAuthData({ authorId, moderated }, setmoderatedValue);

  //     //console.log({ result }, "postContent");
  //     // return () => {
  //     //   cleanup
  //     // }
  //   }, [authorId, moderated]);

  //   const formattedDate = new Date(date).toLocaleDateString("en-US", {
  //     day: "numeric",
  //     month: "long",
  //     year: "numeric",
  //   });

  const imagePath = `/images/posts/${image}`;
  const linkPath = `/posts/${id}`;
  //className={moderatedValue ? classes.showItem : classes.hideItem}
  return (
    <div>
      {/* {!moderated && (
        <span style={{ color: "red" }}>
          {" "}
          Post examination in progressing, this may take a while, until this
          action is complete only you can see this post, newly created or
          updated post are examined by the admin before it is shown to the
          public. This message will be removed as soon as the process is
          complete. You may continue to work on your post while this process is
          on...
        </span>
      )} */}
      <li className={classes.post}>
        <div className={classes.image}>
          <img
            src={imageLink}
            alt={title}
            width={200}
            height={100}
            layout="responsive"
          />
        </div>
        <div className={classes.content}>
          {/* <h3>{title}</h3>

              <time>{formattedDate}</time> */}
          <p>{interest}</p>
          {/* <p>{excerpt}</p> */}
        </div>

        <div className={classes.cardprofile}>
          {/* <img
            className={classes.profileimg}
            src={props.post.imageProfileUrl}
            alt="bede image"
          /> */}
          <div className={classes.cardprofileinfo}>
            <h3 className={classes.profilename}>{name}</h3>
            <p className={classes.profilefollowers}>15 posts</p>
            <button onClick={() => "author details clicked"}>
              See More About This Author
            </button>
          </div>
        </div>
        <br />
        <br />
      </li>
    </div>
  );
}

export default UserItem;
