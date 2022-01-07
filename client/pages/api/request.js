import { Web3Storage } from "web3.storage";
import multer from "multer";

export default function handler(req, res) {
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
  if (req.method === "POST") {
    const data = req.body;
    console.log(data.recieverWallet);
    //const client = new Web3Storage({ token: API_TOKEN })
  }
}
