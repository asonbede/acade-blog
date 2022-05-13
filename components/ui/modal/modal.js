import classes from "./modal.module.css";
import Backdrop from "./backdrop";
function Modal(props) {
  function cancelHandler() {
    props.setshowDeleteModal(false);
  }

  function confirmHandler() {
    props.deletePostHandler();
  }

  return (
    <>
      <Backdrop onCancel={cancelHandler} />
      <div className={classes.modal}>
        <p>{props.text}</p>
        <button
          className={`${classes.btn} ${classes.btnAlt}`}
          onClick={cancelHandler}
        >
          Cancel
        </button>
        <button className={classes.btn} onClick={confirmHandler}>
          Confirm
        </button>
      </div>
    </>
  );
}

export default Modal;
