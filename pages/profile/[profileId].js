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
      description={props.description}
      imageUrl={props.imageLink}
      email={props.email}
    />
  );
}
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
    { authorId: paramValue }
  );
  //console.log(documents);
  const posts = documents.map((document) => {
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
    email: paramValue,
  });

  const { name, interest: description, imageLink } = user;

  client.close();

  return {
    props: { session, posts, name, description, imageLink, email: paramValue },
  };
}
