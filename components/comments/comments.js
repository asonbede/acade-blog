import { useContext, useEffect, useState, useRef } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";
import NotificationContext from "../../store/notification-context";
import Togglable from "../togglable/togglable";

import { useRouter } from "next/router";
function Comments(props) {
  const { blogId } = props;
  const router = useRouter();
  const notificationCtx = useContext(NotificationContext);

  const [showComments, setShowComments] = useState(true);
  const [comments, setComments] = useState([]);
  const [isFetchingComments, setIsFetchingComments] = useState(false);
  const noteFormRef = useRef(null);
  useEffect(() => {
    if (showComments) {
      setIsFetchingComments(true);
      notificationCtx.showNotification({
        title: "Fetching comment...",
        message: "Your comment is currently being fetched please wait.",
        status: "pending",
      });
      fetch("/api/comments/" + blogId)
        .then((response) => response.json())
        .then((data) => {
          console.log({ data }, "FROM COM");
          setComments(data.comments);
          setIsFetchingComments(false);
          notificationCtx.showNotification({
            title: "Success!",
            message: `${
              data.comments.length === 0
                ? "but no comment found"
                : "Comments were fetched"
            } `,
            status: "success",
          });
        })
        .catch((error) => {
          notificationCtx.showNotification({
            title: "Error!",
            message: error.message || "Something went wrong!",
            status: "error",
          });
        });
    }
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    notificationCtx.showNotification({
      title: "Sending comment...",
      message: "Your comment is currently being stored into a database.",
      status: "pending",
    });

    fetch("/api/comments/" + blogId, {
      method: "POST",
      body: JSON.stringify(commentData),
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
          message: "Your comment was saved!",
          status: "success",
        });
        //router.push(`/comments/${blogId}`);
        // router.reload(window.location.pathname);
        //setShowcomments(false);
        setShowComments(false);
      })
      .catch((error) => {
        notificationCtx.showNotification({
          title: "Error!",
          message: error.message || "Something went wrong!",
          status: "error",
        });
      });
    noteFormRef.current.togglevisibility();
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && isFetchingComments && <p>Loading...</p>}
      {showComments && !isFetchingComments && (
        <CommentList items={comments} setShowComments={setShowComments} />
      )}
      <Togglable buttonLabel="Create comment" ref={noteFormRef}>
        <p>Create Comment</p>

        {showComments && (
          <NewComment
            onAddComment={addCommentHandler}
            noteFormRef={noteFormRef}
          />
        )}
      </Togglable>
      {/* ;{showComments && <NewComment onAddComment={addCommentHandler} />} */}
    </section>
  );
}

export default Comments;
