import Image from "next/image";
import DisplayEditorContent from "../../rich-text-editor/display-editor-content";
import classes from "./post-header.module.css";
import Link from "next/link";
function PostHeader(props) {
  const { title, image, blogId, excerpt } = props;
  console.log({ blogId }, "in headerjs");
  const linkPath = `/posts/questions/${blogId}`;
  return (
    <header className={classes.header}>
      <h1>{title}</h1>
      {/* <DisplayEditorContent contentFromServer={title} toolbarPresent={false} /> */}

      <Image src={image} alt={title} width={200} height={150} />
      {/* <DisplayEditorContent
        contentFromServer={post.excerpt}
        toolbarPresent={false}
      /> */}
      <h2>{excerpt}</h2>

      <Link href={linkPath}>
        <a>Questions</a>
      </Link>
      <button>comments</button>
      <button>Likes</button>
      <button>dislike</button>
      <button>Delete</button>
      <button>Update</button>
    </header>
  );
}

export default PostHeader;
