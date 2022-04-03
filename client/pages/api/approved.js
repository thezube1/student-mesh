import nextConnect from "next-connect";
import { MongoClient } from "mongodb";

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

apiRoute.put(async (req, res) => {
  const provider = req.body.provider;
  const reciever = req.body.reciever;
  const header = req.body.header;
  const cid = req.body.cid;
  const txhash = req.body.txhash;
  await client.connect();
  const db = client.db(process.env.DB_NAME);
  const collection = db.collection("accepted");
  try {
    await collection.insertOne({
      provider: provider.toLowerCase(),
      reciever: reciever.toLowerCase(),
      cid: cid.toLowerCase(),
      header: header,
      txhash: txhash,
    });
    res.status(200).send(true);
  } catch (error) {
    res.statusCode(500).send(false);
  }
  collection.insertOne();
});

export default apiRoute;
