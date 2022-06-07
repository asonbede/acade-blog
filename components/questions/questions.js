import { useContext, useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";

import NewQuestion from "./new-questions-form";
import classes from "./questions.module.css";
import NotificationContext from "../../store/notification-context";
import Link from "next/dist/client/link";
import Togglable from "../togglable/togglable";
import QuestionsListOne from "./question-list-one";
import MainQuestionList from "./question-main-list";
import EssayTypeQuestions from "./essay-type-questions";
import NewEssayQuestion from "./new-essay-question";
import { useSession, signOut } from "next-auth/client";
import QuestionSelect from "./question-select";
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
  const [isLoading, setisLoading] = useState(true);
  const [controlLiActive, setcontrolLiActive] = useState();

  const [session, loading] = useSession();
  const notificationCtx = useContext(NotificationContext);
  const { questions: items, blogId, questionType, subjects, quesForm } = props;
  //console.log({ items }, "fro,m questions");
  //console.log({ blogId }, "in questionsjs");
  const noteFormRef = useRef(null);

  //commendation message tittle
  function checkMessageTitle() {
    const performance = Math.round((score / currentArray.length) * 100);

    if (performance >= 80) {
      return "Exellent";
    } else if (performance < 80 && performance >= 60) {
      return "Good";
    } else if (performance < 60 && performance >= 50) {
      return "Average performance";
    } else {
      return "Poor performance";
    }
  }

  //determine what the commendation message is
  function showerPraises() {
    const performance = Math.round((score / currentArray.length) * 100);
    if (performance >= 80) {
      return `You scored ${score}/${currentArray.length} or ${performance}%. Great, keep it up.`;
    } else if (performance < 80 && performance >= 60) {
      return `You scored ${score}/${currentArray.length} or ${performance}%. Good, you can do better.`;
    } else if (performance < 60 && performance >= 50) {
      return `You scored ${score}/${currentArray.length} or ${performance}%. Not too bad. You need to work harder`;
    } else {
      return `You scored ${score}/${currentArray.length} or ${performance}%. You need to work very hard, consider reading the lesson again.`;
    }
  }

  //determine what the staus  of the commendation message is
  function determineStatus() {
    const performance = Math.round((score / currentArray.length) * 100);
    if (performance >= 50) {
      return `success`;
    } else {
      return `error`;
    }
  }

  //set  choice base on users previous choice, or set it to "mult-choice-all"
  //if no  previous choice exist
  useEffect(() => {
    if (typeof window !== "undefined") {
      const userChoiceFromLocStorage =
        window.localStorage.getItem("select-value");
      if (userChoiceFromLocStorage) {
        setselectValue(userChoiceFromLocStorage);
      } else {
        setselectValue("mult-choice-one");
      }
    }
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

  //notify the user when the assessment is complete
  useEffect(() => {
    if (score !== null) {
      notificationCtx.showNotification({
        title: `${checkMessageTitle()}!`,
        message: `Your answer script was successfully assessed! ${showerPraises()} To return to the question, click the back to question button.`,
        status: `${determineStatus()}`,
      });
    }
  }, [score]);

  //sort the questions according to the choice made by the user
  useEffect(() => {
    if (quesForm === "rev-ques") {
      if (selectValue === "essay-type") {
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
    } else {
      const multiAllChoiceResult = items.filter((item) =>
        subjects.includes(item.subject)
      );
      const result = allQuestIntroText(multiAllChoiceResult);
      setcurrentArray(result);

      setisLoading(false);
    }
  }, [changerValue, selectValue]);
  // -----------------------------------------------------------------

  function allQuestIntroText(randomArray) {
    const modifiedQuestions = randomArray.map((item) => {
      if (item.questionIntroText) {
        //get the number of questions that share this questionIntroText
        const linkedValue = item.linkedTo;
        const linkedQuestionArray = randomArray.filter(
          (item) => item.linkedTo === linkedValue
        );

        const attachStr =
          linkedQuestionArray.length === 1
            ? `Use the above information to answer question ${linkedValue}`
            : `Use the above information to answer questions ${linkedValue} to ${
                Number(linkedValue) + (linkedQuestionArray.length - 1)
              }`;
        return { ...item, questionIntroAtach: attachStr };
      } else {
        return item;
      }
    });

    return modifiedQuestions;
  }
  // -----------------------------------------------------------------

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

  //find the correct object value
  function checkOptions(letter, optionArray) {
    console.log({ letter });
    const translateOptionsResult = translateOptions(optionArray);
    const correctValueObj = translateOptionsResult.find(
      (item) => Object.keys(item)[0] === letter.trim()
    );
    const correctValue = correctValueObj[letter];
    return correctValue;
  }

  //called on each click of the radio button in the QuestionList components
  //gathers the choice made by the student and the correct choice into an
  //object
  const handleRadioButtonChange = (event, activeLiClass) => {
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
    setcontrolLiActive(activeLiClass);
    if (controlSubBtn) {
      setcontrolSubBtn(false);
    }
    console.log({ selectedValuesOfRadioButton });
  };

  //mark the script
  //itetrate through the question array and the data collected
  //by the  selectedValuesOfRadioButton
  function markScript(itemsValue) {
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
      //pick a quuestion and identify the correct answer and the
      //student choice for it
      const studentsChoice =
        selectedValuesOfRadioButton[`studentChoiceForQuestion${index + 1}`];

      const correctOptionLetter =
        selectedValuesOfRadioButton[`correctOptionForQuestion${index + 1}`];

      let questionObj = currentArray[index];

      allQuestions.push(questionObj);

      const optionsArray = questionObj.options;

      //if the question was skipped by the student don't score it
      //just collect data about it
      if (!studentsChoice) {
        unanweredQuestionsList.push(index + 1);
        skippedQuestionsList.push({ ...questionObj, originalIndex: index });

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
      //transform correct option letter into real value
      correctOptionValue = checkOptions(correctOptionLetter, optionsArray);

      //if the student's choice and correct option matches upscore
      //else leave the score as it is
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

    //notify the student about any skipped question and abort the
    //the assessment process if the student wants to return to the
    //skipped question
    if (skippedQuestionsList.length) {
      const confirmAns =
        confirm(`You have skipped questions ${unanweredQuestionsList.join(",")} 
    if you click ok your script will be assessed without the skipped questions`);
      if (confirmAns) {
        console.log({ selectedValuesOfRadioButton }, "inConfirm");

        setcontrolReviewLink(true);
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
      setcontrolReviewLink(true);
      console.log({ inCorrectQuestionsList }, "in mmmkllloo");
      setskippedQuestions(skippedQuestionsList);
      setcorrectQuestions(correctQuestionsList);
      setinCorrectQuestions(inCorrectQuestionsList);
      setallQuestions(allQuestionsList);
      setscore(scoreValue);
    }
  }

  // Called when the user makes a selection on the select element.
  //set the value of the selection to state and to the local storage.
  const onselectChange = (e) => {
    setisLoading(true);
    const optionValue = e.target.value;
    setselectValue(optionValue);
    setChangerValue(!changerValue);
    console.log({ optionValue });
    if (typeof window !== "undefined") {
      window.localStorage.setItem("select-value", optionValue);
    }
  };

  function toggleQuestionsHandler() {
    setShowQuestions((prevStatus) => !prevStatus);
  }

  //Passed as props to the components that creates question(Newquestion
  //and NewEassyquestions).
  //accepts the question data and blog id as imput and sends it to the database for storage
  /* questionData looks like this for multiple choice questions
 {
        question: enteredQuestion,
        options: filteredOptions,
       explanation: enteredExplanation,
        correctOption: enteredCorrectOption,
        linkedTo: linkedValue,
        authorId: session.user.email,
        questionType: "multi-choice",
        moderated: false,
        subject: enteredSubject,
        examType: enteredExamType,
        questionIntroText: checkEditorText(quesIntroEdiState)
          ? enteredQuestionIntroText.trim()
          : null,
      }

      OR
      {
        question: enteredQuestion,

        explanation: enteredExplanation,
        questionType: "essay-type",
        authorId: session.user.email,
        subject: enteredSubject,
        moderated: false,
      },
For easy type questions
 */
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

        router.reload(window.location.pathname);
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

  //redenders a component depending on the users choice,
  //that is how the user wants to access the questions
  //the user may want to access easy questions or multi-choice question
  // he may want to access the questions all at onece or one at a time
  function displayExamQues() {
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
        isLoading={isLoading}
        variablesForReseting={{
          setskippedQuestions,
          setcorrectQuestions,
          setinCorrectQuestions,
          setallQuestions,
          setselectedValuesOfRadioButton,
          setscore,
        }}
        subjects={subjects}
        quesForm={quesForm}
      />
    );
  }

  function displayQuestions() {
    console.log({ selectValue }, "all choice");
    if (selectValue === "mult-choice-one") {
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
          controlLiActive={controlLiActive}
          setcontrolLiActive={setcontrolLiActive}
          isLoading={isLoading}
          subjects={subjects}
          quesForm={quesForm}
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

  //isLoading is set to true when a selections is made to enable waiting
  //while component renders
  if (isLoading) {
    return (
      <div style={{ fontSize: "30px", textAlign: "center", marginTop: "20%" }}>
        Loading.....
      </div>
    );
  }

  return (
    <>
      {/* <section className={classes.questions} class="p-5 bg-primary">
      <div className={classes.control}>
        <button onClick={toggleQuestionsHandler}>
          {showQuestions ? "Hide" : "Show"} Questions
        </button>

      
        <QuestionSelect
          handleSelectChange={onselectChange}
          selectValue={selectValue}
        />
      </div>

      
      {items.length !== 0 && showQuestions && displayQuestions()}

     

      {session && selectValue === "essay-type" ? (
        <Togglable buttonLabel="create essay question" ref={noteFormRef}>
          <p>Create Essay-Type Questions</p>
          <NewEssayQuestion
            onAddQuestion={addQuestionHandler}
            noteFormRef={noteFormRef}
          />
        </Togglable>
      ) : session &&
        (selectValue === "mult-choice-all" ||
          selectValue === "mult-choice-one") ? (
        <Togglable buttonLabel="create multi-choice question" ref={noteFormRef}>
          <p>Create Multi-Choice Questions</p>
          <NewQuestion
            onAddQuestion={addQuestionHandler}
            noteFormRef={noteFormRef}
          />
        </Togglable>
      ) : null}
    </section> */}
      <section id="questions" class="p-1 bg-primary">
        <div class="container-fluid">
          <h2 class="text-center text-white">Revision Questions</h2>
          <p class="lead text-center text-white mb-1">
            We recommend that you read the topic before answering the questions.
            {/* The questions are intended to consolidate your understanding of the
            topic. */}
          </p>
          {/* <div class="row justify-content-center">
            <div class="col-10"> */}
          <div class="d-flex justify-content-end">
            <button
              onClick={toggleQuestionsHandler}
              class="btn  btn-outline-light btn-sm m-2"
            >
              {showQuestions ? "Hide" : "Show"} Questions
            </button>

            {/* The select elemment that enables the user specify how they want
            want to access the questions: all at once, one by one or eas type
        */}
            <QuestionSelect
              handleSelectChange={onselectChange}
              selectValue={selectValue}
            />
          </div>
          <div>
            {/* Displays the user selected component */}
            {items.length !== 0 &&
              quesForm === "rev-ques" &&
              showQuestions &&
              displayQuestions()}
            {items.length !== 0 &&
              !quesForm === "rev-ques" &&
              showQuestions &&
              displayExamQues()}
          </div>
          <div>
            {session && selectValue === "essay-type" ? (
              <Togglable buttonLabel="create essay question" ref={noteFormRef}>
                <p>Create Essay-Type Questions</p>
                <NewEssayQuestion
                  onAddQuestion={addQuestionHandler}
                  noteFormRef={noteFormRef}
                />
              </Togglable>
            ) : session &&
              (selectValue === "mult-choice-all" ||
                selectValue === "mult-choice-one") ? (
              <Togglable
                buttonLabel="create multi-choice question"
                ref={noteFormRef}
              >
                <p>Create Multi-Choice Questions</p>
                <NewQuestion
                  onAddQuestion={addQuestionHandler}
                  noteFormRef={noteFormRef}
                />
              </Togglable>
            ) : null}
          </div>
          {/* </div>
          </div> */}
        </div>
      </section>
    </>
  );
}

export default Questions;

/* 
Questions.js
How this component is loaded and what it does.
The component is loaded when the user clicks question review link `/posts/questions/${post.id}`
on the post content page.

 On `pages/posts/questions/${post.id}` page, the blog's id is accessed from the 
 url parameter and all the questions related to the blog is loaded from the database 
and transfered to this component via props. This done at build time and hence
questions are pre-rendered since getStaticProps and getServerSidePrrops 
are involved.



*/
