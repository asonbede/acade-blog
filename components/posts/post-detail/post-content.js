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
function PostContent(props) {
  const { post } = props;
  const notificationCtx = useContext(NotificationContext);
  const router = useRouter();
  const imagePath = `/images/posts/${post.image}`;
  const linkPath = `/posts/questions/${post.id}`;
  const linkPathForUpdate = `/posts/updates/${post.id}`;
  console.log({ linkPathForUpdate });
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
      title: "Deletind blog...",
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
            style={{ marginTop: "2rem" }}>
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
              <Link href="#">
                <a> comments</a>
              </Link>
              <button onClick={handleUpdateData}>Update</button>
              <button>like</button>
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
