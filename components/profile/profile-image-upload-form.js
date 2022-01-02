import React, { useContext, useState } from "react";
import classes from "./profile-image-upload-form.module.css";
//import NotificationContext from "../../store/notification-context";
import NotificationContext from "../../store/notification-context";

async function sendImageData(blogDetails) {
  const response = await fetch("/api/images/profile-image", {
    method: "POST",
    body: JSON.stringify(blogDetails),
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  const data = await response.json();
  console.log({ data }, "new posttt");
  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }
}

export default function ProfileImageUploadform() {
  const [file, setfile] = useState();
  const [fileName, setfileName] = useState();
  const [fileType, setfileType] = useState();
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
    const fileEle = e.target;
    setfileName(fileEle.files[0].name.split(".")[0]);
    setfileType(fileEle.files[0].name.split(".")[1]);

    setfile(fileEle.files[0]);
  };

  async function handleUpload(event) {
    event.preventDefault();

    // optional: add client-side validation
    const formData = new FormData();
    formData.append("image", file);
    //setRequestStatus("pending");
    notificationCtx.showNotification({
      title: "Sending profile image...",
      message: "Your profile image is currently being stored into a database.",
      status: "pending",
    });

    try {
      await sendImageData(formData);

      notificationCtx.showNotification({
        title: "Success!",
        message: "Your image was saved!",
        status: "success",
      });
      router.push("/profile");
    } catch (error) {
      notificationCtx.showNotification({
        title: "Error!",
        message: error.message || "Something went wrong!",
        status: "error",
      });
    }
  }

  // const handleUpload = async (e) => {
  //   e.preventDefault();
  //   console.log("running upload");
  //   notificationCtx.showNotification({
  //     title: "Uploading profile image...",
  //     message: "Your profile image is currently being stored into a database.",
  //     status: "pending",
  //   });
  //   // try {
  //   const fileNameEncoded = encodeURIComponent(fileName);
  //   try {
  //     const res = await fetch(
  //       `/api/images/profile-image?file=${fileNameEncoded}`
  //     );
  //     const { url, fields } = await res.json();
  //     console.log({ url });

  //     let formData = new FormData();
  //     //formData.append("acl", "public-read");

  //     Object.entries({ acl: "public-read", ...fields, file }).forEach(
  //       ([key, value]) => {
  //         formData.append(key, value);
  //       }
  //     );

  //     const upload = await fetch(url, {
  //       method: "POST",
  //       body: formData,
  //       headers: { "Content-Type": "multipart/form-data" },
  //     });

  //     if (upload.ok) {
  //       console.log("Uploaded successfully");
  //     } else {
  //       console.error("Upload failed");
  //     }
  //   } catch (error) {
  //     console.log("something went wrong");
  //   }

  // const { url } = await fetch("/api/images/profile-image").then((res) =>
  //   res.json()
  // );

  // console.log({ url });

  // const response2 = await fetch(url, {
  //   method: "PUT",
  //   headers: {
  //     "Content-Type": "multipart/form-data",
  //   },
  //   body: image,
  // });

  // const data1 = await response2.json();
  // console.log({ data1 }, "new posttt");
  // if (!response2.ok) {
  //   throw new Error(data1.message || "Something went wrong!");
  // }

  // const imageUrl = url.split("?")[0];
  // console.log({ imageUrl });

  // const response = await fetch("/api/images/profile-image", {
  //   method: "PATCH",
  //   body: JSON.stringify(imageUrl),
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });

  // const data2 = await response.json();
  // console.log({ data2 }, "new posttt");
  // if (!response.ok) {
  //   throw new Error(data2.message || "Something went wrong!");
  // }

  // notificationCtx.showNotification({
  //   title: "Success!",
  //   message: "Your profile image was successfully uploaded",
  //   status: "success",
  // });
  // } catch (error) {
  //   notificationCtx.showNotification({
  //     title: "Error!",
  //     message: error.message || "Something went wrong!",
  //     status: "error",
  //   });
  // }
  //};
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
          <label htmlFor="myFile">Select File, Upload a .png or .jpg</label>
          <input
            type="file"
            id="myFile"
            name="filename"
            accept="image/png, image/jpeg"
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

// blogsRouter.post("/", async (req, res, next) => {
//   const upload = uploadFunc(9000000);
//   console.log("started....");

//   upload(req, res, async (err) => {
//     if (err) {
//       //res.json({ msg: err });
//       return res.status(401).json({ error: err });
//     } else {
//       if (req.file == undefined) {
//         // res.json({ msg: "Error-no file selected" });
//         console.log("no file selectedddddd");
//         handleCreateBlog(req, res, "");
//         return res.status(204).end();
//         //return res.status(401).json({ error: "Error-no file selected" });
//       } else {
//         const file = req.file;

//         const dimensions = sizeOf(`upload/${file.filename}`); // replace with your image
//         console.log(dimensions.width, dimensions.height, "demensions");

//         console.log({ file });
//         const result = await uploadFile(file);
//         console.log({ result });
//         await unlinkFile(file.path);
//         // const description = req.body.description;
//         // console.log(description);
//         const imageid = `/api/blogs/images/${result.key}`;
//         // handleRegister(req.body, imageid, res);
//         handleCreateBlog(req, res, imageid);
//         //res.json({ imagePath: `/api/users/images/${result.key}` });
//       }
//     }
//   });
// });

// const sizeOf = require("image-size");
// const fs = require("fs");
// const util = require("util");
// const unlinkFile = util.promisify(fs.unlink);
// const {
//   uploadFile,
//   getFileStream,
//   uploadFunc,
//   deleteFile,
// } = require("../utils/s3-services");

// onst create = async (newObject) => {
//   const config = {
//     headers: { Authorization: token },
//   };
//   //const formData = new FormData();
//   formData.append("image", image);
//   const response = await axios.post(baseUrl, newObject, {
//     headers: { Authorization: token, "Content-Type": "multipart/form-data" },
//   });
//   console.log({ config });
//   return response.data;
// };
