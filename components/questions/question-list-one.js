/* 
The idea here is to display various kind of questions:
one at a time question, random questios, a specific question,
jamb questions, waec questios. The student then answers them and 
clicks to check result.
To achieve this, the component displays two component alternatively:
QuestionList and QuestionReviewSelect. QuestionList shows the question while
QuestionReviewSelect shows the result.QuestionList is shown when the 
 controlReviewLink variable is negative else QuestionReviewSelect is shown.
*/
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

  const [itemArray, setitemArray] = useState();
  const [orderValue, setorderValue] = useState(1);
  const [workingArray, setworkingArray] = useState();
  const [israndomQues, setisrandomQues] = useState(false);
  const [randIndex, setrandIndex] = useState(0);
  const [partIndex, setparticularIndex] = useState(1);
  const [particularQueValue, setparticularQueValue] = useState(1);
  const [waecQueValue, setwaecQueValue] = useState(0);
  const [waecExamArray, setwaecExamArray] = useState([]);
  const [waecBtnControl, setwaecBtnControl] = useState(true);

  const [necoQueValue, setnecoQueValue] = useState(0);
  const [necoExamArray, setnecoExamArray] = useState([]);
  const [necoBtnControl, setnecoBtnControl] = useState(true);

  const [jambQueValue, setjambQueValue] = useState(0);
  const [jambExamArray, setjambExamArray] = useState([]);
  const [jambBtnControl, setjambBtnControl] = useState(true);
  //  const [authorName, setauthorName] = useState();
  //  const [authorImage, setauthorImage] = useState();

  useEffect(() => {
    if (items) {
      const workingArrayValue = items.filter(
        (item) => item.questionType !== "essay-type"
      );
      const itemObj = workingArrayValue[index];

      setitemArray([itemObj]);
      setworkingArray(workingArrayValue);
      if (selectValue === "mult-choice-one" && !israndomQues) {
        console.log("in useeff-one");
        setCurrentArrayHandler([itemObj]);
      }
    }
  }, [index, selectValue]);

  console.log({ itemArray }, "one-list");

  useEffect(() => {
    if (workingArray) {
      setwaecExamArray(
        workingArray.filter(
          (item) =>
            item.examType !== undefined && item.examType.startsWith("wassce")
        )
      );
    }
  }, [waecQueValue]);

  useEffect(() => {
    if (workingArray) {
      setnecoExamArray(
        workingArray.filter(
          (item) =>
            item.examType !== undefined && item.examType.startsWith("necossce")
        )
      );
    }
  }, [necoQueValue]);

  useEffect(() => {
    if (workingArray) {
      setjambExamArray(
        workingArray.filter(
          (item) =>
            item.examType !== undefined && item.examType.startsWith("JAMB")
        )
      );
    }
  }, [jambQueValue]);

  //Ensure that the index(the number used to access the question)is
  //not greater than or less than the number of questions available.
  const checkNumber = (number) => {
    if (number > workingArray.length - 1) {
      return 0;
    }
    if (number < 0) {
      return workingArray.length - 1;
    }
    return number;
  };

  //Allows users to access one question at a time in the forward direction
  const nextQuestion = () => {
    setIndex((index) => {
      let newIndex = index + 1;
      return checkNumber(newIndex);
    });
    setitemArray([]);
    setorderValue(1);
    setrandIndex(0);
    setparticularIndex(0);
  };

  //Allows users to access one question at a time in the backward direction
  const prevPerson = () => {
    setIndex((index) => {
      let newIndex = index - 1;
      return checkNumber(newIndex);
    });
    setitemArray([]);
    setorderValue(1);
    setrandIndex(0);
    setparticularIndex(0);
  };

  const randomPerson = () => {
    setitemArray([]);
    if (Number(orderValue) > workingArray.length) {
      return;
    }
    console.log("started-random-two");
    let randomArray = [];
    let linkedObj = { unlinked: [] };
    let resultArray = [];
    let num;
    let preWorkingArray = [];
    let randomNumbers = new Set();

    setisrandomQues(true);

    while (true) {
      let randomNumber = Math.floor(Math.random() * workingArray.length);

      num = checkNumber(randomNumber);
      // randomArray.push(preWorkingArray[num]);
      randomNumbers.add(num);
      if (randomNumbers.size === Number(orderValue)) {
        break;
      }
    }
    //console.log({ randomArray });
    //setitemArray(randomArray);
    randomArray = [...randomNumbers].map((item) => workingArray[item]);
    console.log({ randomNumbers });
    console.log({ randomArray });

    for (let randex = 0; randex < randomArray.length; randex++) {
      const element = randomArray[randex];
      //is question linked
      console.log(typeof Number(element.linkedTo), "hereeee");
      if (Number(element.linkedTo)) {
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

    for (const key in linkedObj) {
      if (Object.hasOwnProperty.call(linkedObj, key)) {
        if (key === "unlinked") {
          const element = linkedObj[key];
          resultArray = [...resultArray, ...element];
        } else {
          const element = linkedObj[key];
          const getFromItems = workingArray[Number(key) - 1];
          const firstItem = element.slice(0, 1);
          const restElement = element.slice(1);
          let firstElementObj = firstItem[0];
          firstElementObj = {
            ...firstElementObj,
            questionIntroText: getFromItems.questionIntroText,
          };
          const joinedEle = [firstElementObj, ...restElement];

          console.log({ getFromItems });
          resultArray = [...resultArray, ...joinedEle];
        }
      }
    }
    console.log({ resultArray });
    setitemArray(resultArray);

    setCurrentArrayHandler(resultArray);
    setrandIndex(num);
    setparticularIndex(0);
  };

  const professionExamGetter = (myArrayValues, proffQueNum) => {
    setitemArray([]);
    console.log("started-random-two");
    let examArray = [];
    let linkedObj = { unlinked: [] };
    let resultArray = [];

    if (!myArrayValues || myArrayValues.length === 0) {
      return;
    }
    if (Number(proffQueNum) > myArrayValues.length || Number(proffQueNum) < 0) {
      return;
    }

    examArray = myArrayValues.slice(0, proffQueNum);

    console.log({ myArrayValues });

    for (let randex = 0; randex < examArray.length; randex++) {
      const element = examArray[randex];
      //is question linked
      console.log(typeof Number(element.linkedTo), "hereeee");
      if (Number(element.linkedTo)) {
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

    for (const key in linkedObj) {
      if (Object.hasOwnProperty.call(linkedObj, key)) {
        if (key === "unlinked") {
          const element = linkedObj[key];
          resultArray = [...resultArray, ...element];
        } else {
          const element = linkedObj[key];
          const getFromItems = workingArray[Number(key) - 1];
          const firstItem = element.slice(0, 1);
          const restElement = element.slice(1);
          let firstElementObj = firstItem[0];
          firstElementObj = {
            ...firstElementObj,
            questionIntroText: getFromItems.questionIntroText,
          };
          const joinedEle = [firstElementObj, ...restElement];

          console.log({ getFromItems });
          resultArray = [...resultArray, ...joinedEle];
        }
      }
    }
    console.log({ resultArray });
    setitemArray(resultArray);

    setCurrentArrayHandler(resultArray);

    setparticularIndex(0);
  };

  const particularQuestionHandler = () => {
    setitemArray([]);
    if (
      Number(particularQueValue) > workingArray.length ||
      Number(particularQueValue) < 1
    ) {
      return;
    }

    console.log("started-random-two");
    const randomArray = [];
    let linkedObj = { unlinked: [] };
    let resultArray = [];
    let num;

    const particularQueObj = workingArray[Number(particularQueValue) - 1];

    console.log(typeof Number(particularQueObj.linkedTo), "hereeee");
    if (Number(particularQueObj.linkedTo)) {
      if (particularQueObj.linkedTo in linkedObj) {
        linkedObj = {
          ...linkedObj,
          [particularQueObj.linkedTo]: [
            ...linkedObj[particularQueObj.linkedTo],
            particularQueObj,
          ],
        };
      } else {
        linkedObj = {
          ...linkedObj,
          [particularQueObj.linkedTo]: [particularQueObj],
        };
      }
    } else {
      linkedObj = {
        ...linkedObj,
        unlinked: [...linkedObj["unlinked"], particularQueObj],
      };
    }

    console.log({ linkedObj });

    for (const key in linkedObj) {
      if (Object.hasOwnProperty.call(linkedObj, key)) {
        if (key === "unlinked") {
          const element = linkedObj[key];
          resultArray = [...resultArray, ...element];
        } else {
          const element = linkedObj[key];
          const getFromItems = workingArray[Number(key) - 1];
          const firstItem = element.slice(0, 1);
          const restElement = element.slice(1);
          let firstElementObj = firstItem[0];
          firstElementObj = {
            ...firstElementObj,
            questionIntroText: getFromItems.questionIntroText,
          };
          const joinedEle = [firstElementObj, ...restElement];

          console.log({ getFromItems });
          resultArray = [...resultArray, ...joinedEle];
        }
      }
    }
    console.log({ resultArray });
    setitemArray(resultArray);

    setCurrentArrayHandler(resultArray);
    setparticularIndex(particularQueValue);
    setrandIndex(0);
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

  const onChangePartiNumElem = (e) => {
    setparticularQueValue(e.target.value);
  };

  const onChangeWaecNumElem = (e) => {
    setwaecQueValue(e.target.value);
    setwaecBtnControl(false);
  };

  const onChangeNecoNumElem = (e) => {
    setnecoQueValue(e.target.value);
    setnecoBtnControl(false);
  };

  const onChangeJambNumElem = (e) => {
    setjambQueValue(e.target.value);
    setjambBtnControl(false);
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
              {/* <div className={classes.title}>
                <h2>our reviews</h2>

                <div className={classes.underline}></div>
              </div> */}

              {/* heading */}
              <article className={classes.review}>
                <h4 className={classes.author}>Goodluck from Bede Asonye</h4>
                <p className={classes.job}>
                  {/* show the question number */}{" "}
                  {randIndex
                    ? `Question  ${randIndex} Of ${workingArray.length}`
                    : partIndex
                    ? `Question  ${partIndex} Of ${workingArray.length}`
                    : `Question  ${index + 1} Of ${workingArray.length}`}
                </p>

                {/* display the questions for answering */}
                <div className={classes.info}>
                  <QuestionList
                    items={itemArray}
                    handleRadioButtonChange={handleRadioButtonChange}
                    blogId={blogId}
                    selectValue={selectValue}
                    israndomQues={israndomQues}
                  />
                </div>

                {/* buttons for accessing questions one by one:
                  either forward or backwards
                */}
                <div className={classes.buttoncontainer}>
                  <button className={classes.prevbtn} onClick={prevPerson}>
                    <FaChevronLeft />
                  </button>
                  <button className={classes.nextbtn} onClick={nextQuestion}>
                    <FaChevronRight />
                  </button>
                </div>

                {/* buttons for submitting questions for making.
                 */}
                <button
                  onClick={() => markScript(itemArray)}
                  disabled={controlSubBtn}
                >
                  Submit For Marking
                </button>
                <br />

                {/* buttons for accessing questions randomly, input
                 number for chooseing the amount of random questions
                */}
                <button className={classes.randombtn} onClick={randomPerson}>
                  Give me random Questions
                </button>
                <label htmlFor="order"> </label>

                <input
                  type="number"
                  id="order"
                  value={orderValue}
                  onChange={onChangeNumber}
                  min="1"
                  max={workingArray.length}
                />
                <br />

                {/* buttons for accessing a particular  question, input
                 number for chooseing that particular question.
                */}
                <button
                  className={classes.randombtn}
                  onClick={particularQuestionHandler}
                >
                  Give Me Particular Questions
                </button>

                <label htmlFor="particular-quest">
                  {" "}
                  {`Quantity (between 1 and ${workingArray.length}):`}
                </label>

                <input
                  type="number"
                  id="particular-quest"
                  required
                  value={particularQueValue}
                  onChange={onChangePartiNumElem}
                  min="1"
                  max={workingArray.length}
                />
                <br />

                {/* buttons for accessing WAEC questions , input
                 number for chooseing the amount of WAEC questions
                */}
                <button
                  className={classes.randombtn}
                  onClick={() =>
                    professionExamGetter(waecExamArray, waecQueValue)
                  }
                  disabled={waecBtnControl}
                >
                  WACE Questions On This Topic
                </button>

                <label htmlFor="waec-quest">
                  {" "}
                  {`Available Quantity  ${
                    workingArray.filter(
                      (item) =>
                        item.examType !== undefined &&
                        item.examType.startsWith("wassce")
                    ).length
                  }: Selected Quantity`}
                </label>

                <input
                  type="number"
                  id="waec-quest"
                  value={waecQueValue}
                  onChange={onChangeWaecNumElem}
                  min="1"
                  max={
                    workingArray.filter(
                      (item) =>
                        item.examType !== undefined &&
                        item.examType.startsWith("wassce")
                    ).length
                  }
                />

                {/* buttons for accessing NECO questions , input
                 number for chooseing the amount of WAEC questions
                */}
                <button
                  className={classes.randombtn}
                  onClick={() =>
                    professionExamGetter(necoExamArray, necoQueValue)
                  }
                  disabled={necoBtnControl}
                >
                  NECO Questions On This Topic
                </button>

                <label htmlFor="neco-quest">
                  {" "}
                  {`Available Quantity  ${
                    workingArray.filter(
                      (item) =>
                        item.examType !== undefined &&
                        item.examType.startsWith("necossce")
                    ).length
                  }: Selected Quantity`}
                </label>

                <input
                  type="number"
                  id="neco-quest"
                  value={necoQueValue}
                  onChange={onChangeNecoNumElem}
                  min="1"
                  max={
                    workingArray.filter(
                      (item) =>
                        item.examType !== undefined &&
                        item.examType.startsWith("necossce")
                    ).length
                  }
                />

                {/* buttons for accessing JAMB questions , input
                 number for chooseing the amount of WAEC questions
                */}

                <button
                  className={classes.randombtn}
                  onClick={() =>
                    professionExamGetter(jambExamArray, jambQueValue)
                  }
                  disabled={jambBtnControl}
                >
                  JAMB Questions On This Topic
                </button>

                <label htmlFor="jamb-quest">
                  {" "}
                  {`Available Quantity  ${
                    workingArray.filter(
                      (item) =>
                        item.examType !== undefined &&
                        item.examType.startsWith("JAMB")
                    ).length
                  }: Selected Quantity`}
                </label>

                <input
                  type="number"
                  id="jamb-quest"
                  value={jambQueValue}
                  onChange={onChangeJambNumElem}
                  min="1"
                  max={
                    workingArray.filter(
                      (item) =>
                        item.examType !== undefined &&
                        item.examType.startsWith("JAMB")
                    ).length
                  }
                />
              </article>
            </section>
          </main>
        ) : (
          // show this component after submit button is hit, that is
          //after questions has been answered,this component shows the result
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
