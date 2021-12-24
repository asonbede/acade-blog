import { hashPassword } from "../../../helpers/auth";
import { connectDatabase } from "../../../helpers/db-utils";

async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }

  const data = req.body;

  const { email, password, name, interest } = data;

  if (
    !email ||
    !email.includes("@") ||
    email.trim() === "" ||
    !password ||
    password.trim().length < 7 ||
    !name ||
    name.trim() === "" ||
    !interest ||
    interest.trim() === ""
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

  const hashedPassword = await hashPassword(password);

  const result = await db.collection("users").insertOne({
    email: email,
    password: hashedPassword,

    name: name,
    interest: interest,
  });

  res.status(201).json({ message: "Created user!" });
  client.close();
}

export default handler;
