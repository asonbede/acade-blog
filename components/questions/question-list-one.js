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
//import classes from "./question-review-select.module.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import QuestionList from "./questions-list";
import QuestionReviewSelect from "./question-review-select";
import Button from "../ui/button";
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
  controlLiActive,
  setcontrolLiActive,
  subjects,
  quesForm,
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
  const [waecBtnControl, setwaecBtnControl] = useState(false);
  const [examTypeVar, setExamType] = useState();
  const [profExamIndex, setprofExamIndex] = useState(0);

  const [necoQueValue, setnecoQueValue] = useState(0);
  const [necoExamArray, setnecoExamArray] = useState([]);
  const [necoBtnControl, setnecoBtnControl] = useState(false);
  //authorusername, imageProfileUrl, author;
  const [author, setAuthor] = useState();
  const [imageProfileUrl, setimageProfileUrl] = useState();

  const [rangeQueValue1, setrangeQueValue1] = useState(0);
  const [rangeQueValue2, setrangeQueValue2] = useState(0);

  const [jambQueValue, setjambQueValue] = useState(0);
  const [jambExamArray, setjambExamArray] = useState([]);
  const [jambBtnControl, setjambBtnControl] = useState(true);
  const [questionHide, setquestionHide] = useState(false);
  const [rangeIndex1, setrangeIndex1] = useState(0);
  const [rangeIndex2, setrangeIndex2] = useState(0);

  //  const [authorName, setauthorName] = useState();
  //  const [authorImage, setauthorImage] = useState();

  useEffect(() => {
    if (items) {
      const workingArrayValue = items.filter(
        (item) => item.questionType !== "essay-type"
      );
      const itemObj = workingArrayValue[index];
      const checkLinkResult = checkLinkedForOneQuestion(itemObj);

      setitemArray([checkLinkResult]);
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

  useEffect(() => {
    if (workingArray && workingArray.length !== 0) {
      setAuthor(
        workingArray[0].author ? workingArray[0].author : "Asonye Bede Chi"
      );
      setimageProfileUrl(
        workingArray[0].imageProfileUrl
          ? workingArray[0].imageProfileUrl
          : "/images/posts/default-profile-pic.jpg"
      );
    }
  }, [workingArray, items]);
  console.log({ author, imageProfileUrl }, "NOW");

  //authorusername, imageProfileUrl, author;

  // useEffect(() => {
  //   setIndex(particularQueValue);
  // }, [particularQueValue]);

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
    //setorderValue(1);
    setrandIndex(0);
    setparticularIndex(0);
    setprofExamIndex(0);
    setrangeIndex1(0);
    setrangeIndex2(0);
  };

  //Allows users to access one question at a time in the backward direction
  const prevPerson = () => {
    setIndex((index) => {
      let newIndex = index - 1;
      return checkNumber(newIndex);
    });
    setitemArray([]);
    //setorderValue(1);
    setrandIndex(0);
    setparticularIndex(0);
    setprofExamIndex(0);
    setrangeIndex1(0);
    setrangeIndex2(0);
  };

  const randomPerson = () => {
    setitemArray([]);
    //if the quantity user requested if more than what is available
    //abort the process else continue to process the request
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

    //prepare a set of unique numbers as much as the amount requested
    while (true) {
      let randomNumber = Math.floor(Math.random() * workingArray.length);

      num = checkNumber(randomNumber);

      randomNumbers.add(num);
      if (randomNumbers.size === Number(orderValue)) {
        break;
      }
    }

    //prepare an array of unique numbers as much as the amount requested
    //then use it to access the questions
    randomArray = [...randomNumbers].map((item) => workingArray[item]);
    console.log({ randomNumbers });
    console.log({ randomArray });
    resultArray = arrangeQuestionIntro(randomArray);

    console.log({ resultArray });
    setitemArray(resultArray);

    setCurrentArrayHandler(resultArray);
    setrandIndex(orderValue);
    setparticularIndex(0);
    setprofExamIndex(0);
    setrangeIndex1(0);
    setrangeIndex2(0);
  };

  // -----------------------------------------------------------------
  function arrangeQuestionIntro(randomArray) {
    let linkedObj = { unlinked: [] };
    let resultArray = [];

    for (let randex = 0; randex < randomArray.length; randex++) {
      const element = randomArray[randex];

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
          let lenResultArray = resultArray.length;
          const lenRestElement = restElement.length;
          console.log({ lenRestElement });
          console.log({ lenResultArray });

          const questionNumberResult =
            element.length === 1
              ? `Use the above information to answer question ${
                  lenResultArray + 1
                }`
              : `Use the above information to answer questions ${
                  lenResultArray + 1
                } to ${lenResultArray + element.length}`;
          console.log({ questionNumberResult });
          firstElementObj = {
            ...firstElementObj,
            questionIntroText: getFromItems.questionIntroText,
            questionIntroAtach: questionNumberResult,
          };
          const joinedEle = [firstElementObj, ...restElement];

          console.log({ getFromItems });
          resultArray = [...resultArray, ...joinedEle];
        }
      }
    }
    return resultArray;
  }
  // -----------------------------------------------------------------

  const professionExamGetter = (myArrayValues, proffQueNum, examType) => {
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
    resultArray = arrangeQuestionIntro(examArray);

    console.log({ resultArray });
    if (examType === "waec") {
      setExamType("waec");
    } else if (examType === "jamb") {
      setExamType("jamb");
    } else {
      setExamType("neco");
    }
    setprofExamIndex(proffQueNum);
    setitemArray(resultArray);

    setCurrentArrayHandler(resultArray);

    setparticularIndex(0);
    setrandIndex(0);
    setrangeIndex1(0);
    setrangeIndex2(0);
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

    const particularQueObj = workingArray[Number(particularQueValue) - 1];
    const linkedResultObj = checkLinkedForOneQuestion(particularQueObj);

    setitemArray([linkedResultObj]);

    setCurrentArrayHandler([linkedResultObj]);
    setparticularIndex(particularQueValue);
    setrandIndex(0);
    setprofExamIndex(0);
    setIndex(Number(particularQueValue) - 1);
    setrangeIndex1(0);
    setrangeIndex2(0);
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
    setcontrolLiActive(null);
  }

  //link one object
  function checkLinkedForOneQuestion(questionObj) {
    if (Number(questionObj.linkedTo)) {
      const linkedNumber = questionObj.linkedTo;

      const getFromItems = workingArray[Number(linkedNumber) - 1];

      return {
        ...questionObj,
        questionIntroText: getFromItems.questionIntroText,
      };
      //const joinedEle = [firstElementObj, ...restElement];
    } else {
      return questionObj;
    }
  }

  function rangOfQuestionsHandler() {
    if (
      Number(rangeQueValue1) > workingArray.length ||
      Number(rangeQueValue1) < 1 ||
      Number(rangeQueValue2) > workingArray.length ||
      Number(rangeQueValue2) < 1
    ) {
      return;
    }
    const requestedQuestionArray = workingArray.slice(
      Number(rangeQueValue1) - 1,
      Number(rangeQueValue2)
    );
    const resultArray = allQuestIntroText(requestedQuestionArray);
    console.log({ resultArray, rangeQueValue1, rangeQueValue2 });
    setprofExamIndex(0);
    setitemArray(resultArray);

    setCurrentArrayHandler(resultArray);

    setparticularIndex(0);
    setrandIndex(0);
    setrangeIndex1(rangeQueValue1);
    setrangeIndex2(rangeQueValue2);
    //setIndex(Number(rangeQueValue2) - 1);
  }

  function allQuestIntroText(inputArray) {
    let modifiedQuestions = inputArray.map((item, i) => {
      if (item.questionIntroText) {
        //get the number of questions that share this questionIntroText
        const linkedValue = item.linkedTo;
        const linkedQuestionArray = inputArray.filter(
          (item) => item.linkedTo === linkedValue
        );

        const attachStr =
          linkedQuestionArray.length === 1
            ? `Use the above information to answer question ${i + 1}`
            : `Use the above information to answer questions ${i + 1} to ${
                Number(i) + linkedQuestionArray.length
              }`;
        return { ...item, questionIntroAtach: attachStr };
      } else {
        return item;
      }
    });

    const firstItem = modifiedQuestions.slice(0, 1);
    const restItems = modifiedQuestions.slice(1);
    let firstItemObj = firstItem[0];
    if (firstItemObj.linkedTo) {
      if (!firstItemObj.questionIntroText) {
        const linkedToFirstQuestionArray = modifiedQuestions.filter(
          (item) => item.linkedTo === firstItemObj.linkedTo
        );
        const getFromItems = workingArray[Number(firstItemObj.linkedTo) - 1];

        firstItemObj = {
          ...firstItemObj,
          questionIntroText: getFromItems.questionIntroText,
          questionIntroAtach: `${
            linkedToFirstQuestionArray.length === 1
              ? "Use the information to answer question 1"
              : `Use the above information to answer questions 1
                 to ${1 + (linkedToFirstQuestionArray.length - 1)}`
          }`,
        };
        return [firstItemObj, ...restItems];
      } else {
        return modifiedQuestions;
      }
    }
    return modifiedQuestions;
  }

  const onChangeNumberHandler = (e) => {
    const { name, value } = e.target;
    console.log({ name, value }, "fromOONE");
    switch (name) {
      case "random":
        setorderValue(value);
        break;
      case "particular":
        setparticularQueValue(value);
        break;

      case "waec":
        setwaecQueValue(value);
        break;
      case "neco":
        setnecoQueValue(value);
        break;
      case "range1":
        setrangeQueValue1(value);
        break;
      case "range2":
        setrangeQueValue2(value);
        break;

      default:
        setjambQueValue(value);
        break;
    }
  };

  function setQuestionNum() {
    if (randIndex) {
      return `${randIndex} random question(s) chosen from ${workingArray.length} questions  `;
    } else if (profExamIndex) {
      return `${profExamIndex} ${examTypeVar} question(s) chosen from ${workingArray.length} questions  `;
    } else if (partIndex) {
      return `Question  ${partIndex} Of ${workingArray.length}`;
    } else if (rangeQueValue1 || rangeQueValue2) {
      return `Questions  ${rangeQueValue1} to ${rangeQueValue2} Of ${workingArray.length}`;
    } else {
      return `Question  ${index + 1} Of ${workingArray.length}`;
    }
  }

  if (itemArray) {
    return (
      <>
        {!controlReviewLink ? (
          // <main className={classes.form}>

          //   <article className={classes.controls}>
          //     <h4>Goodluck from Bede Asonye</h4>
          //     <p>

          //       {setQuestionNum()}
          //     </p>

          //     <div>
          //       <QuestionList
          //         items={itemArray}
          //         handleRadioButtonChange={handleRadioButtonChange}
          //         blogId={blogId}
          //         selectValue={selectValue}
          //         israndomQues={israndomQues}
          //       />
          //     </div>

          //     <div className={classes.buttoncontainer}>
          //       <div className={classes.forwardBackwardButcontrol}>
          //         <button className={classes.prevbtn} onClick={prevPerson}>
          //           <FaChevronLeft />
          //         </button>
          //         <button className={classes.nextbtn} onClick={nextQuestion}>
          //           <FaChevronRight />
          //         </button>
          //       </div>

          //       <div className={classes.submitBut}>
          //         <button
          //           onClick={() => markScript(itemArray)}
          //           disabled={controlSubBtn}
          //         >
          //           Submit For Marking
          //         </button>
          //       </div>

          //       <div className={classes.randomQuestion}>
          //         <Button className={classes.randombtn} onClick={randomPerson}>
          //           Give me random Questions
          //         </Button>

          //         <label htmlFor="order">
          //           {" "}
          //           {`Available Quantity ${workingArray.length}: Selected Quantity`}
          //         </label>

          //         <input
          //           type="number"
          //           id="order"
          //           value={orderValue}
          //           onChange={onChangeNumberHandler}
          //           min="1"
          //           max={workingArray.length}
          //           name="random"
          //         />
          //       </div>

          //       <div className={classes.particularQuestion}>
          //         <Button onClick={particularQuestionHandler}>
          //           Select Particular Questions
          //         </Button>

          //         <label htmlFor="particular-quest">
          //           {" "}
          //           {`Available Quantity ${workingArray.length}: Selected Quantity`}
          //         </label>

          //         <input
          //           type="number"
          //           id="particular-quest"
          //           required
          //           value={particularQueValue}
          //           onChange={onChangeNumberHandler}
          //           min="1"
          //           max={workingArray.length}
          //           name="particular"
          //         />
          //       </div>
          //       <div className={classes.rangeOfQuestions}>
          //         <Button onClick={rangOfQuestionsHandler}>
          //           Select Range of Questions
          //         </Button>

          //         <label htmlFor="range-quest1">
          //           {" "}
          //           {`Available Quantity ${workingArray.length}: From`}
          //         </label>

          //         <input
          //           type="number"
          //           id="range-quest1"
          //           required
          //           value={rangeQueValue1}
          //           onChange={onChangeNumberHandler}
          //           min="1"
          //           max={workingArray.length}
          //           name="range1"
          //         />

          //         <label htmlFor="range-quest2">To:</label>
          //         <input
          //           type="number"
          //           id="range-quest2"
          //           required
          //           value={rangeQueValue2}
          //           onChange={onChangeNumberHandler}
          //           min="1"
          //           max={workingArray.length}
          //           name="range2"
          //         />
          //       </div>
          //       <button
          //         className={classes.seeMoreBut}
          //         onClick={() => setquestionHide(!questionHide)}
          //       >
          //         {questionHide
          //           ? "Hide more options ..."
          //           : "Show more options ..."}
          //       </button>

          //       {questionHide && (
          //         <>
          //           <div className={classes.waecQuestion}>
          //             <button
          //               onClick={() =>
          //                 professionExamGetter(
          //                   waecExamArray,
          //                   waecQueValue,
          //                   "waec"
          //                 )
          //               }
          //               disabled={waecBtnControl}
          //             >
          //               WACE Questions On This Topic
          //             </button>

          //             <label htmlFor="waec-quest">
          //               {" "}
          //               {`Available Quantity  ${
          //                 workingArray.filter(
          //                   (item) =>
          //                     item.examType !== undefined &&
          //                     item.examType.startsWith("wassce")
          //                 ).length
          //               }: Selected Quantity`}
          //             </label>

          //             <input
          //               type="number"
          //               id="waec-quest"
          //               value={waecQueValue}
          //               onChange={onChangeNumberHandler}
          //               min="1"
          //               name="waec"
          //               max={
          //                 workingArray.filter(
          //                   (item) =>
          //                     item.examType !== undefined &&
          //                     item.examType.startsWith("wassce")
          //                 ).length
          //               }
          //             />
          //           </div>

          //           <div className={classes.necoQuestion}>
          //             <Button
          //               onClick={() =>
          //                 professionExamGetter(
          //                   necoExamArray,
          //                   necoQueValue,
          //                   "neco"
          //                 )
          //               }
          //               disabled={necoBtnControl}
          //             >
          //               NECO Questions On This Topic
          //             </Button>

          //             <label htmlFor="neco-quest">
          //               {" "}
          //               {`Available Quantity  ${
          //                 workingArray.filter(
          //                   (item) =>
          //                     item.examType !== undefined &&
          //                     item.examType.startsWith("necossce")
          //                 ).length
          //               }: Selected Quantity`}
          //             </label>

          //             <input
          //               type="number"
          //               id="neco-quest"
          //               value={necoQueValue}
          //               onChange={onChangeNumberHandler}
          //               min="1"
          //               name="neco"
          //               max={
          //                 workingArray.filter(
          //                   (item) =>
          //                     item.examType !== undefined &&
          //                     item.examType.startsWith("necossce")
          //                 ).length
          //               }
          //             />
          //           </div>

          //           <div className={classes.jambQuestion}>
          //             <Button
          //               onClick={() =>
          //                 professionExamGetter(
          //                   jambExamArray,
          //                   jambQueValue,
          //                   "jamb"
          //                 )
          //               }
          //               disabled={jambBtnControl}
          //             >
          //               JAMB Questions On This Topic
          //             </Button>

          //             <label htmlFor="jamb-quest">
          //               {" "}
          //               {`Available Quantity  ${
          //                 workingArray.filter(
          //                   (item) =>
          //                     item.examType !== undefined &&
          //                     item.examType.startsWith("JAMB")
          //                 ).length
          //               }: Selected Quantity`}
          //             </label>

          //             <input
          //               type="number"
          //               id="jamb-quest"
          //               value={jambQueValue}
          //               onChange={onChangeNumberHandler}
          //               min="1"
          //               name="jamb"
          //               max={
          //                 workingArray.filter(
          //                   (item) =>
          //                     item.examType !== undefined &&
          //                     item.examType.startsWith("JAMB")
          //                 ).length
          //               }
          //             />
          //           </div>
          //         </>
          //       )}
          //     </div>
          //   </article>
          //.mainSection
          // </main>
          <section className={classes.mainSection}>
            <div class="row justify-content-center align-items-center">
              <div class="col-11">
                <div class="card bg-light">
                  <div class="card-header">
                    <div class="d-flex align-items-center justify-content-between">
                      {/* <h4 class="card-title">Goodluck from Bede Asonye</h4> */}
                      <div className="d-flex flex-column align-items-center">
                        <img
                          src={imageProfileUrl}
                          class="rounded-circle mb-1 img-fluid w-25"
                          alt="card image"
                        />
                        <p className="card-text">Goodluck from {author}</p>
                      </div>
                      <p class="card-text">{setQuestionNum()}</p>
                    </div>
                  </div>
                  <div class="card-body text-center">
                    <QuestionList
                      items={itemArray}
                      handleRadioButtonChange={handleRadioButtonChange}
                      blogId={blogId}
                      selectValue={selectValue}
                      israndomQues={israndomQues}
                      controlLiActive={controlLiActive}
                      subjects={subjects}
                      quesForm={quesForm}
                    />
                  </div>

                  <div class="card-body text-center">
                    <div className={classes.buttoncontainer}>
                      <div className={classes.forwardBackwardButcontrol}>
                        <button
                          className={classes.prevbtn}
                          onClick={prevPerson}
                        >
                          <FaChevronLeft />
                        </button>
                        <button
                          className={classes.nextbtn}
                          onClick={nextQuestion}
                        >
                          <FaChevronRight />
                        </button>
                      </div>

                      <div className={classes.submitBut}>
                        <Button
                          onClick={() => markScript(itemArray)}
                          disabled={controlSubBtn}
                        >
                          Submit For Marking
                        </Button>
                      </div>

                      <div className={classes.randomQuestion}>
                        <Button
                          className={`${classes.randombtn}`}
                          onClick={randomPerson}
                        >
                          Give me random Questions
                        </Button>

                        <label htmlFor="order" class="card-text">
                          {" "}
                          {`Available Quantity ${workingArray.length}: Selected Quantity`}
                        </label>

                        <input
                          type="number"
                          id="order"
                          value={orderValue}
                          onChange={onChangeNumberHandler}
                          min="1"
                          max={workingArray.length}
                          name="random"
                        />
                      </div>

                      <div className={classes.particularQuestion}>
                        <Button onClick={particularQuestionHandler}>
                          Select Particular Questions
                        </Button>

                        <label htmlFor="particular-quest">
                          {" "}
                          {`Available Quantity ${workingArray.length}: Selected Quantity`}
                        </label>

                        <input
                          type="number"
                          id="particular-quest"
                          required
                          value={particularQueValue}
                          onChange={onChangeNumberHandler}
                          min="1"
                          max={workingArray.length}
                          name="particular"
                        />
                      </div>
                      <div className={classes.rangeOfQuestions}>
                        <Button onClick={rangOfQuestionsHandler}>
                          Select Range of Questions
                        </Button>

                        <label htmlFor="range-quest1">
                          {" "}
                          {`Available Quantity ${workingArray.length}: From`}
                        </label>

                        <input
                          type="number"
                          id="range-quest1"
                          required
                          value={rangeQueValue1}
                          onChange={onChangeNumberHandler}
                          min="1"
                          max={workingArray.length}
                          name="range1"
                        />

                        <label htmlFor="range-quest2">To:</label>
                        <input
                          type="number"
                          id="range-quest2"
                          required
                          value={rangeQueValue2}
                          onChange={onChangeNumberHandler}
                          min="1"
                          max={workingArray.length}
                          name="range2"
                        />
                      </div>
                      <button
                        className={classes.seeMoreBut}
                        onClick={() => setquestionHide(!questionHide)}
                      >
                        {questionHide
                          ? "Hide more options ..."
                          : "Show more options ..."}
                      </button>

                      {questionHide && (
                        <>
                          <div className={classes.waecQuestion}>
                            <Button
                              onClick={() =>
                                professionExamGetter(
                                  waecExamArray,
                                  waecQueValue,
                                  "waec"
                                )
                              }
                              disabled={waecBtnControl}
                            >
                              WACE Questions On This Topic
                            </Button>

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
                              onChange={onChangeNumberHandler}
                              min="1"
                              name="waec"
                              max={
                                workingArray.filter(
                                  (item) =>
                                    item.examType !== undefined &&
                                    item.examType.startsWith("wassce")
                                ).length
                              }
                            />
                          </div>

                          <div className={classes.necoQuestion}>
                            <Button
                              onClick={() =>
                                professionExamGetter(
                                  necoExamArray,
                                  necoQueValue,
                                  "neco"
                                )
                              }
                              disabled={necoBtnControl}
                            >
                              NECO Questions On This Topic
                            </Button>

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
                              onChange={onChangeNumberHandler}
                              min="1"
                              name="neco"
                              max={
                                workingArray.filter(
                                  (item) =>
                                    item.examType !== undefined &&
                                    item.examType.startsWith("necossce")
                                ).length
                              }
                            />
                          </div>

                          <div className={classes.jambQuestion}>
                            <Button
                              onClick={() =>
                                professionExamGetter(
                                  jambExamArray,
                                  jambQueValue,
                                  "jamb"
                                )
                              }
                              disabled={jambBtnControl}
                            >
                              JAMB Questions On This Topic
                            </Button>

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
                              onChange={onChangeNumberHandler}
                              min="1"
                              name="jamb"
                              max={
                                workingArray.filter(
                                  (item) =>
                                    item.examType !== undefined &&
                                    item.examType.startsWith("JAMB")
                                ).length
                              }
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : (
          // show this component after submit button is hit, that is
          //after questions has been answered,this component shows the result
          <QuestionReviewSelect
            index={index}
            selectValue={selectValue}
            controlReviewLink={controlReviewLink}
            backToQuestionListHandler={backToQuestionListHandler}
            subjects={subjects}
            quesForm={quesForm}
          />
        )}
      </>
    );
  }
  return null;
};

export default OneQuestion;

{
  /* <section id="instructors" class="p-5 bg-primary">
  <div class="container">
    <h2 class="text-center text-white">Our Instructors</h2>
    <p class="lead text-center text-white mb-5">
      Our instructors all have 5+ years working as a web developer in the
      industry
    </p>
    <div class="row g-4">
      <div class="col-md-6 col-lg-3">
        <div class="card bg-light">
          <div class="card-body text-center">
            <img
              src="https://randomuser.me/api/portraits/men/11.jpg"
              class="rounded-circle mb-3"
              alt=""
            />
            <h3 class="card-title mb-3">John Doe</h3>
            <p class="card-text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
              accusamus nobis sed cupiditate iusto? Quibusdam.
            </p>
            <a href="#">
              <i class="bi bi-twitter text-dark mx-1"></i>
            </a>
            <a href="#">
              <i class="bi bi-facebook text-dark mx-1"></i>
            </a>
            <a href="#">
              <i class="bi bi-linkedin text-dark mx-1"></i>
            </a>
            <a href="#">
              <i class="bi bi-instagram text-dark mx-1"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>; */
}
