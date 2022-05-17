import Image from "next/image";

import classes from "./features-section.module.css";
import { useRouter } from "next/router";
function Testimonial(props) {
  return (
    <section class="colored-section" id="testimonials">
      <div id="testimonial-carousel" class="carousel slide" data-ride="false">
        <div class="carousel-inner">
          <div class="carousel-item active container-fluid">
            <h2 class="testimonial-text">
              I no longer have to sniff other dogs for love. I've found the
              hottest Corgi on TinDog. Woof.
            </h2>
            <img
              class="testimonial-image"
              src="images/dog-img.jpg"
              alt="dog-profile"
            />
            <em>Pebbles, New York</em>
          </div>
          <div class="carousel-item container-fluid">
            <h2 class="testimonial-text">
              My dog used to be so lonely, but with TinDog's help, they've found
              the love of their life. I think.
            </h2>
            <img
              class="testimonial-image"
              src="images/lady-img.jpg"
              alt="lady-profile"
            />
            <em>Beverly, Illinois</em>
          </div>
        </div>
        <a
          class="carousel-control-prev"
          href="#testimonial-carousel"
          role="button"
          data-slide="prev"
        >
          <span class="carousel-control-prev-icon"></span>
        </a>
        <a
          class="carousel-control-next"
          href="#testimonial-carousel"
          role="button"
          data-slide="next"
        >
          <span class="carousel-control-next-icon"></span>
        </a>
      </div>
    </section>
  );
}

export default Testimonial;
