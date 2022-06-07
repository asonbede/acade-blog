// import { useContext, useEffect, useState } from "react";

// import QuestionsList from "./questions-list";
// import NewQuestion from "./new-questions-form";
// import classes from "./questions.module.css";
// import NotificationContext from "../../store/notification-context";
// import { useRouter } from 'next/router';
// function Questions(props) {
//   const { items } = props;
//  const blogId = router.query.questionId
//   const notificationCtx = useContext(NotificationContext);

//   const [showQuestions, setShowQuestions] = useState(false);
//   const [questions, setQuestions] = useState([]);
//   const [isFetchingQuestions, setIsFetchingQuestions] = useState(false);

//   useEffect(() => {
//     if (showQuestions) {
//       setIsFetchingQuestions(true);
//       fetch("/api/questions/" + blogId)
//         .then((response) => response.json())
//         .then((data) => {
//           setQuestions(data.questions);
//           setIsFetchingQuestions(false);
//         });
//     }
//   }, [showQuestions]);

//   function toggleQuestionsHandler() {
//     setShowQuestions((prevStatus) => !prevStatus);
//   }

//   function addQuestionHandler(questionData) {
//     notificationCtx.showNotification({
//       title: "Sending questions...",
//       message: "Your question is currently being stored into a database.",
//       status: "pending",
//     });

//     fetch("/api/questions/" + blogId, {
//       method: "POST",
//       body: JSON.stringify(questionData),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//       .then((response) => {
//         if (response.ok) {
//           return response.json();
//         }

//         return response.json().then((data) => {
//           throw new Error(data.message || "Something went wrong!");
//         });
//       })
//       .then((data) => {
//         notificationCtx.showNotification({
//           title: "Success!",
//           message: "Your question was saved!",
//           status: "success",
//         });
//       })
//       .catch((error) => {
//         notificationCtx.showNotification({
//           title: "Error!",
//           message: error.message || "Something went wrong!",
//           status: "error",
//         });
//       });
//   }

//   return (
//     <section className={classes.questions}>
//       <button onClick={toggleQuestionsHandler}>
//         {showQuestions ? "Hide" : "Show"} Questions
//       </button>

//       {showQuestions && !isFetchingQuestions && (
//         <QuestionsList items={items} />
//       )}
//       {showQuestions && isFetchingQuestions && <p>Loading questions...</p>}
//       {showQuestions && <NewQuestion onAddQuestion={addQuestionHandler} />}
//     </section>
//   );
//     }
import Questions from "../../../components/questions/questions";
import { useRouter } from "next/router";
//const ObjectId = require("mongodb").ObjectID;
import {
  connectDatabase,
  // getAllDocuments,
  getAllFeaturedDocuments,
} from "../../../helpers/db-utils";
function ShowQuestions(props) {
  const router = useRouter();

  //const { query } = useRouter();
  //const blogId = router.query.questionsBlog;
  const questionType = router.query.questionType;
  //console.log({ questionType, blogId }, "from question route");
  const { items, subjects, quesForm, blogId } = props;
  console.log({ items, subjects, quesForm, blogId }, "question-bede");
  return (
    <Questions
      questions={items}
      blogId={blogId}
      questionType={questionType}
      subjects={subjects}
      quesForm={quesForm}
    />
  );
}

export async function getServerSideProps(context) {
  try {
    const { params } = context;
    const { questionsBlog } = params;
    console.log({ questionsBlog });
    console.log(typeof questionsBlog, "GET TYPE");
    console.log(questionsBlog[1], "GET TYPE2");

    //const postData = getPostData(slug);
    //const o_id = new ObjectId(questionsBlog);

    let client;

    //try {
    client = await connectDatabase();
    // } catch (error) {
    //   res.status(500).json({ message: "Connecting to the database failed!" });
    //   return;
    // }

    //try {
    //const document = await getOneDocument(client, "postTable", slug);
    //   res.status(200).json({ post: document });
    // } catch (error) {
    //   res.status(500).json({ message: "Getting comments failed." });
    // }

    const questionsDoc = await getAllFeaturedDocuments(
      client,
      "questions",
      { _id: 1 },
      { blogId: questionsBlog[0] }
    );

    client.close();
    //console.log({ questionsDoc });
    //  const trimedDocuments=    documents.map((document) => {
    //       return {
    //         title: document.title,
    //         date: document.date,

    //         image: document.image,
    //         excerpt: document.excerpt,
    //         content: document.content,
    //         id: document._id.toString(),
    //       };
    //  }),
    //const postData= trimedDocuments.find(trimedDocument=>trimedDocument.id===slug)
    // console.log("coome", { document });
    // const postData = {
    //   title: document.title,
    //   date: document.date,
    //   image: document.image,
    //   excerpt: document.excerpt,
    //   content: document.content,
    //   id: document._id.toString(),
    // };

    return {
      props: {
        items: JSON.parse(JSON.stringify(questionsDoc)),
        quesForm: questionsBlog[1],
        subjects: questionsBlog.slice(1),
        blogId: questionsBlog[0],
      },
      // revalidate: 600,
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }

  // export async function getStaticPaths() {
  //   let client;

  //   client = await connectDatabase();
  //   const documents = await getAllDocuments(client, "postTable", { _id: 1 });

  //   client.close();

  //   //  const trimedDocuments=    documents.map((document) => {
  //   //       return {
  //   //         title: document.title,
  //   //         date: document.date,

  //   //         image: document.image,
  //   //         excerpt: document.excerpt,
  //   //         content: document.content,
  //   //         id: document._id.toString(),
  //   //       };
  //   //  }),

  //   return {
  //     paths: documents.map((question) => ({
  //       params: { questionsBlog: question._id.toString() },
  //     })),
  //     fallback: false,
  //   };
  // }

  //export const getServerSideProps = async () => {
  // try {
  //   console.log("CONNECTING TO MONGO");
  //   await connectMongo();
  //   console.log("CONNECTED TO MONGO");

  //   console.log("FETCHING DOCUMENTS");
  //   const tests = await Test.find();
  //   console.log("FETCHED DOCUMENTS");

  //   return {
  //     props: {
  //       tests: JSON.parse(JSON.stringify(tests)),
  //     },
  //   };
  // } catch (error) {
  //   console.log(error);
  //   return {
  //     notFound: true,
  //   };
  // }
}
export default ShowQuestions;
