import { useContext, useEffect, useState } from "react";

import QuestionsList from "./questions-list";
import NewQuestion from "./new-questions-form";
import classes from "./questions.module.css";
import NotificationContext from "../../store/notification-context";

function Questions(props) {
  const { questions, blogId } = props;

  const notificationCtx = useContext(NotificationContext);

  const [showQuestions, setShowQuestions] = useState(false);
  //const [questions, setQuestions] = useState([]);
  const [isFetchingQuestions, setIsFetchingQuestions] = useState(false);

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
      })
      .catch((error) => {
        notificationCtx.showNotification({
          title: "Error!",
          message: error.message || "Something went wrong!",
          status: "error",
        });
      });
  }

  return (
    <section className={classes.questions}>
      <button onClick={toggleQuestionsHandler}>
        {showQuestions ? "Hide" : "Show"} Questions
      </button>

      {showQuestions && !isFetchingQuestions && (
        <QuestionsList items={questions} />
      )}
      {showQuestions && isFetchingQuestions && <p>Loading questions...</p>}
      <NewQuestion onAddQuestion={addQuestionHandler} />
    </section>
  );
}

export default Questions;
