//import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { useContext } from "react";
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
  const handleUpdateData = () => {
    console.log("from handle update");
    notificationCtx.blogUpdateHandler({
      post,
      idValue: post.id,
    });
    router.push(linkPathForUpdate);
  };

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
    newLikeObj = { ...newLikeObj, likes: newLikeObj.likeValue - 1 };
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
        newPost = checkLikeObject(post.likes, session.user.name);
      } else {
        newPost = {
          ...post,
          likes: {
            ...post.likes,
            username: sessionStorage.user.name,
            likeValue: post.likes.likeValue + 1,
          },
        };
      }
    } else {
      newPost = {
        ...post,
        likes: { username: session.user.name, likeValue: 1 },
      };
    }
    try {
      await changeLikeHandler(newPost);
      notificationCtx.showNotification({
        title: "Success!",
        message: "Your blog like operation was successfull!",
        status: "success",
      });
    } catch (error) {
      notificationCtx.showNotification({
        title: "Error!",
        message: error.message || "Something went wrong!",
        status: "error",
      });
    }
  };
  return (
    <article className={classes.content}>
      <div className={classes.card}>
        <div className={classes.cardprofile}>
          {/* <img
            className={classes.profileimg}
            src="/images/posts/post-profile2.jpg "
            alt=""
          /> */}
          <Image
            className={classes.profileimg}
            src="/images/posts/post-profile2.jpg"
            alt={post.title}
            width={250}
            height={200}
          />
          <div
            className={classes.cardprofileinfo}
            style={{ marginTop: "2rem" }}
          >
            <h3 className={classes.profilename} style={{ margin: "0" }}>
              Darrell Steward
            </h3>
            <span className={classes.profilefollowers}>15.7k followers</span>
          </div>
        </div>
        <div className={classes.cardbanner}>
          {/* <p class="category-tag technology">Biryani</p>  */}
          <Image
            className={classes.bannerimg}
            src={imagePath}
            alt=""
            width={700}
            height={300}
          />
        </div>
        <div className={classes.cardbody}>
          <div className={classes.cardprofile}>
            <Link href={linkPath}>
              <a>Review Questions</a>
            </Link>
            <div className={classes.cardprofileinfo}>
              <Link href={linkPathForComment}>
                <a> comments</a>
              </Link>
              <button onClick={handleUpdateData}>Update</button>
              <button onClick={handleLikeBlog}>like</button>
              <button>dislike</button>
              <button onClick={deleteConfirm}>Delete</button>
            </div>
          </div>
          <p className={classes.bloghashtag}>#Biryani #Food</p>
          <h2 className={classes.blogtitle}>{post.title}</h2>
          <h3 className={classes.excerpt}>{post.excerpt}</h3>
          <div className={classes.blogdescription} style={{ width: "100%" }}>
            <DisplayEditorContent
              contentFromServer={post.content}
              toolbarPresent={false}
            />
          </div>
        </div>
      </div>
    </article>
  );
}

export default PostContent;
