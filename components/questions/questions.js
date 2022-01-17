import { useContext, useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import QuestionsList from "./questions-list";
import NewQuestion from "./new-questions-form";
import classes from "./questions.module.css";
import NotificationContext from "../../store/notification-context";
import Link from "next/dist/client/link";
import Togglable from "../togglable/togglable";
import QuestionsListOne from "./question-list-one";
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
  const [selectValue, setselectValue] = useState("mult-choice-all");
  const [currentArray, setcurrentArray] = useState([]);

  const notificationCtx = useContext(NotificationContext);
  const { questions: items, blogId } = props;
  console.log({ blogId }, "in questionsjs");
  const noteFormRef = useRef(null);
  //const notificationCtx = useContext(NotificationContext);
  function checkMessageScore() {
    if (selectValue === "mult-choice-one" && score === 1) {
      return "Success! Good Work";
    } else if (selectValue === "mult-choice-one" && score !== 1) {
      return "Incorrect! Please try again";
    } else {
      return "Success";
    }
  }
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
    });
  }, [selectedValuesOfRadioButton, score, inCorrectQuestions]);
  useEffect(() => {
    if (score !== null) {
      notificationCtx.showNotification({
        title: `${checkMessageScore()}Success!`,
        message: `Your answer script was successfully assessed! You scored ${score}/${currentArray.length}. Click the review button for details`,
        status: "success",
      });
    }
  }, [score]);
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
    //get the student's choice and the correct option when radio button is selected
    setselectedValuesOfRadioButton({
      ...selectedValuesOfRadioButton,
      [`studentChoiceForQuestion${Number(name) + 1}`]: value,
      [`correctOptionForQuestion${Number(name) + 1}`]:
        items[name].correctOption,
    });
    if (controlSubBtn) {
      setcontrolSubBtn(false);
    }
    console.log({ selectedValuesOfRadioButton });
  };
  function markScript(itemsValue) {
    setcurrentArray(itemsValue);
    notificationCtx.showNotification({
      title: "questions is being marked...",
      message: "Your question is currently being assessed, please wait",
      ststus: "pending",
    });

    console.log("clickedMarkscript");
    const unanweredQuestionsList = [];
    const skippedQuestionsList = [];
    const correctQuestionsList = [];
    const inCorrectQuestionsList = [];
    const allQuestionsList = [];
    let correctOptionValue;
    let scoreValue = 0;
    for (let index = 0; index < itemsValue.length; index++) {
      const studentsChoice =
        selectedValuesOfRadioButton[`studentChoiceForQuestion${index + 1}`];
      const correctOptionLetter =
        selectedValuesOfRadioButton[`correctOptionForQuestion${index + 1}`];
      let questionObj = itemsValue[index];
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
    const optionValue = e.target.value;
    setselectValue(optionValue);
    console.log({ optionValue });
    // router.push(`/posts/${optionValue}`);
  };

  function toggleQuestionsHandler() {
    setShowQuestions((prevStatus) => !prevStatus);
  }

  function addQuestionHandler(questionData) {
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
        router.push(`/posts/questions/${blogId}`);
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
        <QuestionsList
          items={items}
          handleRadioButtonChange={handleRadioButtonChange}
          blogId={blogId}
          controlSubBtn={controlSubBtn}
          markScript={markScript}
          selectValue={selectValue}
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
        />
      );
    } else {
      null;
    }
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

        {showQuestions && !isFetchingQuestions && controlReviewLink && (
          <Link href={linkPath}>
            <a>Review Result</a>
          </Link>
          // <button onClick={goToLinkHandler}>Review Result</button>
          // as="button"
        )}

        <select
          onChange={onselectChange}
          // value={selectValue}
          className={classes.selectEle}
          // size={4}
          defaultValue={selectValue}
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
      <Togglable buttonLabel="create question" ref={noteFormRef}>
        <p>Create Question</p>
        <NewQuestion
          onAddQuestion={addQuestionHandler}
          noteFormRef={noteFormRef}
        />
      </Togglable>
    </section>
  );
}

export default Questions;
