import {
  getAllFeaturedDocuments,
  connectDatabase,
  insertDocument,
} from "../../../helpers/db-utils";
import { getSession } from "next-auth/client";
async function handler(req, res) {
  let client;

  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed!" });
    return;
  }

  if (req.method === "POST") {
    const {
      email,
      name,
      text,
      imageProfileUrlValue,
      moderated,
      authorUsername,
    } = req.body;
    const blogId = req.query.commentId;
    // email: email,
    //   name: name,
    //   text: enteredContent,
    //   imageProfileUrlValue: imageProfileUrlValue,
    //   moderated: false,
    const session = await getSession({ req: req });

    if (!session) {
      res.status(401).json({ message: "Not authenticated!" });
      return;
    }

    if (!text || text.trim() === "") {
      res.status(422).json({ message: "Invalid input." });
      client.close();
      return;
    }

    const newComment = {
      email,
      name,
      text,
      imageProfileUrlValue,
      moderated,
      blogId,
      authorUsername,
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

  if (req.method === "PUT") {
    const commentId = req.query.commentId;
    const {
      email,
      name,
      text,
      imageProfileUrlValue,
      moderated,
      blogId,
      authorUsername,
    } = req.body;

    if (!text || text.trim() === "") {
      res.status(422).json({ message: "Invalid input." });
      client.close();
      return;
    }

    const newCommentUpdate = {
      email,
      name,
      text,
      imageProfileUrlValue,
      moderated,
      blogId,
      authorUsername,
    };

    let result;

    try {
      //updateDocument(client, collection, queryValue,updateValue)
      result = await updateDocument(
        client,
        "comments",
        commentId,
        newCommentUpdate
      );
      // newPost._id = result.insertedId;
      res
        .status(201)
        .json({ message: "Added contents.", comment: newCommentUpdate });
    } catch (error) {
      res.status(500).json({ message: "Inserting content failed!" });
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
