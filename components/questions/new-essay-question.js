import { useRef, useState } from "react";
import classes from "./new-questions-form.module.css";
import MyRichEditor from "../rich-text-editor/myrich-text-editor";
import {
  useField,
  useEditor,
  handleImageInsert,
} from "../../hooks/input-editor-hooks";

import { useSession } from "next-auth/client";

function NewEssayQuestion(props) {
  const [isInvalid, setIsInvalid] = useState(false);
  const [session, loading] = useSession();
  //const useFieldTopic = useField("text");

  const useEditorQuestion = useEditor();

  const useEditorExplanation = useEditor();

  const {
    url: enteredQuestion,
    editorState,
    onEditorStateChange,
  } = useEditorQuestion;

  const { url: enteredExplanation } = useEditorExplanation;

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

  function sendQuestionHandler(event) {
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
      !enteredQuestion ||
      enteredQuestion.trim() === "" ||
      !enteredExplanation ||
      enteredExplanation.trim() === ""
    ) {
      setIsInvalid(true);
      return;
    }

    props.onAddQuestion({
      question: enteredQuestion,

      explanation: enteredExplanation,
      questType: "essay-type",
      authorId: session.user.email,
    });
    props.noteFormRef.current.togglevisibility();
  }

  return (
    <form className={classes.form} onSubmit={sendQuestionHandler}>
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

export default NewEssayQuestion;
