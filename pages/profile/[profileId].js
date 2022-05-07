import { useContext } from "react";
import { getSession, session } from "next-auth/client";
import { useSession } from "next-auth/client";
import UserProfile from "../../components/profile/user-profile";

import {
  getAllFeaturedDocuments,
  connectDatabase,
} from "../../helpers/db-utils";
//import { connectDatabase } from "../helpers/db-utils";
// import { getAllFeaturedDocuments, connectDatabase } from "../helpers/db-utils";

import NotificationContext from "../../store/notification-context";

//import DisplayEditorContent from "../rich-text-editor/display-editor-content";

function ProfilePage(props) {
  const [session, loading] = useSession();
  // const description = props.session.user.image.split("??")[1];
  // const imageUrl = props.session.user.image.split("??")[0];
  // const notificationCtx = useContext(NotificationContext);
  return (
    <UserProfile
      posts={props.posts}
      name={props.name}
      description={props.interest}
      imageUrl={props.imageLink}
      email={props.email}
    />
  );
}
//export the page
export default ProfilePage;
export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  const paramValue = context.params.profileId;
  //const { name, description, imageLink } = context.query;
  //let name, description, imageLink ;
  console.log({ paramValue }, "from profileID");
  //const queryDescription = context.query.description;
  console.log({ session }, "in profile");
  // if (!session) {
  //   return {
  //     redirect: {
  //       destination: "/auth",
  //       permanent: false,
  //     },
  //   };
  // }

  let client;

  client = await connectDatabase();

  const documents = await getAllFeaturedDocuments(
    client,
    "postTable",
    {
      orderValue: 1,
    },
    { authorusername: paramValue }
  );
  // console.log(documents, "from-get-staticPROPS");
  const posts = documents.map((document) => {
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
  });

  console.log("from pro77777734");
  const usersCollection = client.db().collection("users");
  const user = await usersCollection.findOne({
    username: paramValue,
  });

  const { name, interest, imageLink = "", email } = user;

  client.close();

  return {
    props: {
      session,
      posts,
      name,
      interest,

      imageLink,
      email,
    },
  };
}

// return {
//           email: usernameCheck.email,
//           names: { name: usernameCheck.name, username: usernameCheck.username },
//           imageAndInterest: {
//             image: usernameCheck.imageLink,
//             interest: usernameCheck.interest,
//           },
