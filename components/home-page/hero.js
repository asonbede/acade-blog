import Image from "next/image";

import classes from "./hero.module.css";
import { useRouter } from "next/router";
function Hero(props) {
  console.log(props.imageUrl, "profile-photo");
  const router = useRouter();
  const fixHerosImageSrc = () => {
    let srcString = "";
    if (router.pathname === "/" || router.pathname === "/posts") {
      srcString = "/images/posts/bede-profile.jpg";
    } else if (router.pathname.indexOf("/profile") > -1) {
      srcString = props.imageUrl
        ? props.imageUrl
        : "/images/posts/default-profile-pic.jpg";
      console.log("one", "heros");
    } else {
      srcString = "/images/posts/bede-profile.jpg";
      console.log("two", "heros");
    }
    console.log({ srcString }, "from hero");
    return srcString;
  };
  const imgUrl = fixHerosImageSrc();
  console.log({ imgUrl });

  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <img
          src={imgUrl}
          alt="An image showing bede"
          width={300}
          height={300}
        />
      </div>
      <h1>
        {router.pathname === "/" || router.pathname === "/posts/"
          ? "Hi,  i am Bede Asonye."
          : `Hi,  i am ${props.name}`}
      </h1>
      <p>
        {router.pathname === "/" || router.pathname === "/posts/"
          ? "I blog about the sciences especially Chemistry, Biology, Physics and Programming"
          : props.description}
      </p>
    </section>
  );
}

export default Hero;
/* What the Heros component does and how it works.
The idea here is to have a component that displays different items
depending on whether the user is on is on the home page or user profile  page
If the user is on home page, the director's image and messa

*/
