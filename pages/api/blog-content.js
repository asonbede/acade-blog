import {
  connectDatabase,
  insertDocument,
  getAllDocuments,
} from "../../helpers/db-utils";
// import {connectDatabase} from  "../../helpers/db-utils"

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
    const { title, date, image, excerpt, content, isFeatured } = req.body;

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
      content.trim() === ""
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

  if (req.method === "GET") {
    try {
      const documents = await getAllDocuments(client, "postTable", { _id: -1 });
      res.status(200).json({ post: documents });
    } catch (error) {
      res.status(500).json({ message: "Getting comments failed." });
    }
  }

  client.close();
}

export default handler;
