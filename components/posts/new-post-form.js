import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import classes from "./new-post-form.module.css";
import Notification from "../ui/notification";
import NotificationContext from "../../store/notification-context";
import MyRichEditor from "../rich-text-editor/myrich-text-editor";
import { useSession } from "next-auth/client";
import {
  useField,
  useEditor,
  handleImageInsert,
} from "../../hooks/input-editor-hooks";
async function sendBlogData(blogDetails) {
  const response = await fetch("/api/blog-content", {
    method: "POST",
    body: JSON.stringify(blogDetails),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  console.log({ data }, "new posttt");
  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }
}

function NewPostForm() {
  //const [enteredTitle, setEnteredTitle] = useState("");
  //const [enteredDate, setEnteredDate] = useState("");
  //const [enteredImage, setEnteredImage] = useState("");
  //const [enteredExcerpt, setenteredExcerpt] = useState(""); // 'pending', 'success', 'error'
  //const [enteredContent, setEnteredContent] = useState("");
  const [isFeatured, setisFeatured] = useState(false);
  const [orderValue, setorderValue] = useState(1);
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
  const [session, loading] = useSession();
  const router = useRouter();

  const useFieldDate = useField("text");
  //const useFieldImage = useField("text");
  const useFieldCategory = useField("text");

  const useFieldTitle = useField("text");
  // const useEditorImage= useEditor();
  const useFieldExcept = useField("text");
  const useEditorContent = useEditor();
  const useFieldImage = useField("text");

  const { value: enteredTitle } = useFieldTitle;
  // const { url: enteredImage } = useEditorImage;
  const { value: enteredExcerpt } = useFieldExcept;
  const { value: enteredCategory } = useFieldCategory;
  const {
    url: enteredContent,
    editorState,
    onEditorStateChange,
  } = useEditorContent;

  //const { value: enteredImage } = useFieldImage;

  const { value: enteredImage } = useFieldImage;
  const { value: enteredDate } = useFieldDate;

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

        author: session.user.name.name,
        authorId: session.user.email,
        moderated: false,
        category: enteredCategory,
        orderValue: orderValue,
        authorusername: session.user.name.username,
        imageProfileUrl: session.user.image.imageUrl
          ? session.user.image.imageUrl
          : "/images/posts/default-profile-pic.jpg",
      });

      notificationCtx.showNotification({
        title: "Success!",
        message: "Your blog was saved!",
        status: "success",
      });
      router.push(`/profile/${session.user.name.username}`);
    } catch (error) {
      notificationCtx.showNotification({
        title: "Error!",
        message: error.message || "Something went wrong!",
        status: "error",
      });
    }
  }
  const onChangeNumber = (e) => {
    setorderValue(e.target.value);
  };
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
              onChange={useFieldTitle.onChange}
            />
            {/* <MyRichEditor
              useEditorMainBlog={useEditorTitle}
              readOnly={false}
              toolbarOnFocus={false}
              toolbarPresent={true}
              // smallHeight={false}
            /> */}
          </div>
          <div className={classes.control}>
            <label htmlFor="date">Enter Date</label>
            <input
              // type="text"
              id="date"
              required
              value={enteredDate}
              onChange={useFieldDate.onChange}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="image">Your Main Post Image</label>
            <input
              // type="text"
              id="image"
              required
              value={enteredImage}
              onChange={useFieldImage.onChange}
            />
          </div>
          {/* <div className={classes.control}>
            <label htmlFor="content">Your Main Post Image</label>

            <MyRichEditor
              useEditorMainBlog={useEditorImage}
              readOnly={false}
              toolbarOnFocus={false}
              toolbarPresent={true}
              // smallHeight={false}
            />
          </div> */}

          <div className={classes.control}>
            <label htmlFor="excerpt">Enter Excerpt</label>
            {/* <input
              type="text"
              id="excerpt"
              required
              value={enteredExcerpt}
              onChange={(event) => setenteredExcerpt(event.target.value)}
            /> */}
            {/* <MyRichEditor
              useEditorMainBlog={useEditorExcept}
              readOnly={false}
              toolbarOnFocus={false}
              toolbarPresent={true}
              // smallHeight={false}
            /> */}
            <textarea
              id="content"
              rows="5"
              required
              value={enteredExcerpt}
              onChange={useFieldExcept.onChange}
            ></textarea>
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="content">Your Content</label>

          <MyRichEditor
            useEditorMainBlog={useEditorContent}
            readOnly={false}
            toolbarOnFocus={false}
            toolbarPresent={true}
            smallHeight={true}
          />
        </div>

        <div className={classes.control}>
          <label htmlFor="category">Enter Category</label>

          <input
            // type="text"
            id="category"
            required
            value={enteredCategory}
            onChange={useFieldCategory.onChange}
          />
        </div>

        <div className={classes.control}>
          <label htmlFor="order">Enter Order Number</label>

          <input
            type="number"
            id="order"
            required
            value={orderValue}
            onChange={onChangeNumber}
          />
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
