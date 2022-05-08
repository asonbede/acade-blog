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
  const session = await getSession({ req: req });

  if (!session) {
    res.status(401).json({ message: "Not authenticated!" });
    return;
  }

  if (req.method === "DELETE") {
    const { username, password } = req.body;
    if (
      !username ||
      username.trim() === "" ||
      !password ||
      password.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input." });
      client.close();
      return;
    }

    const userEmail = session.user.email;
    //const oldPassword = req.body.oldPassword;
    //const newPassword = req.body.newPassword;

    let client;

    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: "Connecting to the database failed!" });
      return;
    }

    //const client = await connectDatabase();

    const usersCollection = client.db().collection("users");

    const user = await usersCollection.findOne({ email: userEmail });

    if (!user) {
      res.status(404).json({ message: "User not found." });
      client.close();
      return;
    }

    const usernameResult = await usersCollection.findOne({
      username: username,
    });

    if (!usernameResult) {
      res.status(404).json({ message: "User not found." });
      client.close();
      return;
    }

    const currentPassword = user.password;

    const passwordsAreEqual = await verifyPassword(password, currentPassword);

    if (!passwordsAreEqual) {
      res.status(403).json({ message: "Invalid password." });
      client.close();
      return;
    }

    try {
      const documents = await deleteDocument(
        client,
        "users",
        "email",
        userEmail
      );
      const documentsPost = await deleteDocument(
        client,
        "postTable",
        "authorId",
        userEmail
      );
      const documentsQuestions = await deleteDocument(
        client,
        "questions",
        "authorId",
        userEmail
      );

      const documentsComments = await deleteDocument(
        client,
        "comments",
        "authorId",
        userEmail
      );
      res.status(200).json({ post: documents });
    } catch (error) {
      res.status(500).json({ message: "Deleting blog failed." });
    }
  }

  client.close();
}

export default handler;
