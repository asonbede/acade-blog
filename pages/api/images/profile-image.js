// s3_access_key = AKIAYWIQ6JJGDSS4WLHM
//         s3_secrete_access_key = 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
//         s3_bucket_region =  us-east-1
//         s3_bucket_name = author-students-blog-image

import {
  connectDatabase,
  insertDocument,
  getAllDocuments,
  updateDocument,
  deleteDocument,
} from "../../../helpers/db-utils";
const sizeOf = require("image-size");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);
const {
  uploadFile,
  getFileStream,
  uploadFunc,
  deleteFile,
} = require("../../../helpers/s3-folder/s3-services");

import { getSession } from "next-auth/client";
//import { connectDatabase } from "../../../helpers/db-utils";
//   const ObjectId = require("mongodb").ObjectID;
import nextConnect from "next-connect";

import multer from "multer";
//import aws from "aws-sdk";
const aws = require("aws-sdk");
//const clipb = require("copy-paste");
//import { promisify } from "util";
//import crypto from "crypto";
//import { NextApiRequest, NextApiResponse } from "next";
//import { getSession } from "next-auth/client";
//const randombytes = promisify(crypto.randomBytes);
// const region = process.env.s3_bucket_region;
// const bucketaName = process.env.s3_bucket_name;
// const accessKeyId = process.env.s3_access_key;
// const secretAccessKey = process.env.s3_secrete_access_key;

