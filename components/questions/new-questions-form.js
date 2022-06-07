/* 
The basic idea here is to get multiple choice type of questons from the 
user and store it in the database. The questions is send via the addQuestion
function as as object with the following fields
  {
        question: enteredQuestion,
        options: filteredOptions,
       explanation: enteredExplanation,
        correctOption: enteredCorrectOption,
        linkedTo: linkedValue,
        authorId: session.user.email,
        questionType: "multi-choice",
        moderated: false,
        subject: enteredSubject,
        examType: enteredExamType,
        questionIntroText: checkEditorText(quesIntroEdiState)
          ? enteredQuestionIntroText.trim()
          : null,
      },
*/

import { useRef, useState, useEffect, useContext } from "react";
import classes from "./new-questions-form.module.css";
import MyRichEditor from "../rich-text-editor/myrich-text-editor";
import NotificationContext from "../../store/notification-context";
//import { options, useSession } from "next-auth/client";
import { useSession } from "next-auth/client";
import {
  useField,
  useEditor,
  handleImageInsert,
} from "../../hooks/input-editor-hooks";
function NewQuestion(props) {
  const [isInvalid, setIsInvalid] = useState(false);
  //const [session, loading] = useSession();
  const [linkedValue, setlinkedValue] = useState(0);
  const [filteredOptionsLen, setfilteredOptionsLen] = useState();
  const [enteredCorrectOption, setselectValue] = useState("A");
  const [session, loading] = useSession();
  //initialize function that will enable you to enter input and save state
  const useFieldSubject = useField("text");
  const useFieldExamType = useField("text");
  const notificationCtx = useContext(NotificationContext);
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
  const { value: enteredSubject } = useFieldSubject;
  const { value: enteredExamType } = useFieldExamType;

  //checks if editor has text = returns true or not= returns false
  function checkEditorText(editorStateValue) {
    return (
      editorStateValue.getCurrentContent().getPlainText().trim().length > 0
    );
  }

  //when the page loads, the number of options is set
  useEffect(() => {
    const arrayResult = filteredOptionsFunc();

    setfilteredOptionsLen(arrayResult.length);
  }, [optAEditorState, optBEditorState, optCdiState, optDdiState, optEdiState]);

  //called when and only when input validation fails
  useEffect(() => {
    if (isInvalid) {
      notificationCtx.showNotification({
        title: "Error!",
        message:
          "Invalid input, some required input field/fields was probably not  filled. The required input fields are the question field,the explanation field, the correct option field and at least two option fields",

        status: "error",
      });
      setIsInvalid(false);
    }
  }, [isInvalid]);

  //returns an array of the options where the user had made a choice
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

  //set the option selected by the user
  function onselectChange(e) {
    setselectValue(e.target.value);
  }
  //Published date
  const formattedDatePublished = new Date().toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  //publishedDate;
  //prepares the select element for fixing the correct option  by the examiner
  //The choice available here depends on the number of input options filled.
  function outputSetAswerSelectOptions(params) {
    if (filteredOptionsLen === null) {
      return null;
    }

    const optionsArray = ["A", "B", "C", "D", "E"];
    return (
      <select
        name=""
        id="correctOption"
        onChange={onselectChange}
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

  //called when the submit button is clicked
  //passes question object data to addQuestion function which
  //sends data to database
  function sendQuestionHandler(event) {
    console.log("create-called");
    event.preventDefault();

    //check whether the required fields has entered.
    //throw error and abort submission if any of the
    //required fields are missing.
    //in question options, only options A and B are required
    if (
      !checkEditorText(questEditorState) ||
      !checkEditorText(optAEditorState) ||
      !checkEditorText(optBEditorState) ||
      !checkEditorText(explanEditorState) ||
      !enteredCorrectOption ||
      !enteredSubject ||
      enteredSubject.trim() === "" ||
      !enteredExamType ||
      enteredExamType.trim() === ""
    ) {
      setIsInvalid(true);
      return;
    }

    const filteredOptions = [
      { option: enteredOptionA.trim() },
      { option: enteredOptionB.trim() },

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

    props.onAddQuestion(
      {
        question: enteredQuestion,
        options: filteredOptions,

        explanation: enteredExplanation,
        correctOption: enteredCorrectOption,
        linkedTo: linkedValue,
        authorId: session.user.email,
        questionType: "multi-choice",
        moderated: false,
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
        publishedDate: formattedDatePublished,
      },

      "mult-choice"
    );
    props.noteFormRef.current.togglevisibility();
  }

  //link question to question  to question introtext
  const onChangeNumber = (e) => {
    setlinkedValue(e.target.value);
  };

  return (
    <form className={classes.form} onSubmit={sendQuestionHandler}>
      <div className={classes.row}>
        <div className={classes.control}>
          <label htmlFor="questionIntro">Question Intro Text</label>

          <MyRichEditor
            useEditorMainBlog={useEditorQuestionIntroText}
            readOnly={false}
            toolbarOnFocus={false}
            toolbarPresent={true}
            smallHeight={true}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="question">Your Question</label>

          <MyRichEditor
            useEditorMainBlog={useEditorQuestion}
            readOnly={false}
            toolbarOnFocus={false}
            toolbarPresent={true}
            smallHeight={true}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="optionA">OptionA</label>

          <MyRichEditor
            useEditorMainBlog={useEditorOptionA}
            readOnly={false}
            toolbarOnFocus={false}
            toolbarPresent={true}
            smallHeight={true}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="optionB">OptionB</label>

          <MyRichEditor
            useEditorMainBlog={useEditorOptionB}
            readOnly={false}
            toolbarOnFocus={false}
            toolbarPresent={true}
            smallHeight={true}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="optionC">OptionC</label>

          <MyRichEditor
            useEditorMainBlog={useEditorOptionC}
            readOnly={false}
            toolbarOnFocus={false}
            toolbarPresent={true}
            smallHeight={true}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="optionD">OptionD</label>

          <MyRichEditor
            useEditorMainBlog={useEditorOptionD}
            readOnly={false}
            toolbarOnFocus={false}
            toolbarPresent={true}
            smallHeight={true}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="optionE">OptionE</label>

          <MyRichEditor
            useEditorMainBlog={useEditorOptionE}
            readOnly={false}
            toolbarOnFocus={false}
            toolbarPresent={true}
            smallHeight={true}
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
        <div className={classes.control}>
          <label htmlFor="exam-type">
            Indicate the exam body if past questions or none
          </label>
          <input
            id="exam-type"
            required
            value={enteredExamType}
            onChange={useFieldExamType.onChange}
            style={{ width: "80%", display: "block" }}
          />
        </div>

        <div className={classes.control}>
          <label htmlFor="correctOption">Set The Correct Option</label>

          {outputSetAswerSelectOptions()}
        </div>

        <div className={classes.control}>
          <label htmlFor="explanation">Your Explanation</label>
          <MyRichEditor
            useEditorMainBlog={useEditorExplanation}
            readOnly={false}
            toolbarOnFocus={false}
            toolbarPresent={true}
            smallHeight={true}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="linked">Linked To Which Question</label>

          <input
            type="number"
            id="linked"
            required
            value={linkedValue}
            onChange={onChangeNumber}
          />
        </div>
      </div>

      <button className={classes.btn}>Submit</button>
    </form>
  );
}

export default NewQuestion;
