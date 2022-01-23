import React, { useEffect, useState } from "react";
// import classes from "./question-list-one.module.css";
// import { FaChevronLeft, FaChevronRight, FaQuoteRight } from "react-icons/fa";
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
  //const [index, setIndex] = useState(0);
  //let itemObj;

  //const questionArray
  //const{authorName,authorImage}= itemObj
  //questionArray.push(itemObj)
  const [itemArray, setitemArray] = useState();
  //  const [authorName, setauthorName] = useState();
  //  const [authorImage, setauthorImage] = useState();

  //   useEffect(() => {
  //     if (items) {
  //       const itemObj = items[index];
  //       setitemArray([itemObj]);
  //       if (selectValue === "mult-choice-one") {
  //         setCurrentArrayHandler([itemObj]);
  //       }
  //     }
  //     // effect
  //     // return () => {
  //     //   cleanup
  //     // }
  //   }, [index, selectValue]);
  //   console.log({ itemArray }, "one-list");

  //   const checkNumber = (number) => {
  //     if (number > items.length - 1) {
  //       return 0;
  //     }
  //     if (number < 0) {
  //       return items.length - 1;
  //     }
  //     return number;
  //   };
  //   const nextPerson = () => {
  //     setIndex((index) => {
  //       let newIndex = index + 1;
  //       return checkNumber(newIndex);
  //     });
  //     setitemArray([]);
  //   };
  //   const prevPerson = () => {
  //     setIndex((index) => {
  //       let newIndex = index - 1;
  //       return checkNumber(newIndex);
  //     });
  //     setitemArray([]);
  //   };
  //   const randomPerson = () => {
  //     let randomNumber = Math.floor(Math.random() * items.length);
  //     if (randomNumber === index) {
  //       randomNumber = index + 1;
  //     }
  //     setIndex(checkNumber(randomNumber));
  //     setitemArray([]);
  //   };
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
