import Navbar from "../components/navbar/navbar";
import Link from "next/link";
import Web3 from "web3";
import { useSelector, useDispatch } from "react-redux";
import { setAccount, setWeb3 } from "../redux/reducers/accountReducer";
import { useEffect } from "react";

function ConnectPage() {
  const account = useSelector((state) => state.account.account);
  const dispatch = useDispatch();

  const connect = async () => {
    if (window.ethereum) {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
      const accounts = await web3.eth.getAccounts();
      dispatch(setAccount(accounts[0]));
    }
  };

  return (
    <div>
      <Navbar />
      <div id="connect-wrapper">
        <div id="connect-content">
          {!account ? (
            <div style={{ display: "grid", justifyItems: "center" }}>
              <button className="button" onClick={() => connect()}>
                Connect Wallet
              </button>
              <div className="text" style={{ marginTop: 10 }}>
                Not connected
              </div>
            </div>
          ) : (
            <div style={{ display: "grid", justifyItems: "center" }}>
              <div className="text" style={{ marginBottom: 10 }}>
                Connected with <b>{account}</b>
              </div>
              <Link href="/account">
                <button className="button">View Account</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ConnectPage;
