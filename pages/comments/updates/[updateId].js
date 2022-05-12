import React from "react";
//import CommentUpdateForm from "../../../components/posts/comment-update-form";
import CommentUpdateForm from "../../../components/comments/comment-update-form";
import { useRouter } from "next/router";
export default function UpdatePost() {
  const router = useRouter();
  const { updateId } = router.query;

  return (
    <div>
      <CommentUpdateForm updateId={updateId} />
    </div>
  );
}
