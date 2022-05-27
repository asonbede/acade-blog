import { Fragment } from "react";
import Head from "next/head";

// import ContactForm from "../components/contact/contact-form";
import Testimonial from "../components/home-page/testimonial";
import { connectDatabase, getAllDocuments } from "../helpers/db-utils";
function ReviewTestimonialPage(props) {
  return (
    <>
      <Head>
        <title>testimonial</title>
        <meta name="description" content="testimonial/review" />
      </Head>
      <div class="row justify-content-center align-items-center bg-primary">
        <div class="col-10">
          <div
            class="card"
            style={{ backgroundColor: "#ef8172", height: "100vh" }}
          >
            <div class="card-body text-center">
              <Testimonial
                allUsersDocumentsProcessed={props.allUsersDocumentsProcessed}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
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
