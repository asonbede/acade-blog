/* 
The idea here is to display two components: QuestionList 
and QuestionReviewSelect alternatively. QuestionList is displayed
by default and enable users to answer questions. After answering the 
questions and clicking submit, QuestionList is removed and QuestionReviewSelect
is used to show the result. A button is used to enable the user to shuttle
between the two components.
*/

import React, { useEffect, useState } from "react";
import QuestionList from "./questions-list";
import QuestionReviewSelect from "./question-review-select";
const MainQuestionList = ({
  items,
  handleRadioButtonChange,
  blogId,
  controlSubBtn,
  markScript,
  selectValue,
  controlReviewLink,
  setcontrolReviewLink,
  setcontrolSubBtn,
  variablesForReseting,
}) => {
  const [itemArray, setitemArray] = useState();

  //
  function backToQuestionListHandler() {
    setcontrolReviewLink(false);
    setcontrolSubBtn(true);
    variablesForReseting.setskippedQuestions([]);
    variablesForReseting.setcorrectQuestions([]);
    variablesForReseting.setinCorrectQuestions([]);
    variablesForReseting.setallQuestions([]);
    variablesForReseting.setselectedValuesOfRadioButton([]);
    variablesForReseting.setscore(null);
  }
  console.log({ items }, "ques-main-list");
  if (items) {
    return (
      <>
        {selectValue === "mult-choice-all" && controlReviewLink ? (
          <button
            onClick={backToQuestionListHandler}
            title="Clicking this button will reset your variables"
          >
            Back To Question
          </button>
        ) : null}

        {!controlReviewLink ? (
          <QuestionList
            items={items}
            handleRadioButtonChange={handleRadioButtonChange}
            blogId={blogId}
            controlSubBtn={controlSubBtn}
            markScript={markScript}
            selectValue={selectValue}
            controlReviewLink={controlReviewLink}
            setcontrolReviewLink={setcontrolReviewLink}
          />
        ) : (
          <QuestionReviewSelect />
        )}
      </>
    );
  }
  return null;
};

export default MainQuestionList;
