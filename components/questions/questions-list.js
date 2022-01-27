import { useContext, useEffect, useState } from "react";
import classes from "./questions-list.module.css";
import DisplayEditorContent from "../rich-text-editor/display-editor-content";
import NotificationContext from "../../store/notification-context";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/client";
async function sendAuthDataModerate(authDetails, setFunc) {
  const response = await fetch("/api/moderating-post", {
    method: "POST",
    body: JSON.stringify(authDetails),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  console.log({ data }, "authDetails");
  if (!response.ok) {
    // throw new Error(data.message || "Something went wrong!");
    setFunc(false);
  } else {
    setFunc(data.message);
  }
}

async function sendAuthData(authDetails, setFunc) {
  //console.log({ authDetails });
  const response = await fetch("/api/restrict-route", {
    method: "POST",
    body: JSON.stringify(authDetails),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  console.log({ data }, "authDetails");
  console.log({ data }, "authDetails");
  if (!response.ok) {
    setFunc(false);
    //throw new Error(data.message || "Something went wrong!");
  } else {
    setFunc(data.message);
  }
}

function QuestionsList({
  items,
  handleRadioButtonChange,
  blogId,
  controlSubBtn,
  authorId,
  markScript,
  selectValue,
}) {
  const [showQuestionSupport, setshowQuestionSupport] = useState(false);
  const [fullLessQuestValue, setfullLessQuestValue] = useState(false);
  const [butQuesText, setbutQuesText] = useState("See Full Question ...");
  const [moderatedValue, setmoderatedValue] = useState();
  const [authValue, setauthValue] = useState();
  const [moderated, setmoderated] = useState();
  const notificationCtx = useContext(NotificationContext);
  const optionsList = ["A", "B", "C", "D", "E"];
  //const linkPathForUpdate = `/posts/updates/${post.id}`;
  const [session, loading] = useSession();
  const router = useRouter();

  function checkModerateValue(itemsArray) {
    if (itemsArray) {
      const result = itemsArray.some(
        (item) => item.moderated === false || item.moderated === undefined
      );
      if (result) {
        return false;
      } else {
        return true;
      }
    }
  }

  useEffect(() => {
    if (items) {
      setmoderated(checkModerateValue(items));
    }

    //console.log({ result }, "postContent");
    // return () => {
    //   cleanup
    // }
  }, [authorId, items]);

  useEffect(() => {
    const result = sendAuthDataModerate(
      { authorId, moderated },
      setmoderatedValue
    );

    //console.log({ result }, "postContent");
    // return () => {
    //   cleanup
    // }
  }, [authorId, moderated]);

  useEffect(() => {
    const result = sendAuthData({ authorId }, setauthValue);
    console.log({ result });
    //setauthValue(result.message);
    //console.log({ result }, "postContent");
    // return () => {
    //   cleanup
    // }
  }, [session, authorId]);
  const deleteQuestionHandler = async (questionId) => {
    notificationCtx.showNotification({
      title: "Deleting question...",
      message: "Your question is currently being deleted from the database.",
      status: "pending",
    });
    try {
      const response = await fetch(`/api/questions/${questionId}`, {
        method: "DELETE",
        body: JSON.stringify({ questionId }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      notificationCtx.showNotification({
        title: "Success!",
        message: "Your question was deleted!",
        status: "success",
      });
      // router.push(`/posts/questions/${blogId}`);
      router.reload(window.location.pathname);
    } catch (error) {
      //setRequestError(error.message);
      //setRequestStatus("error");
      notificationCtx.showNotification({
        title: "Error!",
        message: error.message || "Something went wrong!",
        status: "error",
      });
    }
  };

  const deleteConfirm = (id) => {
    const responseValue = confirm(
      "Are you really sure that you want to delete this question?"
    );
    if (responseValue) {
      deleteQuestionHandler(id);
    }
  };
  const handleQuestionUpdateData = (questionItem) => {
    console.log("from handle update");
    notificationCtx.questionUpdateHandler({
      questionItem,
      blogId,
      questionType: "multi-choice",
    });
    router.push(
      `/posts/questions/updates/${questionItem._id}?questionType=multi-choice`
    );
  };

  function questFullLessControlHandler() {
    setfullLessQuestValue(!fullLessQuestValue);
    // if (fullLessQuestValue ===false) {
    //   setbutQuesText("See Less Question ...");
    // } else {
    //   setbutQuesText("See Full Question ...");
    // }
    if (butQuesText === "See Full Question ...") {
      setbutQuesText("See Less Question ...");
    } else {
      setbutQuesText("See Full Question ...");
    }
  }
  return (
    <ul className={classes.form}>
      {/* <button onClick={checkScore}>check score: {score}</button> */}
      {/* <Link href={linkPath}>
        <a onClick={() => console.log("in link")}>Review Result</a>
      </Link> */}
      {selectValue === "mult-choice-all" ? (
        <button
          onClick={() => markScript(items)}
          disabled={controlSubBtn}
          title="You must answer at lest one question before this button will respond"
        >
          Submit For Marking
        </button>
      ) : null}

      {items.map((item, questionIndex) => (
        <li
          key={item._id}
          className={moderatedValue ? classes.showItem : classes.hideItem}
        >
          {!item.moderated && (
            <span style={{ color: "red" }}>
              {" "}
              Moderation in progressing, this may take a while, until this
              action is complete only you can see this post, newly created or
              updated post are examined by the admin before it is shown to the
              public.This message will be removed as soon as the process is
              complete. You may continue to work on your post while this process
              is on...
            </span>
          )}
          {item.questionIntroText && fullLessQuestValue && (
            <DisplayEditorContent
              contentFromServer={item.questionIntroText}
              toolbarPresent={false}
            />
          )}
          {item.questionIntroText && (
            <button onClick={questFullLessControlHandler}>{butQuesText}</button>
          )}
          <div style={{ display: "flex" }}>
            {/* &nbsp;&nbsp;{item.question} */}
            {selectValue === "mult-choice-one" ? null : (
              <span style={{ marginRight: "5px", marginTop: "14px" }}>
                {questionIndex + 1}
              </span>
            )}

            <DisplayEditorContent
              contentFromServer={item.question}
              toolbarPresent={false}
            />
          </div>
          <div>
            {item.options.map((optionItem, optionIndex) => (
              <div
                key={`${optionIndex}key`}
                style={{
                  display: "flex",
                }}
              >
                <input
                  type="radio"
                  name={questionIndex}
                  value={optionItem.option}
                  id={`${questionIndex}:${optionIndex}`}
                  onChange={handleRadioButtonChange}
                  style={{
                    marginTop: "16px",
                  }}
                />
                <label
                  htmlFor={`${questionIndex}:${optionIndex}`}
                  style={{
                    marginTop: "14px",
                  }}
                >
                  {optionsList[optionIndex]}.{" "}
                </label>
                <DisplayEditorContent
                  contentFromServer={optionItem.option}
                  toolbarPresent={false}
                />
              </div>
            ))}
          </div>

          {authValue && (
            <button onClick={() => handleQuestionUpdateData(item)}>
              Update
            </button>
          )}

          {authValue && (
            <button onClick={() => deleteConfirm(item._id.toString())}>
              Delete
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}

export default QuestionsList;
