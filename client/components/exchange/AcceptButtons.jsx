import axios from "axios";
import { useState } from "react";
import Web3 from "web3";
import { STUDENTS_ABI, STUDENTS_ADDRESS } from "../../config";
import { useRouter } from "next/router";

function AcceptButtons(props) {
  const [acceptLoading, setAcceptLoading] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);
  const [complete, setComplete] = useState(false);
  const Router = useRouter();
  const accept = async () => {
    setAcceptLoading(true);
    const web3 = new Web3(Web3.givenProvider || "HTTP://127.0.0.1:7545");
    const accounts = await web3.eth.getAccounts();
    if (accounts[0]) {
      const studentContract = new web3.eth.Contract(
        STUDENTS_ABI,
        STUDENTS_ADDRESS
      );
      const response = await studentContract.methods
        .approveTranscript(props.provider, props.header, props.cid)
        .send({ from: accounts[0] });
      await axios.delete(`/api/request/${props.id}`);
      Router.replace(`/exchanges/approved/${response.transactionHash}`);
      return null;
    }
    setAcceptLoading(false);
    setComplete(true);
  };

  const decline = async () => {
    setRejectLoading(true);
    const web3 = new Web3(Web3.givenProvider || "HTTP://127.0.0.1:7545");
    const accounts = await web3.eth.getAccounts();
    if (accounts[0]) {
      axios.delete(`/api/request/${props.id}`);
    }
    setRejectLoading(false);
    setComplete(true);
    Router.replace("/exchanges");
    return null;
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
        onClick={accept}
      >
        {acceptLoading ? (
          <div id="provider-confirm-spinner"></div>
        ) : (
          <>
            <span>Accept</span>
          </>
        )}
      </button>
      <button
        className="button-primary"
        style={{ display: "flex" }}
        onClick={decline}
      >
        {rejectLoading ? (
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
