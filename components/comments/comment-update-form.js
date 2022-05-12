import { useState, useContext, useEffect } from "react";
import classes from "./new-comment.module.css";
import MyRichEditor from "../rich-text-editor/myrich-text-editor";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import NotificationContext from "../../store/notification-context";
import {
  useField,
  useEditor,
  handleImageInsert,
} from "../../hooks/input-editor-hooks";

function UpdateComment(props) {
  const [isInvalid, setIsInvalid] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [imageProfileUrlValue, setimageProfileUrlValue] = useState();
  const [moderated, setmoderated] = useState(false);
  const [blogId, setblogId] = useState();
  const [authorUsername, setauthorUsername] = useState();
  const router = useRouter();
  const [session, loading] = useSession();
  const notificationCtx = useContext(NotificationContext);
  //  `/comments/${post.id}`
  // const emailInputRef = useRef();
  // const nameInputRef = useRef();
  // const commentInputRef = useRef();
  const useEditorContent = useEditor();

  const {
    url: enteredContent,
    editorState,
    onEditorStateChange,
  } = useEditorContent;

  const commentUpdateObj = notificationCtx.commentUpdateObj;
  const { text, commentId } = commentUpdateObj;
  //hjjjjjjjjkk
  useEffect(() => {
    if (session) {
      session.user.email === "asonbede@gmail.com"
        ? setimageProfileUrlValue(text.imageProfileUrl)
        : setimageProfileUrlValue(session.user.image.imageUrl);
      //setimageProfileUrlValue(post.imageProfileUrl);

      session.user.email === "asonbede@gmail.com"
        ? setName(text.name)
        : setName(session.user.name.name);

      session.user.email === "asonbede@gmail.com"
        ? setEmail(text.email)
        : setEmail(session.user.email);

      session.user.email === "asonbede@gmail.com"
        ? setauthorUsername(text.authorUsername)
        : setauthorUsername(session.user.name.username);

      setmoderated(text.moderated);
      setblogId(text.blogId);
    }
  }, [text, session]);

  useEditorContent.serverContentHandler(text.text);

  function sendCommentHandler(event) {
    event.preventDefault();

    // const enteredEmail = emailInputRef.current.value;
    // const enteredName = nameInputRef.current.value;
    // const enteredComment = commentInputRef.current.value;

    if (!enteredContent || enteredContent.trim() === "") {
      setIsInvalid(true);
      return;
    }

    const commentUpdateData = {
      email: email,
      name: name,
      text: enteredContent,
      imageProfileUrlValue: imageProfileUrlValue,
      moderated: moderated,
      blogId,
      authorUsername,
    };

    notificationCtx.showNotification({
      title: "Sending comment...",
      message: "Your comment is currently being updated .",
      status: "pending",
    });

    fetch(`/api/comments/${commentId}`, {
      method: "PUT",
      body: JSON.stringify(commentUpdateData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        return response.json().then((data) => {
          throw new Error(data.message || "Something went wrong!");
        });
      })
      .then((data) => {
        notificationCtx.showNotification({
          title: "Success!",
          message: "Your comment was updated!",
          status: "success",
        });
        router.push(`/comments/${text.blogId}`);
      })
      .catch((error) => {
        notificationCtx.showNotification({
          title: "Error!",
          message: error.message || "Something went wrong!",
          status: "error",
        });
      });
  }

  return (
    <form className={classes.form} onSubmit={sendCommentHandler}>
      <div className={classes.row}>
        <div className={classes.control}>
          <label htmlFor="email">Your email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={() =>
              session.user.email === "asonbede@gmail.com"
                ? setEmail(text.email)
                : setEmail(session.user.email)
            }
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="name">Your name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={() =>
              session.user.email === "asonbede@gmail.com"
                ? setName(text.name)
                : setName(session.user.name.name)
            }
          />
        </div>
      </div>
      <div className={classes.control}>
        <label htmlFor="content">Your Content</label>

        <MyRichEditor
          useEditorMainBlog={useEditorContent}
          readOnly={false}
          toolbarOnFocus={false}
          toolbarPresent={true}
          // smallHeight={false}
        />
      </div>
      {/* <div className={classes.control}>
        <label htmlFor="comment">Your comment</label>
        <textarea id="comment" rows="5" ref={commentInputRef}></textarea>
      </div> */}
      {isInvalid && <p>Please enter a valid email address and comment!</p>}
      <button className={classes.btn}>Submit</button>
    </form>
  );
}

export default UpdateComment;
