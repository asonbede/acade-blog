import Image from "next/image";

import classes from "./features-section.module.css";
import { useRouter } from "next/router";
function FeatureSection(props) {
  return (
    <section className={`${classes["white-section"]}  ${classes.features}  `}>
      <div className={`${classes["container-fluid"]}`}>
        <div className="row">
          <div className={`${classes["feature-box"]} col-lg-4`}>
            <i className={`${classes.icon} fas fa-check-circle fa-4x`}></i>
            <h3 className={`${classes["feature-title"]}`}>Easy to use.</h3>
            <p>So easy to use, even your dog could do it.</p>
          </div>

          <div className={`${classes["feature-box"]} col-lg-4`}>
            <i className={`${classes.icon} fas fa-bullseye fa-4x`}></i>
            <h3 className={`${classes["feature-title"]}`}>Elite Clientele</h3>
            <p>We have all the dogs, the greatest dogs.</p>
          </div>

          <div className={`${classes["feature-box"]} col-lg-4`}>
            <i className={`${classes.icon} fas fa-heart fa-4x`}></i>
            <h3 className={`${classes["feature-title"]}`}>
              Guaranteed to work.
            </h3>
            <p>Find the love of your dog's life or your money back.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeatureSection;
