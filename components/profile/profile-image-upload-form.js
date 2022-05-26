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
  function logoutHandler() {
    signOut();
    router.replace("/auth");
  }
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
  console.log({ radioButtonValue }, "off-upload");
  async function handleUpload(event) {
    event.preventDefault();
    // Object.defineProperty(file, "name", {
    //   writable: true,
    //   value: `${session.user.email}-${session.user.name.replace(/" "/g, "-")}`,
    // });
    // optional: add client-side validation
    console.log({ radioButtonValue }, "on-upload");
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
        message: `${
          radioButtonValue === "profile-image"
            ? "Your profile image was saved! You have to login again"
            : "Your blog image url has been displayed"
        }`,
        status: "success",
      });
      if (radioButtonValue === "profile-image") {
        //router.push("/writers");
        logoutHandler();
      }
    } catch (error) {
      notificationCtx.showNotification({
        title: "Error!",
        message: error.message || "Something went wrong!",
        status: "error",
      });
    }
  }

  const handleRadioButtonChange = (e) => {
    setradioButtonValue(e.target.value);
  };
  return (
    <>
      {/* <form
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
          <label htmlFor="blog-image-url-display">Url of selected image</label>
          <input
            type="text"
            id="blog-image-url-display"
            value={urlfileUploaded}
            onChange={() => console.log("input changed")}
          />

          <hr />
        </div>
        <div>
          <label htmlFor="profile-image-type">
            <input
              type="radio"
              name="image-type"
              value="profile-image"
              id="profile-image-type"
              defaultChecked
              onChange={handleRadioButtonChange}
            />
            Profile Image
          </label>

          <label htmlFor="blog-image-type">
            <input
              type="radio"
              name="image-type"
              value="blog-image"
              id="blog-image-type"
              onChange={handleRadioButtonChange}
            />
            Blog Image
          </label>
        </div>
        <hr />
        <div className={classes.action}>
          <button type="submit">Submit</button>
        </div>
      </form> */}
      <div
        class="modal fade"
        id="imageupload"
        tabindex="-2"
        aria-labelledby="enrollLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="enrollLabelImage">
                Upload Image
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <p class="lead">Fill out this form to upload your image</p>
              <form onSubmit={handleUpload}>
                <div class="mb-3">
                  <label htmlFor="myFile" class="form-label">
                    Select File To Upload
                  </label>
                  <input
                    class="form-control form-control-lg"
                    type="file"
                    id="myFile"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                    required
                  />
                </div>
                <hr style={{ border: "2px solid blue" }} />
                <div class="mb-3">
                  <label for="blog-image-url-display" class="col-form-label">
                    Url of selected image
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="blog-image-url-display"
                    value={urlfileUploaded}
                    onChange={() => console.log("input changed")}
                  />
                </div>
                <hr style={{ border: "2px solid blue" }} />
                <div class="form-check  form-check-inline justify-content-around">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="image-type"
                    value="blog-image"
                    id="blog-image-type"
                    onChange={handleRadioButtonChange}
                  />
                  <label class="form-check-label" for="blog-image-type">
                    Blog Image
                  </label>
                </div>
                <div class="form-check  form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="image-type"
                    value="profile-image"
                    id="profile-image-type"
                    defaultChecked
                    onChange={handleRadioButtonChange}
                  />
                  <label class="form-check-label" htmlFor="profile-image-type">
                    Profile Image
                  </label>
                </div>
                <div class="modal-body">
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button class="btn btn-primary">Submit</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

//  <div
//    class="modal fade"
//    id="enroll"
//    tabindex="-1"
//    aria-labelledby="enrollLabel"
//    aria-hidden="true"
//  >
//    <div class="modal-dialog">
//      <div class="modal-content">
//        <div class="modal-header">
//          <h5 class="modal-title" id="enrollLabel">
//            Enrollment
//          </h5>
//          <button
//            type="button"
//            class="btn-close"
//            data-bs-dismiss="modal"
//            aria-label="Close"
//          ></button>
//        </div>
//        <div class="modal-body">
//          <p class="lead">Fill out this form and we will get back to you</p>
//          <form>
//
//            <div class="mb-3">
//              <label for="last-name" class="col-form-label">
//                Last Name:
//              </label>
//              <input type="text" class="form-control" id="last-name" />
//            </div>
//            <div class="mb-3">
//              <label for="email" class="col-form-label">
//                Email:
//              </label>
//              <input type="email" class="form-control" id="email" />
//            </div>
//            <div class="mb-3">
//              <label for="phone" class="col-form-label">
//                Phone:
//              </label>
//              <input type="tel" class="form-control" id="phone" />
//            </div>
//          </form>
//        </div>
//        <div class="modal-footer">
//          <button
//            type="button"
//            class="btn btn-secondary"
//            data-bs-dismiss="modal"
//          >
//            Close
//          </button>
//          <button data-bs-dismiss="modal" type="button" class="btn btn-primary">
//            Submit
//          </button>
//        </div>
//      </div>
//    </div>
//  </div>;
