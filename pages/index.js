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
import { getAllFeaturedDocuments, connectDatabase } from "../helpers/db-utils";

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
      <Testimonial />
      <Press />
      <Pricing />
      <CallToAction />
      <FeaturedPosts posts={props.posts} />
      <Footer />
    </Fragment>
  );
}

export async function getStaticProps() {
  let client;
  let documents;
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
  client.close();

  return {
    props: {
      posts: documents.map((document) => {
        return {
          title: document.title,
          date: document.date,
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
    },
  };
}

export default HomePage;
