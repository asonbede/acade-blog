import Image from "next/image";

import classes from "./pricing.module.css";
import { useRouter } from "next/router";
function Pricing(props) {
  return (
    <section className={`${classes["white-section"]} ${classes.pricing}`}>
      <h2 className={`${classes["section-heading"]}`}>
        A Plan for Every Dog's Needs
      </h2>
      <p>Simple and affordable price plans for your and your dog.</p>

      <div className="row">
        <div className={`${"pricing-column"} col-lg-4 col-md-6`}>
          <div className="card">
            <div className="card-header">
              <h3>Chihuahua</h3>
            </div>
            <div className="card-body">
              <h2 className={`${"price-text"}`}>Free</h2>

              <p>5 Matches Per Day</p>
              <p>10 Messages Per Day</p>
              <p>Unlimited App Usage</p>
              <button
                class="btn btn-lg btn-block btn-outline-dark"
                type="button"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>

        <div className={`${"pricing-column"} col-lg-4 col-md-6`}>
          <div className="card">
            <div className="card-header">
              <h3>Labrador</h3>
            </div>
            <div className="card-body">
              <h2 className={`${"price-text"}`}>$49 / mo</h2>
              <p>Unlimited Matches</p>
              <p>Unlimited Messages</p>
              <p>Unlimited App Usage</p>
              <button className="btn btn-lg btn-block btn-dark" type="button">
                Sign Up
              </button>
            </div>
          </div>
        </div>

        <div className={`${"pricing-column"} col-lg-4`}>
          <div className="card">
            <div className="card-header">
              <h3>Mastiff</h3>
            </div>
            <div className="card-body">
              <h2 className={`${"price-text"}`}>$99 / mo</h2>
              <p>Pirority Listing</p>
              <p>Unlimited Matches</p>
              <p>Unlimited Messages</p>
              <p>Unlimited App Usage</p>
              <button className="btn btn-lg btn-block btn-dark" type="button">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Pricing;
