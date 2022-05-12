import { useState, useEffect } from "react";
import classes from "./new-comment.module.css";
import MyRichEditor from "../rich-text-editor/myrich-text-editor";
import { useSession } from "next-auth/client";
import Togglable from "../togglable/togglable";
import {
  useField,
  useEditor,
  handleImageInsert,
} from "../../hooks/input-editor-hooks";

function NewComment(props) {
  const [isInvalid, setIsInvalid] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [imageProfileUrlValue, setimageProfileUrlValue] = useState();
  const [authorUsername, setauthorUsername] = useState();

  const [session, loading] = useSession();

  // const emailInputRef = useRef();
  // const nameInputRef = useRef();
  // const commentInputRef = useRef();
  const useEditorContent = useEditor();

  const {
    url: enteredContent,
    editorState,
    onEditorStateChange,
  } = useEditorContent;

  useEffect(() => {
    if (session) {
      setimageProfileUrlValue(session.user.image.imageUrl);
      //setimageProfileUrlValue(post.imageProfileUrl);
      setName(session.user.name.name);
      setEmail(session.user.email);
      setauthorUsername(session.user.name.username);

      // setauthorusername(
      //   post.authorusername ? post.authorusername : "asonbede"
      // );
    }
  }, [session]);

  function sendCommentHandler(event) {
    event.preventDefault();

    // const enteredEmail = emailInputRef.current.value;
    // const enteredName = nameInputRef.current.value;
    // const enteredComment = commentInputRef.current.value;

    if (!enteredContent || enteredContent.trim() === "") {
      setIsInvalid(true);
      return;
    }

    props.onAddComment({
      email: email,
      name: name,
      text: enteredContent,
      imageProfileUrlValue: imageProfileUrlValue,
      moderated: false,
      authorUsername,
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
            onChange={() => setEmail(session.user.email)}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="name">Your name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={() => setName(session.user.name.name)}
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

export default NewComment;
