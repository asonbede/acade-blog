import Image from "next/image";

import classes from "./call-to-action.module.css";
import { useRouter } from "next/router";
function CallToAction(props) {
  return (
    <section className={`${classes["colored-section"]} ${classes.cta}`}>
      <div className={`${classes["container-fluid"]}`}>
        <h3 className={`${classes["big-heading"]}`}>
          Find the True Love of Your Dog's Life Today.
        </h3>
        <button
          className={`${classes["download-button"]} btn btn-lg btn-dark`}
          type="button"
        >
          <i className="fab fa-apple"></i> Download
        </button>
        <button
          className={`${classes["download-button"]} btn btn-lg btn-light`}
          type="button"
        >
          <i className="fab fa-google-play"></i> Download
        </button>
      </div>
    </section>
  );
}

export default CallToAction;
