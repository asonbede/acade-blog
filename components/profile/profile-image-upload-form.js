import React, { useContext, useState } from "react";
import classes from "./profile-image-upload-form.module.css";
//import NotificationContext from "../../store/notification-context";
import NotificationContext from "../../store/notification-context";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/client";
async function sendImageData(blogDetails, setFunc) {
  const response = await fetch("/api/images/profile-image", {
    method: "POST",
    body: blogDetails,
    // headers: {
    //   "Content-Type": "multipart/form-data",
    // },
  });

  const data = await response.json();
  console.log({ data }, "new uploadddd");
  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }
  setFunc(data.message);
}

export default function ProfileImageUploadform() {
  const [file, setfile] = useState();
  const [fileName, setfileName] = useState();
  const [fileType, setfileType] = useState();
  const [urlfileUploaded, setUrlfileUploaded] = useState("");
  const [radioButtonValue, setradioButtonValue] = useState("profile-image");
  const notificationCtx = useContext(NotificationContext);
  const router = useRouter();
  const [session, loading] = useSession();
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
    //const fileObj= fileEle.files[0]

    setfile(fileEle.files[0]);
  };

  async function handleUpload(event) {
    event.preventDefault();
    // Object.defineProperty(file, "name", {
    //   writable: true,
    //   value: `${session.user.email}-${session.user.name.replace(/" "/g, "-")}`,
    // });
    // optional: add client-side validation
    setUrlfileUploaded("");
    const formData = new FormData();
    formData.append("image", file);
    formData.append("actionType", radioButtonValue);

    //setRequestStatus("pending");
    notificationCtx.showNotification({
      title: "Sending profile image...",
      message: "Your profile image is currently being stored into a database.",
      status: "pending",
    });

    try {
      await sendImageData(formData, setUrlfileUploaded);

      notificationCtx.showNotification({
        title: "Success!",
        message: "Your image was saved!",
        status: "success",
      });
      router.push("/writers");
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
  //     // const formDataItems = { acl: "public-read", ...fields, file };
  //     // console.log({ formDataItems });
  //     let formData = new FormData();
  //     //formData.append("acl", "public-read");
  //     console.log({ file });
  //     formData.append("acl", "public-read");
  //     Object.entries({ ...fields, file }).forEach(([key, value]) => {
  //       //console.log({ key, value });
  //       formData.append(key, value);
  //     });
  //     console.log({ formData });
  //     // for (var key of formData.entries()) {
  //     //   console.log(key[0] + ", " + key[1]);
  //     // }

  //     // Object.keys(fields).forEach((key) => {
  //     //   formData.append(key, fields[key]);
  //     // });
  //     // Actual file has to be appended last.
  //     formData.append("file", file);
  //     const upload = await fetch(url, {
  //       method: "POST",
  //       body: file,
  //       headers: {
  //         "Content-Type": false,
  //         "Content-Length": formData.entries().length,
  //       },
  //     });
  //     setUrlfileUploaded(`${upload.url}/${file.name}`);
  //     if (upload.ok) {
  //       console.log("Uploaded successfully");
  //       console.log({ urlfileUploaded });
  //     } else {
  //       console.error("Upload failed");
  //     }
  //   } catch (error) {
  //     console.log("something went wrong");
  //   }
  // };

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
  const handleRadioButtonChange = (e) => {
    setradioButtonValue(e.target.value);
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
          <label htmlFor="myFile">Select File, Upload a .png or .jpg</label>
          <input
            type="file"
            id="myFile"
            name="image"
            accept="image/*"
            onChange={handleChange}
          />
        </div>
        <hr />
        <div className={classes.control}>
          <label htmlFor="blog-image-url-display">
            Select File, Upload a .png or .jpg
          </label>
          <input
            type="text"
            id="blog-image-url-display"
            value={urlfileUploaded}
            onChange={() => console.log("input changed")}
          />
        </div>
        <hr />
        <div className={classes.control}>
          <input
            type="radio"
            name="image-type"
            value="profile-image"
            id="profile-image-type"
            selected
            onChange={handleRadioButtonChange}
          />
          <label htmlFor="blog-image-type">Profile Image</label>
          <input
            type="radio"
            name="image-type"
            value="blog-image"
            id="blog-image-type"
            onChange={handleRadioButtonChange}
          />
          <label htmlFor="profile-image-type">Blog Image</label>
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
