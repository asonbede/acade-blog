import Image from "next/image";
import Link from "next/link";
import classes from "./press.module.css";
import { useRouter } from "next/router";
function Press(props) {
  console.log(props.imageUrl, "profile-photo");

  return (
    <section>
      <section className={`${classes["colored-section"]} ${classes.press}`}>
        {/* <img
          className={`${classes["press-logo"]}`}
          src="/images/site/home-page/techcrunch.png"
          alt="tc-logo"
        />
        <img
          className={`${classes["press-logo"]}`}
          src="/images/site/home-page/tnw.png"
          alt="tnw-logo"
        /> */}
        {/* <img
          className={`${classes["press-logo"]}`}
          src="/images/site/home-page/bizinsider.png"
          alt="biz-insider-logo"
        /> */}
        {/* <img
          className={`${classes["press-logo"]}`}
          src="/images/site/home-page/mashable.png"
          alt="mashable-logo"
        /> */}
        <Link href="/reviews-testimonial">
          <a className="btn  btn-outline-light mt-2">See More Reviews</a>
        </Link>
      </section>
      ;
    </section>
  );
}

export default Press;
