import Head from "next/head";
import { Fragment } from "react";

import PostContent from "../../components/posts/post-detail/post-content";
//import { getPostData, getPostsFiles } from "../../lib/posts-util";
import {
  getOneDocument,
  connectDatabase,
  getAllDocuments,
} from "../../helpers/db-utils";
import Questions from "../../components/questions/questions";
console.log("coome", "000000");
function PostDetailPage(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.post.title}</title>
        <meta name="description" content={props.post.excerpt} />
      </Head>
      <PostContent post={props.post} />
      {/* <Questions blogId={props.post.id} /> */}
    </Fragment>
  );
}

export async function getStaticProps(context) {
  const { params } = context;
  const { slug } = params;

  //const postData = getPostData(slug);

  let client;

  //try {
  client = await connectDatabase();
  // } catch (error) {
  //   res.status(500).json({ message: "Connecting to the database failed!" });
  //   return;
  // }

  //try {
  const document = await getOneDocument(client, "postTable", slug);
  //   res.status(200).json({ post: document });
  // } catch (error) {
  //   res.status(500).json({ message: "Getting comments failed." });
  // }

  client.close();

  //  const trimedDocuments=    documents.map((document) => {
  //       return {
  //         title: document.title,
  //         date: document.date,

  //         image: document.image,
  //         excerpt: document.excerpt,
  //         content: document.content,
  //         id: document._id.toString(),
  //       };
  //  }),
  //const postData= trimedDocuments.find(trimedDocument=>trimedDocument.id===slug)
  console.log("coome", "11111");
  const postData = {
    title: document.title,
    date: document.date,
    image: document.image,
    excerpt: document.excerpt,
    content: document.content,
    likes: document.likes ? document.likes : {},
    author: document.author,
    authorId: document.authorId,
    id: document._id.toString(),
    moderated: document.moderated ? document.moderated : false,
    category: document.category ? document.category : "Chemistry",
    orderValue: document.orderValue ? document.orderValue : 1,
    imageProfileUrl: document.imageProfileUrl
      ? document.imageProfileUrl
      : "/images/posts/default-profile-pic.jpg",
  };

  console.log("coome", "2222222");

  return {
    props: {
      post: postData,
    },
    // revalidate: 600,
  };
}

export async function getStaticPaths() {
  //const postFilenames = getPostsFiles();

  //const slugs = postFilenames.map((fileName) => fileName.replace(/\.md$/, ""));
  let client;

  //try {
  client = await connectDatabase();
  // } catch (error) {
  //   res.status(500).json({ message: "Connecting to the database failed!" });
  //   return;
  // }

  //try {
  const documents = await getAllDocuments(client, "postTable", { _id: -1 });
  //   res.status(200).json({ post: documents });
  // } catch (error) {
  //   res.status(500).json({ message: "Getting comments failed." });
  // }

  client.close();

  //  const trimedDocuments=    documents.map((document) => {
  //       return {
  //         title: document.title,
  //         date: document.date,

  //         image: document.image,
  //         excerpt: document.excerpt,
  //         content: document.content,
  //         id: document._id.toString(),
  //       };
  //  }),

  return {
    paths: documents.map((slug) => ({ params: { slug: slug._id.toString() } })),
    fallback: false,
  };
}

export default PostDetailPage;
