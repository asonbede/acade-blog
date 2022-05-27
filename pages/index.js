import { Fragment } from "react";
import Head from "next/head";

import FeaturedPosts from "../components/home-page/featured-posts";
//import Hero from "../components/home-page/hero";
import Title from "../components/home-page/title";
import FeatureSection from "../components/home-page/features-section";
import Testimonial from "../components/home-page/testimonial";
import Press from "../components/home-page/press";
import Pricing from "../components/home-page/pricing";
import CallToAction from "../components/home-page/call-to-action";
import Footer from "../components/home-page/footer-section";
import QuestionAccordion from "../components/home-page/question-accordion";
import {
  getAllFeaturedDocuments,
  connectDatabase,
  getAllDocuments,
} from "../helpers/db-utils";
import AllPosts from "../components/posts/all-posts";
function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>Bede' Blog</title>
        <meta
          name="description"
          content="I post about programming and web development."
        />
      </Head>
      <Title />
      <FeatureSection />
      <Testimonial
        allUsersDocumentsProcessed={props.allUsersDocumentsProcessed}
      />
      <Press />
      <Pricing />

      <FeaturedPosts posts={props.posts} fromHomePage={true} />
      <AllPosts
        posts={props.usersDocumentsProcessed}
        allAuthors={true}
        fromHomePage={true}
      />
      <CallToAction />
      <QuestionAccordion />
      <Footer />
    </Fragment>
  );
}

export async function getStaticProps() {
  let client;
  let documents;
  let usersDocuments;
  client = await connectDatabase();

  documents = await getAllFeaturedDocuments(
    client,
    "postTable",
    {
      orderValue: 1,
    },
    { isFeatured: true }
  );
  documents = documents.length > 6 ? documents.slice(0, 6) : documents;

  const allUsersDocuments = await getAllDocuments(client, "users", {
    _id: 1,
  });

  const allUsersDocumentsProcessed = allUsersDocuments.map((document) => {
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
      review: document.review ? document.review : "Yet to write review",
    };
  });

  const usersDocumentsProcessed =
    allUsersDocumentsProcessed.length > 6
      ? allUsersDocumentsProcessed.slice(0, 6)
      : allUsersDocumentsProcessed;

  client.close();

  return {
    props: {
      posts: documents.map((document) => {
        return {
          title: document.title,
          date: document.date,
          updateDate: document.updateDate ? document.updateDate : document.date,
          image: document.image
            ? document.image
            : "/images/posts/default-profile-pic.jpg",
          excerpt: document.excerpt,
          content: document.content,
          id: document._id.toString(),
          likes: document.likes ? document.likes : {},
          author: document.author,
          authorId: document.authorId,
          authorusername: document.authorusername
            ? document.authorusername
            : "asonbede",
          moderated: document.moderated ? document.moderated : false,
          category: document.category ? document.category : "Chemistry",
          orderValue: document.orderValue ? document.orderValue : 1,
          imageProfileUrl: document.imageProfileUrl
            ? document.imageProfileUrl
            : "/images/posts/default-profile-pic.jpg",
        };
      }),
      usersDocumentsProcessed,
      allUsersDocumentsProcessed,
    },
  };
}

export default HomePage;

// import Head from "next/head";
// import { Fragment } from "react";
// //import Hero from "../../components/home-page/hero";
// //import AllPosts from "../../components/posts/all-posts";
// import AllPosts from "../components/posts/all-posts";
// //import { getAllPosts } from "../../lib/posts-util";
// import { connectDatabase, getAllDocuments } from "../helpers/db-utils";
// function AllPostsPage(props) {
//   console.log("all-postttt");
//   return (
//     <Fragment>
//       <Head>
//         <title>All Authors</title>
//         <meta
//           name="description"
//           content="A list of all programming-related tutorials and posts!"
//         />
//       </Head>

//       <AllPosts posts={props.posts} allAuthors={true} />
//     </Fragment>
//   );
// }

// export async function getStaticProps() {
//   //const allPosts = getAllPosts();
//   let client;

//   //try {
//   client = await connectDatabase();

//   const documents = await getAllDocuments(client, "users", {
//     _id: 1,
//   });

//   client.close();

//   return {
//     props: {
//       posts: documents.map((document) => {
//         return {
//           id: document._id.toString(),
//           email: document.email,
//           username: document.username
//             ? document.username
//             : "asonye-bede-aka-happy-teacher",
//           name: document.name,
//           interest: document.interest,
//           imageLink: document.imageLink
//             ? document.imageLink
//             : "/images/posts/default-profile-pic.jpg",
//           moderated: document.moderated ? document.moderated : false,
//         };
//       }),
//     },
//   };
// }

// export default AllPostsPage;
