import React, { useEffect, useState } from "react";
import classes from "./question-list-one.module.css";
import { FaChevronLeft, FaChevronRight, FaQuoteRight } from "react-icons/fa";
import QuestionList from "./questions-list";
import QuestionReviewSelect from "./question-review-select";
const OneQuestion = ({
  markScript,
  items,
  handleRadioButtonChange,
  blogId,
  controlSubBtn,
  controlReviewLink,
  setcontrolReviewLink,
  selectValue,
  setCurrentArrayHandler,
  setcontrolSubBtn,
  variablesForReseting,
}) => {
  const [index, setIndex] = useState(0);
  //let itemObj;

  //const questionArray
  //const{authorName,authorImage}= itemObj
  //questionArray.push(itemObj)
  const [itemArray, setitemArray] = useState();
  //  const [authorName, setauthorName] = useState();
  //  const [authorImage, setauthorImage] = useState();

  useEffect(() => {
    if (items) {
      const itemObj = items[index];
      setitemArray([itemObj]);
      if (selectValue === "mult-choice-one") {
        setCurrentArrayHandler([itemObj]);
      }
    }
    // effect
    // return () => {
    //   cleanup
    // }
  }, [index, selectValue]);
  console.log({ itemArray }, "one-list");

  const checkNumber = (number) => {
    if (number > items.length - 1) {
      return 0;
    }
    if (number < 0) {
      return items.length - 1;
    }
    return number;
  };
  const nextPerson = () => {
    setIndex((index) => {
      let newIndex = index + 1;
      return checkNumber(newIndex);
    });
    setitemArray([]);
  };
  const prevPerson = () => {
    setIndex((index) => {
      let newIndex = index - 1;
      return checkNumber(newIndex);
    });
    setitemArray([]);
  };
  const randomPerson = () => {
    let randomNumber = Math.floor(Math.random() * items.length);
    if (randomNumber === index) {
      randomNumber = index + 1;
    }
    setIndex(checkNumber(randomNumber));
    setitemArray([]);
  };

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

  if (itemArray) {
    return (
      <>
        {selectValue === "mult-choice-one" && controlReviewLink ? (
          <button onClick={backToQuestionListHandler}>Back To Question</button>
        ) : null}

        {!controlReviewLink ? (
          <main className={classes.mainSection}>
            <section className={`${classes.container} ${classes.section}`}>
              <div className={classes.title}>
                <h2>our reviews</h2>
                <button
                  onClick={() => markScript(itemArray)}
                  disabled={controlSubBtn}
                >
                  Submit For Marking
                </button>
                <div className={classes.underline}></div>
              </div>
              <article className={classes.review}>
                <div className={classes.imgcontainer}>
                  <img
                    src="/images/posts/post-profile3.jpg"
                    alt="bede"
                    className={classes.personimg}
                  />
                  <span className={classes.quoteicon}>
                    <FaQuoteRight />
                  </span>
                </div>
                <h4 className={classes.author}>Bede Asonye</h4>
                <p className={classes.job}>{`Question  ${index + 1}`}</p>
                <div className={classes.info}>
                  <QuestionList
                    items={itemArray}
                    handleRadioButtonChange={handleRadioButtonChange}
                    blogId={blogId}
                    selectValue={selectValue}
                  />
                </div>
                {/* <p className={classes.info}>{text}</p> */}
                <div className={classes.buttoncontainer}>
                  <button className={classes.prevbtn} onClick={prevPerson}>
                    <FaChevronLeft />
                  </button>
                  <button className={classes.nextbtn} onClick={nextPerson}>
                    <FaChevronRight />
                  </button>
                </div>
                <button className={classes.randombtn} onClick={randomPerson}>
                  random Question
                </button>
              </article>
            </section>
          </main>
        ) : (
          <QuestionReviewSelect
            index={index}
            selectValue={selectValue}
            controlReviewLink={controlReviewLink}
          />
        )}
      </>
    );
  }
  return null;
};

export default OneQuestion;
