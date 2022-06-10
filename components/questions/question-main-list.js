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
  isLoading,
  subjects,
  quesForm,

  controlLiActive,
  setcontrolLiActive,
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

    setcontrolLiActive(null);
  }
  console.log({ items }, "ques-main-list");
  if (items) {
    return (
      <>
        {/* {!quesForm === "rev-ques" && controlReviewLink ? (
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
            isLoading={isLoading}
            subjects={subjects}
            quesForm={quesForm}
          />
        ) : (
          <QuestionReviewSelect />
        )} */}
        <section>
          <div class="row justify-content-center align-items-center">
            <div class="col-11">
              <div class="card bg-light">
                <div class="card-header">
                  <div class="d-flex align-items-center justify-content-between">
                    <h4 class="display-5"> Examination</h4>
                    <span> Time Allowed: 45 minutes</span>

                    {/* <div className="d-flex flex-column align-items-center">
               <img
                 src={imageProfileUrl}
                 class="rounded-circle mb-1 img-fluid w-25"
                 
               <p className="card-text">Goodluck from {author}</p>
             </div>
             <p class="card-text">{setQuestionNum()}</p> */}
                  </div>
                  {!quesForm === "rev-ques" && controlReviewLink ? (
                    <button
                      class="btn btn-primary"
                      onClick={backToQuestionListHandler}
                      title="Clicking this button will reset your variables"
                    >
                      Back To Question
                    </button>
                  ) : null}
                </div>
                <div class="card-body text-center">
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
                      isLoading={isLoading}
                      subjects={subjects}
                      quesForm={quesForm}
                      controlLiActive={controlLiActive}
                    />
                  ) : (
                    <QuestionReviewSelect
                      selectValue={selectValue}
                      controlReviewLink={controlReviewLink}
                      backToQuestionListHandler={backToQuestionListHandler}
                      subjects={subjects}
                      quesForm={quesForm}
                    />
                  )}
                </div>

                <div class="card-body text-center">
                  <button
                    onClick={() => markScript(items)}
                    disabled={controlSubBtn}
                    class="btn btn-primary"
                    title="You must answer at lest one question before this button will respond"
                  >
                    Submit For Marking
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        ;
      </>
    );
  }
  return null;
};

export default MainQuestionList;
