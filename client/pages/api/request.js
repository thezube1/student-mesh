import { Web3Storage, getFilesFromPath } from "web3.storage";
import multer from "multer";
import nextConnect from "next-connect";
require("dotenv").config();
import fs from "fs";
import { MongoClient } from "mongodb";
import * as util from "ethereumjs-util";

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

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@studentmesh.uyka3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
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
    console.log(err);
    return;
  });

<<<<<<< HEAD
=======
  const signature = req.body.provider;
  const sig = util.fromRpcSig(`${signature}`);
  const publicKey = util.ecrecover("test", sig.v, sig.r, sig.s);
  const address = util.pubToAddress(publicKey).toString("hex");
  console.log(address);

  //await client.connect();
  //const db = client.db(dbName);
  //const collection = db.collection("requests");
  //const resVal = await collection.insertOne({});
>>>>>>> 21e0ebe6d9d49f237df7b3883f09b88b48784f66
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
