import React from "react";
import UpdatePostForm from "../../../components/posts/update-post-form";
import { useRouter } from "next/router";
export default function UpdatePost() {
  const router = useRouter();
  const { updateId } = router.query;

  return (
    <div>
      <UpdatePostForm updateId={updateId} />
    </div>
  );
}
