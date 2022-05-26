import {
  connectDatabase,
  insertDocument,
  getAllDocuments,
  updateDocument,
  deleteDocument,
} from "../../helpers/db-utils";
// import {connectDatabase} from  "../../helpers/db-utils"
import { getSession } from "next-auth/client";
const ObjectId = require("mongodb").ObjectID;

async function handler(req, res) {
  //const eventId = req.query.eventId;

  let client;

  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed!" });
    return;
  }

  if (req.method === "POST") {
    const {
      title,
      date,
      image,
      excerpt,
      content,
      isFeatured,
      author,
      authorId,
      moderated,
      category,
      orderValue,
      imageProfileUrl,
      authorusername,
    } = req.body;

    if (
      !title ||
      title.trim() === "" ||
      !date ||
      date.trim() === "" ||
      !image ||
      image.trim() === "" ||
      !excerpt ||
      excerpt.trim() === "" ||
      !content ||
      content.trim() === "" ||
      !category ||
      category.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input." });
      client.close();
      return;
    }

    const newPost = {
      title,
      date,
      image,
      excerpt,
      content,
      isFeatured,
      author,
      authorId,
      moderated,
      category,
      orderValue,
      imageProfileUrl,
      authorusername,
    };

    let result;

    try {
      result = await insertDocument(client, "postTable", newPost);
      // newPost._id = result.insertedId;
      res.status(201).json({ message: "Added contents.", post: newPost });
    } catch (error) {
      res.status(500).json({ message: "Inserting content failed!" });
    }
  }

  if (req.method === "PUT") {
    const {
      title,
      date,
      image,
      excerpt,
      content,
      isFeatured,
      blogId,
      author,
      authorId,
      moderated,
      category,
      orderValue,
      imageProfileUrl,
      authorusername,
      updateDate,
    } = req.body;

    if (
      !title ||
      title.trim() === "" ||
      !date ||
      date.trim() === "" ||
      !image ||
      image.trim() === "" ||
      !excerpt ||
      excerpt.trim() === "" ||
      !content ||
      content.trim() === "" ||
      !category ||
      category.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input." });
      client.close();
      return;
    }

    const newPost = {
      title,
      date,
      image,
      excerpt,
      content,
      isFeatured,
      author,
      authorId,
      moderated,
      category,
      orderValue,
      imageProfileUrl,
      authorusername,
      updateDate,
    };

    let result;

    try {
      //updateDocument(client, collection, queryValue,updateValue)
      result = await updateDocument(client, "postTable", blogId, newPost);
      // newPost._id = result.insertedId;
      res.status(201).json({ message: "Added contents.", post: newPost });
    } catch (error) {
      res.status(500).json({ message: "Inserting content failed!" });
    }
  }

  if (req.method === "GET") {
    try {
      const documents = await getAllDocuments(client, "postTable", { _id: -1 });
      res.status(200).json({ post: documents });
    } catch (error) {}
  }
  if (req.method === "DELETE") {
    const { blogId } = req.body;
    try {
      const documents = await deleteDocument(
        client,
        "postTable",
        "_id",
        blogId
      );
      const documentsQuestions = await deleteDocument(
        client,
        "questions",
        "blogId",
        blogId
      );
      res.status(200).json({ post: documents });
    } catch (error) {
      res.status(500).json({ message: "Deleting blog failed." });
    }
  }
  if (req.method === "PATCH") {
    const { id, likes } = req.body;
    const o_id = new ObjectId(id);
    const session = await getSession({ req: req });

    if (!session) {
      res.status(401).json({ message: "Not authenticated!" });
      return;
    }

    const client = await connectDatabase();

    const usersCollection = client.db().collection("postTable");

    const result = await usersCollection.updateOne(
      { _id: o_id },
      { $set: { likes: likes } }
    );

    client.close();
    res.status(200).json({ message: "like updated!" });
  }

  client.close();
}

export default handler;
