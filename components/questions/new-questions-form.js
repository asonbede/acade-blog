import { useRef, useState } from "react";
import classes from "./new-questions-form.module.css";

function NewQuestion(props) {
  const [isInvalid, setIsInvalid] = useState(false);

  const questionInputRef = useRef();
  const optionAInputRef = useRef();
  const optionBInputRef = useRef();
  const optionCInputRef = useRef();
  const optionDInputRef = useRef();
  const optionEInputRef = useRef();
  const explanationInputRef = useRef();
  const correctOptionInputRef = useRef();

  function sendQuestionHandler(event) {
    event.preventDefault();

    const enteredQuestion = questionInputRef.current.value;
    const enteredOptionA = optionAInputRef.current.value;
    const enteredOptionB = optionBInputRef.current.value;
    const enteredOptionC = optionCInputRef.current.value;
    const enteredOptionD = optionDInputRef.current.value;
    const enteredOptionE = optionEInputRef.current.value;
    const enteredCorrectOption = correctOptionInputRef.current.value;
    const enteredExplanation = explanationInputRef.current.value;

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

    props.onAddQuestion({
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
    });
  }

  return (
    <form className={classes.form} onSubmit={sendQuestionHandler}>
      {/* <div className={classes.row}> */}
      <div className={classes.control}>
        <label htmlFor="question">Your Questions</label>
        <textarea id="question" rows="5" ref={questionInputRef}></textarea>
      </div>
      <div className={classes.control}>
        <label htmlFor="optionA">OptionA</label>
        <input type="text" id="optionA" ref={optionAInputRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="optionB">OptionB</label>
        <input type="text" id="optionB" ref={optionBInputRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="optionC">OptionC</label>
        <input type="text" id="optionC" ref={optionCInputRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="optionD">OptionD</label>
        <input type="text" id="optionD" ref={optionDInputRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="optionE">OptionE</label>
        <input type="text" id="optionE" ref={optionEInputRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="correctOption">Correct Option</label>
        <input type="text" id="correctOption" ref={correctOptionInputRef} />
      </div>
      {/* </div> */}
      <div className={classes.control}>
        <label htmlFor="explanation">Your Explanation</label>
        <textarea
          id="explanation"
          rows="5"
          ref={explanationInputRef}></textarea>
      </div>
      {isInvalid && <p>Please enter a valid email address and comment!</p>}
      <button className={classes.btn}>Submit</button>
    </form>
  );
}

export default NewQuestion;
