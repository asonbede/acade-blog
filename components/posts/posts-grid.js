import PostItem from "./post-item";
import classes from "./posts-grid.module.css";
import UserItem from "../users/user-item";
//import PostMenu from "../post-menu/post-menu";
function PostsGrid(props) {
  const { posts } = props;
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
    <ul className={classes.grid}>
      {posts.map((post) =>
        !determineItem(post) ? (
          <PostItem key={post.id} post={post} />
        ) : (
          <UserItem key={post.id} post={post} />
        )
      )}
    </ul>
  );
}

export default PostsGrid;
