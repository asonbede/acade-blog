import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import classes from "./new-post-form.module.css";
import Notification from "../ui/notification";
import NotificationContext from "../../store/notification-context";
import MyRichEditor from "../rich-text-editor/myrich-text-editor";
import {
  useField,
  useEditor,
  handleImageInsert,
} from "../../hooks/input-editor-hooks";
async function sendBlogData(blogDetails) {
  const response = await fetch("/api/blog-content", {
    method: "PUT",
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

function UpdatePostForm({ updateId }) {
  // const [isFeatured, setisFeatured] = useState(false);
  // const [title, settitle] = useState("");
  // const [excerpt, setexcerpt] = useState("");
  // const [image, setimage] = useState("");
  // const [dateValue, setdateValue] = useState("");
  // const [isFeaturedInit, setisFeaturedInit] = useState(false);
  const [isFeatured, setisFeatured] = useState(false);
  const notificationCtx = useContext(NotificationContext);

  const router = useRouter();
  const useFieldDate = useField("text");
  const useFieldImage = useField("text");

  const useFieldTitle = useField("text");
  // const useEditorImage= useEditor();
  const useFieldExcept = useField("text");
  const useFieldIsFeatured = useField("text");
  const useEditorContent = useEditor();

  const { value: enteredTitle } = useFieldTitle;
  // const { url: enteredImage } = useEditorImage;
  const { value: enteredExcerpt } = useFieldExcept;
  const {
    url: enteredContent,
    editorState,
    onEditorStateChange,
  } = useEditorContent;

  const { value: enteredImage } = useFieldImage;
  const { value: enteredDate } = useFieldDate;
  // const { value: isFeatured } = useFieldIsFeatured;
  console.log({ isFeatured });
  const blogUpdateObj = notificationCtx.blogUpdate;
  const { post, idValue } = blogUpdateObj;
  // if (post) {
  //   useEditorContent.useServerContent(post.content);
  //   //useEditorMainBlogTitle.useServerContent(post.title);
  // }
  useEditorContent.serverContentHandler(post.content);
  useFieldTitle.serverContentInputHandler(post.title);
  useFieldExcept.serverContentInputHandler(post.excerpt);
  useFieldImage.serverContentInputHandler(post.image);
  useFieldDate.serverContentInputHandler(post.date);
  useFieldIsFeatured.serverContentInputHandler(post.isFeatured);
  console.log({ post }, "post444");
  // useEffect(() => {
  //   if (post) {
  //     settitle(post.title);
  //     setexcerpt(post.excerpt);
  //     setimage(post.image);
  //     setisFeaturedInit(post.isFeatured);
  //     setdateValue(post.date);
  //   }
  // }, [post]);

  async function sendMessageHandler(event) {
    event.preventDefault();

    notificationCtx.showNotification({
      title: "Updating blog...",
      message: "Your blog is currently being updated. Please wait",
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
        blogId: idValue,
      });
      //setRequestStatus("success");
      // setEnteredContent("");
      // setEnteredTitle("");
      // setEnteredDate("");
      // setEnteredImage("");
      // setenteredExcerpt("");
      notificationCtx.showNotification({
        title: "Success!",
        message: "Your blog was updated!",
        status: "success",
      });
      router.push(`/posts/${idValue}`);
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

  // if (idValue === updateId) {
  return (
    <section className={classes.post}>
      <h1>Update Post</h1>
      <form className={classes.form} onSubmit={sendMessageHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              required
              value={useFieldTitle.value}
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
              value={useFieldDate.value}
              onChange={useFieldDate.onChange}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="image">Enter Image Url</label>
            <input
              type="text"
              id="image"
              required
              value={useFieldImage.value}
              onChange={useFieldImage.onChange}
            />
          </div>

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
              value={useFieldExcept.value}
              onChange={useFieldExcept.onChange}></textarea>
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="content">Your Content</label>
          {/* <textarea
            id="content"
            rows="5"
            required
            value={enteredContent}
            onChange={(event) =>
              setEnteredContent(event.target.value)
            }></textarea> */}
          <MyRichEditor
            useEditorMainBlog={useEditorContent}
            readOnly={false}
            toolbarOnFocus={false}
            toolbarPresent={true}
            // smallHeight={false}
          />
        </div>
        {/* <div className={classes.control}> */}
        <span htmlFor="isFeatured" className="featured">
          Feature This Post
        </span>

        {/* <input
          type="checkbox"
          id="isFeatured"
          name="isfeatured"
          value={useFieldIsFeatured.value}
          checked={useFieldIsFeatured.value}
          onChange={useFieldIsFeatured.onChange}
          style={{ width: "7%" }}
        /> */}
        {/* </div> */}

        <input
          type="checkbox"
          id="isFeatured"
          name="isfeatured"
          value={isFeatured}
          checked={isFeatured}
          onChange={() => setisFeatured(!isFeatured)}
          style={{ width: "7%" }}
        />

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
  // }
  // return null;
}

export default UpdatePostForm;
