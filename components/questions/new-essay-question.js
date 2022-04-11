/* 
The idea here is to enable users to score essay type questions
on the database. The question object sent looks like so
{
        question: enteredQuestion,

        explanation: enteredExplanation,
        questionType: "essay-type",
        authorId: session.user.email,
        subject: enteredSubject,
        moderated: false,
      },
*/

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
  const useFieldSubject = useField("text");

  const {
    url: enteredQuestion,
    editorState,
    onEditorStateChange,
  } = useEditorQuestion;

  const { url: enteredExplanation } = useEditorExplanation;
  const { value: enteredSubject } = useFieldSubject;

  function sendQuestionHandler(event) {
    event.preventDefault();
    if (
      !enteredQuestion ||
      enteredQuestion.trim() === "" ||
      !enteredExplanation ||
      enteredExplanation.trim() === ""
    ) {
      setIsInvalid(true);
      return;
    }

    props.onAddQuestion(
      {
        question: enteredQuestion,

        explanation: enteredExplanation,
        questionType: "essay-type",
        authorId: session.user.email,
        subject: enteredSubject,
        moderated: false,
      },
      "essay-type"
    );
    props.noteFormRef.current.togglevisibility();
  }

  return (
    <form className={classes.form} onSubmit={sendQuestionHandler}>
      <div className={classes.row}>
        <div className={classes.control}>
          <label htmlFor="question">Your Questions</label>

          <MyRichEditor
            useEditorMainBlog={useEditorQuestion}
            readOnly={false}
            toolbarOnFocus={false}
            toolbarPresent={true}
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
          <label htmlFor="explanation">Your Explanation</label>

          <MyRichEditor
            useEditorMainBlog={useEditorExplanation}
            readOnly={false}
            toolbarOnFocus={false}
            toolbarPresent={true}
          />
        </div>
      </div>

      <button className={classes.btn}>Submit</button>
    </form>
  );
}

export default NewEssayQuestion;
