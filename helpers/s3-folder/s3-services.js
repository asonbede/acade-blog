//const config = require("./config");
const S3 = require("aws-sdk/clients/s3");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
// const bucketName = config.bucketName;

//import { getSession } from "next-auth/client";
// const region = config.region;
// const accessKeyId = config.accessKeyId;
// const secretAccessKey = config.secretAccessKey;

// const retrieve = async () => {
//   const session = await getSession({ req: req });
//   return session.user.email;
// };
// console.log(retrieve(), "retrieveee");
const region = process.env.s3_bucket_region;
const bucketName = process.env.s3_bucket_name;
const accessKeyId = process.env.s3_access_key;
const secretAccessKey = process.env.s3_secrete_access_key;
console.log({ region, bucketName, accessKeyId, secretAccessKey }, "s3");
const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
  correctClockSkew: true,
});

// AWS.config.update({
//   accessKeyId: 'xxx',
//   secretAccessKey: 'xxxx',
//   correctClockSkew: true
// });

//delete a file from s3
function deleteFile(file) {
  //var AWS = require('aws-sdk');

  //AWS.config.loadFromPath('./credentials-ehl.json');

  //var s3 = new AWS.S3();
  const deleteParams = { Bucket: bucketName, Key: file };

  s3.deleteObject(deleteParams, function (err, data) {
    if (err) console.log(err, err.stack);
    // error
    else console.log("deleted"); // deleted
  });
}
//upload a file to s3
function uploadFile(file) {
  console.log(file.filename, "noww in upload");
  const fileStream = fs.createReadStream(file.path);
  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename,
    ContentType: file.mimetype,
    Acl: "public-read",
  };
  return s3.upload(uploadParams).promise();
}

//download a file  from s3
function getFileStream(fileKey) {
  console.log("inside getFileStream1");
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName,
  };
  return s3.getObject(downloadParams).createReadStream();
}

//disk storage
// const storage = multer.diskStorage({
//   destination: "public/upload",
//   filename: function (req, file, cb) {
//     console.log(file.originalname, "inside-originalfilename---");
//     console.log(file.fieldname, "inside-fieldname---");
//     console.log({ req }, "reqqq");
//     console.log(req.actionType, "from s3-services");

//     cb(
//       null,
//       file.fieldname + "-" + Date.now() + path.extname(file.originalname)
//     );
//   },
// });

//check file type func
function checkFileType(file, cb) {
  //allowed extention
  const fileTypes = /jpeg|jpg|png|gif|svg/;
  //check extension
  const isRightExtention = fileTypes.test(
    path.extname(file.originalname).toLocaleLowerCase()
  );
  //Check mimetype
  const mimeType = fileTypes.test(file.mimetype);
  if (isRightExtention && mimeType) {
    console.log("inside-uploadddMimimtypetrrrrrtruuuee---");
    return cb(null, true);
  } else {
    console.log("inside-uploadddMimimtype---");
    cb({ error: "images only" });
  }
}
function uploadFunc(fileSize, uniqueStr) {
  console.log("inside-uploaddd---");
  const upload = multer({
    storage: multer.diskStorage({
      destination: "public/upload",
      filename: function (req, file, cb) {
        cb(
          null,
          file.fieldname +
            "-" +
            uniqueStr +
            "-" +
            path.basename(file.originalname, path.extname(file.originalname)) +
            path.extname(file.originalname)
        );
      },
    }),
    limits: { fileSize: fileSize },
    fileFilter: function (req, file, cb) {
      checkFileType(file, cb);
    },
  }).single("image");
  console.log("outside-uploaddd---");
  return upload;
}
exports.uploadFile = uploadFile;
exports.getFileStream = getFileStream;
exports.uploadFunc = uploadFunc;
exports.deleteFile = deleteFile;
