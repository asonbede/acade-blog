import { MongoClient } from "mongodb";
const ObjectId = require("mongodb").ObjectID;
export async function connectDatabase() {
  const client = await MongoClient.connect(
    `mongodb://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}-shard-00-00.jjcpx.mongodb.net:27017,${process.env.mongodb_clustername}-shard-00-01.jjcpx.mongodb.net:27017,${process.env.mongodb_clustername}-shard-00-02.jjcpx.mongodb.net:27017/${process.env.mongodb_database}?ssl=true&replicaSet=atlas-dbbzd7-shard-0&authSource=admin&retryWrites=true&w=majority`,
    { useUnifiedTopology: true }
  );

  return client;
}

export async function insertDocument(client, collection, document) {
  const db = client.db();

  const result = await db.collection(collection).insertOne(document);

  return result;
}

export async function getAllDocuments(client, collection, sort) {
  const db = client.db();

  const documents = await db.collection(collection).find().sort(sort).toArray();

  return documents;
}

export async function getAllFeaturedDocuments(
  client,
  collection,
  sort,
  searchPara
) {
  const db = client.db();

  const documents = await db
    .collection(collection)
    .find(searchPara) //6183ac3dcc991f20ec63e083 6183ab11cc991f20ec63e082 6183ac3dcc991f20ec63e083

    .sort(sort)
    .toArray();

  return documents;
}

export async function getOneDocument(client, collection, id) {
  const o_id = new ObjectId(id);
  const db = client.db();

  const document = await db.collection(collection).findOne({ _id: o_id });

  return document;
}
export function validateQuestionOptions(optionsArray) {
  for (let index = 0; index < optionsArray.length; index++) {
    const element = optionsArray[index];
    if (element.option.trim === "") {
      return false;
    }
  }
  return true;
}

export async function updateDocument(client, collection, id, updateValue) {
  const o_id = new ObjectId(id);
  const db = client.db();
  console.log("inside-update");
  const document = await db
    .collection(collection)
    .updateMany({ _id: o_id }, { $set: { ...updateValue } });

  return document;
}

export async function deleteDocument(client, collection, fieldValue, id) {
  const o_id = new ObjectId(id);
  const db = client.db();

  const document = await db
    .collection(collection)
    .remove({ [fieldValue]: o_id });

  return document;
}

export async function deleteDocumentProfile(
  client,
  collection,
  fieldValue,
  id
) {
  //const o_id = new ObjectId(id);
  const db = client.db();

  const document = await db.collection(collection).remove({ [fieldValue]: id });

  return document;
}

//export const adminArray = [process.env.admin_1, process.env.admin_2];
