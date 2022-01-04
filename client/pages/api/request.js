import { Web3Storage } from "web3.storage";

export default function handler(req, res) {
  if (req.method === "POST") {
    console.log(req.body);
    //const client = new Web3Storage({ token: API_TOKEN })
  }
}
