import Image from "next/image";

import classes from "./hero.module.css";
import { useRouter } from "next/router";
function Hero(props) {
  const router = useRouter();
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src="/images/posts/bede-profile.jpg"
          alt="An image showing bede"
          width={300}
          height={300}
        />
      </div>
      <h1>
        {router.pathname === "/" || router.pathname === "/posts"
          ? "Hi,  i am Bede Asonye."
          : `Hi,  i am ${props.name}`}
      </h1>
      <p>
        {router.pathname === "/" || router.pathname === "/posts"
          ? "I blog about the sciences especially Chemistry, Biology, Physics and Programming"
          : props.description}
      </p>
    </section>
  );
}

export default Hero;
