import { useRef, useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import classes from "./profile-form.module.css";
//import NotificationContext from "../../store/notification-context";
import NotificationContext from "../../store/notification-context";

import { useSession, signOut } from "next-auth/client";

function ReviewForm(props) {
  const passwordRef = useRef();
  const reviewRef = useRef();
  const notificationCtx = useContext(NotificationContext);
  const [session, loading] = useSession();
  const [name, setName] = useState();
  const [username, setuserName] = useState();
  const [review, setreview] = useState();
  const [isSuccess, setisSuccess] = useState(true);
  const router = useRouter();
  const ref = useRef(null);
  console.log({ session });
  //   function logoutHandler() {
  //     signOut();
  //   }
  useEffect(() => {
    if (session) {
      setName(session.user.name.name);
      setuserName(session.user.name.username);
      setreview(props.review);
    }
  }, []);
  async function submitHandler(event) {
    event.preventDefault();

    const enteredPassword = passwordRef.current.value;
    // const enteredReview = reviewRef.current.value;

    // optional: Add validation

    notificationCtx.showNotification({
      title: "Submitting Review...",
      message: "Your review is currently being submitted, please wait...",
      status: "pending",
    });

    try {
      await props.onChangeReview({
        password: enteredPassword,
        review: review,
        name,
        username,
      });
      console.log(ref.current, "MODAL");
      notificationCtx.showNotification({
        title: "Success!",
        message: "Your review was successfully submitted!",
        status: "success",
      });
      // setisSuccess(false);

      ref.current.click();
      router.push("/reviews-testimonial");
    } catch (error) {
      notificationCtx.showNotification({
        title: "Error!",
        message: error.message || "Something went wrong!",
        status: "error",
      });
    }
  }

  return (
    <>
      <div
        class="modal fade"
        id="reviewTestimonial"
        tabIndex="-3"
        aria-labelledby="reviewTestimonialLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" style={{ zIndex: 0 }}>
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="reviewTestimonialLabel">
                Review/Testimonial
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <p class="lead">
                Fill out this form to write/update your review{" "}
              </p>
              <form onSubmit={submitHandler}>
                <div class="mb-3">
                  <label htmlFor="password" class="col-form-label">
                    New Password:
                  </label>
                  <input
                    class="form-control"
                    type="password"
                    id="password"
                    ref={passwordRef}
                    required
                  />
                </div>
                <div class="mb-3">
                  <label htmlFor="name" class="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="name"
                    value={name}
                  />
                </div>

                <div class="mb-3">
                  <label htmlFor="userName" class="form-label">
                    userName
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="userName"
                    value={username}
                  />
                </div>
                <div class="mb-3">
                  <label htmlFor="review" class="form-label">
                    Write your review or testimonial
                  </label>
                  <textarea
                    class="form-control"
                    id="review"
                    rows="3"
                    placeholder="What do you think about our services. Write your review or testimonial"
                    // ref={reviewRef}
                    value={review}
                    onChange={(e) => setreview(e.target.value)}
                  ></textarea>
                </div>

                <div class="modal-body">
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-bs-dismiss="modal"
                      ref={ref}
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

export default ReviewForm;
