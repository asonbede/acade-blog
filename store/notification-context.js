import { createContext, useState, useEffect } from "react";

const NotificationContext = createContext({
  notification: null, // { title, message, status }
  showNotification: function (notificationData) {},
  hideNotification: function () {},
  reviewQuestion: {},
  reviewQuestionsHandler: function (reviewQuestionsData) { },
  blogUpdateHandler:function (updateBlogData) { },
});

export function NotificationContextProvider(props) {
  const [activeNotification, setActiveNotification] = useState();
  const [reviewQuestionsObj, setreviewQuestionsObj] = useState({});
 const [blogUpdateObj, setblogUpdateObj] = useState({})
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
     setblogUpdateObj(blogUpdateData)
   }

  const context = {
    reviewQuestion: reviewQuestionsObj,
    notification: activeNotification,
    blogUpdate:blogUpdateObj,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
    reviewQuestionsHandler: reviewQuestionsHandler,
    blogUpdateHandler:blogUpdateHandler
  };

  return (
    <NotificationContext.Provider value={context}>
      {props.children}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;
