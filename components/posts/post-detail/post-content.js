//import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { useContext, useState, useEffect } from "react";
//import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
//import atomDark from "react-syntax-highlighter/dist/cjs/styles/prism/atom-dark";
//import js from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";
//import css from "react-syntax-highlighter/dist/cjs/languages/prism/css";
import DisplayEditorContent from "../../rich-text-editor/display-editor-content";
//import PostHeader from "./post-header";
import classes from "./post-content.module.css";
import Link from "next/dist/client/link";
import { useRouter } from "next/router";

// SyntaxHighlighter.registerLanguage("js", js);
// SyntaxHighlighter.registerLanguage("css", css);
//import NotificationContext from "../../store/notification-context";
import NotificationContext from "../../../store/notification-context";
import { useSession, signOut } from "next-auth/client";
import AnimatedOrbitalDiag from "../../miscellaneous/animated-orbital-diag";
import PeriodicTableOfElem from "../../miscellaneous/periodic-table";

//import { getDomainLocale } from "next/dist/next-server/lib/router/router";
//import { adminArray } from "../../../helpers/db-utils";
const replaceBannerImg = {
  "61f946e3e72eb408e83024f5": () => <AnimatedOrbitalDiag />,
  "62106ec04c9caa17288669ce": () => <PeriodicTableOfElem />,
};
async function changeLikeHandler(likedData) {
  const response = await fetch("/api/blog-content/", {
    method: "PATCH",
    body: JSON.stringify(likedData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  // console.log(data);
  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }
}

async function sendAuthData(authDetails, setFunc) {
  //console.log({ authDetails });
  const response = await fetch("/api/restrict-route", {
    method: "POST",
    body: JSON.stringify(authDetails),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  console.log({ data }, "authDetails");
  console.log({ data }, "authDetails");
  if (!response.ok) {
    setFunc(false);
    //throw new Error(data.message || "Something went wrong!");
  } else {
    setFunc(data.message);
  }
}

async function sendAuthDataModerate(authDetails, setFunc) {
  const response = await fetch("/api/moderating-post", {
    method: "POST",
    body: JSON.stringify(authDetails),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  console.log({ data }, "authDetails");
  if (!response.ok) {
    // throw new Error(data.message || "Something went wrong!");
    setFunc(false);
  } else {
    setFunc(data.message);
  }
}

function PostContent(props) {
  const { post } = props;
  const notificationCtx = useContext(NotificationContext);
  const router = useRouter();
  const imagePath = post.image;
  console.log(imagePath, "post-content");
  console.log(post.id, "post for animation");

  const linkPath = `/posts/questions/${post.id}`;
  const linkPathForUpdate = `/posts/updates/${post.id}`;
  const linkPathForComment = `/comments/${post.id}`;
  console.log(post.imageProfileUrl, "profile-image");
  console.log({ linkPathForUpdate });
  const [session, loading] = useSession();
  const [isContentOpen, setisContentOpen] = useState(false);
  const [contenButText, setcontenButText] = useState("Read More");
  const [authValue, setauthValue] = useState();
  const [moderatedValue, setmoderatedValue] = useState();
  let likeNo;
  //const adminArray = [process.env.admin_1, process.env.admin_2];
  //console.log({ post }, "content");
  const { authorId, moderated } = post;
  useEffect(() => {
    const result = sendAuthData({ authorId }, setauthValue);
    console.log({ result });
    //setauthValue(result.message);
    //console.log({ result }, "postContent");
    // return () => {
    //   cleanup
    // }
  }, [session, authorId]);

  useEffect(() => {
    const result = sendAuthDataModerate(
      { authorId, moderated },
      setmoderatedValue
    );

    //console.log({ result }, "postContent");
    // return () => {
    //   cleanup
    // }
  }, [authorId, moderated]);

  const handleUpdateData = () => {
    console.log("from handle update");
    notificationCtx.blogUpdateHandler({
      post,
      idValue: post.id,
    });
    router.push(linkPathForUpdate);
  };
  if (post.likes) {
    likeNo = post.likes.likeValue;
  } else {
    likeNo = 0;
  }

  const deletePostHandler = async () => {
    notificationCtx.showNotification({
      title: "Deleting blog...",
      message: "Your blog is currently being deleted from the database.",
      status: "pending",
    });
    try {
      const response = await fetch("/api/blog-content", {
        method: "DELETE",
        body: JSON.stringify({ blogId: post.id }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      notificationCtx.showNotification({
        title: "Success!",
        message: "Your blog was deleted!",
        status: "success",
      });
      router.push("/");
    } catch (error) {
      //setRequestError(error.message);
      //setRequestStatus("error");
      notificationCtx.showNotification({
        title: "Error!",
        message: error.message || "Something went wrong!",
        status: "error",
      });
    }
  };

  const deleteConfirm = () => {
    const responseValue = confirm(
      "Are you really sure that you want to delete this post?"
    );
    if (responseValue) {
      deletePostHandler();
    }
  };

  const checkLikeObject = (likeObj, usernameValue) => {
    let newLikeObj = {};
    for (const key in likeObj) {
      if (Object.hasOwnProperty.call(likeObj, key)) {
        const element = likeObj[key];
        if (element === usernameValue) {
          continue;
        }
        newLikeObj[key] = element;
      }
    }
    newLikeObj = { ...newLikeObj, likeValue: newLikeObj.likeValue - 1 };
    return newLikeObj;
  };
  const handleLikeBlog = async () => {
    //check whether the blog has likes field
    //if it has not put the like field
    //if it has, check whether the user has likeed it before
    //if he has liked it before remove him and decrease the liked
    //else increase the liked.

    let newPost;
    if (!session) {
      notificationCtx.showNotification({
        title: "Liking blog operation aborted...",
        message: "Your have to login to like blogs.",
        status: "pending",
      });
      return;
    }
    notificationCtx.showNotification({
      title: "Liking blog...",
      message: "Your blog like request is being executed please wait.",
      status: "pending",
    });
    if (post.likes) {
      //has the current user already liked
      const hasAlreadyLiked =
        Object.values(post.likes).indexOf(session.user.name) > -1;
      if (hasAlreadyLiked) {
        //newPost = checkLikeObject(post.likes, session.user.name);
        newPost = {
          ...post,
          likes: checkLikeObject(post.likes, session.user.name),
        };
        console.log({ newPost }, "ONE");
      } else {
        newPost = {
          ...post,
          likes: {
            ...post.likes,
            [session.user.email]: session.user.name,
            likeValue: post.likes.likeValue + 1,
          },
        };
      }
    } else {
      newPost = {
        ...post,
        likes: { [session.user.email]: session.user.name, likeValue: 1 },
      };
    }
    console.log({ newPost }, "TWO");
    try {
      await changeLikeHandler(newPost);
      notificationCtx.showNotification({
        title: "Success!",
        message: "Your blog like operation was successfull!",
        status: "success",
      });
      router.push(`/posts/${post.id}`);
    } catch (error) {
      notificationCtx.showNotification({
        title: "Error!",
        message: error.message || "Something went wrong!",
        status: "error",
      });
    }
  };
  const handleContenButText = () => {
    setisContentOpen(!isContentOpen);
    if (contenButText === "Read More") {
      setcontenButText("Read Less");
    } else {
      setcontenButText("Read More");
    }
  };
  return (
    <div className={moderatedValue ? classes.showItem : classes.hideItem}>
      {!moderated && (
        <span style={{ color: "red" }}>
          {" "}
          Moderation in progressing, this may take a while, until this action is
          complete only you can see this post, newly created or updated post are
          examined by the admin before it is shown to the public.This message
          will be removed as soon as the process is complete. You may continue
          to work on your post while this process is on...
        </span>
      )}

      <article className={classes.content}>
        {/* <img src="" alt="proble-solved" /> */}
        <div className={classes.card}>
          <div className={classes.cardprofile}>
            {/* <img
            className={classes.profileimg}
            src="/images/posts/post-profile2.jpg "
            alt=""
          /> */}
            <img
              className={classes.profileimg}
              src={post.imageProfileUrl}
              alt={post.title}
              width={150}
              height={150}
            />
            <div
              className={classes.cardprofileinfo}
              style={{ marginTop: "2rem" }}
            >
              <h3 className={classes.profilename} style={{ margin: "0" }}>
                {post.author}
              </h3>
              <span className={classes.profilefollowers}>
                (Msc Biochemistry)
              </span>
            </div>
          </div>
          <div className={classes.cardbanner}>
            {/* <p class="category-tag technology">Biryani</p>  */}
            {post.id in replaceBannerImg ? (
              replaceBannerImg[post.id]()
            ) : (
              <img
                className={classes.bannerimg}
                src={imagePath}
                alt="banner"
                width={900}
                height={800}
              />
            )}

            {/* <div className={classes.blogdescription} style={{ width: "100%" }}> */}
            {/* <div className={classes.mainImage}>
              <DisplayEditorContent
                contentFromServer={post.image}
                toolbarPresent={false}
              />
            </div> */}

            {/* </div> */}
          </div>
          <div className={classes.cardbody}>
            <div className={classes.buttonAction}>
              <Link href={linkPath}>
                <a>Review Questions</a>
              </Link>

              <Link href={linkPathForComment}>
                <a> comments</a>
              </Link>

              <button onClick={handleLikeBlog}>
                <span>{likeNo}</span> like
              </button>
              {authValue && <button onClick={handleUpdateData}>Update</button>}
              {authValue && <button onClick={deleteConfirm}>Delete</button>}
              {/* {(session && session.user.email === post.authorId) ||
            (session && adminArray.includes(session.user.email)) ? (
              <button onClick={handleUpdateData}>Update</button>
            ) : null} */}
              {/* {(session && session.user.email === post.authorId) ||
            (session && adminArray.includes(session.user.email)) ? (
              <button onClick={deleteConfirm}>Delete</button>
            ) : null} */}
            </div>
            {/* <p className={classes.bloghashtag}>#Biryani #Food</p> */}
            <h3 className={classes.blogtitle}>{post.title}</h3>
            <h5 className={classes.excerpt}>
              {post.excerpt}{" "}
              <button onClick={handleContenButText}>{contenButText}</button>
            </h5>
            <div className={classes.blogdescription} style={{ width: "100%" }}>
              {isContentOpen && (
                <DisplayEditorContent
                  contentFromServer={post.content}
                  toolbarPresent={false}
                />
              )}
            </div>
          </div>
        </div>
      </article>
      {/* <ElectronFig /> */}
      {/* <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width="400"
        height="250"
        style={{ border: "2px solid red" }}
      >
        <rect
          x="20%"
          y="80%"
          height="3em"
          width="3em"
          style={{ stroke: "#0f0f0f", fill: "#eff1ef" }}
        />

        <rect
          x="20%"
          y="40%"
          height="3em"
          width="3em"
          style={{ stroke: "#0f0f0f", fill: "#eff1ef" }}
        />

        <rect
          x="40%"
          y="30%"
          height="3em"
          width="12em"
          style={{ stroke: "#0f0f0f", fill: "#eff1ef" }}
        />
        <line
          x1="55%"
          y1="30%"
          x2="55%"
          y2="49%"
          style={{ stroke: "#006600" }}
        />
        <line
          x1="70%"
          y1="30%"
          x2="70%"
          y2="49%"
          style={{ stroke: "#006600" }}
        />

        <defs>
          <marker
            id="markerArrow"
            markerWidth="13"
            markerHeight="13"
            refX="2"
            refY="6"
            orient="auto"
          >
            <path d="M2,2 L2,11 L10,6 L2,2" style={{ fill: "#000000" }} />
          </marker>
        </defs>

        <line
          x1="22%"
          y1="82%"
          x2="22%"
          y2="92%"
          style={{
            stroke: "#6666ff",
            strokeWidth: "1px",
            fill: "none",

            markerEnd: "url(#markerArrow)",
          }}
        />

        <line
          x2="26%"
          y2="84%"
          x1="26%"
          y1="94%"
          title="this electron"
          style={{
            stroke: "#6666ff",
            strokeWidth: "1px",
            fill: "none",

            markerEnd: "url(#markerArrow)",
          }}
        />

        <line
          x1="22%"
          y1="42%"
          x2="22%"
          y2="52%"
          style={{
            stroke: "#6666ff",
            strokeWidth: "1px",
            fill: "none",

            markerEnd: "url(#markerArrow)",
          }}
        />

        <line
          x1="26%"
          y1="54%"
          x2="26%"
          y2="44%"
          style={{
            stroke: "#6666ff",
            strokeWidth: "1px",
            fill: "none",

            markerEnd: "url(#markerArrow)",
          }}
        />

        <line
          x2="46%"
          y2="45%"
          x1="46%"
          y1="32%"
          style={{
            stroke: "#6666ff",
            strokeWidth: "1px",
            fill: "none",

            markerEnd: "url(#markerArrow)",
          }}
        />

        <line
          x2="60%"
          y2="45%"
          x1="60%"
          y1="32%"
          style={{
            stroke: "#6666ff",
            strokeWidth: "1px",
            fill: "none",

            markerEnd: "url(#markerArrow)",
          }}
        />

        <line
          x1="77%"
          y1="47%"
          x2="77%"
          y2="34%"
          style={{
            stroke: "#6666ff",
            strokeWidth: "1px",
            fill: "none",

            markerEnd: "url(#markerArrow)",
          }}
        />

        <text
          x="22%"
          y="38%"
          style={{ fill: "#000000", stroke: "none", fontSize: "20px" }}
          title="2p text hereee"
        >
          2s
        </text>
        <text
          x="56%"
          y="28%"
          style={{ fill: "#000000", stroke: "none", fontSize: "20px" }}
        >
          2p
        </text>

        <text
          x="20%"
          y="78%"
          style={{ fill: "#000000", stroke: "none", fontSize: "20px" }}
        >
          1s
          <title>1s electron text</title>
        </text>

        <line
          x2="100%"
          y2="15%"
          x1="0%"
          y1="15%"
          style={{ stroke: "#6666ff", strokeWidth: "1px", fill: "none" }}
        />

        <text
          x="40%"
          y="10%"
          style={{ fill: "#000000", stroke: "none", fontSize: "20px" }}
        >
          Diagram C
        </text>
      </svg> */}
    </div>
  );
}

export default PostContent;
