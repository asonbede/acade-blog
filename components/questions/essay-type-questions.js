import { useContext } from "react";
import classes from "./questions-list.module.css";
import DisplayEditorContent from "../rich-text-editor/display-editor-content";
import NotificationContext from "../../store/notification-context";
import { useRouter } from "next/router";
function EssayTypeQuestions({
  items,

  blogId,

  selectValue,
}) {
  const notificationCtx = useContext(NotificationContext);

  const router = useRouter();
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
      router.push(`/posts/questions/${blogId}?questionType=essay-type`);
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
        <li key={item._id}>
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
            <DisplayEditorContent
              contentFromServer={item.explanation}
              toolbarPresent={false}
            />
          </div>
          <button onClick={() => handleQuestionUpdateData(item)}>Update</button>{" "}
          <button onClick={() => deleteConfirm(item._id.toString())}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

export default EssayTypeQuestions;
