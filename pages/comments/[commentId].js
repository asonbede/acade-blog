import React from "react";
import Comments from "../../components/comments/comments";
//const router = useRouter();
import { useRouter } from "next/router";

export default function CommentPage() {
  const router = useRouter();

  const blogId = router.query.commentId;
  return (
    <div>
      <Comments blogId={blogId} />
    </div>
  );
}
