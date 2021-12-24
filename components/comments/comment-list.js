import classes from "./comment-list.module.css";
import CommentItem from "./comment-item";
function CommentList(props) {
  const { items } = props;

  return (
    <ul className={classes.comments}>
      {items.map((item) => (
        <li key={item._id}>
          {/* <p>{item.text}</p>
          <div>
            By <address>{item.name}</address>
          </div> */}
          <CommentItem item={item} />
        </li>
      ))}
    </ul>
  );
}

export default CommentList;
