import Image from "next/image";

import classes from "./testimonial.module.css";
import { useRouter } from "next/router";
function Testimonial(props) {
  return (
    <div
      id="demo"
      className={`carousel slide ${classes.testimonials}`}
      data-bs-ride="carousel"
    >
      {/* <!-- Indicators/dots --> */}
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#demo"
          data-bs-slide-to="0"
          className="active"
        ></button>
        <button
          type="button"
          data-bs-target="#demo"
          data-bs-slide-to="1"
        ></button>
      </div>

      {/* <!-- The slideshow/carousel --> */}
      <div className="carousel-inner">
        <h1>Testimonial</h1>
        <div className="carousel-item active">
          <h5
            className={`${classes["testimonial-text"]}`}
            // style={{ width: "50%", margin: "0 auto" }}
          >
            My dog used to be so lonely, but with TinDog's help, they've found
            the love of their life. I think.
          </h5>
          <img
            src="/images/site/home-page/dog-img.jpg"
            alt="dog-profile"
            // className="d-block"
            className={`${classes["testimonial-image"]}`}

            // style={{ width: "100%" }}
          />
        </div>
        <div className="carousel-item">
          <h5
            className={`${classes["testimonial-text"]}`}
            // style={{ width: "50%", margin: "0 auto" }}
          >
            I no longer have to sniff other dogs for love. I've found the
            hottest Corgi on TinDog. Woof.
          </h5>
          <img
            src="/images/site/home-page/lady-img.jpg"
            alt="lady-profile"
            className={`${classes["testimonial-image"]}`}
            // className="d-block"
            // style={{ width: "100%" }}
          />
        </div>
      </div>

      {/* <!-- Left and right controls/icons --> */}
      <a
        className="carousel-control-prev"
        type="button"
        data-bs-target="#demo"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon"></span>
      </a>
      <a
        className="carousel-control-next"
        type="button"
        data-bs-target="#demo"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon"></span>
      </a>
    </div>
  );
}

export default Testimonial;
