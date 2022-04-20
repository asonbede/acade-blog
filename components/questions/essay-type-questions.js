import { useContext, useEffect, useState } from "react";
import classes from "./questions-list.module.css";
import DisplayEditorContent from "../rich-text-editor/display-editor-content";
import NotificationContext from "../../store/notification-context";
import { useRouter } from "next/router";
import NewEssayQuestion from "./new-essay-question";
import { useSession, signOut } from "next-auth/client";
//import Togglable from "../togglable/togglable";
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
function EssayTypeQuestions({ items, blogId, selectValue }) {
  let authorId;
  console.log({ items, blogId, selectValue, authorId });

  const notificationCtx = useContext(NotificationContext);
  //const noteFormRef = useRef(null);
  const [moderatedValue, setmoderatedValue] = useState();
  const [authValue, setauthValue] = useState();
  const [moderated, setmoderated] = useState();

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
      authorId = items.length !== 0 ? items[0].authorId : null;
      setmoderated(checkModerateValue(items));
    }
    return () => {
      setmoderated(null);
    };
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

    return () => {
      setmoderatedValue(null);
    };
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
    return () => {
      setauthValue(null);
    };
  }, [session, authorId]);

  const deleteQuestionHandler = async (questionId) => {
    notificationCtx.showNotification({
      title: "Deletind question...",
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
      questionType: "essay-type",
    });
    router.push(
      `/posts/questions/updates/${questionItem._id}?questionType=essay-type`
    );
  };
  return (
    <ul className={classes.form}>
      {items.map((item, questionIndex) => (
        <li
          key={item._id}
          className={moderatedValue ? classes.showItem : classes.hideItem}
        >
          {!moderated && (
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
          <div style={{ display: "flex" }}>
            {/* &nbsp;&nbsp;{item.question} */}
            {selectValue === "mult-choice-one" ||
            selectValue === "mult-choice-all" ? null : (
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
            <DisplayEditorContent
              contentFromServer={item.explanation}
              toolbarPresent={false}
            />
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
      {/* <Togglable buttonLabel="create essay question" ref={noteFormRef}>
        <p>Create Essay-Type Questions</p>
        <NewEssayQuestion
          onAddQuestion={addQuestionHandler}
          noteFormRef={noteFormRef}
          addQuestionHandler={addQuestionHandler}
        />
      </Togglable> */}
    </ul>
  );
}

export default EssayTypeQuestions;
