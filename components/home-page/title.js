import Image from "next/image";

import classes from "./hero.module.css";
import { useRouter } from "next/router";
function Title(props) {
  return (
    <section className="colored-section" id="title">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-6">
            <h1 className="big-heading">
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
          </div>

          <div className="col-lg-6">
            <img
              className="title-image"
              src="/images/site/home-page/iphone6.png"
              alt="iphone-mockup"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Title;
//C:\Users\DEL\Desktop\web-development\acade-blog\public\images\site\home-page
