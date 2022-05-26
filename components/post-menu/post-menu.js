import React from "react";
import classes from "./post-menu.module.css";
import NotificationContext from "../../store/notification-context";
import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
export default function ProfileMenu(props) {
  const notificationCtx = useContext(NotificationContext);
  //check category number

  const [selectValue, setselectValue] = useState();
  const router = useRouter();
  const idFromRoute = router.query;
  const arrangePostByCategory = () => {
    const newPosts = [];
    const catArray = [];
    if (props.posts) {
      for (let index = 0; index < props.posts.length; index++) {
        const element = props.posts[index];
        const cat = element.category;
        if (catArray.indexOf(cat) > -1) {
          continue;
        }
        catArray.push(cat);
        newPosts.push({
          category: cat,
          posts: props.posts.filter((item) => item.category === cat),
        });
      }
    }
    console.log({ catArray });
    console.log({ newPosts });
    return newPosts;
  };
  // const arrangePost = () => {
  //   if (props.posts) {
  //     const newPost = props.posts.map(item=>{
  //       [item.category]:{...}
  //     });
  //   }
  // };
  useEffect(() => {
    props.onSelectMenu(selectValue);
  }, [selectValue]);

  const onselectChange = (e) => {
    const optionValue = e.target.value;
    setselectValue(optionValue);
    console.log({ optionValue });
    // router.push(`/posts/${optionValue}`);
  };

  return (
    <div className={`${classes.verticalmenu} `}>
      <div
        style={{
          width: "50%",
          margin: "0 auto",
          fontSize: "20px",
          color: "white",
        }}
      >
        Table of Contents
      </div>
      <select
        id="menu-select"
        name="menu-select"
        size={6}
        className={`${classes.menuSelect} form-select form-select-lg mb-3`}
        aria-label=".form-select-lg example"
        onChange={onselectChange}
        // value={selectValue}
        defaultValue={props.setselectId}
      >
        {arrangePostByCategory().map((post) => (
          <optgroup label={post.category}>
            {post.posts.map((item) => (
              <option
                value={item.id}
                selected={item.id === props.setselectId ? true : false}
              >
                {item.title}
              </option>
            ))}
          </optgroup>
        ))}
        {/* <optgroup label="Chemistry">
          <option>Scientific Method</option>
          <option>Data Presentation</option>on
          <option>The periodic Table</option>
          <option>The molecules</option>
        </optgroup>
        <optgroup label="Chemistry">
          <option>Scientific Method</option>
          <option>Data Presentation</option>
          <option>Atoms, what are they?</option>
          <option>The periodic Table</option>
          <option>The molecules</option>
        </optgroup>
        <optgroup label="Chemistry">
          <option>Scientific Method</option>
          <option>Data Presentation</option>
          <option>Atoms, what are they?</option>
          <option>The periodic Table</option>
          <option>The molecules</option>
        </optgroup> */}
      </select>
    </div>
  );
}
