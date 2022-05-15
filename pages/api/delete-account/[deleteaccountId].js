import {
  connectDatabase,
  insertDocument,
  getAllDocuments,
  updateDocument,
  deleteDocument,
  deleteDocumentProfile,
} from "../../../helpers/db-utils";

import { hashPassword, verifyPassword } from "../../../helpers/auth";
// import {connectDatabase} from  "../../helpers/db-utils"
import { getSession } from "next-auth/client";

const ObjectId = require("mongodb").ObjectID;

async function handler(req, res) {
  const deleteaccountId = req.query.deleteaccountId;
  const session = await getSession({ req: req });
  const adminArray = ["asonbede@gmail.com", "donald@gmail.com", "asonbede"];
  if (!session) {
    res.status(401).json({ message: "Not authenticated!" });
    return;
  }
  let client;

  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed!" });
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

    //const userEmail = session.user.email;
    //const oldPassword = req.body.oldPassword;
    //const newPassword = req.body.newPassword;

    //const client = await connectDatabase();

    const usersCollection = client.db().collection("users");

    const userUrl = await usersCollection.findOne({
      username: deleteaccountId,
    });

    if (!userUrl) {
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

    const currentPassword = userUrl.password;
    const userEmail = userUrl.email;
    const userIdValue = userUrl._id;

    const passwordsAreEqual = await verifyPassword(password, currentPassword);

    if (!passwordsAreEqual) {
      if (adminArray.includes(username)) {
        const currentPasswordAmin = usernameResult.password;
        const passwordsAreEqualAdmin = await verifyPassword(
          password,
          currentPasswordAmin
        );
        if (!passwordsAreEqualAdmin) {
          res.status(403).json({ message: "Invalid password." });
          client.close();
          return;
        }
      } else {
        res.status(403).json({ message: "Invalid operation." });
        client.close();
        return;
      }
    }
    console.log({ userEmail }, "delete-add");
    try {
      const documents = await deleteDocumentProfile(
        client,
        "users",
        "email",
        userEmail
      );
      // const documentsPost = await deleteDocument(
      //   client,
      //   "postTable",
      //   "authorId",
      //   userEmail
      // );ason
      // const documentsQuestions = await deleteDocument(
      //   client,
      //   "questions",
      //   "authorId",
      //   userEmail
      // );

      // const documentsComments = await deleteDocument(
      //   client,
      //   "comments",
      //   "authorId",
      //   userEmail
      // );
      res.status(200).json({ post: documents });
    } catch (error) {
      res.status(500).json({ message: "Deleting account failed." });
    }
  }

  client.close();
}

export default handler;
