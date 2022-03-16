import nextConnect from "next-connect";
import { MongoClient } from "mongodb";
import Web3 from "web3";
require("dotenv").config();

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@studentmesh.uyka3.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(url);

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

apiRoute.get(async (req, res) => {
  const wallet = req.query.wallet;
  await client.connect();
  const db = client.db(process.env.DB_NAME);
  const collection = db.collection("wallets");
  const result = await collection.findOne({
    wallet: wallet,
  });
  if (!result) {
    res.status(200).send({ registered: false, wallet: wallet });
  } else {
    res.status(200).send({
      registered: true,
      wallet: result.wallet,
      first: result.first,
      last: result.last,
    });
  }
});

export default apiRoute;
