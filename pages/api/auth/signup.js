import { hashPassword, verifyPassword } from "../../../helpers/auth";
import { connectDatabase } from "../../../helpers/db-utils";
import { getSession } from "next-auth/client";
async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const { email, password, name, interest, moderated, username } = data;

    if (
      !email ||
      !email.includes("@") ||
      email.trim() === "" ||
      !password ||
      password.trim().length < 7 ||
      !name ||
      name.trim() === "" ||
      !interest ||
      interest.trim() === "" ||
      !username ||
      username.trim() === ""
    ) {
      res.status(422).json({
        message: "Invalid input - please check your input and try again.",
      });
      return;
    }

    const client = await connectDatabase();

    const db = client.db();

    const existingUserEmail = await db
      .collection("users")
      .findOne({ email: email });

    if (existingUserEmail) {
      res.status(422).json({ message: "User with that email exists already!" });
      client.close();
      return;
    }

    const existingUsername = await db
      .collection("users")
      .findOne({ username: username });

    if (existingUsername) {
      res
        .status(422)
        .json({ message: "User with that username exists already!" });
      client.close();
      return;
    }

    const hashedPassword = await hashPassword(password);

    const result = await db.collection("users").insertOne({
      email: email,
      password: hashedPassword,

      name: name,
      interest: interest,
      moderated: moderated,
      username: username,
    });

    res.status(201).json({ message: "Created user!" });
    client.close();
  }

  if (
    req.method === "PATCH" &&
    req.body.actionType === "updateInterestAndName"
  ) {
    //}
    console.log("isideeee patchhhhhh11");
    const session = await getSession({ req: req });

    if (!session) {
      res.status(401).json({ message: "Not authenticated!" });
      return;
    }

    const userEmail = session.user.email;
    const enteredPassword = req.body.password;
    const updatedInterest = req.body.interest;
    const updatedName = req.body.name;
    const moderated = req.body.moderated;
    const username = req.body.username;
    //const newPassword = req.body.newPassword;

    const client = await connectDatabase();

    const usersCollection = client.db().collection("users");

    const user = await usersCollection.findOne({ email: userEmail });
    console.log("isideeee patchhhhhh2222");
    if (!user) {
      res.status(404).json({ message: "User not found." });
      client.close();
      return;
    }

    const currentPassword = user.password;
    console.log("isideeee patchhhhhh333");
    const passwordsAreEqual = await verifyPassword(
      enteredPassword,
      currentPassword
    );

    if (!passwordsAreEqual) {
      res.status(403).json({ message: "Invalid password." });
      client.close();
      return;
    }

    //const hashedPassword = await hashPassword(newPassword);

    const result = await usersCollection.updateOne(
      { email: userEmail },
      {
        $set: {
          interest: updatedInterest,
          name: updatedName,
          moderated,
          username,
        },
      }
    );
    console.log("isideeee patchhhhhh4444");
    client.close();
    res.status(200).json({ message: "Password updated!" });
  }

  if (req.method === "PATCH" && req.body.actionType === "approve-profile") {
    const adminArray = [process.env.admin_1, process.env.admin_2];
    console.log("isideeee patchhhhhh11");
    const session = await getSession({ req: req });

    if (!session) {
      res.status(401).json({ message: "Not authenticated!" });
      return;
    }

    if (!adminArray.includes(session.user.email)) {
      res.status(401).json({ message: "Not authenticated!" });
      return;
    }

    //const userEmail = session.user.email;
    const userEmail = req.body.email;
    const updatedInterest = req.body.interest;
    const updatedName = req.body.name;
    const moderated = req.body.moderated;
    //const newPassword = req.body.newPassword;

    const client = await connectDatabase();

    const usersCollection = client.db().collection("users");

    const user = await usersCollection.findOne({ email: userEmail });
    console.log("isideeee patchhhhhh2222");
    if (!user) {
      res.status(404).json({ message: "User not found." });
      client.close();
      return;
    }

    // const currentPassword = user.password;
    // console.log("isideeee patchhhhhh333");
    // const passwordsAreEqual = await verifyPassword(
    //   enteredPassword,
    //   currentPassword
    // );

    // if (!passwordsAreEqual) {
    //   res.status(403).json({ message: "Invalid password." });
    //   client.close();
    //   return;
    // }

    //const hashedPassword = await hashPassword(newPassword);

    const result = await usersCollection.updateOne(
      { email: userEmail },
      { $set: { interest: updatedInterest, name: updatedName, moderated } }
    );
    console.log("isideeee patchhhhhh4444");
    client.close();
    res.status(200).json({ message: "Password updated!" });
  }
}

export default handler;
