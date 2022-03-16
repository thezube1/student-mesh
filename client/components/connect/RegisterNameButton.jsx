import Modal from "../modal/Modal";
import { useState } from "react";
import axios from "axios";
import Web3 from "web3";
import getProvider from "../libs/getProvider";

function RegisterNameButton() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  const register = async () => {
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
    await axios.post(
      "/api/wallet",
      {
        signature: sign,
        wallet: accounts[0],
        name: name,
      },
      config
    );
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
          <div className="text" style={{ color: "black", marginBottom: 10 }}>
            Register name
          </div>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            className="input"
            style={{ maxWidth: 300, marginBottom: 10 }}
          ></input>
          <button onClick={() => register()} className="button-primary">
            Register
          </button>
        </div>
      </Modal>
      <div>
        <button
          style={{ marginBottom: 10 }}
          className="button-primary"
          onClick={() => setOpen(true)}
        >
          Register name
        </button>
        {/* {isRegistering ? (
                <div style={{ marginBottom: 10 }}>
                  <div className="text">Register name</div>
                  <input
                    type="text"
                    className="input"
                    style={{ maxWidth: 300 }}
                  ></input>
                </div>
              ) : (
                false
              )}*/}
      </div>
    </div>
  );
}

export default RegisterNameButton;
