import { getSession } from "next-auth/client";

async function handler(req, res) {
  //const eventId = req.query.eventId;
  const adminArray = [process.env.admin_1, process.env.admin_2];

  if (req.method === "POST") {
    const { authorId } = req.body;

    const session = await getSession({ req: req });

    if (!session) {
      res.status(201).json({ message: false });
      return;
    }
    if (
      session.user.email === authorId ||
      adminArray.includes(session.user.email)
    ) {
      res.status(201).json({ message: true });
      return;
    }
  }
}

export default handler;
