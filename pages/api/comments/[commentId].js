// import {
//   connectDatabase,
//   insertDocument,
//   getAllDocuments,
// } from "../../../helpers/db-utils";
//const ObjectId = require("mongodb").ObjectID;
import {
  getAllFeaturedDocuments,
  connectDatabase,
  insertDocument,
} from "../../../helpers/db-utils";

async function handler(req, res) {
  const blogId = req.query.commentId;

  let client;

  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed!" });
    return;
  }

  if (req.method === "POST") {
    const { email, name, text } = req.body;

    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input." });
      client.close();
      return;
    }

    const newComment = {
      email,
      name,
      text,
      blogId,
    };

    let result;

    try {
      result = await insertDocument(client, "comments", newComment);
      //newComment._id = result.insertedId;
      res.status(201).json({ message: "Added comment.", comment: newComment });
    } catch (error) {
      res.status(500).json({ message: "Inserting comment failed!" });
    }
  }

  if (req.method === "GET") {
    //const o_id = new ObjectId(blogId);
    console.log({ blogId }, "incomments");
    try {
      const documents = await getAllFeaturedDocuments(
        client,
        "comments",
        {
          _id: -1,
        },
        { blogId: blogId }
      );
      //const documents = await getAllDocuments(client, "comments", { _id: -1 });
      res.status(200).json({ comments: documents });
    } catch (error) {
      res.status(500).json({ message: "Getting comments failed." });
    }
  }

  client.close();
}

export default handler;
