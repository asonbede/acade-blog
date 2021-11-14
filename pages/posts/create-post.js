import { Fragment } from "react";
import Head from "next/head";

import NewPostForm from "../../components/posts/new-post-form";

function NewPostPage() {
  return (
    <Fragment>
      <Head>
        <title>Create Post</title>
        <meta name="description" content="Create your post messages!" />
      </Head>
      <NewPostForm />
    </Fragment>
  );
}

export default NewPostPage;
