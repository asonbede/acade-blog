import { Fragment } from "react";
import Head from "next/head";

// import ContactForm from "../components/contact/contact-form";
import Testimonial from "../components/home-page/testimonial";
import { connectDatabase, getAllDocuments } from "../helpers/db-utils";
import ReviewTestimonialform from "../components/profile/review-testimonial";

import { useSession, signOut } from "next-auth/client";
// import { useRouter } from "next/router";
// import MenuButton from "../auth/menu-button";
// import NotificationContext from "../../store/notification-context";

function ReviewTestimonialPage(props) {
  const [session, loading] = useSession();
  let review;
  if (session) {
    review = props.allUsersDocumentsProcessed.find(
      (item) => item.email === session.user.email
    );
  }

  //const [session, loading] = useSession();
  async function onChangeReview(reviewData) {
    const response = await fetch("/api/user/review", {
      method: "PATCH",
      body: JSON.stringify(reviewData),
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
        <title>testimonial</title>
        <meta name="description" content="testimonial/review" />
      </Head>
      <div
        class="row justify-content-center align-items-center"
        style={{ backgroundColor: "#ff4d67" }}
      >
        <div class="col-10">
          <div
            class="card"
            style={{
              backgroundColor: "#ef8172",
              height: "100vh",
              overflow: "auto",
            }}
          >
            <div class="card-body text-center">
              <Testimonial
                allUsersDocumentsProcessed={props.allUsersDocumentsProcessed}
              />

              <button
                data-bs-toggle="modal"
                data-bs-target="#reviewTestimonial"
                className="btn btn-outline-light  mt-2"
              >
                Write/update Review
              </button>
            </div>
          </div>
        </div>
        <ReviewTestimonialform
          onChangeReview={onChangeReview}
          review={review ? review.review : ""}
        />
      </div>
    </>
  );
}

{
  /* <Link href="/posts">
  <a class="btn btn-outline-light btn-btn-block mt-2">See More Articles</a>
</Link>; */
}
export async function getStaticProps() {
  let client;

  client = await connectDatabase();

  const allUsersDocuments = await getAllDocuments(client, "users", {
    _id: 1,
  });

  const allUsersDocumentsProcessed = allUsersDocuments.map((document) => {
    return {
      id: document._id.toString(),
      email: document.email,
      username: document.username
        ? document.username
        : "asonye-bede-aka-happy-teacher",
      name: document.name,
      interest: document.interest,
      imageLink: document.imageLink
        ? document.imageLink
        : "/images/posts/default-profile-pic.jpg",
      moderated: document.moderated ? document.moderated : false,
      review: document.review ? document.review : "Yet to write review",
    };
  });

  client.close();

  return {
    props: {
      allUsersDocumentsProcessed,
    },
  };
}

export default ReviewTestimonialPage;
