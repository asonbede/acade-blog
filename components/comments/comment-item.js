//import React from "react";
import { useContext, useState, useEffect } from "react";
import classes from "./comment-item.module.css";
import Modal from "../ui/modal/modal";
// import Button from "../ui/button";
import DisplayEditorContent from "../rich-text-editor/display-editor-content";
import NotificationContext from "../../store/notification-context";
import { useRouter } from "next/router";
// id: document._id.toString(),
export default function CommentItem(props) {
  //const linkPathForComment = `/comments/${post.id}`;
  //const id = props.item._id.toString();
  //const linkPathForUpdate = `/comments/updates/${id}`;
  //commentUpdateObj: commentUpdateObj,
  const [showDeleteModal, setshowDeleteModal] = useState(false);
  const router = useRouter();
  const notificationCtx = useContext(NotificationContext);
  const handleUpdateComment = () => {
    console.log("from handle update");
    notificationCtx.commentUpdateHandler({
      text: props.item,
      commentId: props.item._id.toString(),
    });
    router.push(`/comments/updates/${props.item._id.toString()}`);
  };

  const deletePostHandler = async () => {
    console.log("in delete comment..");
    notificationCtx.showNotification({
      title: "Deleting comment...",
      message: "Your comment is currently being deleted from the database.",
      status: "pending",
    });
    try {
      const response = await fetch(
        `/api/comments/${props.item._id.toString()}`,
        {
          method: "DELETE",
          body: JSON.stringify({ commentId: props.item._id.toString() }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      notificationCtx.showNotification({
        title: "Success!",
        message: "Your comment was deleted!",
        status: "success",
      });
      // router.push("/");
      props.setShowComments(false);
      // router.push(`/comments/${props.item.blogId}`);
    } catch (error) {
      //setRequestError(error.message);
      //setRequestStatus("error");
      notificationCtx.showNotification({
        title: "Error!",
        message: error.message || "Something went wrong!",
        status: "error",
      });
    }
    setshowDeleteModal(false);
  };

  const deleteConfirm = () => {
    setshowDeleteModal(true);
  };

  return (
    <>
      {showDeleteModal && (
        <Modal
          deletePostHandler={deletePostHandler}
          text={`Do you really want to delete this comment?
           `}
          setshowDeleteModal={setshowDeleteModal}
          showDeleteModal={showDeleteModal}
        />
      )}

      <div className={classes.card}>
        <div className={classes.header}>
          <img src="/images/posts/post-profile2.jpg" alt="John" />
          <h1>{props.item.name}</h1>
        </div>

        <div className={classes.content}>
          {/* {props.item.text} */}

          <DisplayEditorContent
            contentFromServer={props.item.text}
            toolbarPresent={false}
          />
        </div>
        <div className={classes.action}>
          <button onClick={handleUpdateComment}>Update</button>

          <button onClick={deleteConfirm}>Delete</button>
          <button>Like</button>
        </div>
      </div>
    </>
  );
}
