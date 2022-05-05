import React from "react";
import classes from "./comment-item.module.css";
// import Modal from "../ui/modal/modal";
// import Button from "../ui/button";

export default function CommentItem(props) {
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

        <div className={classes.content}>{props.item.text}</div>
        <div className={classes.action}>
          <button>Update</button>
          <button>Delete</button>
          <button>Like</button>
        </div>
      </div>
    </>
  );
}
