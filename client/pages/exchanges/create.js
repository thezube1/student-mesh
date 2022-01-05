import Navbar from "../../components/navbar/navbar";
import { useState } from "react";

function CreateExchangePage() {
  const [error, setError] = useState(false);

  return (
    <div>
      <Navbar />
      <div id="provider-create-wrapper">
        <div id="provider-create-form">
          <div className="title" style={{ fontSize: 40, marginBottom: 0 }}>
            Create exchange
          </div>
          {error ? (
            <div className="form-error">All fields required</div>
          ) : (
            false
          )}
          <div>
            <div>
              <input
                type="text"
                className="input provider-input"
                placeholder="Reciever wallet"
              />
            </div>
            <div>
              <input
                type="text"
                className="input provider-input"
                placeholder="Exchange description"
              />
            </div>
            <div id="provider-upload-wrapper">
              <div className="text">Upload File:</div>
              <label className="button" id="provider-upload-button">
                <input type="file" />
                Select
              </label>
            </div>
          </div>
          <button className="button-primary" style={{ marginTop: 20 }}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateExchangePage;
