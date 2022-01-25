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
  const [orderValue, setorderValue] = useState(1);
  //  const [authorName, setauthorName] = useState();
  //  const [authorImage, setauthorImage] = useState();

  useEffect(() => {
    if (items) {
      const workinArray = items.filter(
        (item) => item.questionType !== "essay-type"
      );
      const itemObj = workinArray[index];
      setitemArray([itemObj]);
      if (selectValue === "mult-choice-one") {
        console.log("in useeff-one");
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
    setorderValue(1);
  };
  const prevPerson = () => {
    setIndex((index) => {
      let newIndex = index - 1;
      return checkNumber(newIndex);
    });
    setitemArray([]);
    setorderValue(1);
  };
  const randomPerson = () => {
    if (orderValue > items.length) {
      return;
    }
    if (orderValue === 1) {
      let randomNumber = Math.floor(Math.random() * items.length);
      if (randomNumber === index) {
        randomNumber = index + 1;
      }
      setIndex(checkNumber(randomNumber));
      setitemArray([]);
    } else {
      console.log("started-random-two");
      const randomArray = [];
      let linkedObj = { unlinked: [] };
      let resultArray = [];
      const workinArray = items.filter(
        (item) => item.questionType !== "essay-type"
      );
      //fill randArray with random elements
      for (let i = 0; i < orderValue; i++) {
        //const element = array[index];
        let randomNumber = Math.floor(Math.random() * workinArray.length);
        if (randomNumber === index) {
          randomNumber = index + 1;
        }
        const num = checkNumber(randomNumber);
        randomArray.push(workinArray[num]);
      }
      console.log({ randomArray });
      //setitemArray(randomArray);

      for (let randex = 0; randex < randomArray.length; randex++) {
        const element = randomArray[randex];
        //is question linked
        if (element.linkedTo) {
          if (element.linkedTo in linkedObj) {
            linkedObj = {
              ...linkedObj,
              [element.linkedTo]: [...linkedObj[element.linkedTo], element],
            };
          } else {
            linkedObj = { ...linkedObj, [element.linkedTo]: [element] };
          }
        } else {
          linkedObj = {
            ...linkedObj,
            unlinked: [...linkedObj["unlinked"], element],
          };
        }
      }
      console.log({ linkedObj });

      // for (let key in linkedObj) {
      //   keyValue= linkedObj[x]
      //   if (x) {
      //   item.questionType !== "essay-type"
      //   }
      // }
      // resultArray = [];
      for (const key in linkedObj) {
        if (Object.hasOwnProperty.call(linkedObj, key)) {
          if (key === "unlinked") {
            const element = linkedObj[key];
            resultArray = [...resultArray, ...element];
          } else {
            const element = linkedObj[key];
            console.log({ element });
            const searchArray = element.find(
              (item) => item.questionIntroText !== null
            );
            console.log({ searchArray });
            if (searchArray) {
              const indexOfSearch = element.indexOf(searchArray);
              console.log({ indexOfSearch });
              const filterArray = element.filter(
                (item, index) => index !== indexOfSearch
              );
              resultArray = [...resultArray, searchArray, ...filterArray]; //
            } else {
              const getFromItems = workinArray[Number(key) - 1];
              if (element.length === 1) {
                resultArray = [...resultArray, getFromItems];
              } else {
                element.pop();
                resultArray = [...resultArray, getFromItems, ...element];
              }
            }
          }
        }
      }
      console.log({ resultArray });
      setitemArray(resultArray);
      setCurrentArrayHandler(resultArray);
    }
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

  const onChangeNumber = (e) => {
    setorderValue(e.target.value);
  };

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
                {/* <div className={classes.imgcontainer}>
                  <img
                    src="/images/posts/post-profile3.jpg"
                    alt="bede"
                    className={classes.personimg}
                  />
                  <span className={classes.quoteicon}>
                    <FaQuoteRight />
                  </span>
                </div> */}
                <h4 className={classes.author}>Bede Asonye</h4>
                <p className={classes.job}>{`Question  ${index + 1} Of ${
                  items.length
                }`}</p>
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
                  Give me random Questions
                </button>
                <br />
                <label htmlFor="order">
                  {" "}
                  {`Quantity (between 1 and ${items.length}):`}
                </label>

                <input
                  type="number"
                  id="order"
                  required
                  value={orderValue}
                  onChange={onChangeNumber}
                  min="1"
                  max={items.length}
                />
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
