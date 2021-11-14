import Image from "next/image";

import classes from "./post-header.module.css";
import Link from "next/link";
function PostHeader(props) {
  const { title, image, blogId } = props;
  const linkPath = `/posts/questions/${blogId}`;
  return (
    <header className={classes.header}>
      <h1>{title}</h1>
      <Image src={image} alt={title} width={200} height={150} />

      <Link href={linkPath}>
        <a>Questions</a>
      </Link>
    </header>
  );
}

export default PostHeader;
