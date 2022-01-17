import React, { useState, useContext } from "react";

import classes from "./question-review-select.module.css";
import QuestionAnswerReviewList from "./question-answer-review-list";
import NotificationContext from "../../store/notification-context";
function QuestionReviewSelect(props) {
  const [selectedReview, setselectedReview] = useState("all");

  const notificationCtx = useContext(NotificationContext);

  const reviewQuestionObj = notificationCtx.reviewQuestion;
  const {
    selectedValuesOfRadioButton,
    currentArray,
    correctQuestions,
    inCorrectQuestions,
    skippedQuestions,
    allQuestions,
    score,
  } = reviewQuestionObj;

  // console.log({ items }, "jjhh");
  console.log({ correctQuestions }, "jjcc");
  console.log({ inCorrectQuestions }, "jjbbiiii");
  function handleChange(event) {
    setselectedReview(event.target.value);
  }
  // function renderView() {
  //     if () {

  //     }
  // }
  return (
    <div className={classes.form}>
      <div className={classes.controls}>
        <div className={classes.control}>
          <label htmlFor="review">select category</label>
          <select id="review" onChange={handleChange}>
            <option value="all">All Questions</option>
            <option value="correct-questions">Correct Questions</option>
            <option value="incorrect-questions">Incorrect Questions</option>
            <option value="skipped-questions">Skipped Questions</option>
          </select>
        </div>
      </div>
      <span>{`Score: ${score}/${currentArray.length}`}</span>
      {selectedReview === "all" ? (
        <QuestionAnswerReviewList
          selectedValuesOfRadioButton={selectedValuesOfRadioButton}
          items={currentArray}
          questionType="all"
          correctQuestions={correctQuestions}
          inCorrectQuestions={inCorrectQuestions}
          skippedQuestions={skippedQuestions}
        />
      ) : null}
      {selectedReview === "correct-questions" ? (
        <QuestionAnswerReviewList
          selectedValuesOfRadioButton={selectedValuesOfRadioButton}
          items={correctQuestions}
          questionType="correct-questions"
        />
      ) : null}
      {selectedReview === "incorrect-questions" ? (
        <QuestionAnswerReviewList
          selectedValuesOfRadioButton={selectedValuesOfRadioButton}
          items={inCorrectQuestions}
          questionType="incorrect-questions"
        />
      ) : null}
      {selectedReview === "skipped-questions" ? (
        <QuestionAnswerReviewList
          selectedValuesOfRadioButton={selectedValuesOfRadioButton}
          items={skippedQuestions}
          questionType="skipped-questions"
        />
      ) : null}
    </div>
  );
}

export default QuestionReviewSelect;
