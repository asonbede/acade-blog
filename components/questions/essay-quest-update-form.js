import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import classes from "./new-questions-form.module.css";
//import Notification from "../ui/notification";
import NotificationContext from "../../store/notification-context";
import MyRichEditor from "../rich-text-editor/myrich-text-editor";
import { useSession } from "next-auth/client";
import {
  useField,
  useEditor,
  handleImageInsert,
} from "../../hooks/input-editor-hooks";
async function sendQuestionData(questionDetails, id) {
  console.log({ id }, "in send question");
  console.log("in send question");
  const response = await fetch(`/api/questions/${id}`, {
    method: "PUT",
    body: JSON.stringify(questionDetails),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }

  // if (!response.ok) {
  //   throw new Error(data.message || "Something went wrong!");
  // }
}
const formattedDateUpdated = new Date().toLocaleDateString("en-US", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

function EssayUpdateQuestionForm() {
  const [isInvalid, setIsInvalid] = useState(false);
  const [isModerated, setisModerated] = useState(false);
  const [checkBoxShow, setcheckBoxShow] = useState(false);
  const [publishedDate, setpublishedDate] = useState(false);

  const notificationCtx = useContext(NotificationContext);
  const [session, loading] = useSession();
  const router = useRouter();

  //const useFieldCorrectOption = useField("text");
  // const useEditorImage= useEditor();

  const useEditorQuestion = useEditor();
  //   const useEditorOptionA = useEditor();
  //   const useEditorOptionB = useEditor();
  //   const useEditorOptionC = useEditor();
  //   const useEditorOptionD = useEditor();
  //   const useEditorOptionE = useEditor();
  const useEditorExplanation = useEditor();
  const useFieldSubject = useField("text");

  const {
    url: enteredQuestion,
    editorState,
    onEditorStateChange,
  } = useEditorQuestion;
  //   const { url: enteredOptionA } = useEditorOptionA;
  //   const { url: enteredOptionB } = useEditorOptionB;
  //   const { url: enteredOptionC } = useEditorOptionC;
  //   const { url: enteredOptionD } = useEditorOptionD;
  //   const { url: enteredOptionE } = useEditorOptionE;
  const { url: enteredExplanation } = useEditorExplanation;
  const { value: enteredSubject } = useFieldSubject;
  // const { url: enteredImage } = useEditorImage;
  //const { value: enteredCorrectOption } = useFieldCorrectOption;

  const questionUpdateObj = notificationCtx.questionUpdate;
  const { questionItem, blogId, questionType } = questionUpdateObj;

  // if (post) {
  //   useEditorContent.useServerContent(post.content);
  //   //useEditorMainBlogTitle.useServerContent(post.title);
  // }

  useEffect(() => {
    fetch("/api/restrict-route/")
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        setcheckBoxShow(data.message);
      })
      .catch((error) => {
        notificationCtx.showNotification({
          title: "Error!",
          message: error.message || "Something went wrong!",
          status: "error",
        });
      });
  }, [questionItem]);

  if (questionItem) {
    console.log({ questionItem }, "update-question");
    useEditorQuestion.serverContentHandler(questionItem.question);
    // useEditorOptionA.serverContentHandler(questionItem.options[0].option);
    // useEditorOptionB.serverContentHandler(questionItem.options[1].option);
    // useEditorOptionC.serverContentHandler(questionItem.options[2].option);
    // useEditorOptionD.serverContentHandler(questionItem.options[3].option);
    // useEditorOptionE.serverContentHandler(questionItem.options[4].option);
    useEditorExplanation.serverContentHandler(questionItem.explanation);

    if (questionItem.subject) {
      useFieldSubject.serverContentInputHandler(questionItem.subject);
    }
    //useFieldCorrectOption.serverContentInputHandler(questionItem.correctOption);
  }
  // useEffect(() => {
  //   if (post) {
  //     settitle(post.title);
  //     setexcerpt(post.excerpt);
  //     setimage(post.image);
  //     setisFeaturedInit(post.isFeatured);
  //     setdateValue(post.date);
  //   }
  // }, [post]);

  useEffect(() => {
    if (questionItem) {
      if (questionItem.publishedDate) {
        setpublishedDate(questionItem.publishedDate);
      }
    }
  }, [questionItem]);

  async function sendQuestionHandler(event) {
    event.preventDefault();
    notificationCtx.showNotification({
      title: "Updating question...",
      message: "Your question is currently being updated. Please wait",
      status: "pending",
    });

    if (
      !enteredQuestion ||
      enteredQuestion.trim() === "" ||
      !enteredExplanation ||
      enteredExplanation.trim() === ""
    ) {
      setIsInvalid(true);
      return;
    }

    //props.noteFormRef.current.togglevisibility();

    try {
      await sendQuestionData(
        {
          question: enteredQuestion,

          explanation: enteredExplanation,

          blogId,
          authorId: questionItem.authorId,
          questionType: "essay-type",
          moderated: isModerated,
          subject: enteredSubject,
          authorusername: session.user.name.username,
          imageProfileUrl: session.user.image.imageUrl
            ? session.user.image.imageUrl
            : "/images/posts/default-profile-pic.jpg",
          author: session.user.name.name,
          updatedDate: formattedDateUpdated,
          publishedDate: publishedDate ? publishedDate : formattedDateUpdated,
        },
        questionItem._id
      );

      notificationCtx.showNotification({
        title: "Success!",
        message: "Your question was updated!",
        status: "success",
      });
      router.push(`/posts/questions/${blogId}`);
    } catch (error) {
      notificationCtx.showNotification({
        title: "Error!",
        message: error.message || "Something went wrong!",
        status: "error",
      });
    }
  }

  return (
    <form className={classes.form} onSubmit={sendQuestionHandler}>
      <h1 style={{ textAlign: "center" }}>Update Questions </h1>
      <div className={classes.row}>
        <div className={classes.control}>
          <label htmlFor="question">Your Questions</label>
          {/* <textarea id="question" rows="5" ref={questionInputRef}></textarea> */}

          <MyRichEditor
            useEditorMainBlog={useEditorQuestion}
            readOnly={false}
            toolbarOnFocus={false}
            toolbarPresent={true}
            // smallHeight={false}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="subject">
            Set the subject under which this question falls
          </label>
          <input
            id="subject"
            required
            value={enteredSubject}
            onChange={useFieldSubject.onChange}
            style={{ width: "80%", display: "block" }}
          />
        </div>

        {/* </div> */}
        <div className={classes.control}>
          <label htmlFor="explanation">Your Explanation</label>
          {/* <textarea
          id="explanation"
          rows="5"
          ref={explanationInputRef}></textarea> */}
          <MyRichEditor
            useEditorMainBlog={useEditorExplanation}
            readOnly={false}
            toolbarOnFocus={false}
            toolbarPresent={true}
            // smallHeight={false}
          />
        </div>
        {checkBoxShow && (
          <div>
            <span htmlFor="isAprovedred" className="featured">
              Approve This Post
            </span>

            <input
              type="checkbox"
              id="isAprovedred"
              name="isApproveded"
              value={isModerated}
              checked={isModerated}
              onChange={() => setisModerated(!isModerated)}
              style={{ width: "7%" }}
            />
          </div>
        )}
      </div>

      {/* {isInvalid && <p>Please enter a valid email address and comment!</p>} */}
      <button className="btn btn-primary">Submit</button>
    </form>
  );
}

export default EssayUpdateQuestionForm;
