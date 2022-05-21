import { useState, useContext, useEffect } from "react";
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
import DeleteAccountForm from "../auth/delete-account-form";
import ProfileImageUploadform from "./profile-image-upload-form";
//import PostContent from "../posts/post-detail/post-content";
function UserProfile(props) {
  const [session, loading] = useSession();
  const [heroIsOpen, setheroIsOpen] = useState(true);
  // const [isLoading, setIsLoading] = useState(true);
  const notificationCtx = useContext(NotificationContext);
  //console.log("from handle update");
  useEffect(() => setheroIsOpen(true), []);
  const { menuBtn, passOpen, updateOpen, uploadOpen, deleteAccount } =
    notificationCtx.profileData;

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
      {/*
      component:ProfileMenu
      What it does: displays a menu that enables users to choose
      whether to change password, upload image or update registration details
      How it works: displays when the menu buton is clicked.BBn
      */}
      {/* {menuBtn ? null : <ProfileMenu />} */}
      {heroIsOpen && (
        <Hero
          name={props.name}
          description={props.description}
          imageUrl={props.imageUrl}
        />
      )}
      <FeaturedPosts posts={props.posts} setheroIsOpen={setheroIsOpen} />
      {passOpen && <ProfileForm onChangePassword={changePasswordHandler} />}
      {updateOpen && (
        <UpdateAuthForm
          name={props.name}
          description={props.description}
          email={props.email}
        />
      )}
      {deleteAccount && (
        <DeleteAccountForm
          name={props.name}
          description={props.description}
          email={props.email}
          username={props.username}
        />
      )}

      {uploadOpen && <ProfileImageUploadform />}
    </>
  );
}

export default UserProfile;
