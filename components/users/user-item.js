import Link from "next/link";
//import Image from "next/image";
import { useState, useEffect, useContext } from "react";
import classes from "./user-item.module.css";

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

  useEffect(() => {
    const result = sendAuthData({ authorId, moderated }, setmoderatedValue);

    //console.log({ result }, "postContent");
    // return () => {
    //   cleanup
    // }
  }, [authorId, moderated]);

  const linkPath = `/profile/${username}`;
  console.log({ moderated }, "from item");
  //className={moderatedValue ? classes.showItem : classes.hideItem}
  return (
    <>
      {/* <div className={moderatedValue ? classes.showItem : classes.hideItem}>
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
           
            <p>{interest}</p>
            
          </div>

          <div className={classes.cardprofile}>
           
            <div className={classes.cardprofileinfo}>
              <h3 className={classes.profilename}>{name}</h3>
              <p className={classes.profilefollowers}>15 posts</p>
              <Link href={linkPath}>
                <a>See More About This Author</a>
              </Link>
             
            </div>
          </div>
          <br />
          <br />
        </li>
      </div>
      */}
      <div class="col-md-6">
        <div class="card bg-light">
          <div class="card-body text-center">
            <img
              src={imageLink}
              alt={name}
              class="rounded-circle mb-3 img-fluid"
            />

            <h3 class="card-title mb-3">{name}</h3>
            <p class="card-text">{interest}</p>
            {/* <a href="#">
              <i class="bi bi-twitter text-dark mx-1"></i>
            </a>
            <a href="#">
              <i class="bi bi-facebook text-dark mx-1"></i>
            </a>
            <a href="#">
              <i class="bi bi-linkedin text-dark mx-1"></i>
            </a>
            <a href="#">
              <i class="bi bi-instagram text-dark mx-1"></i>
            </a> */}
            <Link href={linkPath}>See More About This Author</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserItem;
