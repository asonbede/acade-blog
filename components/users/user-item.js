import Link from "next/link";
//import Image from "next/image";
import { useState, useEffect, useContext } from "react";
import classes from "./user-item.module.css";
//import AuthUpdateForm from "../auth/auth-update-form";
//import { useRouter } from "next/router";

//import NotificationContext from "../../store/notification-context";

//import DisplayEditorContent from "../rich-text-editor/display-editor-content";
async function sendAuthData(authDetails, setFunc) {
  const response = await fetch("/api/moderating-post", {
    method: "POST",
    body: JSON.stringify(authDetails),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  //console.log({ data }, "authDetails");
  if (!response.ok) {
    // throw new Error(data.message || "Something went wrong!");
    setFunc(false);
  } else {
    setFunc(data.message);
  }
}

function UserItem(props) {
  const {
    id,
    email: authorId,
    name,
    interest,
    imageLink,
    moderated,
    username,
  } = props.post;
  console.log({ authorId });
  const [moderatedValue, setmoderatedValue] = useState();
  // const [isAdmin, setisAdmin] = useState(false);
  // const [isUpdate, setisUpdate] = useState(false);
  // const notificationCtx = useContext(NotificationContext);
  //const router = useRouter();
  // // const postAuthorDetails = () => {
  // //   console.log("from handle update");
  // //   notificationCtx.userUpIdHandler({
  // //     email,
  // //   });

  //   //router.push("/profile/email");
  // };
  //const adminArray = [process.env.admin_1, process.env.admin_2];
  //console.log(props.post, "content333");
  // const { authorId } = post;
  useEffect(() => {
    const result = sendAuthData({ authorId, moderated }, setmoderatedValue);

    //console.log({ result }, "postContent");
    // return () => {
    //   cleanup
    // }
  }, [authorId, moderated]);

  // useEffect(() => {
  //   fetch("/api/restrict-route/")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       //console.log(data);
  //       setisAdmin(data.message);
  //     })
  //     .catch((error) => {
  //       notificationCtx.showNotification({
  //         title: "Error!",
  //         message: error.message || "Something went wrong!",
  //         status: "error",
  //       });
  //     });
  // }, [authorId, moderated]);

  //   const formattedDate = new Date(date).toLocaleDateString("en-US", {
  //     day: "numeric",
  //     month: "long",
  //     year: "numeric",
  //   });

  //Store credentials in local storage
  //useEffect(() => {}, [authorId, name, imageLink]);
  //?name=${name}&description=${interest}&imageLink=${imageLink}
  //const imagePath = `/images/posts/${image}`;
  const linkPath = `/profile/${username}`;
  console.log({ moderated }, "from item");
  //className={moderatedValue ? classes.showItem : classes.hideItem}
  return (
    <>
      <div className={moderatedValue ? classes.showItem : classes.hideItem}>
        {!moderated && (
          <span style={{ color: "red" }}>
            {" "}
            Your profile is under review, this may take a while, until this
            action is complete only you can see your your profile, newly created
            or updated profile are examined by the admin before it is shown to
            the public. This message will be removed as soon as the process is
            complete. You may continue to work on your post while this process
            is on...
          </span>
        )}
        <li className={classes.post}>
          <div className={classes.image}>
            <img src={imageLink} alt={name} width={400} height={300} />
          </div>
          <div className={classes.content}>
            {/* <h3>{title}</h3>

              <time>{formattedDate}</time> */}
            <p>{interest}</p>
            {/* <p>{excerpt}</p> */}
          </div>

          <div className={classes.cardprofile}>
            {/* <img
            className={classes.profileimg}
            src={props.post.imageProfileUrl}
            alt="bede image"
          /> */}
            <div className={classes.cardprofileinfo}>
              <h3 className={classes.profilename}>{name}</h3>
              <p className={classes.profilefollowers}>15 posts</p>
              <Link href={linkPath}>
                <a>See More About This Author</a>
              </Link>
              {/* {isAdmin && (
                <button onClick={() => setisUpdate(!isUpdate)}>approve</button>
              )} */}
            </div>
          </div>
          <br />
          <br />
        </li>
      </div>
      {/* <div style={{ position: "absolute", top: "8px", right: "40px" }}>
        {isAdmin && isUpdate ? (
          <AuthUpdateForm email={email} name={name} interest={interest} />
        ) : null}
      </div> */}
    </>
  );
}

export default UserItem;
