import { useState, useEffect, useContext } from "react";

import classes from "./new-post-form.module.css";
import Notification from "../ui/notification";
import NotificationContext from "../../store/notification-context";
async function sendBlogData(blogDetails) {
  const response = await fetch("/api/blog-content", {
    method: "POST",
    body: JSON.stringify(blogDetails),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }
}

function NewPostForm() {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredDate, setEnteredDate] = useState("");
  const [enteredImage, setEnteredImage] = useState("");
  const [enteredExcerpt, setenteredExcerpt] = useState(""); // 'pending', 'success', 'error'
  const [enteredContent, setEnteredContent] = useState("");
  const [isFeatured, setisFeatured] = useState(false);
  //const [requestStatus, setRequestStatus] = useState(null);
  //const [requestError, setRequestError] = useState(null);
  const notificationCtx = useContext(NotificationContext);
  // useEffect(() => {
  //   if (requestStatus === "success" || requestStatus === "error") {
  //     const timer = setTimeout(() => {
  //       setRequestStatus(null);
  //       setRequestError(null);
  //     }, 3000);

  //     return () => clearTimeout(timer);
  //   }
  // }, [requestStatus]);
  console.log({ isFeatured });
  async function sendMessageHandler(event) {
    event.preventDefault();

    // optional: add client-side validation

    //setRequestStatus("pending");
    notificationCtx.showNotification({
      title: "Sending blog...",
      message: "Your blog is currently being stored into a database.",
      status: "pending",
    });

    try {
      await sendBlogData({
        title: enteredTitle,
        date: enteredDate,
        image: enteredImage,
        excerpt: enteredExcerpt,
        content: enteredContent,
        isFeatured: isFeatured,
      });
      //setRequestStatus("success");
      setEnteredContent("");
      setEnteredTitle("");
      setEnteredDate("");
      setEnteredImage("");
      setenteredExcerpt("");
      notificationCtx.showNotification({
        title: "Success!",
        message: "Your blog was saved!",
        status: "success",
      });
    } catch (error) {
      //setRequestError(error.message);
      //setRequestStatus("error");
      notificationCtx.showNotification({
        title: "Error!",
        message: error.message || "Something went wrong!",
        status: "error",
      });
    }
  }

  // let notification;

  // if (requestStatus === "pending") {
  //   notification = {
  //     status: "pending",
  //     title: "Sending message...",
  //     message: "Your message is on its way!",
  //   };
  // }

  // if (requestStatus === "success") {
  //   notification = {
  //     status: "success",
  //     title: "Success!",
  //     message: "Message sent successfully!",
  //   };
  // }

  // if (requestStatus === "error") {
  //   notification = {
  //     status: "error",
  //     title: "Error!",
  //     message: requestError,
  //   };
  // }

  //   title: "Getting Started with NextJS"
  //   date: "2022-10-16"
  //   image: getting-started-nextjs.png
  //   excerpt: NextJS is a the React framework for *productionnnnnnnn* - it makes building fullstack React apps and sites a breeze and ships with built-in SSR.
  //   isFeatured: true

  return (
    <section className={classes.post}>
      <h1>Create Post</h1>
      <form className={classes.form} onSubmit={sendMessageHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              required
              value={enteredTitle}
              onChange={(event) => setEnteredTitle(event.target.value)}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="date">Enter Date</label>
            <input
              type="text"
              id="date"
              required
              value={enteredDate}
              onChange={(event) => setEnteredDate(event.target.value)}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="image">Enter Image Url</label>
            <input
              type="text"
              id="image"
              required
              value={enteredImage}
              onChange={(event) => setEnteredImage(event.target.value)}
            />
          </div>

          <div className={classes.control}>
            <label htmlFor="excerpt">Enter Excerpt</label>
            <input
              type="text"
              id="excerpt"
              required
              value={enteredExcerpt}
              onChange={(event) => setenteredExcerpt(event.target.value)}
            />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="content">Your Content</label>
          <textarea
            id="content"
            rows="5"
            required
            value={enteredContent}
            onChange={(event) =>
              setEnteredContent(event.target.value)
            }></textarea>
        </div>
        {/* <div className={classes.control}> */}
        <span htmlFor="isFeatured" className="featured">
          Feature This Post
        </span>

        <input
          type="checkbox"
          id="isFeatured"
          name="isfeatured"
          value="isFeatured"
          checked={isFeatured}
          onChange={() => setisFeatured(!isFeatured)}
          style={{ width: "7%" }}
        />
        {/* </div> */}

        <div className={classes.actions}>
          <button>Send Content</button>
        </div>
      </form>
      {/* {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )} */}
    </section>
  );
}

export default NewPostForm;
