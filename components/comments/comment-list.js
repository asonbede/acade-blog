import classes from "./comment-list.module.css";
import CommentItem from "./comment-item";
function CommentList(props) {
  const { items, setShowComments } = props;

  return (
    <ul className={classes.comments}>
      {/* {items.length === 0 && <div>No comment yet. Be the first to comment</div>} */}
      {items.map((item) => (
        <li key={item._id}>
          {/* <p>{item.text}</p>
          <div>
            By <address>{item.name}</address>
          </div> */}
          <CommentItem item={item} setShowComments={setShowComments} />
        </li>
      ))}
    </ul>
  );
}

export default CommentList;
