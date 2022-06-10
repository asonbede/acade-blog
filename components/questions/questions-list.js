import { useContext, useEffect, useState } from "react";
import classes from "./questions-list.module.css";
import DisplayEditorContent from "../rich-text-editor/display-editor-content";
import NotificationContext from "../../store/notification-context";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/client";
import Modal from "../ui/modal/modal";
import Button from "../ui/button";

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
    setFunc(false);
  } else {
    setFunc(data.message);
  }
}

async function sendAuthData(authDetails, setFunc) {
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
  isLoading,
  controlLiActive,
  subjects,
  quesForm,
}) {
  const [showQuestionSupport, setshowQuestionSupport] = useState(false);
  const [fullLessQuestValue, setfullLessQuestValue] = useState(false);
  const [butQuesText, setbutQuesText] = useState("See Full Question ...");
  const [moderatedValue, setmoderatedValue] = useState();
  const [authValue, setauthValue] = useState();
  const [moderated, setmoderated] = useState();
  const [controlLoadMoreVar, setcontrolLoadMoreVar] = useState(false);
  const [showDeleteQuestModal, setshowDeleteQuestModal] = useState(false);
  //const [isShow, setisShow] = useState(true);

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
      setcontrolLoadMoreVar(false);
    }
  }, [authorId, items]);

  useEffect(() => {
    const result = sendAuthDataModerate(
      { authorId, moderated },
      setmoderatedValue
    );
  }, [authorId, moderated]);

  useEffect(() => {
    const result = sendAuthData({ authorId }, setauthValue);
    console.log({ result });
  }, [session, authorId]);

  useEffect(() => {
    setshowDeleteQuestModal(false);
    // setisShow(true);
  }, []);

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

      router.reload(window.location.pathname);
    } catch (error) {
      notificationCtx.showNotification({
        title: "Error!",
        message: error.message || "Something went wrong!",
        status: "error",
      });
    }
    setshowDeleteQuestModal(false);
  };

  const deleteConfirm = (id) => {
    // const responseValue = confirm(
    //   "Are you really sure that you want to delete this question?"
    // );
    setshowDeleteQuestModal(true);
    // if (responseValue) {
    //   deleteQuestionHandler(id);
    // }
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

  function questFullLessControlHandler(id) {
    if (fullLessQuestValue) {
      setfullLessQuestValue(false);
    } else {
      setfullLessQuestValue(id);
    }
  }
  const formattedDatePublished = new Date().toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  function displayListItem(item, questionIndex) {
    return (
      <div
        key={item._id}
        className={`${moderatedValue ? classes.showItem : classes.hideItem} `}
      >
        {/* {!item.moderated && (
          <span style={{ color: "red" }}>
            {" "}
            Moderation in progressing, this may take a while, until this action
            is complete only you can see this post, newly created or updated
            post are examined by the admin before it is shown to the public.This
            message will be removed as soon as the process is complete. You may
            continue to work on your post while this process is on...
          </span>
        )} */}

        {item.questionIntroText && fullLessQuestValue === item._id && (
          <div class="d-flex flex-column fw-bolder border mt-5 p-3 shadow-lg">
            <DisplayEditorContent
              contentFromServer={item.questionIntroText}
              toolbarPresent={false}
            />

            <span style={{ color: "blue", fontStyle: "italic" }}>
              {item.questionIntroAtach}
            </span>
            {/* <br /> */}
          </div>
        )}

        <div class="d-flex flex-column fw-bolder border mt-5 p-3 shadow">
          {item.questionIntroText && (
            <a
              onClick={() => questFullLessControlHandler(item._id)}
              class="btn  btn-outline-dark  border-light"
            >
              {fullLessQuestValue === item._id
                ? "See Less Question ..."
                : "See Full Question ..."}
            </a>
          )}
          <div class="d-flex align-items-center fw-bolder">
            {/* <div class="mt-4 p-5 bg-primary text-white rounded">
            <h1>Jumbotron Example</h1>
            <p>Lorem ipsum...</p>
          </div> */}
            <span>
              {" "}
              {quesForm === "rev-ques" ? questionIndex + 1 : item.numIndex}.
            </span>
            {/* {(watch = watch + 1)} */}

            <DisplayEditorContent
              contentFromServer={item.question}
              toolbarPresent={false}
            />
          </div>
          {item.examType === "none" ||
          item.examType === "main-exam" ||
          item.examType === undefined ? null : (
            <span>{item.examType}</span>
          )}
        </div>

        <div class="list-group">
          {item.options.map((optionItem, optionIndex) => (
            <>
              <label
                class={`d-flex align-items-center list-group-item ms-3 shadow
                 ${
                   controlLiActive === `${questionIndex}:${optionIndex}`
                     ? classes.activeLi
                     : ""
                 }
                
                `}
              >
                <div
                  key={`${questionIndex}-${optionIndex}key`}
                  class="form-check"
                >
                  <input
                    type="radio"
                    class="form-check-input"
                    name={questionIndex}
                    value={optionItem.option}
                    id={`${questionIndex}:${optionIndex}`}
                    onChange={() =>
                      handleRadioButtonChange(
                        event,
                        `${questionIndex}:${optionIndex}`
                      )
                    }
                  />
                  {optionsList[optionIndex]}. {/* </label> */}
                </div>

                <DisplayEditorContent
                  contentFromServer={optionItem.option}
                  toolbarPresent={false}
                />
              </label>
            </>
          ))}
        </div>
        <div class="d-flex justify-content-around flex-column flex-md-row mb-3">
          {authValue && (
            <button
              onClick={() => handleQuestionUpdateData(item)}
              // style={{ marginLeft: "10px", display: "inline-block" }}
              class="btn btn-primary mb-2"
            >
              Update
            </button>
          )}

          {authValue && (
            <button
              onClick={() => deleteConfirm(item._id.toString())}
              class="btn btn-primary mb-2"
            >
              Delete
            </button>
          )}
          <span
            style={{
              backgroundColor: "#03be9f",
              borderRadius: "4px",
              color: "white",
            }}
            class="mt-2 mb-2"
          >
            Published:{"  "}
            {item.publishedDate ? item.publishedDate : formattedDatePublished}
          </span>
          <span
            style={{
              backgroundColor: "#03be9f",
              borderRadius: "4px",
              color: "white",
            }}
            class="mt-2 mb-2"
          >
            Updated:{" "}
            {item.updatedDate ? item.updatedDate : formattedDatePublished}
          </span>
        </div>
      </div>
    );
  }

  function questionListHandlerFunc(subject = items[0].subject) {
    //let firstBatch;
    // let secondBatch;
    let multiplesOfTenArray = [];
    let nonMultiplesOfTenArray = [];
    let lastItemArray = [];
    //let allListArray = [];
    let isShow = true;
    //const arr = [1, 2, 1];
    //const set = new Set(arr);
    const subjectLen = items.filter((item) => item.subject === subject).length;
    //const subjectsArray = items.map((item) => item.subject);
    // const setNum = new Set(subjectsArray);
    // console.log({ setNum }, "YUUO");

    const mapResult = items.map((item, questionIndex) =>
      displayListItem(item, questionIndex)
    );
    for (let index = 0; index < mapResult.length; index++) {
      //const element = mapResult[index];
      if (items[index].subject !== subject) {
        // console.log(items[index].subject, "work-plEASW");
        continue;
      }
      // console.log(items[index].subject, "work-plEASW22");
      if ((index + 1) % 10 === 0) {
        multiplesOfTenArray.push(
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#fk${index + 1 - 9}to${index + 1}`}
              >
                Question(s) {index + 1 - 9} to {index + 1}
              </button>
            </h2>
            <div
              id={`fk${index + 1 - 9}to${index + 1}`}
              class={`accordion-collapse collapse ${isShow ? "show" : ""}`}
              data-bs-parent="#questions"
            >
              <div class="accordion-body">
                {mapResult.slice(index - 9, index + 1)}
              </div>
            </div>
          </div>
        );

        // setisShow(false);
        isShow = false;
        nonMultiplesOfTenArray = [];
      } else {
        nonMultiplesOfTenArray.push(mapResult[index]);
      }
    }

    lastItemArray.push(
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#tothe${mapResult.length}${subject}`}
          >
            Question(s){" "}
            {multiplesOfTenArray.length === 0
              ? multiplesOfTenArray.length + 1
              : multiplesOfTenArray.length * 10 + 1}{" "}
            to {subjectLen}
          </button>
        </h2>
        <div
          id={`tothe${mapResult.length}${subject}`}
          class={`accordion-collapse collapse ${isShow ? "show" : ""}`}
          data-bs-parent="#questions"
        >
          <div class="accordion-body">{nonMultiplesOfTenArray}</div>
        </div>
      </div>
    );
    // setisShow(false);
    isShow = false;
    // if (mapResult.length > 10) {
    //   firstBatch = mapResult.slice(0, 10);
    //   secondBatch = mapResult.slice(10);
    //   return (
    //     <>
    //       {firstBatch}
    //       {controlLoadMoreVar && <> {secondBatch} </>}
    //       {!isLoading && (
    //         <Button onClick={() => setcontrolLoadMoreVar(!controlLoadMoreVar)}>
    //           {controlLoadMoreVar
    //             ? "...Show less questions"
    //             : "Show more questions..."}
    //         </Button>
    //       )}
    //     </>
    //   );
    // }
    return (
      <>
        <div class="accordion accordion-flush" id="questions">
          {[...multiplesOfTenArray, ...lastItemArray]}
        </div>
      </>
    );
  }

  function ExamQuestionListHandlerFunc() {
    // let multiplesOfTenArray = [];
    // let nonMultiplesOfTenArray = [];
    //let lastItemArray = [];
    //let allListArray = [];
    // let isShow = true;

    // const subjectLen = items.filter((item) => item.subject === subject).length;

    const mapResult = items.map((item, questionIndex) =>
      displayListItem(item, questionIndex)
    );
    const examList = [];
    for (let index = 0; index < subjects.length; index++) {
      const element = subjects[index];
      const subjList = [];
      for (let indexSub = 0; indexSub < mapResult.length; indexSub++) {
        const elementListItem = mapResult[indexSub];
        if (items[indexSub].subject === element) {
          subjList.push(elementListItem);
        }
      }

      examList.push(
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#${element}`}
            >
              {element}
            </button>
          </h2>
          <div
            id={`${element}`}
            class={`accordion-collapse collapse`}
            data-bs-parent="#allexam"
          >
            <div class="accordion-body">{subjList}</div>
          </div>
        </div>
      );
    }

    return (
      <>
        <div class="accordion accordion-flush" id="allexam">
          {examList}
        </div>
      </>
    );
  }

  return (
    <>
      {showDeleteQuestModal && (
        <Modal
          deletePostHandler={() => deleteQuestionHandler(id)}
          text="Do you really want to delete this question?"
          setshowDeleteModal={setshowDeleteQuestModal}
          showDeleteModal={showDeleteQuestModal}
        />
      )}

      {quesForm === "rev-ques"
        ? questionListHandlerFunc()
        : ExamQuestionListHandlerFunc()}
    </>
  );
}

{
  /* <ul class="list-group list-group-flush">
  <li class="list-group-item">An item</li>
  <li class="list-group-item">A second item</li>
  <li class="list-group-item">A third item</li>
</ul>; */
}

export default QuestionsList;
