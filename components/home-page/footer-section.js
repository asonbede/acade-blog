import Image from "next/image";

import classes from "./footer-section.module.css";
import { useRouter } from "next/router";
function Footer(props) {
  return (
    <footer className={`${classes["white-section"]} ${classes.footer}`}>
      <div className={`${classes["container-fluid"]}`}>
        <i className={`${classes["social-icon"]} fab fa-facebook-f`}></i>
        <i className={`${classes["social-icon"]} fab fa-twitter`}></i>
        <i className={`${classes["social-icon"]} fab fa-instagram`}></i>
        <i className={`${classes["social-icon"]}  fas fa-envelope`}></i>

        <p>© Copyright 2022 Asonbiditeck</p>
      </div>
    </footer>
  );
}

export default Footer;
