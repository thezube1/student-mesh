import nextConnect from "next-connect";
import { Web3Storage } from "web3.storage";
import { MongoClient } from "mongodb";
import axios from "axios";
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
const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@studentmesh.uyka3.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(url);
const dbName = process.env.DB_NAME;

apiRoute.get(async (req, res) => {
  const wallet = req.query.wallet;
  await client.connect();
  const db = client.db(dbName);

  const collection = db.collection("requests");

  const findResult = await collection
    .find({
      $or: [
        { provider: { $in: [wallet.toUpperCase(), wallet.toLowerCase()] } },
        { reciever: { $in: [wallet.toUpperCase(), wallet.toLowerCase()] } },
      ],
    })
    .toArray();
  res.status(200).send(findResult);
});

export default apiRoute;
