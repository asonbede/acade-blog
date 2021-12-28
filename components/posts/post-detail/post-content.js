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
//import { getDomainLocale } from "next/dist/next-server/lib/router/router";
//import { adminArray } from "../../../helpers/db-utils";
async function changeLikeHandler(likedData) {
  const response = await fetch("/api/blog-content/", {
    method: "PATCH",
    body: JSON.stringify(likedData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  console.log(data);
  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }
}

async function sendAuthData(authDetails, setFunc) {
  console.log({ authDetails });
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
  const imagePath = `/images/posts/${post.image}`;
  const linkPath = `/posts/questions/${post.id}`;
  const linkPathForUpdate = `/posts/updates/${post.id}`;
  const linkPathForComment = `/comments/${post.id}`;

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
        <div className={classes.card}>
          <div className={classes.cardprofile}>
            {/* <img
            className={classes.profileimg}
            src="/images/posts/post-profile2.jpg "
            alt=""
          /> */}
            <img
              className={classes.profileimg}
              src="/images/posts/bede-profile.jpg"
              alt={post.title}
              width={150}
              height={150}
            />
            <div
              className={classes.cardprofileinfo}
              style={{ marginTop: "2rem" }}
            >
              <h3 className={classes.profilename} style={{ margin: "0" }}>
                Bede Asonye
              </h3>
              <span className={classes.profilefollowers}>
                (Msc Biochemistry)
              </span>
            </div>
          </div>
          <div className={classes.cardbanner}>
            {/* <p class="category-tag technology">Biryani</p>  */}
            <Image
              className={classes.bannerimg}
              src={imagePath}
              alt="banner"
              width={900}
              height={800}
            />
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
            <h2 className={classes.blogtitle}>{post.title}</h2>
            <h3 className={classes.excerpt}>
              {post.excerpt}{" "}
              <button onClick={handleContenButText}>{contenButText}</button>
            </h3>
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
    </div>
  );
}

export default PostContent;
