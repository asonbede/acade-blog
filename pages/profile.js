import { getSession, session } from "next-auth/client";
import { useSession } from "next-auth/client";
import UserProfile from "../components/profile/user-profile";
import { getAllFeaturedDocuments, connectDatabase } from "../helpers/db-utils";
//import { connectDatabase } from "../helpers/db-utils";
// import { getAllFeaturedDocuments, connectDatabase } from "../helpers/db-utils";
function ProfilePage(props) {
  const [session, loading] = useSession();
  const description = props.session.user.image.split("??")[1];
  const imageUrl = props.session.user.image.split("??")[0];
  return (
    <UserProfile
      posts={props.posts}
      name={props.session.user.name}
      description={description}
      imageUrl={imageUrl}
    />
  );
}
export default ProfilePage;
export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  console.log({ session }, "in profile");
  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }
  let client;

  client = await connectDatabase();

  const documents = await getAllFeaturedDocuments(
    client,
    "postTable",
    {
      _id: -1,
    },
    { authorId: session.user.email }
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
    };
  });

  client.close();

  return {
    props: { session, posts },
  };
}
