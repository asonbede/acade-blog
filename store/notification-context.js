import { createContext, useState, useEffect } from "react";

const NotificationContext = createContext({
  notification: null, // { title, message, status }
  showNotification: function (notificationData) {},
  hideNotification: function () {},
  reviewQuestion: {},
  reviewQuestionsHandler: function (reviewQuestionsData) {},
});

export function NotificationContextProvider(props) {
  const [activeNotification, setActiveNotification] = useState();
  const [reviewQuestionsObj, setreviewQuestionsObj] = useState({});

  useEffect(() => {
    if (
      activeNotification &&
      (activeNotification.status === "success" ||
        activeNotification.status === "error")
    ) {
      const timer = setTimeout(() => {
        setActiveNotification(null);
      }, 3000);

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

  const context = {
    reviewQuestion: reviewQuestionsObj,
    notification: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
    reviewQuestionsHandler: reviewQuestionsHandler,
  };

  return (
    <NotificationContext.Provider value={context}>
      {props.children}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;
