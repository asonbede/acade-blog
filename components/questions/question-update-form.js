import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import classes from "./new-questions-form.module.css";
//import Notification from "../ui/notification";
import NotificationContext from "../../store/notification-context";
import MyRichEditor from "../rich-text-editor/myrich-text-editor";
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

function UpdateQuestionForm() {
  const [isInvalid, setIsInvalid] = useState(false);
  const notificationCtx = useContext(NotificationContext);

  const router = useRouter();

  const useFieldCorrectOption = useField("text");
  // const useEditorImage= useEditor();

  const useEditorQuestion = useEditor();
  const useEditorOptionA = useEditor();
  const useEditorOptionB = useEditor();
  const useEditorOptionC = useEditor();
  const useEditorOptionD = useEditor();
  const useEditorOptionE = useEditor();
  const useEditorExplanation = useEditor();

  const {
    url: enteredQuestion,
    editorState,
    onEditorStateChange,
  } = useEditorQuestion;
  const { url: enteredOptionA } = useEditorOptionA;
  const { url: enteredOptionB } = useEditorOptionB;
  const { url: enteredOptionC } = useEditorOptionC;
  const { url: enteredOptionD } = useEditorOptionD;
  const { url: enteredOptionE } = useEditorOptionE;
  const { url: enteredExplanation } = useEditorExplanation;
  // const { url: enteredImage } = useEditorImage;
  const { value: enteredCorrectOption } = useFieldCorrectOption;

  const questionUpdateObj = notificationCtx.questionUpdate;
  const { questionItem, blogId, questionType } = questionUpdateObj;

  // if (post) {
  //   useEditorContent.useServerContent(post.content);
  //   //useEditorMainBlogTitle.useServerContent(post.title);
  // }
  if (questionItem) {
    console.log({ questionItem }, "update-question");
    useEditorQuestion.serverContentHandler(questionItem.question);
    useEditorOptionA.serverContentHandler(questionItem.options[0].option);
    useEditorOptionB.serverContentHandler(questionItem.options[1].option);
    useEditorOptionC.serverContentHandler(questionItem.options[2].option);
    useEditorOptionD.serverContentHandler(questionItem.options[3].option);
    useEditorOptionE.serverContentHandler(questionItem.options[4].option);
    useEditorExplanation.serverContentHandler(questionItem.explanation);
    useFieldCorrectOption.serverContentInputHandler(questionItem.correctOption);
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
      !enteredOptionA ||
      enteredOptionA.trim() === "" ||
      !enteredOptionB ||
      enteredOptionB.trim() === "" ||
      !enteredOptionC ||
      enteredOptionC.trim() === "" ||
      !enteredOptionD ||
      enteredOptionD.trim() === "" ||
      !enteredOptionE ||
      enteredOptionE.trim() === "" ||
      !enteredExplanation ||
      enteredExplanation.trim() === "" ||
      !enteredCorrectOption ||
      enteredCorrectOption.trim() === ""
    ) {
      setIsInvalid(true);
      return;
    }

    //props.noteFormRef.current.togglevisibility();

    try {
      await sendQuestionData(
        {
          question: enteredQuestion,
          options: [
            { option: enteredOptionA },
            { option: enteredOptionB },
            { option: enteredOptionC },
            { option: enteredOptionD },
            { option: enteredOptionE },
          ],

          explanation: enteredExplanation,
          correctOption: enteredCorrectOption,
          blogId,
          questionType: "multi-choice",
          authorId: questionItem.authorId,
        },
        questionItem._id
      );

      notificationCtx.showNotification({
        title: "Success!",
        message: "Your question was updated!",
        status: "success",
      });
      router.push(`/posts/questions/${blogId}?questionType=mult-choice`);
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
          <label htmlFor="optionA">OptionA</label>
          {/* <input type="text" id="optionA" ref={optionAInputRef} /> */}

          <MyRichEditor
            useEditorMainBlog={useEditorOptionA}
            readOnly={false}
            toolbarOnFocus={false}
            toolbarPresent={true}
            // smallHeight={true}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="optionB">OptionB</label>
          {/* <input type="text" id="optionB" ref={optionBInputRef} /> */}
          <MyRichEditor
            useEditorMainBlog={useEditorOptionB}
            readOnly={false}
            toolbarOnFocus={false}
            toolbarPresent={true}
            // smallHeight={true}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="optionC">OptionC</label>
          {/* <input type="text" id="optionC" ref={optionCInputRef} /> */}
          <MyRichEditor
            useEditorMainBlog={useEditorOptionC}
            readOnly={false}
            toolbarOnFocus={false}
            toolbarPresent={true}
            // smallHeight={true}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="optionD">OptionD</label>
          {/* <input type="text" id="optionD" ref={optionDInputRef} /> */}
          <MyRichEditor
            useEditorMainBlog={useEditorOptionD}
            readOnly={false}
            toolbarOnFocus={false}
            toolbarPresent={true}
            // smallHeight={true}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="optionE">OptionE</label>
          {/* <input type="text" id="optionE" ref={optionEInputRef} /> */}
          <MyRichEditor
            useEditorMainBlog={useEditorOptionE}
            readOnly={false}
            toolbarOnFocus={false}
            toolbarPresent={true}
            // smallHeight={true}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="correctOption">Correct Option</label>
          <input
            id="correctOption"
            {...useFieldCorrectOption}
            // style={{ width: "80%", display: "block" }}
            value={useFieldCorrectOption.value}
            onChange={useFieldCorrectOption.onChange}
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
      </div>

      {/* {isInvalid && <p>Please enter a valid email address and comment!</p>} */}
      <button className={classes.btn}>Submit</button>
    </form>
  );
}

export default UpdateQuestionForm;
