import { Web3Storage, getFilesFromPath } from "web3.storage";
import multer from "multer";
import nextConnect from "next-connect";
require("dotenv").config();
import fs from "fs";
import { MongoClient } from "mongodb";
import * as util from "ethereumjs-util";
import Web3 from "web3";

const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/uploads",
    filename: (req, file, cb) => cb(null, file.originalname),
  }),
});

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

const uploadMiddleware = upload.single("file");

apiRoute.use(uploadMiddleware);

let web3 = new Web3(new Web3.providers.HttpProvider("https://****/"));

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@studentmesh.uyka3.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(url);

apiRoute.post(async (req, res) => {
  const storage = new Web3Storage({ token: process.env.IPFS_KEY });
  const files = await getFilesFromPath("public/uploads");
  let selectedFile = [];
  files.map((item) => {
    if (item.name.replace("/uploads/", "") === req.file.filename) {
      selectedFile.push(item);
    }
  });
  const cid = await storage.put(selectedFile);
  await fs.unlink(`public/uploads/${req.file.filename}`, (err) => {
    if (err) return console.log(err);
    return;
  });

  const signature = req.body.signature;
  const provider = req.body.provider;
  let recoveredAddress = web3.eth.accounts.recover(
    web3.utils.sha3("test"),
    signature
  );
  console.log(recoveredAddress, provider);
  if (recoveredAddress.normalize() === provider.normalize()) {
    console.log(true);
  } else {
    console.log(false);
  }
  /*
  let nonce = "test";
  nonce = util.keccak(Buffer.from(nonce, "utf-8"));
  const { v, r, s } = util.fromRpcSig(signature);
  const pubKey = util.ecrecover(nonce, v, r, s);
  const addrBuf = util.pubToAddress(pubKey);
  const addr = util.bufferToHex(addrBuf);
  console.log(addr);
  */

  //await client.connect();
  //const db = client.db(dbName);
  //const collection = db.collection("requests");
  //const resVal = await collection.insertOne({});
  res.status(200).json({ cid: cid });
});

apiRoute.get(async (req, res) => {
  res.status(200).send({ message: "Hello!" });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};
