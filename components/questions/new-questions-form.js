import { useRef, useState, useEffect, useContext } from "react";
import classes from "./new-questions-form.module.css";
import MyRichEditor from "../rich-text-editor/myrich-text-editor";
import NotificationContext from "../../store/notification-context";
import { options, useSession } from "next-auth/client";

import {
  useField,
  useEditor,
  handleImageInsert,
} from "../../hooks/input-editor-hooks";
function NewQuestion(props) {
  const [isInvalid, setIsInvalid] = useState(false);
  const [session, loading] = useSession();
  const [linkedValue, setlinkedValue] = useState(0);
  const [filteredOptionsLen, setfilteredOptionsLen] = useState();
  const [enteredCorrectOption, setselectValue] = useState();

  //const useFieldTopic = useField("text");
  // const useFieldCorrectOption = useField("text");
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

  // const { value: enteredCorrectOption } = useFieldCorrectOption;
  // const { value: author } = useFieldAuthor;
  // const { value: imageBlog } = useFieldImage;
  // const dispatch = useDispatch();

  // const questionInputRef = useRef();
  // const optionAInputRef = useRef();
  // const optionBInputRef = useRef();
  // const optionCInputRef = useRef();
  // const optionDInputRef = useRef();
  // const optionEInputRef = useRef();
  // const explanationInputRef = useRef();
  // const correctOptionInputRef = useRef();

  //checks if editor has text = returns true or not= returns false
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
          "Invalid input, some required input field/fields was probably not  filled. The required input fields are the question field,the explanation field, the correct option field and at least two option fields",

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

  function sendQuestionHandler(event) {
    console.log("create-called");
    event.preventDefault();

    // const enteredQuestion = questionInputRef.current.value;
    // const enteredOptionA = optionAInputRef.current.value;
    // const enteredOptionB = optionBInputRef.current.value;
    // const enteredOptionC = optionCInputRef.current.value;
    // const enteredOptionD = optionDInputRef.current.value;
    // const enteredOptionE = optionEInputRef.current.value;
    // const enteredCorrectOption = correctOptionInputRef.current.value;
    // const enteredExplanation = explanationInputRef.current.value;

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
      !enteredCorrectOption
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
        questionIntroText: checkEditorText(quesIntroEdiState)
          ? enteredQuestionIntroText.trim()
          : null,
      },
      "mult-choice"
    );
    props.noteFormRef.current.togglevisibility();
  }
  const onChangeNumber = (e) => {
    setlinkedValue(e.target.value);
  };
  return (
    <form className={classes.form} onSubmit={sendQuestionHandler}>
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
          <label htmlFor="question">Your Question</label>
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
          <label htmlFor="correctOption">Set The Correct Option</label>
          {/* <input
            id="correctOption"
            required
            value={enteredCorrectOption}
            onChange={useFieldCorrectOption.onChange}
            style={{ width: "80%", display: "block" }}
          /> */}
          {/* {filteredOptionsLen.length > 1 && outputSetAswerSelectOptions()} */}
          {outputSetAswerSelectOptions()}
        </div>
        {/* <select name="" id="">
          <optgroup label="Chemistry">
            <option>Scientific Method</option>
            <option>Data Presentation</option>
            <option>Atoms, what are they?</option>
            <option>The periodic Table</option>
            <option>The molecules</option>
          </optgroup>
        </select> */}
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
            required
            value={linkedValue}
            onChange={onChangeNumber}
          />
        </div>
      </div>

      {/* {isInvalid && <p>Please enter a valid email address and comment!</p>} */}
      <button className={classes.btn}>Submit</button>
    </form>
  );
}

export default NewQuestion;

// import {
//   useField,
//   useEditor,
//   handleImageInsert,
//   MyRichEditor,
// } from "../hooks/resourse";

// const CreateBlog = (props) => {
//   const [image, setimage] = useState("");

//   const useFieldTopic = useField("text");
//   const useFieldAuthor = useField("text");
//   const useFieldImage = useField("text");
//   const useEditorMainBlog = useEditor();
//   const useEditorMainBlogTitle = useEditor();

//   const { url, editorState, onEditorStateChange } = useEditorMainBlog;
//   const { url: title } = useEditorMainBlogTitle;
//   const { value: topic } = useFieldTopic;
//   const { value: author } = useFieldAuthor;
//   const { value: imageBlog } = useFieldImage;
//   const dispatch = useDispatch();

//   const handleCreateBlog = (event) => {
//     event.preventDefault();

//     const formData = new FormData();
//     formData.append("image", image);
//     formData.append("topic", topic);
//     formData.append("title", title);
//     formData.append("url", url);
//     formData.append("author", author);
//     formData.append("created", new Date().getTime());
//     formData.append("updated", new Date().getTime());

//     props.noteFormRef.current.togglevisibility();

//     dispatch(createBlog(formData));
//     // setTitle("");
//     // setAuthor("");
//   };

//   const fileSelected = (event) => {
//     const file = event.target.files[0];
//     setimage(file);
//   };

//   return (
//     <Form onSubmit={handleCreateBlog}>
//       <Form.Group controlId="formBlogTopicId">
//         <Form.Label>Topic</Form.Label>
//         <Form.Control {...useFieldTopic} as="textarea" rows={2} />
//       </Form.Group>

//       <Form.Group controlId="formTitleId">
//         <Form.Label className="App-header">Learning Objectives</Form.Label>

//         <MyRichEditor
//           useEditorMainBlog={useEditorMainBlogTitle}
//           readOnly={false}
//           toolbarOnFocus={false}
//           toolbarPresent={true}
//           smallHeight={false}
//         />
//       </Form.Group>

//       <Form.Group controlId="formAuthorId">
//         <Form.Label> author</Form.Label>

//         <Form.Control {...useFieldAuthor} />
//       </Form.Group>

//       <Form.Group controlId="formUrlId">
//         <Form.Label className="App-header"> Contents</Form.Label>

//         <MyRichEditor
//           useEditorMainBlog={useEditorMainBlog}
//           readOnly={false}
//           toolbarOnFocus={false}
//           toolbarPresent={true}
//           smallHeight={false}
//         />
//       </Form.Group>

//       <Form.Group controlId="formBlogImageId">
//         <Form.Label>Blog image</Form.Label>
//         <Form.Control {...useFieldImage} as="textarea" rows={2} />
//       </Form.Group>

//       <Form.Group controlId="formProfileIigeId">
//         <Form.File
//           onChange={fileSelected}
//           accept="image/*"
//           label="Profile Image"
//         />
//       </Form.Group>
//       <Button
//         onClick={() =>
//           handleImageInsert(editorState, imageBlog, onEditorStateChange)
//         }
//         style={{ margin: 5 }}
//       >
//         Insert Image
//       </Button>
//       <Button type="submit" style={{ margin: 5 }} block>
//         create
//       </Button>
//     </Form>
//   );
// };
// export default CreateBlog;
