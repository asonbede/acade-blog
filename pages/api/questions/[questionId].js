import {
  connectDatabase,
  insertDocument,
  getAllDocuments,
  getAllFeaturedDocuments,
  validateQuestionOptions,
  updateDocument,
  deleteDocument,
} from "../../../helpers/db-utils";

async function handler(req, res) {
  const blogId = req.query.questionId;
  console.log({ blogId }, "in api");
  let client;

  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed!" });
    return;
  }

  if (req.method === "POST" && req.body.questType !== "essay-type") {
    const { question, options, explanation, correctOption } = req.body;

    if (
      !question ||
      question.trim() === "" ||
      !options ||
      !validateQuestionOptions ||
      !explanation ||
      explanation.trim() === "" ||
      !correctOption ||
      correctOption.trim() === ""
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
    };

    let result;

    try {
      result = await insertDocument(client, "questions", newQuestion);
      //newComment._id = result.insertedId;
      res
        .status(201)
        .json({ message: "Added question.", question: newQuestion });
    } catch (error) {
      res.status(500).json({ message: "Inserting question failed!" });
    }
  } else if (req.method === "POST" && req.body.questType === "essay-type") {
    const { question, explanation, questType } = req.body;

    if (
      !question ||
      question.trim() === "" ||
      !explanation ||
      explanation.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input." });
      client.close();
      return;
    }

    const newQuestion = {
      question,

      explanation,
      questType,

      blogId,
    };

    let result;

    try {
      result = await insertDocument(client, "questions", newQuestion);
      //newComment._id = result.insertedId;
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

  if (req.method === "PUT") {
    const questionIdForUpdate = req.query.questionId;
    console.log({ questionIdForUpdate });
    const {
      question,
      options,

      explanation,
      correctOption,
      blogId,
    } = req.body;

    if (
      !question ||
      question.trim() === "" ||
      !explanation ||
      explanation.trim() === "" ||
      !correctOption ||
      correctOption.trim() === ""
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
