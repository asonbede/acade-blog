import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import classes from "./post-item.module.css";
import { useRouter } from "next/router";
import Button from "../ui/button";
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

function PostItem(props) {
  const {
    title,
    image,
    excerpt,
    date,
    slug,
    id,
    moderated,
    authorId,
    authorusername,
  } = props.post;

  const [moderatedValue, setmoderatedValue] = useState();
  const [localStorageSet, setlocalStorageSet] = useState(false);
  const router = useRouter();
  //const adminArray = [process.env.admin_1, process.env.admin_2];
  //console.log(props.post, "content333");
  // const { authorId } = post;
  useEffect(() => {
    const result = sendAuthData({ authorId, moderated }, setmoderatedValue);

    //console.log({ result }, "postContent");
    // return () => {
    //   cleanup
    // }
  }, [authorId, moderated]);

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const imagePath = `/images/posts/${image}`;
  const linkPath = `/posts/${id}`;
  const handleLocalStorage = () => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("post", JSON.stringify(props.post));
      window.localStorage.setItem("blogid", JSON.stringify(id));
      setlocalStorageSet(!localStorageSet);
      router.push(`/profile/${authorusername}`);
    }
  };

  return (
    // <div className={moderatedValue ? classes.showItem : classes.hideItem}>
    //   {!moderated && (
    //     <span style={{ color: "red" }}>
    //       {" "}
    //       Post examination in progressing, this may take a while, until this
    //       action is complete only you can see this post, newly created or
    //       updated post are examined by the admin before it is shown to the
    //       public. This message will be removed as soon as the process is
    //       complete. You may continue to work on your post while this process is
    //       on...
    //     </span>
    //   )}
    //   <li className={classes.post}>
    //             <div className={classes.content}>
    //       <h3>{title}</h3>

    //       <time>{formattedDate}</time>

    //       <p>{excerpt}</p>
    //     </div>
    //     {/* </a> */}

    //     {/* </Link> */}
    //     <div className={classes.cardprofile}>
    //       <img
    //         className={classes.profileimg}
    //         src={props.post.imageProfileUrl}
    //         alt="bede image"
    //       />
    //       <div className={classes.cardprofileinfo}>
    //         <h3 className={classes.profilename}>{props.post.author}</h3>
    //         {/* <p className={classes.profilefollowers}>5.2k followers</p> */}
    //         {router.pathname.indexOf("/profile") === -1 && (
    //           <Button onClick={handleLocalStorage}>Read More</Button>
    //         )}
    //         {router.pathname.indexOf("/profile") > -1 && (
    //           <Button onClick={() => props.onSelectMenu(id)}>Read More</Button>
    //         )}
    //       </div>
    //     </div>
    //     <br />
    //     <br />
    //   </li>
    // </div>
    <div className="col-md-6">
      <div className="card d-5  w-sm-90">
        <div className="card-header">
          <h3>{title}</h3>
        </div>
        <div className="card-body">
          {/* <h4 className="card-title">{title}</h4> */}
          <time>{formattedDate}</time>
          <p className="card-text">{excerpt}</p>

          {router.pathname.indexOf("/profile") === -1 && (
            <button
              class="btn btn btn-block btn-outline-dark"
              onClick={handleLocalStorage}
              type="button"
            >
              Read More
            </button>
          )}
          {router.pathname.indexOf("/profile") > -1 && (
            // <button onClick={() => props.onSelectMenu(id)}>Read More</button>

            <button
              class="btn btn btn-block btn-outline-dark"
              onClick={() => props.onSelectMenu(id)}
              type="button"
            >
              Read More
            </button>
          )}
        </div>
        <div className="d-flex align-items-center">
          <img
            // className={classes["post-image"]}
            src={props.post.imageProfileUrl}
            class="rounded-circle mb-3 img-fluid"
            alt="card image"
          />
          <p className="card-text">{props.post.author}</p>
        </div>
      </div>
    </div>
  );
}

export default PostItem;
