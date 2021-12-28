import Head from "next/head";
import { Fragment } from "react";

import AllPosts from "../../components/posts/all-posts";
//import { getAllPosts } from "../../lib/posts-util";
import { connectDatabase, getAllDocuments } from "../../helpers/db-utils";
function AllPostsPage(props) {
  return (
    <Fragment>
      <Head>
        <title>All Posts</title>
        <meta
          name="description"
          content="A list of all programming-related tutorials and posts!"
        />
      </Head>
      <AllPosts posts={props.posts} />
    </Fragment>
  );
}

export async function getStaticProps() {
  //const allPosts = getAllPosts();
  let client;

  //try {
  client = await connectDatabase();
  // } catch (error) {
  //   res.status(500).json({ message: "Connecting to the database failed!" });
  //   return;
  // }

  // try {
  const documents = await getAllDocuments(client, "postTable", { _id: -1 });
  //   res.status(200).json({ post: documents });
  // } catch (error) {
  //   res.status(500).json({ message: "Getting comments failed." });
  // }

  client.close();

  return {
    props: {
      posts: documents.map((document) => {
        return {
          title: document.title,
          date: document.date,

          image: document.image,
          excerpt: document.excerpt,
          content: document.content,
          id: document._id.toString(),
          likes: document.likes ? document.likes : {},
          author: document.author,
          authorId: document.authorId,
          moderated: document.moderated ? document.moderated : false,
        };
      }),
    },
  };
}

export default AllPostsPage;

// const client = await MongoClient.connect(
//   'mongodb+srv://maximilian:TU6WdZF2EjFWsqUt@cluster0.ntrwp.mongodb.net/meetups?retryWrites=true&w=majority'
// );
// const db = client.db();

// const meetupsCollection = db.collection('meetups');

// const meetups = await meetupsCollection.find().toArray();

// client.close();

// return {
//   props: {
//     meetups: meetups.map((meetup) => ({
//       title: meetup.title,
//       address: meetup.address,
//       image: meetup.image,
//       id: meetup._id.toString(),
//     })),
//   },
//   revalidate: 1,
// };
// }