const apiRoute = nextConnect({
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method! '${req.method}' Not allowed` });
  },
});

apiRoute.post(async (req, res) => {
  const session = await getSession({ req: req });
  if (!session) {
    res.status(401).json({ message: "Not authenticated!" });
    return;
  }
  console.log(req, "from before date");
  const formattedDate = new Date().toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // const formattedDate = new Date().toLocaleDateString();

  const identityStr = `${formattedDate.replace(/ /g, "-")}-${
    session.user.email
  }-${session.user.name.replace(/ /g, "-")}`;
  console.log("from after date");
  const upload = uploadFunc(9000000, identityStr);

  upload(req, res, async (err) => {
    if (err) {
      //res.json({ msg: err });
      console.log("started....big error");
      return res.status(401).json({ error: err });
    } else {
      if (req.file == undefined) {
        // res.json({ msg: "Error-no file selected" });
        console.log("no file selectedddddd");
        //handleCreateBlog(req, res, "");
        return res.status(204).end();
        //return res.status(401).json({ error: "Error-no file selected" });
      } else {
        const file = req.file;
        const actionType = req.body.actionType;
        console.log(req.body, "from image-profile");
        console.log({ actionType });
        const dimensions = sizeOf(`public/upload/${file.filename}`); // replace with your image
        console.log(dimensions.width, dimensions.height, "demensions");

        console.log({ file });
        try {
          const result = await uploadFile(file);
          console.log({ result });
          await unlinkFile(file.path);
          // const description = req.body.description;
          // console.log(description);
          const imageid = `/api/images/profile-image?file=${result.key}`;
          const client = await connectDatabase();

          const usersCollection = client.db().collection("users");
          if (actionType === "profile-image") {
            const resultOfUpdate = await usersCollection.updateOne(
              { email: session.user.email },
              { $set: { imageLink: imageid } }
            );
            console.log("started in-profile");
            //copy
            //clipboardy.writeSync(imageid);
            //paste
            //clipboardy.readSync()
            // clipb.copy(imageid, function () {
            //   console.log("copied to clipboard");
            // });
            client.close();
            //res.status(200).json({ message: "upload was successful!" });
            res.status(200).json({ message: imageid });

            // res.status(200).json({ data: "success" });
          } else {
            const user = await usersCollection.findOne({
              email: session.user.email,
            });
            const blogImageLinkUpdate = user.blogImageLink
              ? user.blogImageLink.push(imageid)
              : [imageid];
            console.log({ user }, "from pro");
            const resultOfUpdate = await usersCollection.updateOne(
              { email: session.user.email },
              { $set: { blogImageLink: [...blogImageLinkUpdate] } }
            );
            console.log("started....okay multer");
            //copy
            //clipboardy.writeSync(imageid);
            //paste
            //clipboardy.readSync()
            res.status(200).json({ message: imageid });
            client.close();

            res.status(200).json({
              message:
                "upload was successful! and image url copied to the clip bord",
            });

            // res.status(200).json({ data: "success" });
          }
          // const resultOfUpdate = await usersCollection.updateOne(
          //   { email: session.user.email },
          //   { $set: { imageLink: imageid } }
          // );
          // console.log("started....okay multer");
          // client.close();
          // res.status(200).json({ message: "upload was successful!" });

          // res.status(200).json({ data: "success" });
        } catch (error) {
          res
            .status(501)
            .json({ error: `Sorry something Happened! ${error.message}` });
        }

        // handleRegister(req.body, imageid, res);
        // handleCreateBlog(req, res, imageid);
        //res.json({ imagePath: `/api/users/images/${result.key}` });
      }
    }
  });
});

//get user image from s3
apiRoute.get((req, res) => {
  console.log("inside get");
  const key = req.query.file;
  console.log({ key }, "inside get");
  //const key = req.params.key;
  // res.set("Content-Type", "image/jpeg");
  // res.set("Content-Type", "image/jpg");
  // res.set("Content-Type", "image/png");
  console.log({ getFileStream });
  const stream = getFileStream(key);
  console.log("inside getFileStream2");
  stream.on("error", (err) => {
    logger.log({ level: "error", messsage: "stream error", error: `${err}` });
  });
  stream.pipe(res);
  //readStream.pipe(res);
});

export default apiRoute;
export const config = {
  api: {
    bodyParser: false,
  },
};

// const s3 = new aws.S3({
//   region,
//   accessKeyId,
//   secretAccessKey,
//   signatureVersion: "v4",
// });

// async function generateUploadURL() {
//   console.log("called from server");
//   const rawBytes = await randombytes(16);
//   const imageName = rawBytes.toString("hex");
//   const params = {
//     Bucket: bucketaName,
//     key: "BEDEEEEbeeeee",
//     Expires: 120,
//     ACL: "public-read",
//   };
//   console.log("called from server03");
//   const uploadURL = s3.getSignedUrl("putObject", params);
//   console.log("called from server3");
//   return uploadURL;
// }

// async function handler(req, res) {
//   // const eventId = req.query.eventId;
//   console.log("running post01");
//   //let client;
//   console.log({ region, accessKeyId, secretAccessKey, bucketaName });
//   // try {
//   //   client = await connectDatabase();
//   // } catch (error) {
//   //   res.status(500).json({ message: "Connecting to the database failed!" });
//   //   return;
//   // }

//   if (req.method === "GET") {
//     console.log("running post1");
//     const session = await getSession({ req: req });

//     if (!session) {
//       res.status(401).json({ message: "Not authenticated!" });
//       return;
//     }
//     aws.config.update({
//       signatureVersion: "v4",
//       region: "us-east-1",
//       accessKeyId,
//       secretAccessKey,
//     });
//     console.log("post345detect");
//     const s3 = new aws.S3();
//     console.log(req.query.file, "param");
//     try {
//       const post = await s3.createPresignedPost({
//         ACL: "public-read",
//         Bucket: bucketaName,
//         Fields: {
//           key: req.query.file,
//         },
//         //Key: req.query.file,
//         Expires: 720,

//         Conditions: [
//           ["acl", "public-read"],
//           ["content-length-range", 0, 104857665],
//         ],
//       });
//       console.log({ post });
//       console.log("running post3");
//       res.status(200).json(post);
//     } catch (error) {
//       console.log("running post3ERROR");
//       res.status(501).json({ message: `error occured ${error}` });
//     }
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

// if (req.method === "GET") {
//   console.log("called from server1");
//   try {
//     console.log("called from server2");
//     const url = await generateUploadURL();

//     res.send({ url });
//     console.log(url, "called from server3");
//     // res.status(200).json({ post: documents });
//   } catch (error) {
//     res.status(500).json({ message: "getting url failed." });
//   }
// }
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
// if (req.method === "PATCH") {
//   const { imageUrl } = req.body;
//   //const o_id = new ObjectId(id);
//   const session = await getSession({ req: req });

//   if (!session) {
//     res.status(401).json({ message: "Not authenticated!" });
//     return;
//   }

//   const client = await connectDatabase();

//   const usersCollection = client.db().collection("users");

//   const result = await usersCollection.updateOne(
//     { email: session.user.email },
//     { $set: { imageLink: imageUrl } }
//   );

//   client.close();
//   res.status(200).json({ message: "upload was successful!" });
// }

// client.close();
//}

//export default handler;
