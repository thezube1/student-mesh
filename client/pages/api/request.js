import { Web3Storage, getFilesFromPath } from "web3.storage";
import multer from "multer";
import nextConnect from "next-connect";
require("dotenv").config();
import fs from "fs";
import { MongoClient } from "mongodb";
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
      const copy = item;
      copy.name = copy.name.replace("/uploads/", "");
      selectedFile.push(copy);
    }
  });

  const cid = await storage.put(selectedFile, { wrapWithDirectory: true });
  await fs.unlink(`public/uploads/${req.file.filename}`, (err) => {
    if (err) return console.log(err);
    return;
  });

  const signature = req.body.signature;
  const provider = req.body.provider;
  const reciever = req.body.reciever;
  const header = req.body.header;
  let recoveredAddress = web3.eth.accounts.recover(
    web3.utils.sha3("test"),
    signature
  );
  if (recoveredAddress.normalize() === provider.normalize()) {
    await client.connect();
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection("requests");
    try {
      await collection.insertOne({
        provider: provider.toLowerCase(),
        reciever: reciever.toLowerCase(),
        cid: cid.toLowerCase(),
        header: header,
      });
      res.status(200).send(true);
    } catch {
      res.statusCode(500).send(false);
    }
  } else {
    res.status(403).send(false);
  }
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
