import Link from "next/link";
import Image from "next/image";

import classes from "./post-item.module.css";
import DisplayEditorContent from "../rich-text-editor/display-editor-content";
function PostItem(props) {
  const { title, image, excerpt, date, slug, id } = props.post;

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const imagePath = `/images/posts/${image}`;
  const linkPath = `/posts/${id}`;

  return (
    <li className={classes.post}>
      <Link href={linkPath}>
        <a>
          <div className={classes.image}>
            <Image
              src={imagePath}
              alt={title}
              width={400}
              height={300}
              layout="responsive"
            />
          </div>
          <div className={classes.content}>
            <h3>{title}</h3>

            <time>{formattedDate}</time>

            <p>{excerpt}</p>
          </div>
        </a>
      </Link>
      <div className={classes.cardprofile}>
        <img
          className={classes.profileimg}
          src="/images/posts/bede-profile.jpg"
          alt="bede image"
        />
        <div className={classes.cardprofileinfo}>
          <h3 className={classes.profilename}>Bede Asonye</h3>
          <p className={classes.profilefollowers}>5.2k followers</p>
        </div>
      </div>
      <br />
      <br />
    </li>
  );
}

export default PostItem;
