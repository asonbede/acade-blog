import { useRef, useState } from "react";
import classes from "./new-questions-form.module.css";
import MyRichEditor from "../rich-text-editor/myrich-text-editor";

import { useSession } from "next-auth/client";

import {
  useField,
  useEditor,
  handleImageInsert,
} from "../../hooks/input-editor-hooks";
function NewQuestion(props) {
  const [isInvalid, setIsInvalid] = useState(false);
  const [session, loading] = useSession();

  //const useFieldTopic = useField("text");
  const useFieldCorrectOption = useField("text");

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

  const { value: enteredCorrectOption } = useFieldCorrectOption;
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

    props.onAddQuestion(
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
        authorId: session.user.email,
        questionType: "multi-choice",
      },
      "mult-choice"
    );
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
            required
            value={enteredCorrectOption}
            onChange={useFieldCorrectOption.onChange}
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
