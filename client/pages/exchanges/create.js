import Navbar from "../../components/navbar/navbar";
import Modal from "../../components/modal/Modal";
import { useState } from "react";
import WAValidator from "wallet-address-validator";

function CreateExchangePage() {
  const [error, setError] = useState(false);
  const [invalidWallet, setInvalidWallet] = useState(false);
  const [selectedFile, setSelectedFile] = useState(undefined);
  const [recieverWallet, setRecieverWallet] = useState("");
  const [exchangeInfo, setExchangeInfo] = useState("");
  const [open, setOpen] = useState(false);
  //console.log(selectedFile);

  // on submit display modal to confirm

  const onSubmit = () => {
    if (
      selectedFile === "" ||
      recieverWallet === "" ||
      selectedFile === undefined
    ) {
      setError(true);
    } else {
      const valid = WAValidator.validate(recieverWallet, "ETH", "both");
      console.log(valid);
      if (valid === false) {
        setInvalidWallet(true);
      } else {
        setOpen(true);
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div id="provider-create-wrapper">
        <Modal open={open} close={() => setOpen(false)}>
          <div id="provider-confirm-wrapper">
            <div className="title">Confirm exchange</div>
            <div className="text">Reciever wallet: {recieverWallet}</div>
            <div className="text">Exchange info: {exchangeInfo}</div>
          </div>
        </Modal>
        <div id="provider-create-form">
          <div className="title" style={{ fontSize: 40, marginBottom: 0 }}>
            Create exchange
          </div>
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
        </div>
      </div>
    </div>
  );
}

export default CreateExchangePage;
