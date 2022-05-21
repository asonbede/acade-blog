import Image from "next/image";

import classes from "./title.module.css";
import { useRouter } from "next/router";
function Title(props) {
  return (
    <section className={`${classes["colored-section"]} ${classes.title}`}>
      <div className={`${classes["container-fluid"]}`}>
        <div className="row">
          {/* <div className="col-lg-6">
            <h1 className={`${classes["big-heading"]}`}>
              Meet new and interesting dogs nearby.
            </h1>
            <button
              type="button"
              className="btn btn-dark btn-lg download-button"
            >
              <i className="fab fa-apple"></i> Download
            </button>
            <button
              type="button"
              className="btn btn-outline-light btn-lg download-button"
            >
              <i className="fab fa-google-play"></i> Download
            </button>
          </div> */}
          <div className="col-lg-6">
            <h3>
              Become a{" "}
              <span class="text-light fw-bolder"> Writer and a Reader </span>
            </h3>
            <p class="lead my-4 text-light">
              We make it easy for our users to write What they know and read
              what they like reading.
            </p>
            <button
              class="btn btn-primary btn-lg mb-2"
              data-bs-toggle="modal"
              data-bs-target="#enroll"
            >
              Start The Enrollment
            </button>
          </div>

          <div className="col-lg-6">
            <img
              // className={`${classes["title-image"]}`}
              class="mb-3 img-fluid d-block mx-auto  rounded"
              src="/images/site/home-page/blog-title2.jpg"
              alt="class-room"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Title;
//C:\Users\DEL\Desktop\web-development\acade-blog\public\images\site\home-page
