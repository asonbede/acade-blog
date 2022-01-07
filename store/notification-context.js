import { createContext, useState, useEffect } from "react";

const NotificationContext = createContext({
  notification: null, // { title, message, status }
  showNotification: function (notificationData) {},
  hideNotification: function () {},
  reviewQuestion: {},
  reviewQuestionsHandler: function (reviewQuestionsData) {},
  blogUpdateHandler: function (updateBlogData) {},
  questionUpdateHandler: function (UpdateQuestionDatas) {},
  profileDataHandler: function (profileData) {},
  userUpIdHandler: function (userId) {},
});

export function NotificationContextProvider(props) {
  const [activeNotification, setActiveNotification] = useState();
  const [reviewQuestionsObj, setreviewQuestionsObj] = useState({});
  const [blogUpdateObj, setblogUpdateObj] = useState({});
  const [questionUpdateObj, setquestionUpdateObj] = useState({});
  const [profileDataObj, setprofileDataObj] = useState({});
  const [userDataObj, setuserData] = useState({});
  useEffect(() => {
    if (
      activeNotification &&
      (activeNotification.status === "success" ||
        activeNotification.status === "error")
    ) {
      const timer = setTimeout(() => {
        setActiveNotification(null);
      }, 12000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [activeNotification]);

  function showNotificationHandler(notificationData) {
    setActiveNotification(notificationData);
  }
  function reviewQuestionsHandler(reviewQuestionsData) {
    setreviewQuestionsObj(reviewQuestionsData);
  }

  function hideNotificationHandler() {
    setActiveNotification(null);
  }
  function blogUpdateHandler(blogUpdateData) {
    setblogUpdateObj(blogUpdateData);
  }

  function questionUpdateHandler(questionUpdateData) {
    setquestionUpdateObj(questionUpdateData);
  }
  function profileDataHandler(profileData) {
    setprofileDataObj(profileData);
  }

  function userUpIdHandler(userData) {
    setuserData(userData);
  }

  const context = {
    reviewQuestion: reviewQuestionsObj,
    notification: activeNotification,
    blogUpdate: blogUpdateObj,
    questionUpdate: questionUpdateObj,
    profileData: profileDataObj,
    userData: userDataObj,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
    reviewQuestionsHandler: reviewQuestionsHandler,
    blogUpdateHandler: blogUpdateHandler,
    questionUpdateHandler: questionUpdateHandler,
    profileDataHandler: profileDataHandler,
    userUpIdHandler: userUpIdHandler,
  };

  return (
    <NotificationContext.Provider value={context}>
      {props.children}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;
