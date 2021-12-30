// s3_access_key = AKIAYWIQ6JJGDSS4WLHM
//         s3_secrete_access_key = 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
//         s3_bucket_region =  us-east-1
//         s3_bucket_name = author-students-blog-image

// import {
//     connectDatabase,
//     insertDocument,
//     getAllDocuments,
//     updateDocument,
//     deleteDocument,
//   } from "../../helpers/db-utils";

import { getSession } from "next-auth/client";
import { connectDatabase } from "../../../helpers/db-utils";
//   const ObjectId = require("mongodb").ObjectID;

import aws from "aws-sdk";
import { promisify } from "util";
import crypto from "crypto";
const randombytes = promisify(crypto.randomBytes);
const region = process.env.s3_bucket_region;
const bucketaName = process.env.s3_bucket_name;
const accessKeyId = process.env.s3_access_key;
const secretekeyId = process.s3_secrete_access_key;

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretekeyId,
  signatureVersion: "v4",
});

export async function generateUploadURL(params) {
  const rawBytes = await randombytes(16);
  const imageName = rawBytes.toString("hex");
  const params = {
    Bucket: bucketaName,
    Key: imageName,
    Expires: 120,
  };
  const uploadURL = await s3.getSignedUrlPromise("putObject", params);
  return uploadURL;
}

async function handler(req, res) {
  //const eventId = req.query.eventId;

  // let client;

  // try {
  //   client = await connectDatabase();
  // } catch (error) {
  //   res.status(500).json({ message: "Connecting to the database failed!" });
  //   return;
  // }

  // if (req.method === "POST") {
  //   const {
  //     title,
  //     date,
  //     image,
  //     excerpt,
  //     content,
  //     isFeatured,
  //     author,
  //     authorId,
  //     moderated,
  //   } = req.body;

  //   if (
  //     !title ||
  //     title.trim() === "" ||
  //     !date ||
  //     date.trim() === "" ||
  //     !image ||
  //     image.trim() === "" ||
  //     !excerpt ||
  //     excerpt.trim() === "" ||
  //     !content ||
  //     content.trim() === ""
  //   ) {
  //     res.status(422).json({ message: "Invalid input." });
  //     client.close();
  //     return;
  //   }

  //   const newPost = {
  //     title,
  //     date,
  //     image,
  //     excerpt,
  //     content,
  //     isFeatured,
  //     author,
  //     authorId,
  //     moderated,
  //   };

  //   let result;

  //   try {
  //     result = await insertDocument(client, "postTable", newPost);
  //     // newPost._id = result.insertedId;
  //     res.status(201).json({ message: "Added contents.", post: newPost });
  //   } catch (error) {
  //     res.status(500).json({ message: "Inserting content failed!" });
  //   }
  // }

  // if (req.method === "PUT") {
  //   const {
  //     title,
  //     date,
  //     image,
  //     excerpt,
  //     content,
  //     isFeatured,
  //     blogId,
  //     author,
  //     authorId,
  //     moderated,
  //   } = req.body;

  //   if (
  //     !title ||
  //     title.trim() === "" ||
  //     !date ||
  //     date.trim() === "" ||
  //     !image ||
  //     image.trim() === "" ||
  //     !excerpt ||
  //     excerpt.trim() === "" ||
  //     !content ||
  //     content.trim() === ""
  //   ) {
  //     res.status(422).json({ message: "Invalid input." });
  //     client.close();
  //     return;
  //   }

  //   const newPost = {
  //     title,
  //     date,
  //     image,
  //     excerpt,
  //     content,
  //     isFeatured,
  //     author,
  //     authorId,
  //     moderated,
  //   };

  //   let result;

  //   try {
  //     //updateDocument(client, collection, queryValue,updateValue)
  //     result = await updateDocument(client, "postTable", blogId, newPost);
  //     // newPost._id = result.insertedId;
  //     res.status(201).json({ message: "Added contents.", post: newPost });
  //   } catch (error) {
  //     res.status(500).json({ message: "Inserting content failed!" });
  //   }
  // }

  if (req.method === "GET") {
    try {
      const url = await generateUploadUrL();
      res.send({ url });

      // res.status(200).json({ post: documents });
    } catch (error) {
      res.status(500).json({ message: "getting url failed." });
    }
  }
  // if (req.method === "DELETE") {
  //   const { blogId } = req.body;
  //   try {
  //     const documents = await deleteDocument(
  //       client,
  //       "postTable",
  //       "_id",
  //       blogId
  //     );
  //     const documentsQuestions = await deleteDocument(
  //       client,
  //       "questions",
  //       "blogId",
  //       blogId
  //     );
  //     res.status(200).json({ post: documents });
  //   } catch (error) {
  //     res.status(500).json({ message: "Deleting blog failed." });
  //   }
  // }
  if (req.method === "PATCH") {
    const { imageUrl } = req.body;
    //const o_id = new ObjectId(id);
    const session = await getSession({ req: req });

    if (!session) {
      res.status(401).json({ message: "Not authenticated!" });
      return;
    }

    const client = await connectDatabase();

    const usersCollection = client.db().collection("users");

    const result = await usersCollection.updateOne(
      { email: session.user.email },
      { $set: { imageLink: imageUrl } }
    );

    client.close();
    res.status(200).json({ message: "upload was successful!" });
  }

  // client.close();
}

export default handler;
