import classes from "./all-posts.module.css";
import PostsGrid from "./posts-grid";

function AllPosts(props) {
  return (
    <section>
      {/* {props.allAuthors ? <h1>All Authors</h1> : <h1>All Posts</h1>} */}
      <PostsGrid
        posts={props.posts}
        allAuthors={props.allAuthors}
        fromHomePage={props.fromHomePage}
      />
    </section>
  );
}

export default AllPosts;
