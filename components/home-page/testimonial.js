import Image from "next/image";

import classes from "./testimonial.module.css";
import { useRouter } from "next/router";
function Testimonial(props) {
  const router = useRouter();

  function examineDocument() {
    const usersDocuments = props.allUsersDocumentsProcessed;

    const documentsWithReview = usersDocuments.filter(
      (item) => item.review !== null
    );
    if (router.pathname.indexOf("/") > -1) {
      if (documentsWithReview.length > 6) {
        return documentsWithReview.slice(0, 6);
      } else {
        return documentsWithReview;
      }
    } else {
      return documentsWithReview;
    }
  }

  return (
    <div
      id="demo"
      className={`carousel slide ${classes.testimonials}`}
      data-bs-ride="carousel"
    >
      {/* <!-- Indicators/dots --> */}
      {/* <div className="carousel-indicators">
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
      </div> */}

      {/* <!-- The slideshow/carousel --> */}

      <div className="carousel-inner">
        <h1 class="display-1 fw-bolder">Testimonial</h1>

        {examineDocument().map((item, i) => (
          <div
            className={`carousel-item  ${i === 0 ? "active" : ""}`}
            key={item.id}
          >
            <h5
              className={`${classes["testimonial-text"]}`}
              // style={{ width: "50%", margin: "0 auto" }}
            >
              {item.review}
            </h5>
            <div class="d-flex flex-column w-100 justify-content-center">
              <img
                src={item.imageLink}
                alt="dog-profile"
                // className="d-block"
                className={`${classes["testimonial-image"]}`}

                // style={{ width: "100%" }}
              />
              <p class="display-5">{item.name} </p>
            </div>
          </div>
        ))}

        {/* <div className="carousel-item">
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
           
          />
        </div> */}
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
//  imageLink: document.imageLink;
