import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import classes from "./new-questions-form.module.css";
//import Notification from "../ui/notification";
import NotificationContext from "../../store/notification-context";
import MyRichEditor from "../rich-text-editor/myrich-text-editor";
import { useSession, signOut } from "next-auth/client";
import Button from "../ui/button";
import {
  useField,
  useEditor,
  handleImageInsert,
} from "../../hooks/input-editor-hooks";
// import { session } from "next-auth/client";
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

function UpdateQuestionForm() {
  const [isInvalid, setIsInvalid] = useState(false);
  const [linkedValue, setlinkedValue] = useState(0);
  const [enteredCorrectOption, setselectValue] = useState();
  const [filteredOptionsLen, setfilteredOptionsLen] = useState();
  const notificationCtx = useContext(NotificationContext);
  const [isModerated, setisModerated] = useState(false);
  const [checkBoxShow, setcheckBoxShow] = useState(false);
  const [publishedDate, setpublishedDate] = useState();

  const [session, loading] = useSession();
  const router = useRouter();

  const useFieldSubject = useField("text");
  const useFieldExamType = useField("text");

  // const useEditorImage= useEditor();

  const useEditorQuestion = useEditor();
  const useEditorOptionA = useEditor();
  const useEditorOptionB = useEditor();
  const useEditorOptionC = useEditor();
  const useEditorOptionD = useEditor();
  const useEditorOptionE = useEditor();
  const useEditorExplanation = useEditor();
  const useEditorQuestionIntroText = useEditor();

  const {
    url: enteredQuestion,
    editorState: questEditorState,
    onEditorStateChange,
  } = useEditorQuestion;
  const { url: enteredOptionA, editorState: optAEditorState } =
    useEditorOptionA;
  const { url: enteredOptionB, editorState: optBEditorState } =
    useEditorOptionB;
  const { url: enteredOptionC, editorState: optCdiState } = useEditorOptionC;
  const { url: enteredOptionD, editorState: optDdiState } = useEditorOptionD;
  const { url: enteredOptionE, editorState: optEdiState } = useEditorOptionE;
  const { url: enteredExplanation, editorState: explanEditorState } =
    useEditorExplanation;
  const { url: enteredQuestionIntroText, editorState: quesIntroEdiState } =
    useEditorQuestionIntroText;
  // const { url: enteredImage } = useEditorImage;
  const { value: enteredSubject } = useFieldSubject;
  const { value: enteredExamType } = useFieldExamType;

  const questionUpdateObj = notificationCtx.questionUpdate;
  const { questionItem, blogId, questionType } = questionUpdateObj;
  //editorState.getCurrentContent().getPlainText().trim().length;
  // if (post) {
  //   useEditorContent.useServerContent(post.content);
  //   //useEditorMainBlogTitle.useServerContent(post.title);
  // }
  if (questionItem) {
    console.log({ questionItem }, "update-question");
    useEditorQuestion.serverContentHandler(questionItem.question);
    useEditorOptionA.serverContentHandler(questionItem.options[0].option);
    useEditorOptionB.serverContentHandler(questionItem.options[1].option);

    if (questionItem.options[2]) {
      useEditorOptionC.serverContentHandler(questionItem.options[2].option);
    }

    if (questionItem.options[3]) {
      useEditorOptionD.serverContentHandler(questionItem.options[3].option);
    }

    if (questionItem.options[4]) {
      useEditorOptionE.serverContentHandler(questionItem.options[4].option);
    }

    // useEditorOptionD.serverContentHandler(questionItem.options[3].option);
    // useEditorOptionE.serverContentHandler(questionItem.options[4].option);
    useEditorExplanation.serverContentHandler(questionItem.explanation);
    if (questionItem.questionIntroText) {
      useEditorQuestionIntroText.serverContentHandler(
        questionItem.questionIntroText
      );
    }

    if (questionItem.subject) {
      useFieldSubject.serverContentInputHandler(questionItem.subject);
    }

    if (questionItem.examType) {
      useFieldExamType.serverContentInputHandler(questionItem.examType);
    }

    //useFieldCorrectOption.serverContentInputHandler(questionItem.correctOption);
  }
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

  useEffect(() => {
    if (questionItem) {
      if (questionItem.linkedTo) {
        setlinkedValue(questionItem.linkedTo);
      }
      if (questionItem.correctOption) {
        setselectValue(questionItem.correctOption);
      }
      if (questionItem.publishedDate) {
        setpublishedDate(questionItem.publishedDate);
      } else {
        setpublishedDate(formattedDateUpdated);
      }
    }
  }, [questionItem]);
  function checkEditorText(editorStateValue) {
    return (
      editorStateValue.getCurrentContent().getPlainText().trim().length > 0
    );
  }

  useEffect(() => {
    const arrayResult = filteredOptionsFunc();

    setfilteredOptionsLen(arrayResult.length);
  }, [optAEditorState, optBEditorState, optCdiState, optDdiState, optEdiState]);

  useEffect(() => {
    if (isInvalid) {
      notificationCtx.showNotification({
        title: "Error!",
        message:
          "Invalid input, some required input field/fields was probably not  filled. The required input fields are the question field,the explanation field, the correct option field and at least two option fields ",
        status: "error",
      });
      setIsInvalid(false);
    }
  }, [isInvalid]);

  function filteredOptionsFunc() {
    const filteredOptionsArray = [
      {
        option: checkEditorText(optAEditorState) ? enteredOptionA.trim() : null,
      },
      {
        option: checkEditorText(optBEditorState) ? enteredOptionB.trim() : null,
      },

      {
        option: checkEditorText(optCdiState) ? enteredOptionC.trim() : null,
      },
      {
        option: checkEditorText(optDdiState) ? enteredOptionD.trim() : null,
      },
      {
        option: checkEditorText(optEdiState) ? enteredOptionE.trim() : null,
      },
    ].filter((item) => item.option !== null);

    return filteredOptionsArray;
  }

  function onselectChange(e) {
    setselectValue(e.target.value);
  }
  function outputSetAswerSelectOptions(params) {
    if (filteredOptionsLen === null) {
      return null;
    }

    //const element = optionsLength[index];
    const optionsArray = ["A", "B", "C", "D", "E"];
    return (
      <select
        name=""
        id="correctOption"
        onChange={onselectChange}
        // value={selectValue}

        // size={4}
        // defaultValue={selectValue}
        value={enteredCorrectOption}
      >
        <optgroup label="Set The Answer">
          {optionsArray.map((item, index) =>
            index < filteredOptionsLen ? (
              <option value={optionsArray[index]}>{optionsArray[index]}</option>
            ) : null
          )}
        </optgroup>
      </select>
    );
  }
  console.log({ linkedValue });
  async function sendQuestionHandler(event) {
    event.preventDefault();
    notificationCtx.showNotification({
      title: "Updating question...",
      message: "Your question is currently being updated. Please wait",
      status: "pending",
    });

    if (
      !checkEditorText(questEditorState) ||
      !checkEditorText(optAEditorState) ||
      !checkEditorText(optBEditorState) ||
      // !enteredOptionC ||
      // enteredOptionC.trim() === "" ||
      // !enteredOptionD ||
      // enteredOptionD.trim() === "" ||
      // !enteredOptionE ||
      // enteredOptionE.trim() === "" ||
      !checkEditorText(explanEditorState) ||
      !enteredCorrectOption ||
      enteredCorrectOption.trim() === "" ||
      !enteredExamType ||
      enteredExamType.trim() === "" ||
      !enteredSubject ||
      enteredSubject.trim() === ""
    ) {
      setIsInvalid(true);
      return;
    }

    const filteredOptions = [
      { option: enteredOptionA },
      { option: enteredOptionB },
      { option: checkEditorText(optCdiState) ? enteredOptionC.trim() : null },
      { option: checkEditorText(optDdiState) ? enteredOptionD.trim() : null },
      { option: checkEditorText(optEdiState) ? enteredOptionE.trim() : null },
    ].filter((item) => item.option !== null);
    //props.noteFormRef.current.togglevisibility();
    console.log({ filteredOptions }, "from-update");
    try {
      await sendQuestionData(
        {
          question: enteredQuestion,
          options: filteredOptions,

          explanation: enteredExplanation,
          correctOption: enteredCorrectOption,
          blogId,
          questionType: "multi-choice",
          linkedTo: linkedValue,
          authorId: session.user.email,
          moderated: isModerated,
          subject: enteredSubject,
          examType: enteredExamType,
          questionIntroText: checkEditorText(quesIntroEdiState)
            ? enteredQuestionIntroText.trim()
            : null,
          authorusername: session.user.name.username,
          imageProfileUrl: session.user.image.imageUrl
            ? session.user.image.imageUrl
            : "/images/posts/default-profile-pic.jpg",
          author: session.user.name.name,
          updatedDate: formattedDateUpdated,
          publishedDate: publishedDate,
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
  const onChangeNumber = (e) => {
    setlinkedValue(e.target.value);
  };

  return (
    <form className={classes.form} onSubmit={sendQuestionHandler}>
      <h1 style={{ textAlign: "center" }}>Update Questions </h1>
      <div className={classes.row}>
        <div className={classes.control}>
          <label htmlFor="questionIntro">Question Intro Text</label>
          {/* <textarea id="question" rows="5" ref={questionInputRef}></textarea> */}

          <MyRichEditor
            useEditorMainBlog={useEditorQuestionIntroText}
            readOnly={false}
            toolbarOnFocus={false}
            toolbarPresent={true}
            // smallHeight={false}
          />
        </div>
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
          <label htmlFor="subject">
            Set The Subject Under Which This Question Falls
          </label>
          <input
            id="subject"
            value={useFieldSubject.value}
            onChange={useFieldSubject.onChange}
          />
        </div>

        <div className={classes.control}>
          <label htmlFor="exam-type">
            Indicate the exam body if past questions or none
          </label>
          <input
            id="exam-type"
            value={enteredExamType}
            onChange={useFieldExamType.onChange}
            style={{ width: "80%", display: "block" }}
          />
        </div>

        <div className={classes.control}></div>

        <div className={classes.control}>
          <label htmlFor="correctOption">Set Correct Option</label>
          {/* <input
            id="correctOption"
            // {...useFieldCorrectOption}
            // style={{ width: "80%", display: "block" }}
            value={useFieldCorrectOption.value}
            onChange={useFieldCorrectOption.onChange}
          /> */}
          {outputSetAswerSelectOptions()}
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
        <div className={classes.control}>
          <label htmlFor="linked">Linked To Which Question</label>

          <input
            type="number"
            id="linked"
            value={linkedValue}
            onChange={onChangeNumber}
            // min="1"
            // max={items.length}
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
      <Button className={classes.btn}>Submit</Button>
    </form>
  );
}

export default UpdateQuestionForm;
