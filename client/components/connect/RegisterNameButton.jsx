import Modal from "../modal/Modal";
import { useState } from "react";

function RegisterNameButton() {
  const [open, setOpen] = useState(false);
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
            className="input"
            style={{ maxWidth: 300, marginBottom: 10 }}
          ></input>
          <button className="button-primary">Register</button>
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
