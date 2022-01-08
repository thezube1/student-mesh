import { Web3Storage, getFilesFromPath } from "web3.storage";
import multer from "multer";
import nextConnect from "next-connect";
require("dotenv").config();

const upload = multer
  .diskStorage({
    destination(req, file, cb) {
      cb(null, path.join(__dirname, "public/uploads"));
    },
    filename(req, file, cb) {
      cb(null, `${Date.now()}.${file.mimetype.split("/")[1]}`);
    },
  })
  .single("file");

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

apiRoute.use(upload);

apiRoute.post((req, res) => {
  const storage = new Web3Storage({ token: process.env.IPFS_KEY });
  const reciever = req.body.recieverWallet;
  const info = req.body.exchangeInfo;
  const files = [];
  for (const path of args._) {
    const pathFiles = await getFilesFromPath(path);
    files.push(...pathFiles);
  }
  console.log(files);
  res.status(200).json({ data: "success" });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};

/*
export default function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    console.log(data.recieverWallet);
    //const client = new Web3Storage({ token: API_TOKEN })
  }
}

  const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
      fileSize: 3840 * 2160 * 1000,
    },
  });
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });
  */
