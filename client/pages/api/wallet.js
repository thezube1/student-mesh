import nextConnect from "next-connect";
import { MongoClient } from "mongodb";
import Web3 from "web3";
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

let web3 = new Web3(new Web3.providers.HttpProvider("https://****/"));

apiRoute.post(async (req, res) => {
  console.log(req.body);

  /*
  let recoveredAddress = await web3.eth.accounts.recover(
    web3.utils.sha3("test"),
    signature
  );
  if (recoveredAddress.normalize() === req.body.wallet()) {
    console.log("Cool!");
  }
  */

  /*
  await client.connect();
  const db = client.db(process.env.DB_NAME);
  const collection = db.collection("wallets");
  await collection.insertOne({
    wallet: req.body.wallet,
    username: req.body.username,
    name: req.body.name,
  });
  */
  await res.status(200).send({ status: true });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};
