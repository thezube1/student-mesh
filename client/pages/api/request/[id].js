import nextConnect from "next-connect";
import { Web3Storage } from "web3.storage";
import { MongoClient, ObjectId } from "mongodb";
require("dotenv").config();

const apiRoute = nextConnect({
  onError(error, req, res) {
    console.log(error);
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

const dbName = process.env.DB_NAME;
const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@studentmesh.uyka3.mongodb.net/${dbName}?retryWrites=true&w=majority`;
const client = new MongoClient(url);

apiRoute.get(async (req, res) => {
  const id = req.query.id;
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection("requests");
  const findResult = await collection.find({ _id: ObjectId(id) }).toArray();
  await client.close();

  res.send(findResult);
});

apiRoute.delete(async (req, res) => {
  const id = req.query.id;
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection("requests");
  try {
    await collection.deleteOne({ _id: id });
    res.status(200).send(true);
  } catch (error) {
    console.log(error);
    res.status(400).send(false);
  }
  await client.close();
});

export default apiRoute;
