import React, { useContext, useState } from "react";
import classes from "./profile-image-upload-form.module.css";
//import NotificationContext from "../../store/notification-context";
import NotificationContext from "../../store/notification-context";
export default function ProfileImageUploadform() {
  const [image, setimage] = useState();
  const notificationCtx = useContext(NotificationContext);
  const { menuBtn, passOpen, updateOpen, uploadOpen } =
    notificationCtx.profileData;
  const handleUploadImageFormClose = () => {
    notificationCtx.profileDataHandler({
      menuBtn: menuBtn,
      passOpen: passOpen,
      updateOpen: updateOpen,
      uploadOpen: !uploadOpen,
    });
    // return () => {
    //   cleanup
    // }
  };
  const handleChange = (e) => {
    const file = e.target.value;
    setimage(file.files[0]);
  };
  const handleUpload = async (e) => {
    e.preventDefault();
    notificationCtx.showNotification({
      title: "Uploading profile image...",
      message: "Your profile image is currently being stored into a database.",
      status: "pending",
    });
    try {
      const response = await fetch("/api/images/profile-image");

      const { url } = await response.json();
      console.log({ url });

      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: image,
      });

      const data = await response.json();
      console.log({ data }, "new posttt");
      if (!response.ok) {
        throw new Error(data.message || "Something went wrong!");
      }

      const imageUrl = url.split("?")[0];
      console.log({ imageUrl });

      const response = await fetch("/api/images/profile-image", {
        method: "PATCH",
        body: JSON.stringify(imageUrl),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log({ data }, "new posttt");
      if (!response.ok) {
        throw new Error(data.message || "Something went wrong!");
      }

      notificationCtx.showNotification({
        title: "Success!",
        message: "Your profile image was successfully uploaded",
        status: "success",
      });
    } catch (error) {
      notificationCtx.showNotification({
        title: "Error!",
        message: error.message || "Something went wrong!",
        status: "error",
      });
    }
  };
  return (
    <>
      <form
        className={`${classes.form} ${classes.displaybox}`}
        onSubmit={handleUpload}
      >
        <span
          onClick={handleUploadImageFormClose}
          className={classes.displayTopRight}
          title="close"
        >
          &times;
        </span>
        <div className={classes.control}>
          <label htmlFor="myFile">Select File</label>
          <input
            type="file"
            id="myFile"
            name="filename"
            accept="image/*"
            onChange={handleChange}
          />
        </div>
        <div className={classes.action}>
          <button type="submit">Submit</button>
        </div>
      </form>
    </>
  );
}
