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

apiRoute.post(async (req, res) => {
  await res.status(200).send({ message: "Hello!" });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};
