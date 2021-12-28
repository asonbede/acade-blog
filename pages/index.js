import { Fragment } from "react";
import Head from "next/head";

import FeaturedPosts from "../components/home-page/featured-posts";
import Hero from "../components/home-page/hero";

import { getAllFeaturedDocuments, connectDatabase } from "../helpers/db-utils";
// const posts = [
//   {
//     title: "First post of this post",
//     date: "2021-7-10",
//     image: "post-1-photo.jpg",
//     excerpt:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente omnis corrupti laudantium! Iure ad tempora soluta similique obcaecati consectetur animi rerum nisi dolores modi quasi, harum ipsa iusto quae? Libero.",
//     content:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente omnis corrupti laudantium! Iure ad tempora soluta similique obcaecati consectetur animi rerum nisi dolores modi quasi, harum ipsa iusto quae? Libero.Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente omnis corrupti laudantium! Iure ad tempora soluta similique obcaecati consectetur animi rerum nisi dolores modi quasi, harum ipsa iusto quae? Libero.Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente omnis corrupti laudantium! Iure ad tempora soluta similique obcaecati consectetur animi rerum nisi dolores modi quasi, harum ipsa iusto quae? Libero.",
//     id: "1",
//   },
//   {
//     title: "Second post of this post",
//     date: "2022-8-11",
//     image: "post-2-photo.jpg",
//     excerpt:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente omnis corrupti laudantium! Iure ad tempora soluta similique obcaecati consectetur animi rerum nisi dolores modi quasi, harum ipsa iusto quae? Libero.",
//     content:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente omnis corrupti laudantium! Iure ad tempora soluta similique obcaecati consectetur animi rerum nisi dolores modi quasi, harum ipsa iusto quae? Libero.Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente omnis corrupti laudantium! Iure ad tempora soluta similique obcaecati consectetur animi rerum nisi dolores modi quasi, harum ipsa iusto quae? Libero.Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente omnis corrupti laudantium! Iure ad tempora soluta similique obcaecati consectetur animi rerum nisi dolores modi quasi, harum ipsa iusto quae? Libero.",
//     id: "2",
//   },
//   {
//     title: "Third post of this post",
//     date: "2021-8-12",
//     image: "post-3-photo.jpg",
//     excerpt:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente omnis corrupti laudantium! Iure ad tempora soluta similique obcaecati consectetur animi rerum nisi dolores modi quasi, harum ipsa iusto quae? Libero.",
//     content:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente omnis corrupti laudantium! Iure ad tempora soluta similique obcaecati consectetur animi rerum nisi dolores modi quasi, harum ipsa iusto quae? Libero.Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente omnis corrupti laudantium! Iure ad tempora soluta similique obcaecati consectetur animi rerum nisi dolores modi quasi, harum ipsa iusto quae? Libero.Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente omnis corrupti laudantium! Iure ad tempora soluta similique obcaecati consectetur animi rerum nisi dolores modi quasi, harum ipsa iusto quae? Libero.",
//     id: "2",
//   },
// ];

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
  let client;

  client = await connectDatabase();

  const documents = await getAllFeaturedDocuments(
    client,
    "postTable",
    {
      _id: -1,
    },
    { isFeatured: true }
  );
  //console.log(documents);

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

export default HomePage;
