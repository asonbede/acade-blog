import { useContext, useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
//import QuestionsList from "./questions-list";
import NewQuestion from "./new-questions-form";
import classes from "./questions.module.css";
import NotificationContext from "../../store/notification-context";
import Link from "next/dist/client/link";
import Togglable from "../togglable/togglable";
import QuestionsListOne from "./question-list-one";
import MainQuestionList from "./question-main-list";
import EssayTypeQuestions from "./essay-type-questions";
import NewEssayQuestion from "./new-essay-question";
function Questions(props) {
  const [selectedValuesOfRadioButton, setselectedValuesOfRadioButton] =
    useState([]);
  const [score, setscore] = useState(null);
  const [correctQuestions, setcorrectQuestions] = useState([]);
  const [inCorrectQuestions, setinCorrectQuestions] = useState([]);
  const [skippedQuestions, setskippedQuestions] = useState([]);
  const [allQuestions, setallQuestions] = useState([]);
  const [showQuestions, setShowQuestions] = useState(true);

  const [isFetchingQuestions, setIsFetchingQuestions] = useState(false);
  const [controlSubBtn, setcontrolSubBtn] = useState(true);
  const [controlReviewLink, setcontrolReviewLink] = useState(false);
  const [selectValue, setselectValue] = useState();
  const [currentArray, setcurrentArray] = useState([]);
  const [changerValue, setChangerValue] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  const notificationCtx = useContext(NotificationContext);
  const { questions: items, blogId, questionType } = props;
  console.log({ items }, "fro,m questions");
  console.log({ blogId }, "in questionsjs");
  const noteFormRef = useRef(null);
  //const notificationCtx = useContext(NotificationContext);
  // setCurrentArrayHandler;
  function checkMessageScore() {
    if (selectValue === "mult-choice-one") {
      if (score === 1) {
        return "Success! Good Work. Keep it up!";
      } else {
        return "Incorrect! Please try again";
      }
    } else {
      if (score < currentArray.length / 2) {
        return "Poor Performance!";
      } else if (
        score > currentArray.length / 2 ||
        score < (3 * currentArray.length) / 4
      ) {
        return "Good Work. You are on the right track";
      } else {
        return "Great. Excellent Porformance";
      }
    }
  }

  function showerPraises() {
    if (selectValue === "mult-choice-all") {
      if (score < currentArray.length / 2) {
        return `You scored ${score}/${currentArray.length}. You have to read this topic again. You can begin by studying 
        the explanation provided. Click the review button to see details of your performance`;
      } else {
        return `You scored ${score}/${currentArray.length}. Click the review button to see details of your performance`;
      }
    } else {
      if (score === 1) {
        return `You did very well on this one. To return to the questions and continue with your exploits, click the back to questions button above`;
      } else {
        return `You may need to study this topic again. To return to the questions, click the back to questions button above`;
      }
    }
  }

  function determineStatus() {
    if (selectValue === "mult-choice-all") {
      if (score > currentArray.length / 2) {
        return `success`;
      } else {
        return `error`;
      }
    } else {
      if (score === 1) {
        return `success`;
      } else {
        return `error`;
      }
    }
  }

  useEffect(() => {
    // if (questionType) {
    //   setselectValue(questionType);
    // }
    if (typeof window !== "undefined") {
      const userChoiceFromLocStorage =
        window.localStorage.getItem("select-value");
      if (userChoiceFromLocStorage) {
        setselectValue(userChoiceFromLocStorage);
      } else {
        setselectValue("mult-choice-all");
      }
    }
    //    return {
    //      basket:
    //        window.localStorage.getItem("basket") === null
  }, []);

  useEffect(() => {
    console.log({ inCorrectQuestions }, "inUseffect");
    notificationCtx.reviewQuestionsHandler({
      selectedValuesOfRadioButton,
      currentArray,
      correctQuestions,
      inCorrectQuestions,
      skippedQuestions,
      allQuestions,
      score,
      selectValue,
    });
  }, [selectedValuesOfRadioButton, score, inCorrectQuestions]);
  useEffect(() => {
    if (score !== null) {
      notificationCtx.showNotification({
        title: `${checkMessageScore()}!`,
        message: `Your answer script was successfully assessed! ${showerPraises()}`,
        status: `${determineStatus()}`,
      });
    }
  }, [score]);

  useEffect(() => {
    //"mult-choice-all";mult-choice-all
    if (selectValue === "mult-choice-all") {
      console.log("multi-all called");
      setcurrentArray(
        items.filter((item) => item.questionType !== "essay-type")
      );
      setisLoading(false);
    } else if (selectValue === "essay-type") {
      console.log("inside essay type");
      const arrayessay = items.filter(
        (item) => item.questionType === "essay-type"
      );
      console.log({ arrayessay });
      setcurrentArray(
        items.filter((item) => item.questionType === "essay-type")
      );
      setisLoading(false);
    } else {
      setisLoading(false);
    }

    // else {`1
    //   setcurrentArray(
    //     items.filter((item) => item.questionType !== "essay-type")
    //   );
    // }
    // else {
    //   // value="">All Multiple Choice</option>
    //   // <option value="mult-choice-one

    // }
  }, [changerValue, selectValue]);

  console.log({ currentArray }, "checking essay-type11111");

  function setCurrentArrayHandler(arrayCurrent) {
    console.log("in useeff question-one");
    setcurrentArray(arrayCurrent);
  }

  const router = useRouter();
  const optionsList = ["A", "B", "C", "D", "E"];

  const linkPath = "/posts/questions/question-review";
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
  const handleRadioButtonChange = (event) => {
    const { name, value } = event.target;
    console.log({ name, value });
    console.log({ currentArray }, "quescurrArry");
    //get the student's choice and the correct option when radio button is selected
    setselectedValuesOfRadioButton({
      ...selectedValuesOfRadioButton,
      [`studentChoiceForQuestion${Number(name) + 1}`]: value,
      [`correctOptionForQuestion${Number(name) + 1}`]:
        currentArray[name].correctOption,
    });
    if (controlSubBtn) {
      setcontrolSubBtn(false);
    }
    console.log({ selectedValuesOfRadioButton });
  };
  function markScript(itemsValue) {
    //setcurrentArray(itemsValue);
    if (!selectValue === "mult-choice-one") {
      notificationCtx.showNotification({
        title: "questions is being marked...",
        message: "Your question is currently being assessed, please wait",
        ststus: "pending",
      });
    }

    console.log({ currentArray }, "clickedMarkscript");
    const unanweredQuestionsList = [];
    const skippedQuestionsList = [];
    const correctQuestionsList = [];
    const inCorrectQuestionsList = [];
    const allQuestionsList = [];
    let correctOptionValue;
    let scoreValue = 0;
    for (let index = 0; index < currentArray.length; index++) {
      const studentsChoice =
        selectedValuesOfRadioButton[`studentChoiceForQuestion${index + 1}`];
      const correctOptionLetter =
        selectedValuesOfRadioButton[`correctOptionForQuestion${index + 1}`];
      let questionObj = currentArray[index];
      //   questionObj = { ...questionObj, originalIndex: index };
      allQuestions.push(questionObj);

      const optionsArray = questionObj.options;
      if (!studentsChoice) {
        unanweredQuestionsList.push(index + 1);
        skippedQuestionsList.push({ ...questionObj, originalIndex: index });
        // correctOptionValue = checkOptions(
        //   questionObj.correctOption,
        //   optionsArray
        // );
        // setselectedValuesOfRadioButton({
        //   ...selectedValuesOfRadioButton,
        //   [`studentChoiceForQuestion${index + 1}`]: "go",
        //   [`correctOptionForQuestion${index + 1}`]: correctOptionValue,
        // });
        setselectedValuesOfRadioButton((selectedValuesOfRadioButton) => ({
          ...selectedValuesOfRadioButton,
          [`studentChoiceForQuestion${index + 1}`]: "go==",
          [`correctOptionForQuestion${index + 1}`]: questionObj.correctOption,
        }));

        continue;
      }
      console.log({ studentsChoice });
      console.log({ optionsArray });
      console.log({ correctOptionLetter });
      correctOptionValue = checkOptions(correctOptionLetter, optionsArray);

      if (studentsChoice === correctOptionValue) {
        correctQuestionsList.push({ ...questionObj, originalIndex: index });
        scoreValue = scoreValue + 1;
      } else {
        console.log("inIncorrect");
        inCorrectQuestionsList.push({ ...questionObj, originalIndex: index });
        //console.log({ inCorrectQuestionsList }, "in mmmk");
        scoreValue = scoreValue + 0;
      }
    }

    if (skippedQuestionsList.length) {
      const confirmAns =
        confirm(`You have skipped questions ${unanweredQuestionsList.join(",")} 
    if you click ok your script will be assessed without the skipped questions`);
      if (confirmAns) {
        console.log({ selectedValuesOfRadioButton }, "inConfirm");
        // notificationCtx.reviewQuestionsHandler({
        //   selectedValuesOfRadioButton,
        //   items,
        //   correctQuestions,
        //   inCorrectQuestions,
        //   skippedQuestions,
        //   allQuestions,
        // });
        setcontrolReviewLink(true);
        setskippedQuestions(skippedQuestionsList);
        setcorrectQuestions(correctQuestionsList);
        setinCorrectQuestions(inCorrectQuestionsList);
        setallQuestions(allQuestionsList);
        setscore(scoreValue);
        // notificationCtx.showNotification({
        //   title: "Success!",
        //   message: `Your answer script was successfully assessed!\n You scored ${score}/${items.length}.\n Click the review button for details`,
        //   status: "success",
        // });
        return;
      } else {
        return;
      }
    } else {
      setcontrolReviewLink(true);
      console.log({ inCorrectQuestionsList }, "in mmmkllloo");
      setskippedQuestions(skippedQuestionsList);
      setcorrectQuestions(correctQuestionsList);
      setinCorrectQuestions(inCorrectQuestionsList);
      setallQuestions(allQuestionsList);
      setscore(scoreValue);
      // notificationCtx.showNotification({
      //   title: "Success!",
      //   message: `Your answer script was successfully assessed!\n You scored ${score}/${items.length}.\n Click the review button for details`,
      //   status: "success",
      // });
    }
  }

  // const { questions, blogId } = props;

  // const notificationCtx = useContext(NotificationContext);

  // const [showQuestions, setShowQuestions] = useState(false);
  // //const [questions, setQuestions] = useState([]);
  // const [isFetchingQuestions, setIsFetchingQuestions] = useState(false);

  // useEffect(() => {
  //   if (showQuestions) {
  //     setIsFetchingQuestions(true);
  //     fetch("/api/questions/" + blogId)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         setQuestionsProd(data.questions);
  //         setIsFetchingQuestions(false);
  //       });
  //   }
  // }, [showQuestions]);

  const onselectChange = (e) => {
    setisLoading(true);
    const optionValue = e.target.value;
    setselectValue(optionValue);
    setChangerValue(!changerValue);
    console.log({ optionValue });
    // router.push(`/posts/${optionValue}`);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("select-value", optionValue);
    }
  };

  //  if (typeof window !== "undefined") {
  //    return {
  //      basket:
  //        window.localStorage.getItem("basket") === null
  //          ? []
  //          : window.localStorage.getItem("basket"),
  //      viwedItems: [],
  //      saved: [],
  //    };
  //  }

  function toggleQuestionsHandler() {
    setShowQuestions((prevStatus) => !prevStatus);
  }

  function addQuestionHandler(questionData, typeOfQuestion) {
    notificationCtx.showNotification({
      title: "Sending questions...",
      message: "Your question is currently being stored into a database.",
      status: "pending",
    });

    fetch("/api/questions/" + blogId, {
      method: "POST",
      body: JSON.stringify(questionData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        return response.json().then((data) => {
          throw new Error(data.message || "Something went wrong!");
        });
      })
      .then((data) => {
        notificationCtx.showNotification({
          title: "Success!",
          message: "Your question was saved!",
          status: "success",
        });

        // router.push(
        //   `/posts/questions/${blogId}?questionType=${typeOfQuestion}`
        // );
        router.reload(window.location.pathname);
        // router.push({
        //   pathname: `/posts/questions/${blogId}`,
        //   query: { questionType: `${typeOfQuestion}` },
        // });
      })
      .catch((error) => {
        notificationCtx.showNotification({
          title: "Error!",
          message: error.message || "Something went wrong!",
          status: "error",
        });
      });
  }
  function goToLinkHandler() {
    router.push(linkPath);
  }

  function displayQuestions() {
    console.log({ selectValue }, "all choice");
    if (
      showQuestions &&
      !isFetchingQuestions &&
      selectValue === "mult-choice-all"
    ) {
      return (
        <MainQuestionList
          items={currentArray}
          handleRadioButtonChange={handleRadioButtonChange}
          blogId={blogId}
          controlSubBtn={controlSubBtn}
          markScript={markScript}
          selectValue={selectValue}
          controlReviewLink={controlReviewLink}
          setcontrolReviewLink={setcontrolReviewLink}
          setcontrolSubBtn={setcontrolSubBtn}
          variablesForReseting={{
            setskippedQuestions,
            setcorrectQuestions,
            setinCorrectQuestions,
            setallQuestions,
            setselectedValuesOfRadioButton,
            setscore,
          }}
        />
      );
    } else if (
      showQuestions &&
      !isFetchingQuestions &&
      selectValue === "mult-choice-one"
    ) {
      console.log({ selectValue }, "one choice");
      return (
        <QuestionsListOne
          items={items}
          handleRadioButtonChange={handleRadioButtonChange}
          blogId={blogId}
          markScript={markScript}
          controlSubBtn={controlSubBtn}
          selectValue={selectValue}
          controlReviewLink={controlReviewLink}
          setcontrolReviewLink={setcontrolReviewLink}
          setCurrentArrayHandler={setCurrentArrayHandler}
          setcontrolSubBtn={setcontrolSubBtn}
          setisLoading={setisLoading}
          variablesForReseting={{
            setskippedQuestions,
            setcorrectQuestions,
            setinCorrectQuestions,
            setallQuestions,
            setselectedValuesOfRadioButton,
            setscore,
          }}
        />
      );
    } else {
      console.log({ currentArray }, "checking essay-type22222");
      return (
        <EssayTypeQuestions
          items={currentArray}
          blogId={blogId}
          selectValue={selectValue}
        />
      );
    }
  }
  if (isLoading) {
    return (
      <div style={{ fontSize: "30px", textAlign: "center", marginTop: "20%" }}>
        Loading.....
      </div>
    );
  }

  return (
    <section className={classes.questions}>
      <div className={classes.control}>
        <button onClick={toggleQuestionsHandler}>
          {showQuestions ? "Hide" : "Show"} Questions
        </button>

        {/* {showQuestions && !isFetchingQuestions && (
          <button
            onClick={markScript}
            disabled={controlSubBtn}
            title="attempt the questions before clicking this button"
          >
            submit Script For Marking
          </button>
        )} */}

        <select
          onChange={onselectChange}
          // value={selectValue}
          className={classes.selectEle}
          // size={4}
          // defaultValue={selectValue}
          value={selectValue}
        >
          <optgroup label="Multiple Choice">
            <option value="mult-choice-all">All Multiple Choice</option>
            <option value="mult-choice-one">
              Multiple Choice - One By One
            </option>
          </optgroup>
          <optgroup label="Essay Type">
            <option value="essay-type">Essay Type</option>
          </optgroup>
        </select>

        {/* {showQuestions &&
          !isFetchingQuestions &&
          controlReviewLink &&
          selectValue === "mult-choice-all" && (
            <Link href={linkPath}>
              <a>Review Result</a>
            </Link>
            // <button onClick={goToLinkHandler}>Review Result</button>bbbbhhhhhhhhh
            // as="button"
          )} */}

        {/* <div>
          <input
            type="radio"
            name="question-select"
            value="mult-sel-all"
            id="mult-sel-all"
            // onChange={handleRadioSelect}
          />
          <label htmlFor="mult-sel-all">Show All</label>
          <input
            type="radio"
            name="question-select"
            value="mult-sel-one"
            id="mult-sel-one"
            // onChange={handleRadioSelect}
          />
          <label htmlFor="mult-sel-one">Show one </label>
          <input
            type="radio"
            name="question-select"
            value="essay"
            id="essay-type"
            // onChange={handleRadioSelect}
          />
          <label htmlFor="essay-type">Essay Type </label>
        </div> */}
      </div>
      {displayQuestions()}
      {/* {showQuestions && !isFetchingQuestions && (
        <QuestionsList
          items={items}
          handleRadioButtonChange={handleRadioButtonChange}
          blogId={blogId}
        />
      )} */}
      {showQuestions && isFetchingQuestions && <p>Loading questions...</p>}
      {selectValue === "essay-type" ? (
        <Togglable buttonLabel="create essay question" ref={noteFormRef}>
          <p>Create Essay-Type Questions</p>
          <NewEssayQuestion
            onAddQuestion={addQuestionHandler}
            noteFormRef={noteFormRef}
          />
        </Togglable>
      ) : (
        <Togglable buttonLabel="create multi-choice question" ref={noteFormRef}>
          <p>Create Multi-Choice Questions</p>
          <NewQuestion
            onAddQuestion={addQuestionHandler}
            noteFormRef={noteFormRef}
          />
        </Togglable>
      )}
    </section>
  );
}

export default Questions;

// # Download prebuilt binaries
// npm i -D @swc/cli @swc/core

// # Transpile JavaScript file and emit to stdout
// npx swc ./file.js

// {
//   "presets": ["next/babel"]
// }
// .babelrc
