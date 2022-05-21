import PostItem from "./post-item";
import classes from "./posts-grid.module.css";
import UserItem from "../users/user-item";
import Link from "next/link";
//import PostMenu from "../post-menu/post-menu";
function PostsGrid(props) {
  const { posts, onSelectMenu, fromHomePage } = props;
  function determineItem(postObj) {
    if (
      postObj.hasOwnProperty("email") &&
      postObj.hasOwnProperty("interest") &&
      postObj.hasOwnProperty("name")
    ) {
      return true;
    }
    return false;
  }

  return (
    // <section className={`${classes["white-section"]}`}>
    //   <h3 className={`${classes["section-heading"]}`}>
    //     Learn what you don't known or
    //   </h3>
    //   <p>add to your knowledge.</p>
    <section
      id="instructors"
      className={`p-2   ${
        fromHomePage && !determineItem(posts[0])
          ? classes["background-home"]
          : "bg-primary"
      } `}
    >
      <div className="container-fluid">
        <h2 className="text-center text-white">
          {props.allAuthors
            ? "Our Instructors"
            : fromHomePage
            ? "Our Articles"
            : "My Articles"}
        </h2>
        <p className="lead text-center text-white mb-5">
          {props.allAuthors
            ? "Our instructors all have 5+ years experience in their respective fields."
            : fromHomePage
            ? "Our Articles are well researched with illustration"
            : "My Articles are well researched with illustration"}
        </p>

        <div className="row g-4">
          {posts.map((post) =>
            !determineItem(post) ? (
              <PostItem key={post.id} post={post} onSelectMenu={onSelectMenu} />
            ) : (
              <UserItem key={post.id} post={post} />
            )
          )}
        </div>
        {fromHomePage && determineItem(posts[0]) && (
          <Link href="/writers">
            <a className="btn  btn-outline-light mt-2">See More Authors</a>
          </Link>
        )}
        {fromHomePage && !determineItem(posts[0]) && (
          <Link href="/posts">
            <a class="btn btn-outline-light btn-btn-block mt-2">
              See More Articles
            </a>
          </Link>
        )}
      </div>
    </section>
  );
}

export default PostsGrid;
