import { useContext } from "react";

import classes from "./notification.module.css";
import NotificationContext from "../../store/notification-context";

function Notification(props) {
  const notificationCtx = useContext(NotificationContext);

  const { title, message, status } = props;

  let statusClasses = "";

  if (status === "success") {
    statusClasses = classes.success;
  }

  if (status === "error") {
    statusClasses = classes.error;
  }

  if (status === "pending") {
    statusClasses = classes.pending;
  }

  const activeClasses = `${classes.notification} ${statusClasses}`;

  return (
    <div className={activeClasses} onClick={notificationCtx.hideNotification}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}

export default Notification;

// import ReactDOM from 'react-dom';

// import classes from './notification.module.css';

// function Notification(props) {
//   const { title, message, status } = props;

//   let statusClasses = '';

//   if (status === 'success') {
//     statusClasses = classes.success;
//   }

//   if (status === 'error') {
//     statusClasses = classes.error;
//   }

//   const cssClasses = `${classes.notification} ${statusClasses}`;

//   return ReactDOM.createPortal(
//     <div className={cssClasses}>
//       <h2>{title}</h2>
//       <p>{message}</p>
//     </div>,
//     document.getElementById('notifications')
//   );
// }

// export default Notification;
