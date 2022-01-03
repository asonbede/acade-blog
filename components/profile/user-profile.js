import { useContext } from "react";
import ProfileForm from "./profile-form";
import classes from "./user-profile.module.css";
import Hero from "../home-page/hero";
import FeaturedPosts from "../home-page/featured-posts";
import Head from "next/head";
// import { getAllFeaturedDocuments, connectDatabase } from "../helpers/db-utils";
import ProfileMenu from "../auth/profile-menu";
import AuthForm from "../auth/auth-form";
import { useSession, signOut } from "next-auth/client";
//import NotificationContext from "../../../store/notification-context";
import NotificationContext from "../../store/notification-context";
import UpdateAuthForm from "../auth/auth-update-form";
import ProfileImageUploadform from "./profile-image-upload-form";
function UserProfile(props) {
  const [session, loading] = useSession();
  // const [isLoading, setIsLoading] = useState(true);
  const notificationCtx = useContext(NotificationContext);
  //console.log("from handle update");
  const { menuBtn, passOpen, updateOpen, uploadOpen } =
    notificationCtx.profileData;
  //console.log({ menuBtn, passOpen });
  //console.log(notificationCtx.profileData);
  // useEffect(() => {
  //   effect
  //   return () => {
  //     cleanup
  //   }
  // }, [input])
  // profileData.blogUpdateHandler({
  //   post,
  //   idValue: post.id,
  // });
  // useEffect(() => {
  //   getSession().then((session) => {
  //     if (!session) {
  //       window.location.href = '/auth';
  //     } else {
  //       setIsLoading(false);
  //     }
  //   });
  // }, []);

  // if (isLoading) {
  //   return <p className={classes.profile}>Loading...</p>;
  // }

  async function changePasswordHandler(passwordData) {
    const response = await fetch("/api/user/change-password", {
      method: "PATCH",
      body: JSON.stringify(passwordData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    //console.log(data);
    if (!response.ok) {
      throw new Error(data.message || "Something went wrong!");
    }
  }

  return (
    <>
      <Head>
        <title>{`${props.name} Blog`}</title>
        <meta name="description" content={`${props.description}`} />
      </Head>
      {/* <h1>Your User Profile</h1> */}
      {menuBtn ? null : <ProfileMenu />}

      <Hero
        name={props.name}
        description={props.description}
        imageUrl={props.imageUrl}
      />
      <FeaturedPosts posts={props.posts} />
      {passOpen && <ProfileForm onChangePassword={changePasswordHandler} />}

      {updateOpen && <UpdateAuthForm />}
      {uploadOpen && <ProfileImageUploadform />}
    </>
  );
}

export default UserProfile;

// export async function getStaticProps() {
//   import { getSession } from "next-auth/client";
//   const session = await getSession({ req: req });

//   if (!session) {
//     res.status(401).json({ message: "Not authenticated!" });
//     return;
//   }

//   let client;

//   client = await connectDatabase();

//   const documents = await getAllFeaturedDocuments(
//     client,
//     "postTable",
//     {
//       _id: -1,
//     },
//     { isFeatured: true }
//   );
//   console.log(documents);

//   client.close();

//   return {
//     props: {
//       posts: documents.map((document) => {
//         return {
//           title: document.title,
//           date: document.date,
//           image: document.image,
//           excerpt: document.excerpt,
//           content: document.content,
//           id: document._id.toString(),
//           likes: document.likes ? document.likes : {},
//           author: document.author,
//           authorId: document.authorId,
//         };
//       }),
//     },
//   };
// }
