/*
The idea here is to store,update,delete question data object from the client
on the database
The question data object for multiple choice looks like this.
{
        question: enteredQuestion,
        options: filteredOptions,
       explanation: enteredExplanation,
        correctOption: enteredCorrectOption,
        linkedTo: linkedValue,
        authorId: session.user.email,
        questionType: "multi-choice",
        moderated: false,
        subject: enteredSubject,
        examType: enteredExamType,
        questionIntroText: checkEditorText(quesIntroEdiState)
          ? enteredQuestionIntroText.trim()
          : null,
      }

*/

import {
  connectDatabase,
  insertDocument,
  getAllDocuments,
  getAllFeaturedDocuments,
  validateQuestionOptions,
  updateDocument,
  deleteDocument,
} from "../../../helpers/db-utils";
import { getSession } from "next-auth/client";

async function handler(req, res) {
  const blogId = req.query.questionId;
  console.log({ blogId }, "in api");
  let client;

  const session = await getSession({ req: req });

  if (!session) {
    res.status(401).json({ message: "Not authenticated!" });
    return;
  }

  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed!" });
    return;
  }

  //  authorId:session.user.email,
  //     questionType:"multi-choice"

  if (req.method === "POST" && req.body.questionType === "multi-choice") {
    const {
      question,
      options,
      explanation,
      correctOption,
      questionType,
      authorId,
      questionIntroText,
      linkedTo,
      moderated,
      subject,
      examType,
      authorusername,
      imageProfileUrl,
      publishedDate,
      author,
    } = req.body;

    if (
      !question ||
      question.trim() === "" ||
      !options ||
      !validateQuestionOptions(options) ||
      !explanation ||
      explanation.trim() === "" ||
      !correctOption ||
      correctOption.trim() === "" ||
      !subject ||
      subject.trim() === "" ||
      !examType ||
      examType.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input." });
      client.close();
      return;
    }

    const newQuestion = {
      question,

      options,

      explanation,

      correctOption,
      blogId,
      questionType,
      authorId,
      questionIntroText,
      linkedTo,
      moderated,
      subject,
      examType,
      authorusername,
      imageProfileUrl,
      publishedDate,
      author,
    };

    let result;

    try {
      result = await insertDocument(client, "questions", newQuestion);

      res
        .status(201)
        .json({ message: "Added question.", question: newQuestion });
    } catch (error) {
      res.status(500).json({ message: "Inserting question failed!" });
    }
  } else if (req.method === "POST" && req.body.questionType === "essay-type") {
    const {
      question,
      explanation,
      questionType,
      authorId,
      moderated,
      subject,
      authorusername,
      imageProfileUrl,

      author,
      publishedDate,
    } = req.body;

    if (
      !question ||
      question.trim() === "" ||
      !explanation ||
      explanation.trim() === "" ||
      !subject ||
      subject.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input." });
      client.close();
      return;
    }

    const newQuestion = {
      question,

      explanation,
      questionType,
      authorId,

      blogId,
      moderated,
      subject,
      authorusername,
      imageProfileUrl,

      author,
      publishedDate,
    };

    let result;

    try {
      result = await insertDocument(client, "questions", newQuestion);

      res
        .status(201)
        .json({ message: "Added question.", question: newQuestion });
    } catch (error) {
      res.status(500).json({ message: "Inserting question failed!" });
    }
  }
  if (req.method === "GET") {
    try {
      const questions = await getAllFeaturedDocuments(
        client,
        "questions",
        { _id: 1 },
        { blogId: blogId }
      );
      res.status(200).json({ questions: questions });
    } catch (error) {
      res.status(500).json({ message: "Getting questions failed." });
    }
  }

  if (req.method === "DELETE") {
    const { questionId } = req.body;
    console.log({ questionId }, "from deletee");
    try {
      const documents = await deleteDocument(
        client,
        "questions",
        "_id",
        questionId
      );

      res.status(200).json({ post: documents });
    } catch (error) {
      res.status(500).json({ message: "Deleting question failed." });
    }
  }

  if (req.method === "PUT" && req.body.questionType === "multi-choice") {
    const questionIdForUpdate = req.query.questionId;
    console.log({ questionIdForUpdate });
    const {
      question,
      options,

      explanation,
      correctOption,
      blogId,
      authorId,
      questionType,
      questionIntroText,
      linkedTo,
      moderated,
      subject,
      examType,
      updatedDate,
      authorusername,
      imageProfileUrl,
      publishedDate,
      author,
    } = req.body;
    if (
      !question ||
      question.trim() === "" ||
      !explanation ||
      explanation.trim() === "" ||
      !options ||
      !validateQuestionOptions(options) ||
      !correctOption ||
      correctOption.trim() === "" ||
      !subject ||
      subject.trim() === "" ||
      !examType ||
      examType === ""
    ) {
      res.status(422).json({ message: "Invalid input." });
      client.close();
      return;
    }

    const newPost = {
      question,
      options,

      explanation,
      correctOption,
      blogId,
      authorId,
      questionType,
      questionIntroText,
      linkedTo,
      moderated,
      subject,
      examType,
      updatedDate,
      authorusername,
      imageProfileUrl,
      publishedDate,
      author,
    };

    let result;

    try {
      console.log("before update");
      //updateDocument(client, collection, queryValue,updateValue)
      result = await updateDocument(
        client,
        "questions",
        questionIdForUpdate,
        newPost
      );
      // newPost._id = result.insertedId;
      res.status(201).json({ message: "Added contents.", post: newPost });
    } catch (error) {
      res.status(500).json({ message: "Inserting content failed!" });
    }
  } else if (req.method === "PUT" && req.body.questionType === "essay-type") {
    const questionIdForUpdate = req.query.questionId;
    console.log({ questionIdForUpdate });
    const {
      question,

      explanation,

      blogId,
      authorId,
      questionType,
      moderated,
      subject,
      authorusername,
      imageProfileUrl,

      author,

      publishedDate,
      updatedDate,
    } = req.body;

    if (
      !question ||
      question.trim() === "" ||
      !explanation ||
      explanation.trim() === "" ||
      !subject ||
      subject.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input." });
      client.close();
      return;
    }

    const newPost = {
      question,

      explanation,

      blogId,
      authorId,
      questionType,
      moderated,
      subject,
      authorusername,
      imageProfileUrl,
      publishedDate,
      author,
      updatedDate,
    };

    let result;

    try {
      console.log("before update");
      //updateDocument(client, collection, queryValue,updateValue)
      result = await updateDocument(
        client,
        "questions",
        questionIdForUpdate,
        newPost
      );
      // newPost._id = result.insertedId;
      res.status(201).json({ message: "Added contents.", post: newPost });
    } catch (error) {
      res.status(500).json({ message: "Inserting content failed!" });
    }
  }

  client.close();
}

export default handler;
