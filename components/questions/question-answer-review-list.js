/* 
The idea here is to iterate over the questions and check
the correct ones.
*/

import React, { useState } from "react";
import DisplayEditorContent from "../rich-text-editor/display-editor-content";

import classes from "./questions-list.module.css";
import ReportCard from "./report-card-ques";
function QuestionAnswerReviewList(props) {
  const {
    selectedValuesOfRadioButton,
    items,
    correctQuestions,
    inCorrectQuestions,
    skippedQuestions,
    questionType,
    selectValue,
    getSubjectMark,
    subjects,
    quesForm,
  } = props;
  const [fullLessQuestValue, setfullLessQuestValue] = useState(false);
  console.log({ selectedValuesOfRadioButton, items }, "uuuhh");

  const optionsList = ["A", "B", "C", "D", "E"];
  //const correctTranslateList = [{ "A": "blablablabla"}, { "B": "blablablabla"}, { "C": "blablablabla" }, { "D": "blablablabla"}, { "E": "blablablabla" }]
  //map options to letters
  function translateOptions(optionArray) {
    const result = optionArray.map((item, index) => ({
      [optionsList[index]]: item.option.trim(),
    }));

    return result;
  }
  //check options
  function checkOptions(letter, optionArray) {
    console.log({ letter });
    const translateOptionsResult = translateOptions(optionArray);
    const correctValueObj = translateOptionsResult.find(
      (item) => Object.keys(item)[0] === letter.trim()
    );
    const correctValue = correctValueObj[letter];
    return correctValue;
  }

  function questionStatus(questionIndex) {
    if (questionType === "all") {
      let statusVar = "";
      const checkCorrectQuestions = correctQuestions.find(
        (correctQuestion) => correctQuestion.originalIndex + 1 === questionIndex
      );

      console.log({ inCorrectQuestions }, "prob");
      const checkinCorrectQuestions = inCorrectQuestions.find(
        (inCorrectQuestion) =>
          inCorrectQuestion.originalIndex + 1 === questionIndex
      );

      const checkSkippedQuestions = skippedQuestions.find(
        (skippedQuestion) => skippedQuestion.originalIndex + 1 === questionIndex
      );

      if (checkCorrectQuestions) {
        statusVar = "Correct";
      } else if (checkinCorrectQuestions) {
        statusVar = "Incorrect";
      } else {
        statusVar = "Skipped";
      }
      return statusVar;
    }
    return "";
  }
  function questFullLessControlHandler(id) {
    if (fullLessQuestValue) {
      setfullLessQuestValue(false);
    } else {
      setfullLessQuestValue(id);
    }
  }
  function renderQuestions(questionIndex, item) {
    if (
      selectedValuesOfRadioButton.hasOwnProperty(
        `studentChoiceForQuestion${questionIndex + 1}`
      )
    ) {
      return (
        <>
          {/* {item.questionIntroText && (
            <DisplayEditorContent
              contentFromServer={item.questionIntroText}
              toolbarPresent={false}
            />
          )} */}

          {item.questionIntroText && fullLessQuestValue === item._id && (
            <div class="d-flex flex-column fw-bolder border mt-5 p-3 shadow-lg">
              <DisplayEditorContent
                contentFromServer={item.questionIntroText}
                toolbarPresent={false}
              />

              <span style={{ color: "blue", fontStyle: "italic" }}>
                {item.questionIntroAtach}
              </span>
              {/* <br /> */}
            </div>
          )}
          {/* <div style={{ display: "flex" }}>
            {selectValue === "mult-choice-one" ? null : (
              <span style={{ marginRight: "5px", marginTop: "14px" }}>
                {questionIndex + 1}
              </span>
            )}

            <DisplayEditorContent
              contentFromServer={item.question}
              toolbarPresent={false}
            />
            <span className={questionStatus(questionIndex + 1)}>
              {`---${questionStatus(questionIndex + 1)}`}
            </span>
             getSubjectMark={getSubjectMark}
                subjects={subjects}
                quesForm={quesForm}
          </div> */}
          <div class="d-flex flex-column fw-bolder border mt-5 p-3 shadow">
            {item.questionIntroText && (
              <a
                onClick={() => questFullLessControlHandler(item._id)}
                class="btn  btn-outline-dark  border-light"
              >
                {fullLessQuestValue === item._id
                  ? "See Less Question ..."
                  : "See Full Question ..."}
              </a>
            )}
            <div class="d-flex align-items-center fw-bolder">
              {/* <div class="mt-4 p-5 bg-primary text-white rounded">
            <h1>Jumbotron Example</h1>
            <p>Lorem ipsum...</p>
          </div> */}
              <span>
                {quesForm === "rev-ques" ? questionIndex + 1 : item.numIndex}.
              </span>

              <DisplayEditorContent
                contentFromServer={item.question}
                toolbarPresent={false}
              />
            </div>
            {item.examType === "none" || item.examType === undefined ? null : (
              <span>{item.examType}</span>
            )}
          </div>
        </>
      );
    }

    return null;
  }

  function renderRadioButtons(
    optionItem,
    questionIndex,
    optionIndex,
    originalIndex
  ) {
    let studentsChoice;
    let correctOptionLetter;
    if (
      selectedValuesOfRadioButton.hasOwnProperty(
        `studentChoiceForQuestion${questionIndex + 1}`
      )
    ) {
      studentsChoice =
        selectedValuesOfRadioButton[
          `studentChoiceForQuestion${questionIndex + 1}`
        ].trim();
      correctOptionLetter =
        selectedValuesOfRadioButton[
          `correctOptionForQuestion${questionIndex + 1}`
        ];
      if (
        questionType === "correct-questions" ||
        questionType === "incorrect-questions" ||
        questionType === "skipped-questions"
      ) {
        studentsChoice =
          selectedValuesOfRadioButton[
            `studentChoiceForQuestion${originalIndex + 1}`
          ].trim();
        correctOptionLetter =
          selectedValuesOfRadioButton[
            `correctOptionForQuestion${originalIndex + 1}`
          ];
      }

      const questionObj = items[questionIndex];
      const optionsArray = questionObj.options;

      const correctOptionValue = checkOptions(
        correctOptionLetter,
        optionsArray
      );

      console.log({ studentsChoice });
      console.log({ optionItem });
      //console.log({ optionsArray });
      console.log({ correctOptionLetter });
      console.log({ correctOptionValue });
      if (
        studentsChoice === optionItem.option.trim() &&
        studentsChoice === correctOptionValue
      ) {
        return (
          <label
            class={`d-flex align-items-center list-group-item ms-3 shadow`}
          >
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name={questionIndex}
                value={optionItem.option}
                id={`${questionIndex}:${optionIndex}`}
                // onChange={handleRadioButtonChange}
                checked
                disabled
              />
              {optionsList[optionIndex]}.
            </div>

            <DisplayEditorContent
              contentFromServer={optionItem.option}
              toolbarPresent={false}
            />
            <span style={{ color: "green", fontSize: "30px" }}>
              <i class="bi bi-check2"></i>
            </span>
          </label>
        );
      } else if (
        studentsChoice === optionItem.option.trim() &&
        studentsChoice !== correctOptionValue
      ) {
        return (
          <label
            class={`d-flex align-items-center list-group-item ms-3 shadow`}
          >
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name={questionIndex}
                value={optionItem.option}
                id={`${questionIndex}:${optionIndex}`}
                // onChange={handleRadioButtonChange}
                checked
                disabled
              />
              {optionsList[optionIndex]}.
            </div>
            <DisplayEditorContent
              contentFromServer={optionItem.option}
              toolbarPresent={false}
            />
            <span>
              {" "}
              <span style={{ color: "red", fontSize: "30px" }}>
                <i class="bi bi-x"></i>
              </span>
            </span>
          </label>
        );
      } else if (
        studentsChoice !== optionItem.option.trim() &&
        optionItem.option.trim() === correctOptionValue
      ) {
        return (
          <label
            class={`d-flex align-items-center list-group-item ms-3 shadow`}
          >
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name={questionIndex}
                value={optionItem.option}
                id={`${questionIndex}:${optionIndex}`}
                disabled
              />
              {optionsList[optionIndex]}.
            </div>
            <DisplayEditorContent
              contentFromServer={optionItem.option}
              toolbarPresent={false}
            />
            <span style={{ color: "blue", fontSize: "30px" }}>
              <i class="bi bi-check2"></i>
            </span>
          </label>
        );
      } else {
        return (
          <label
            class={`d-flex align-items-center list-group-item ms-3 shadow`}
          >
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name={questionIndex}
                value={optionItem.option}
                id={`${questionIndex}:${optionIndex}`}
                disabled
              />
              {optionsList[optionIndex]}.
            </div>
            <DisplayEditorContent
              contentFromServer={optionItem.option}
              toolbarPresent={false}
            />
          </label>
        );
      }
    }
  }

  function revQuestionList(subject = items[0]) {
    return (
      <div className={classes.form}>
        {items.map((item, questionIndex) => (
          <div key={item._id}>
            {item.subject === subject && renderQuestions(questionIndex, item)}
            <div class="list-group">
              {item.options.map((optionItem, optionIndex) => (
                <>
                  {item.subject === subject &&
                    renderRadioButtons(
                      optionItem,
                      questionIndex,
                      optionIndex,
                      item.originalIndex,
                      subject
                    )}
                </>
              ))}
            </div>

            {item.subject === subject && (
              <div
                class="accordion accordion-flush"
                id={`questions-${questionIndex}`}
              >
                <div class="accordion-item">
                  <h2 class="accordion-header">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#questions-${questionIndex}-id`}
                    >
                      See Explanation
                    </button>
                  </h2>
                  <div
                    id={`questions-${questionIndex}-id`}
                    class="accordion-collapse collapse"
                    data-bs-parent={`#questions-${questionIndex}`}
                  >
                    <div class="accordion-body">
                      <div class="d-flex flex-column fw-bolder border mt-5 p-3 shadow">
                        <p>Explanation</p>
                        <DisplayEditorContent
                          contentFromServer={item.explanation}
                          toolbarPresent={false}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  function examQuestionList(params) {
    const allExamList = [];
    for (let index = 0; index < subjects.length; index++) {
      const element = subjects[index];
      const scoreNum = getSubjectMark()[element].score;
      const subjectLen = getSubjectMark()[element].len;
      const subjectWork = (
        <div
          class="accordion accordion-flush"
          id={`questions-${element}exam-func`}
        >
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#questions-${element}-id-ele`}
              >
                {element}
              </button>
            </h2>
            <div
              id={`questions-${element}-id-ele`}
              class="accordion-collapse collapse"
              data-bs-parent={`#questions-${element}exam-func`}
            >
              <div class="accordion-body">
                <div>
                  <h4>{element}</h4>
                  <span>
                    score: {scoreNum}/{subjectLen}
                  </span>
                  {revQuestionList(element)}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
      allExamList.push(subjectWork);
    }
    return allExamList;
  }

  return (
    <>
      {quesForm === "rev-ques" && revQuestionList()}
      {quesForm !== "rev-ques" && examQuestionList()}
      {quesForm !== "rev-ques" && (
        <ReportCard subjects={subjects} getSubjectMark={getSubjectMark} />
      )}
    </>
  );
}

export default QuestionAnswerReviewList;
