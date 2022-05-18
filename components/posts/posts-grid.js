import PostItem from "./post-item";
import classes from "./posts-grid.module.css";
import UserItem from "../users/user-item";
//import PostMenu from "../post-menu/post-menu";
function PostsGrid(props) {
  const { posts, onSelectMenu } = props;
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
    <section className={`${classes["white-section"]}`}>
      <h3 className={`${classes["section-heading"]}`}>
        Learn what you don't known or
      </h3>
      <p>add to your knowledge.</p>

      <div className="row">
        {posts.map((post) =>
          !determineItem(post) ? (
            <PostItem key={post.id} post={post} onSelectMenu={onSelectMenu} />
          ) : (
            <UserItem key={post.id} post={post} />
          )
        )}
      </div>
    </section>
    // <ul className={classes.grid}>
    //   {posts.map((post) =>
    //     !determineItem(post) ? (
    //       <PostItem key={post.id} post={post} onSelectMenu={onSelectMenu} />
    //     ) : (
    //       <UserItem key={post.id} post={post} />
    //     )
    //   )}
    // </ul>
  );
}

export default PostsGrid;
