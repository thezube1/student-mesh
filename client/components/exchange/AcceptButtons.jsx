import { useState } from "react";
import DownloadSVG from "./DownloadSVG";
import SearchSVG from "./SearchSVG";
import Web3 from "web3";

function AcceptButtons(props) {
  const [downloading, setDownloading] = useState(undefined);

  const accept = () => {
    const web3 = new Web3(Web3.givenProvider || "HTTP://127.0.0.1:7545");
    const accounts = await web3.eth.getAccounts();
    if (accounts[0]) {
      const studentContract = new web3.eth.Contract(
        STUDENTS_ABI,
        STUDENTS_ADDRESS
      );
      await studentContract.methods
        .approve(props.provider, props.header, props.cid)
        .send({ from: accounts[0] });
    }
  };

  return (
    <div className="exchange-buttons" style={{ display: "flex" }}>
      <button
        className="button"
        style={{
          marginRight: 20,
          display: "flex",
          alignItems: "center",
        }}
      >
        <span>Accept</span>
      </button>
      <button className="button-primary" style={{ display: "flex" }}>
        {downloading ? (
          <div id="provider-confirm-spinner"></div>
        ) : (
          <>
            <span>Reject</span>
          </>
        )}
      </button>
    </div>
  );
}

export default AcceptButtons;
