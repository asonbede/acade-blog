import classes from "./questions-list.module.css";
import { useState, useEffect, useContext } from "react";
import NotificationContext from "../../store/notification-context";
import Link from "next/dist/client/link";
function QuestionsList(props) {
  const [selectedValuesOfRadioButton, setselectedValuesOfRadioButton] =
    useState([]);
  const [score, setscore] = useState(0);
  const [correctQuestions, setcorrectQuestions] = useState([]);
  const [inCorrectQuestions, setinCorrectQuestions] = useState([]);
  const [skippedQuestions, setskippedQuestions] = useState([]);
  const [allQuestions, setallQuestions] = useState([]);
  const notificationCtx = useContext(NotificationContext);
  useEffect(() => {
    console.log({ inCorrectQuestions }, "inUseffect");
    notificationCtx.reviewQuestionsHandler({
      selectedValuesOfRadioButton,
      items,
      correctQuestions,
      inCorrectQuestions,
      skippedQuestions,
      allQuestions,
      score,
    });
  }, [selectedValuesOfRadioButton, score, inCorrectQuestions]);

  const { items } = props;
  const optionsList = ["A", "B", "C", "D", "E"];

  const linkPath = `/posts/questions/question-review`;
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

    //get the student's choice and the correct option when radio button is selected
    setselectedValuesOfRadioButton({
      ...selectedValuesOfRadioButton,
      [`studentChoiceForQuestion${Number(name) + 1}`]: value,
      [`correctOptionForQuestion${Number(name) + 1}`]:
        items[name].correctOption,
    });
  };
  console.log(selectedValuesOfRadioButton, "in-list");
  //const reviewQuestionObj = notificationCtx.reviewQuestion;
  //console.log({ reviewQuestionObj });
  // notificationCtx.reviewQuestionsHandler({
  //   selectedValuesOfRadioButton,
  //   items,
  //   correctQuestions,
  //   inCorrectQuestions,
  //   skippedQuestions,
  //   allQuestions,
  // });
  // notificationCtx.reviewQuestionsHandler({
  //   ...reviewQuestionObj,
  //   selectedValuesOfRadioButton,
  // });
  //notificationCtx.reviewQuestionsHandler
  // mark the script
  function markScript(params) {
    console.log("clickedMarkscript");
    const unanweredQuestionsList = [];
    const skippedQuestionsList = [];
    const correctQuestionsList = [];
    const inCorrectQuestionsList = [];
    const allQuestionsList = [];
    let correctOptionValue;
    let scoreValue = 0;
    for (let index = 0; index < items.length; index++) {
      const studentsChoice =
        selectedValuesOfRadioButton[`studentChoiceForQuestion${index + 1}`];
      const correctOptionLetter =
        selectedValuesOfRadioButton[`correctOptionForQuestion${index + 1}`];
      let questionObj = items[index];
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
        setskippedQuestions(skippedQuestionsList);
        setcorrectQuestions(correctQuestionsList);
        setinCorrectQuestions(inCorrectQuestionsList);
        setallQuestions(allQuestionsList);
        setscore(scoreValue);
        return;
      } else {
        return;
      }
    } else {
      // notificationCtx.reviewQuestionsHandler({
      //   selectedValuesOfRadioButton,
      //   items,
      //   correctQuestions,
      //   inCorrectQuestions,
      //   skippedQuestions,
      //   allQuestions,
      // });
      console.log({ inCorrectQuestionsList }, "in mmmkllloo");
      setskippedQuestions(skippedQuestionsList);
      setcorrectQuestions(correctQuestionsList);
      setinCorrectQuestions(inCorrectQuestionsList);
      setallQuestions(allQuestionsList);
      setscore(scoreValue);
    }
  }
  //console.log("score: ", markScript());
  function checkScore(params) {
    notificationCtx.reviewQuestionsHandler({
      selectedValuesOfRadioButton,
      items,
      correctQuestions,
      inCorrectQuestions,
      skippedQuestions,
      allQuestions,
    });
  }
  return (
    <ul className={classes.questions}>
      <button onClick={markScript}>submit script: {score} </button>
      {/* <button onClick={checkScore}>check score: {score}</button> */}
      <Link href={linkPath}>
        <a onClick={() => console.log("in link")}>Review Result</a>
      </Link>
      {items.map((item, questionIndex) => (
        <li key={item._id}>
          <p>
            <span>{questionIndex + 1}</span> &nbsp;&nbsp;{item.question}
          </p>
          <div>
            {item.options.map((optionItem, optionIndex) => (
              <>
                <div>
                  <input
                    type="radio"
                    name={questionIndex}
                    value={optionItem.option}
                    id={`${questionIndex}:${optionIndex}`}
                    onChange={handleRadioButtonChange}
                  />
                  <label htmlFor={`${questionIndex}:${optionIndex}`}>
                    {optionsList[optionIndex]}.&nbsp;&nbsp;
                    {optionItem.option}
                  </label>
                </div>
              </>
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default QuestionsList;
