import Navbar from "../../components/navbar/navbar";
import Modal from "../../components/modal/Modal";
import { useState } from "react";
import WAValidator from "wallet-address-validator";
import axios from "axios";
import Web3 from "web3";
import { useSelector } from "react-redux";
import { STUDENTS_ABI, STUDENTS_ADDRESS } from "../../config";
import Link from "next/link";
import withProvider from "../../components/routes/withProvider";

function CreateExchangePage() {
  const [error, setError] = useState(false);
  const [invalidWallet, setInvalidWallet] = useState(false);
  const [selectedFile, setSelectedFile] = useState(undefined);
  const [recieverWallet, setRecieverWallet] = useState("");
  const [exchangeInfo, setExchangeInfo] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);
  const provider = useSelector((state) => state.account.provider);

  // on submit display modal to confirm

  const onSubmit = () => {
    if (
      exchangeInfo === "" ||
      recieverWallet === "" ||
      selectedFile === undefined
    ) {
      setError(true);
    } else {
      const valid = WAValidator.validate(recieverWallet, "ETH", "both");
      if (valid === false) {
        setInvalidWallet(true);
      } else {
        setOpen(true);
      }
    }
  };

  const onConfirm = async () => {
    setLoading(true);

    const formData = new FormData();
    formData.append("file", selectedFile);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    const web3 = new Web3(Web3.givenProvider || "HTTP://127.0.0.1:7545");
    const accounts = await web3.eth.getAccounts();
    formData.append("reciever", recieverWallet);
    formData.append("header", exchangeInfo);
    if (accounts[0] && provider.isProvider) {
      const studentContract = new web3.eth.Contract(
        STUDENTS_ABI,
        STUDENTS_ADDRESS
      );
      let sign = await web3.eth.personal.sign(
        web3.utils.sha3("test"),
        accounts[0]
      );
      formData.append("signature", sign);
      formData.append("provider", accounts[0]);
      await axios.post("/api/request", formData, config);
      /*
      await studentContract.methods
        .request(recieverWallet, cid.data.cid, exchangeInfo)
        .send({ from: accounts[0] });
        */
      //setOpen(false);
      //setLoading(false);
      //setComplete(true);
    }
  };
  return (
    <div>
      <Navbar />
      <div id="provider-create-wrapper">
        <Modal open={open} close={() => setOpen(false)}>
          <div id="provider-confirm-wrapper">
            <div className="header" id="provider-confirm-title">
              Confirm exchange
            </div>
            <div
              className="form-error"
              style={{
                justifySelf: "center",
                marginBottom: 20,
                inlineSize: 360,
                overflowWrap: "break-word",
              }}
            >
              Once submitted the exchange cannot be modified
            </div>
            <div>
              <div className="text provider-confirm-text">
                <span>Reciever wallet: </span>
                <span className="provider-confirm-bold">{recieverWallet}</span>
              </div>
              <div className="text provider-confirm-text">
                <span>Exchange info: </span>
                <span className="text provider-confirm-bold">
                  {exchangeInfo}
                </span>
              </div>
              <div className="text provider-confirm-text">
                <span>File name: </span>
                <span className="provider-confirm-bold">
                  {selectedFile ? selectedFile.name : ""}
                </span>
              </div>
            </div>
            <div id="provider-confirm-buttons">
              <button
                className="button-primary"
                onClick={onConfirm}
                style={{
                  marginRight: 10,
                  height: 46,
                  width: 187,
                  padding: 0,
                  display: "grid",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {loading === false ? (
                  "Confirm"
                ) : (
                  <div id="provider-confirm-spinner"></div>
                )}
              </button>
              {loading ? (
                false
              ) : (
                <button
                  className="button"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </Modal>
        <div id="provider-create-form">
          <div className="title" style={{ fontSize: 40, marginBottom: 0 }}>
            {complete ? "Exchange request completed" : "Create exchange"}
          </div>
          {complete ? (
            <div className="button" style={{ marginTop: 20 }}>
              <Link href="/">Return home</Link>
            </div>
          ) : (
            false
          )}
          {!complete ? (
            <>
              <div style={{ display: "grid", justifyItems: "center" }}>
                {error ? (
                  <div className="form-error" style={{ marginTop: 20 }}>
                    All fields required
                  </div>
                ) : (
                  false
                )}
                {invalidWallet ? (
                  <div className="form-error" style={{ marginTop: 20 }}>
                    Invalid wallet address
                  </div>
                ) : (
                  false
                )}
              </div>
              <div style={{ display: "grid", justifyItems: "center" }}>
                <div>
                  <input
                    onChange={(e) => setRecieverWallet(e.target.value)}
                    type="text"
                    className="input provider-input"
                    placeholder="Reciever wallet"
                  />
                </div>
                <div>
                  <input
                    onChange={(e) => setExchangeInfo(e.target.value)}
                    type="text"
                    className="input provider-input"
                    placeholder="Exchange description"
                  />
                </div>
                <div id="provider-upload-wrapper">
                  <div className="text" style={{ fontSize: 14 }}>
                    Upload File:
                  </div>
                  <label className="button" id="provider-upload-button">
                    <input
                      name="transcript"
                      type="file"
                      onChange={(e) => {
                        setSelectedFile(e.target.files[0]);
                      }}
                    />
                    {selectedFile === undefined ? "Select" : selectedFile.name}
                  </label>
                </div>
              </div>
              <button
                onClick={onSubmit}
                className="button-primary"
                style={{ marginTop: 20 }}
              >
                Submit
              </button>
            </>
          ) : (
            false
          )}
        </div>
      </div>
    </div>
  );
}

export default withProvider(CreateExchangePage);
