import Head from "next/head";
import { Fragment } from "react";
//import Hero from "../../components/home-page/hero";
//import AllPosts from "../../components/posts/all-posts";
import AllPosts from "../components/posts/all-posts";
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
      {/* <Hero /> */}
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
  const documents = await getAllDocuments(client, "users", {
    _id: 1,
  });
  //   res.status(200).json({ post: documents });
  // } catch (error) {
  //   res.status(500).json({ message: "Getting comments failed." });
  // }

  client.close();

  return {
    props: {
      posts: documents.map((document) => {
        return {
          id: document._id.toString(),
          email: document.email,
          name: document.name,
          interest: document.interest,
          imageLink: document.imageLink
            ? document.imageLink
            : "images/posts/bede-profile.jpg",
        };
      }),
    },
  };
}
//email, password, name, interest
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
