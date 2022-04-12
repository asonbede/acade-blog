/* 
The idea here is to iterate over the questions and check
the correct ones.
*/

import React from "react";
import DisplayEditorContent from "../rich-text-editor/display-editor-content";

import classes from "./questions-list.module.css";
function QuestionAnswerReviewList(props) {
  const {
    selectedValuesOfRadioButton,
    items,
    correctQuestions,
    inCorrectQuestions,
    skippedQuestions,
    questionType,
    selectValue,
  } = props;
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

  function renderQuestions(questionIndex, item) {
    if (
      selectedValuesOfRadioButton.hasOwnProperty(
        `studentChoiceForQuestion${questionIndex + 1}`
      )
    ) {
      return (
        <>
          {item.questionIntroText && (
            <DisplayEditorContent
              contentFromServer={item.questionIntroText}
              toolbarPresent={false}
            />
          )}
          <div style={{ display: "flex" }}>
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
          <div
            style={{
              display: "flex",
            }}
          >
            <input
              type="radio"
              name={questionIndex}
              value={optionItem.option}
              id={`${questionIndex}:${optionIndex}`}
              // onChange={handleRadioButtonChange}
              checked
              disabled
              style={{
                marginTop: "16px",
              }}
            />
            <label
              htmlFor={`${questionIndex}:${optionIndex}`}
              style={{
                marginTop: "14px",
              }}
            >
              {optionsList[optionIndex]}.
            </label>
            <DisplayEditorContent
              contentFromServer={optionItem.option}
              toolbarPresent={false}
            />
            <span style={{ color: "green", fontSize: "30px" }}>
              <i class="bi bi-check2"></i>
            </span>
          </div>
        );
      } else if (
        studentsChoice === optionItem.option.trim() &&
        studentsChoice !== correctOptionValue
      ) {
        return (
          <div
            style={{
              display: "flex",
            }}
          >
            <input
              type="radio"
              name={questionIndex}
              value={optionItem.option}
              id={`${questionIndex}:${optionIndex}`}
              // onChange={handleRadioButtonChange}
              checked
              disabled
              style={{
                marginTop: "16px",
              }}
            />
            <label
              htmlFor={`${questionIndex}:${optionIndex}`}
              style={{
                marginTop: "14px",
              }}
            >
              {optionsList[optionIndex]}.
            </label>
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
          </div>
        );
      } else if (
        studentsChoice !== optionItem.option.trim() &&
        optionItem.option.trim() === correctOptionValue
      ) {
        return (
          <div
            style={{
              display: "flex",
            }}
          >
            <input
              type="radio"
              name={questionIndex}
              value={optionItem.option}
              id={`${questionIndex}:${optionIndex}`}
              disabled
              style={{
                marginTop: "16px",
              }}
            />
            <label
              htmlFor={`${questionIndex}:${optionIndex}`}
              style={{
                marginTop: "14px",
              }}
            >
              {optionsList[optionIndex]}.
            </label>
            <DisplayEditorContent
              contentFromServer={optionItem.option}
              toolbarPresent={false}
            />
            <span style={{ color: "blue", fontSize: "30px" }}>
              <i class="bi bi-check2"></i>
            </span>
          </div>
        );
      } else {
        return (
          <div
            style={{
              display: "flex",
            }}
          >
            <input
              type="radio"
              name={questionIndex}
              value={optionItem.option}
              id={`${questionIndex}:${optionIndex}`}
              disabled
              style={{
                marginTop: "16px",
              }}
            />
            <label
              htmlFor={`${questionIndex}:${optionIndex}`}
              style={{
                marginTop: "14px",
              }}
            >
              {optionsList[optionIndex]}.
            </label>
            <DisplayEditorContent
              contentFromServer={optionItem.option}
              toolbarPresent={false}
            />
          </div>
        );
      }
    }
  }

  return (
    <ul className={classes.form}>
      {items.map((item, questionIndex) => (
        <li key={item._id}>
          {renderQuestions(questionIndex, item)}
          <div>
            {item.options.map((optionItem, optionIndex) => (
              <>
                {renderRadioButtons(
                  optionItem,
                  questionIndex,
                  optionIndex,
                  item.originalIndex
                )}
              </>
            ))}
          </div>
          <div>
            <p>Explanation</p>
            <DisplayEditorContent
              contentFromServer={item.explanation}
              toolbarPresent={false}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

export default QuestionAnswerReviewList;
