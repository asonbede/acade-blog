import Head from "next/head";
import { Fragment } from "react";
//import Hero from "../../components/home-page/hero";
//import AllPosts from "../../components/posts/all-posts";
import AllPosts from "../components/posts/all-posts";
//import { getAllPosts } from "../../lib/posts-util";
import { connectDatabase, getAllDocuments } from "../helpers/db-utils";
function AllPostsPage(props) {
  console.log("all-postttt");
  return (
    <Fragment>
      <Head>
        <title>All Authors</title>
        <meta
          name="description"
          content="A list of all programming-related tutorials and posts!"
        />
      </Head>

      <AllPosts posts={props.posts} allAuthors={true} />
    </Fragment>
  );
}

export async function getStaticProps() {
  //const allPosts = getAllPosts();
  let client;

  //try {
  client = await connectDatabase();

  const documents = await getAllDocuments(client, "users", {
    _id: 1,
  });

  client.close();

  return {
    props: {
      posts: documents.map((document) => {
        return {
          id: document._id.toString(),
          email: document.email,
          username: document.username
            ? document.username
            : "asonye-bede-aka-happy-teacher",
          name: document.name,
          interest: document.interest,
          imageLink: document.imageLink
            ? document.imageLink
            : "/images/posts/default-profile-pic.jpg",
          moderated: document.moderated ? document.moderated : false,
        };
      }),
    },
  };
}

export default AllPostsPage;
