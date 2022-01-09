import classes from "./all-posts.module.css";
import PostsGrid from "./posts-grid";

function AllPosts(props) {
  return (
    <section className={classes.posts}>
      {props.allAuthors ? <h1>All Authors</h1> : <h1>All Posts</h1>}
      <PostsGrid posts={props.posts} />
    </section>
  );
}

export default AllPosts;
