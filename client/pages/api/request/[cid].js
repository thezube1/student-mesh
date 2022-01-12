import nextConnect from "next-connect";
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
});

export default apiRoute;
