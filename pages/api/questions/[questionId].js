import {
  connectDatabase,
  insertDocument,
  getAllDocuments,
  getAllFeaturedDocuments,
  validateQuestionOptions,
} from "../../../helpers/db-utils";

async function handler(req, res) {
  const blogId = req.query.questionId;

  let client;

  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed!" });
    return;
  }

  if (req.method === "POST") {
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
  }

  if (req.method === "GET") {
    try {
      const questions = await getAllFeaturedDocuments(
        client,
        "questions",
        { _id: -1 },
        { blogId: blogId }
      );
      res.status(200).json({ questions: questions });
    } catch (error) {
      res.status(500).json({ message: "Getting questions failed." });
    }
  }

  client.close();
}

export default handler;
