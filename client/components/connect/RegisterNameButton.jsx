import Modal from "../modal/Modal";
import { useState } from "react";
import axios from "axios";
import Web3 from "web3";
import getProvider from "../libs/getProvider";
import { useRouter } from "next/router";

function RegisterNameButton(props) {
  const [open, setOpen] = useState(false);
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const router = useRouter();

  const register = async () => {
    setLoading(true);
    const provider = await getProvider();
    const web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts();
    console.log(accounts[0]);
    let sign = await web3.eth.personal.sign(
      web3.utils.sha3("test"),
      accounts[0]
    );
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    const data = {
      signature: sign,
      wallet: accounts[0],
      first: first,
      last: last,
    };
    await axios.post("/api/wallet", data, config);
    setLoading(false);
    setCompleted(true);
    router.reload();
  };
  return (
    <div>
      <Modal open={open} close={() => setOpen(false)}>
        <div
          style={{
            marginBottom: 10,
            height: "100%",
            display: "grid",
            justifyItems: "center",
            alignContent: "center",
          }}
        >
          <div
            className="text"
            style={{
              color: "black",
              marginBottom: 30,
              fontSize: 25,
              fontWeight: 900,
            }}
          >
            {props.isRegistered ? "Update name" : "Register name"}
          </div>
          <div style={{ display: "grid", justifyItems: "center" }}>
            <div className="text form-label">First Name</div>
            <input
              type="text"
              onChange={(e) => setFirst(e.target.value)}
              className="input"
              style={{ maxWidth: 250, marginBottom: 10 }}
            ></input>
          </div>
          <div
            style={{
              display: "grid",
              justifyItems: "center",
              marginBottom: 25,
            }}
          >
            <div className="text form-label">Last Name</div>
            <input
              type="text"
              onChange={(e) => setLast(e.target.value)}
              className="input"
              style={{ maxWidth: 250, marginBottom: 10 }}
            ></input>
          </div>
          <button onClick={() => register()} className="button-primary">
            {loading ? (
              <div id="provider-confirm-spinner"></div>
            ) : props.isRegistered ? (
              "Update"
            ) : (
              "Register"
            )}
          </button>
        </div>
      </Modal>
      <div>
        <button
          style={{ marginBottom: 10 }}
          className={props.isRegistered ? "button" : "button-primary"}
          onClick={() => setOpen(true)}
        >
          {loading ? (
            <div id="provider-confirm-spinner"></div>
          ) : props.isRegistered ? (
            "Update name"
          ) : (
            "Register name"
          )}
        </button>
      </div>
    </div>
  );
}

export default RegisterNameButton;
