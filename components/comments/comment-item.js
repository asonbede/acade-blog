//import React from "react";
import { React, useContext, useState, useEffect } from "react";
import classes from "./comment-item.module.css";
// import Modal from "../ui/modal/modal";
// import Button from "../ui/button";
import DisplayEditorContent from "../rich-text-editor/display-editor-content";
import NotificationContext from "../../store/notification-context";
// id: document._id.toString(),
export default function CommentItem(props) {
  //const linkPathForComment = `/comments/${post.id}`;
  //const id = props.item._id.toString();
  //const linkPathForUpdate = `/comments/updates/${id}`;
  //commentUpdateObj: commentUpdateObj,
  const notificationCtx = useContext(NotificationContext);
  const handleUpdateComment = () => {
    console.log("from handle update");
    notificationCtx.commentUpdateHandler({
      text: props.item,
      commentId: props.item._id.toString(),
    });
    router.push(`/comments/updates/${props.item._id.toString()}`);
  };
  return (
    <>
      {/* {showDeleteQuestModal && (
        <Modal
          deletePostHandler={() => deleteQuestionHandler(id)}
          text="Do you really want to delete this question?"
          setshowDeleteModal={setshowDeleteQuestModal}
          showDeleteModal={showDeleteQuestModal}
        />
      )} */}
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

          <button>Delete</button>
          <button>Like</button>
        </div>
      </div>
    </>
  );
}
