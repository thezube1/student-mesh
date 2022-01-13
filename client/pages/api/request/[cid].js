import nextConnect from "next-connect";
import { Web3Storage } from "web3.storage";
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

apiRoute.get(async (req, res) => {
  const cid = req.query.cid;
  const storage = new Web3Storage({ token: process.env.IPFS_KEY });
  const response = await storage.get(cid);
  const files = await response.files();
  res.setHeader("Content-Type", "image/jpg");
  res.send(files);
  //console.log(response);
});

export default apiRoute;
