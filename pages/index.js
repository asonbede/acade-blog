import { Fragment } from "react";
import Head from "next/head";

import FeaturedPosts from "../components/home-page/featured-posts";
import Hero from "../components/home-page/hero";
//import { getFeaturedPosts } from "../lib/posts-util";
import { getAllFeaturedDocuments, connectDatabase } from "../helpers/db-utils";

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>Max' Blog</title>
        <meta
          name="description"
          content="I post about programming and web development."
        />
      </Head>
      <Hero />
      <FeaturedPosts posts={props.posts} />
    </Fragment>
  );
}

export async function getStaticProps() {
  //const featuredPosts = getFeaturedPosts();

  let client;

  // try {
  client = await connectDatabase();
  // } catch (error) {
  //   res.status(500).json({ message: "Connecting to the database failed!" });
  //   return;
  // }

  // try {
  const documents = await getAllFeaturedDocuments(
    client,
    "postTable",
    {
      _id: -1,
    },
    { isFeatured: true }
  );
  console.log(documents);
  //res.status(200).json({ post: documents });
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
        };
      }),
    },
  };

  // return {
  //   props: {
  //     posts: featuredPosts,
  //   },
  // };
}

export default HomePage;
