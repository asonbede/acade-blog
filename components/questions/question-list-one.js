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
  const [workingArray, setworkingArray] = useState();
  const [israndomQues, setisrandomQues] = useState(false);
  const [randIndex, setrandIndex] = useState(0);
  const [partIndex, setparticularIndex] = useState();
  const [particularQueValue, setparticularQueValue] = useState(1);
  const [waecQueValue, setwaecQueValue] = useState(1);

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
    // effect
    // return () => {
    //   cleanup
    // }
  }, [index, selectValue]);
  console.log({ itemArray }, "one-list");

  // useEffect(() => {
  //   setitemArray([]);
  //   // effect
  //   // return () => {
  //   //   cleanup
  //   // }
  // }, [orderValue]);

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
    setrandIndex(0);
    setparticularIndex(0);
  };
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
    // console.log({ orderValue }, typeof orderValue);
    // if (Number(orderValue) === 1) {
    //   let randomNumber = Math.floor(Math.random() * items.length);
    //   if (randomNumber === index) {
    //     randomNumber = index + 1;
    //   }
    //   setIndex(checkNumber(randomNumber));
    //   setitemArray([]);
    // }

    console.log("started-random-two");
    let randomArray = [];
    let linkedObj = { unlinked: [] };
    let resultArray = [];
    let num;
    let preWorkingArray = [];
    let randomNumbers = new Set();
    // const workinArray = items.filter(
    //   (item) => item.questionType !== "essay-type"
    // );
    setisrandomQues(true);
    //fill randArray with random elements
    // for (let i = 0; i < Number(orderValue); i++) {
    //const element = array[index];
    // let randomNumber = Math.floor(Math.random() * workingArray.length);
    // if (randomNumber === index) {
    //   randomNumber = index + 1;
    // }
    // num = checkNumber(randomNumber);
    // // randomArray.push(preWorkingArray[num]);
    //   randomNumbers.add(num)
    //randomArray.push(workingArray[num]);
    //}
    while (true) {
      let randomNumber = Math.floor(Math.random() * workingArray.length);
      // if (randomNumber === index) {
      //   randomNumber = index + 1;
      // }
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
    // const filteredResultArray = resultArray.filter(
    //   (item) => item.introKey === undefined
    // );
    // console.log({ filteredResultArray });
    setCurrentArrayHandler(resultArray);
    setrandIndex(num);
    setparticularIndex(0);
  };

  const professionExamGetter = (examTypeValue) => {
    setitemArray([]);
    console.log("started-random-two");
    let examArray = [];
    let linkedObj = { unlinked: [] };
    let resultArray = [];
    examArray = workingArray.filter((item) =>
      item.examType.startsWith(examTypeValue)
    );
    if (!examArray || examArray.length === 0) {
      return;
    }
    if (Number(waecQueValue) > examArray.length || Number(waecQueValue) < 0) {
      return;
    }
    // console.log({ orderValue }, typeof orderValue);
    // if (Number(orderValue) === 1) {
    //   let randomNumber = Math.floor(Math.random() * items.length);
    //   if (randomNumber === index) {
    //     randomNumber = index + 1;
    //   }
    //   setIndex(checkNumber(randomNumber));
    //   setitemArray([]);
    // }

    // const workinArray = items.filter(
    //   (item) => item.questionType !== "essay-type"
    // );
    //setisrandomQues(true);
    //fill randArray with random elements
    // for (let i = 0; i < Number(orderValue); i++) {
    //const element = array[index];
    // let randomNumber = Math.floor(Math.random() * workingArray.length);
    // if (randomNumber === index) {
    //   randomNumber = index + 1;
    // }
    // num = checkNumber(randomNumber);
    // // randomArray.push(preWorkingArray[num]);
    //   randomNumbers.add(num)
    //randomArray.push(workingArray[num]);
    //}
    //  while (true) {
    //    let randomNumber = Math.floor(Math.random() * workingArray.length);
    //    // if (randomNumber === index) {
    //    //   randomNumber = index + 1;
    //    // }
    //    num = checkNumber(randomNumber);
    //    // randomArray.push(preWorkingArray[num]);
    //    randomNumbers.add(num);
    //    if (randomNumbers.size === Number(orderValue)) {
    //      break;
    //    }
    //  }
    //console.log({ randomArray });
    //setitemArray(randomArray);
    // examArray = workingArray.filter((item) =>
    //   item.examType.startsWith(examTypeValue)
    // );
    examArray = examArray.slice(0, waecQueValue);

    console.log({ examArray });

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
    // const filteredResultArray = resultArray.filter(
    //   (item) => item.introKey === undefined
    // );
    // console.log({ filteredResultArray });
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
    // console.log({ orderValue }, typeof orderValue);
    // if (Number(orderValue) === 1) {
    //   let randomNumber = Math.floor(Math.random() * items.length);
    //   if (randomNumber === index) {
    //     randomNumber = index + 1;
    //   }
    //   setIndex(checkNumber(randomNumber));
    //   setitemArray([]);
    // }

    console.log("started-random-two");
    const randomArray = [];
    let linkedObj = { unlinked: [] };
    let resultArray = [];
    let num;
    // const workinArray = items.filter(
    //   (item) => item.questionType !== "essay-type"
    // );
    //setisrandomQues(true);
    //fill randArray with random elements
    // for (let i = 0; i < Number(orderValue); i++) {
    //const element = array[index];
    // let randomNumber = Math.floor(Math.random() * workingArray.length);
    // if (randomNumber === index) {
    //   randomNumber = index + 1;
    // }
    // num = checkNumber(randomNumber);

    const particularQueObj = workingArray[Number(particularQueValue) - 1];
    //}
    //console.log({ randomArray });
    //setitemArray(randomArray);

    // for (let randex = 0; randex < randomArray.length; randex++) {
    // const element = randomArray[randex];
    //is question linked
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
    // }
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
    // const filteredResultArray = resultArray.filter(
    //   (item) => item.introKey === undefined
    // );
    // console.log({ filteredResultArray });
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
                <p className={classes.job}>
                  {" "}
                  {randIndex
                    ? `Question  ${randIndex} Of ${workingArray.length}`
                    : partIndex
                    ? `Question  ${partIndex} Of ${workingArray.length}`
                    : `Question  ${index + 1} Of ${workingArray.length}`}
                </p>
                <div className={classes.info}>
                  <QuestionList
                    items={itemArray}
                    handleRadioButtonChange={handleRadioButtonChange}
                    blogId={blogId}
                    selectValue={selectValue}
                    israndomQues={israndomQues}
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

                <label htmlFor="order">
                  {" "}
                  {/* {`Quantity (between 1 and ${workingArray.length}):`} */}
                </label>

                <input
                  type="number"
                  id="order"
                  // required
                  value={orderValue}
                  onChange={onChangeNumber}
                  min="1"
                  max={workingArray.length}
                  // readOnly
                  // style={{ visibility: "hidden" }}
                />
                <br />
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
                <button
                  className={classes.randombtn}
                  onClick={() => professionExamGetter("waec")}
                >
                  WACE Questions On This Topic
                </button>

                <label htmlFor="waec-quest">
                  {" "}
                  {`Quantity (between 1 and ${
                    workingArray.filter((item) =>
                      item.examType.startsWith(examTypeValue)
                    ).length
                  }):`}
                </label>

                <input
                  type="number"
                  id="waec-quest"
                  value={waecQueValue}
                  onChange={onChangeWaecNumElem}
                  min="1"
                  max={workingArray.length}
                />
                <br />
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
