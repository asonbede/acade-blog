/* 
The idea here is to show students their performance, after they 
had clicked the submit button.
The component passes the student performance data to 
 a child component QuestionAnswerReviewList
*/
import React, { useState, useContext, useEffect } from "react";

import classes from "./question-review-select.module.css";
import QuestionAnswerReviewList from "./question-answer-review-list";
import NotificationContext from "../../store/notification-context";
function QuestionReviewSelect(props) {
  const [selectedReview, setselectedReview] = useState("all");

  const index = props.index;
  const controlReviewLink = props.controlReviewLink;
  const backToQuestionListHandler = props.backToQuestionListHandler;
  const notificationCtx = useContext(NotificationContext);
  const subjects = props.subjects;
  const quesForm = props.quesForm;
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

  // console.log({ items }, "jjhh");
  console.log({ correctQuestions }, "jjcc");
  console.log({ inCorrectQuestions }, "jjbbiiii");
  function handleChange(event) {
    setselectedReview(event.target.value);
  }
  function getSubjectMark() {
    let correctObj = {};
    for (let index = 0; index < subjects.length; index++) {
      const element = subjects[index];
      const correctList = correctQuestions.filter(
        (item) => item.subject === element
      );
      const totalSubject = currentArray.filter(
        (item) => item.subject === element
      );
      correctObj = {
        ...correctObj,
        [element]: { score: correctList.length, len: totalSubject.length },
      };
    }
    return correctObj;
  }

  function setQuestionNumber() {
    if (selectedReview === "all") {
      return currentArray.length;
    } else if (selectedReview === "correct-questions") {
      return correctQuestions.length;
    } else if (selectedReview === "incorrect-questions") {
      return inCorrectQuestions.length;
    } else {
      return skippedQuestions.length;
    }
  }

  return (
    // <div className={classes.form}>
    //   <div className={classes.controls}>
    //     <div className={classes.control}>
    //       <label htmlFor="review">select category</label>
    //       <select id="review" onChange={handleChange}>
    //         <option value="all">All Questions</option>
    //         <option value="correct-questions">Correct Questions</option>
    //         <option value="incorrect-questions">Incorrect Questions</option>
    //         <option value="skipped-questions">Skipped Questions</option>
    //       </select>
    //     </div>
    //   </div>

    //   <span>{`Score: ${score}/${currentArray.length}`}</span>

    //   {selectedReview === "all" ? (
    //     <QuestionAnswerReviewList
    //       selectedValuesOfRadioButton={selectedValuesOfRadioButton}
    //       items={currentArray}
    //       questionType="all"
    //       correctQuestions={correctQuestions}
    //       inCorrectQuestions={inCorrectQuestions}
    //       skippedQuestions={skippedQuestions}
    //       selectValue={selectValue}
    //     />
    //   ) : null}
    //   {selectedReview === "correct-questions" ? (
    //     <QuestionAnswerReviewList
    //       selectedValuesOfRadioButton={selectedValuesOfRadioButton}
    //       items={correctQuestions}
    //       questionType="correct-questions"
    //       selectValue={selectValue}
    //     />
    //   ) : null}
    //   {selectedReview === "incorrect-questions" ? (
    //     <QuestionAnswerReviewList
    //       selectedValuesOfRadioButton={selectedValuesOfRadioButton}
    //       items={inCorrectQuestions}
    //       questionType="incorrect-questions"
    //       selectValue={selectValue}
    //     />
    //   ) : null}
    //   {selectedReview === "skipped-questions" ? (
    //     <QuestionAnswerReviewList
    //       selectedValuesOfRadioButton={selectedValuesOfRadioButton}
    //       items={skippedQuestions}
    //       questionType="skipped-questions"
    //       selectValue={selectValue}
    //     />
    //   ) : null}
    //   {selectValue === "mult-choice-one" && controlReviewLink ? (
    //     <button onClick={backToQuestionListHandler}>Back To Question</button>
    //   ) : null}
    // </div>
    <div class="row justify-content-center align-items-center">
      <div class="col-11">
        <div class="card bg-light">
          <div class="card-header">
            <div class="d-flex align-items-center justify-content-between">
              {/* <h4 class="card-title">Goodluck from Bede Asonye</h4> */}
              {/* <div className="d-flex flex-column align-items-center">
            <img
              src={imageProfileUrl}
              class="rounded-circle mb-1 img-fluid w-25"
              alt="card image"
            />
            <p className="card-text">Goodluck from {author}</p>
          </div>
          <p class="card-text">{setQuestionNum()}</p> */}
              {/* <div class="input-group mb-3">
  <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2">
  <span class="input-group-text" id="basic-addon2">@example.com</span>
</div> */}
              <div>
                <label htmlFor="review">select category</label>
                <div class="input-group">
                  <select
                    id="review"
                    onChange={handleChange}
                    class="form-select form-select-lg"
                    aria-label=".form-select-lg example"
                  >
                    <option value="all">All Questions</option>
                    <option value="correct-questions">Correct Questions</option>
                    <option value="incorrect-questions">
                      Incorrect Questions
                    </option>
                    <option value="skipped-questions">Skipped Questions</option>
                  </select>

                  <span
                    class="input-group-text badge  bg-primary d-flex align-items-center"
                    id="basic-addon1"
                    // style={{ borderRadius: "50%", width: "17px" }}
                  >
                    <i> {setQuestionNumber()} </i>
                  </span>
                </div>
              </div>
              <span>{`Total Score: ${score}/${currentArray.length}`}</span>
            </div>
          </div>
          <div class="card-body text-center">
            {selectedReview === "all" ? (
              <QuestionAnswerReviewList
                selectedValuesOfRadioButton={selectedValuesOfRadioButton}
                items={currentArray}
                questionType="all"
                correctQuestions={correctQuestions}
                inCorrectQuestions={inCorrectQuestions}
                skippedQuestions={skippedQuestions}
                selectValue={selectValue}
                getSubjectMark={getSubjectMark}
                subjects={subjects}
                quesForm={quesForm}
              />
            ) : null}
            {selectedReview === "correct-questions" ? (
              <QuestionAnswerReviewList
                selectedValuesOfRadioButton={selectedValuesOfRadioButton}
                items={correctQuestions}
                questionType="correct-questions"
                selectValue={selectValue}
                getSubjectMark={getSubjectMark}
                subjects={subjects}
                quesForm={quesForm}
              />
            ) : null}
            {selectedReview === "incorrect-questions" ? (
              <QuestionAnswerReviewList
                selectedValuesOfRadioButton={selectedValuesOfRadioButton}
                items={inCorrectQuestions}
                questionType="incorrect-questions"
                selectValue={selectValue}
                getSubjectMark={getSubjectMark}
                subjects={subjects}
                quesForm={quesForm}
              />
            ) : null}
            {selectedReview === "skipped-questions" ? (
              <QuestionAnswerReviewList
                selectedValuesOfRadioButton={selectedValuesOfRadioButton}
                items={skippedQuestions}
                questionType="skipped-questions"
                selectValue={selectValue}
                getSubjectMark={getSubjectMark}
                subjects={subjects}
                quesForm={quesForm}
              />
            ) : null}
            {controlReviewLink ? (
              <button
                onClick={backToQuestionListHandler}
                class="btn  btn-primary mt-2"
              >
                Back To Question
              </button>
            ) : null}
          </div>

          {/* <div class="card-body text-center">
          selectValue === "essay-type"
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default QuestionReviewSelect;
