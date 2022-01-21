import React, { useState, useContext, useEffect } from "react";

import classes from "./question-review-select.module.css";
import QuestionAnswerReviewList from "./question-answer-review-list";
import NotificationContext from "../../store/notification-context";
function QuestionReviewSelect(props) {
  const [selectedReview, setselectedReview] = useState("all");

  const index = props.index;
  const controlReviewLink = props.controlReviewLink;
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
    selectValue,
  } = reviewQuestionObj;
  // let oneScoreValue = 0;
  //const [oneScoreValue, setoneScoreValue] = useState(0);
  // useEffect(() => {
  //   console.log({ selectValue }, "effects");
  //   if (selectValue === "mult-choice-one") {
  //     console.log("scoreCalled bedebdeeeee......");
  //     // const newScore = oneScoreValue + score;
  //     // setoneScoreValue(newScore);
  //     console.log(typeof score);
  //     if (window) {
  //       if (!index) {
  //         window.localStorage.setItem("oneScoreValue", JSON.stringify(score));
  //         const scoreArrayFromLoc = JSON.parse(
  //           window.localStorage.getItem("oneScoreValue")
  //         );

  //         if (!scoreArrayFromLoc) {
  //           window.localStorage.setItem("oneScoreValue", JSON.stringify(score));
  //         }

  //         window.localStorage.setItem(
  //           "oneScoreValue",
  //           JSON.stringify(scoreArrayFromLoc + score)
  //         );
  //       }
  //     }

  //     // setoneScoreValue(oneScoreValue + score);
  //   }
  //   console.log("scoreCalled bedebdeeeee444444......");
  // }, [reviewQuestionObj]);

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
  //let oneScoreValue;

  // function handleOneScoreFunc() {
  //   //console.log({ oneScoreValue, score }, props.index);
  //   // oneScoreValue = oneScoreValue + score;
  //   //setoneScoreValue(oneScoreValue + score);
  //   if (window) {
  //     const scoreArrayFromValue = JSON.parse(
  //       window.localStorage.getItem("oneScoreValue")
  //     );
  //     if (index === 0) {
  //       return `${score}/ ${index + 1}`;
  //     } else {
  //       console.log({ scoreArrayFromValue });
  //       // const sum = scoreArrayFromValue.reduce(
  //       //   (total, amount) => total + amount
  //       // );
  //       return `${scoreArrayFromValue}/ ${index + 1}`;
  //     }
  //   }
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
          selectValue={selectValue}
        />
      ) : null}
      {selectedReview === "correct-questions" ? (
        <QuestionAnswerReviewList
          selectedValuesOfRadioButton={selectedValuesOfRadioButton}
          items={correctQuestions}
          questionType="correct-questions"
          selectValue={selectValue}
        />
      ) : null}
      {selectedReview === "incorrect-questions" ? (
        <QuestionAnswerReviewList
          selectedValuesOfRadioButton={selectedValuesOfRadioButton}
          items={inCorrectQuestions}
          questionType="incorrect-questions"
          selectValue={selectValue}
        />
      ) : null}
      {selectedReview === "skipped-questions" ? (
        <QuestionAnswerReviewList
          selectedValuesOfRadioButton={selectedValuesOfRadioButton}
          items={skippedQuestions}
          questionType="skipped-questions"
          selectValue={selectValue}
        />
      ) : null}
    </div>
  );
}

export default QuestionReviewSelect;
