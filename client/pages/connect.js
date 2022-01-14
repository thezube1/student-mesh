import Navbar from "../components/navbar/navbar";
import Link from "next/link";
import Web3 from "web3";
import { useSelector, useDispatch } from "react-redux";
import { setAccount, setProvider } from "../redux/reducers/accountReducer";
import Providers from "../providers.json";

function ConnectPage() {
  const account = useSelector((state) => state.account.account);
  const dispatch = useDispatch();

  const connect = async () => {
    if (window.ethereum) {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
      const accounts = await web3.eth.getAccounts();
      dispatch(setAccount(accounts[0]));
      let isProvider = false;
      let school = null;
      Providers.providers.map((item) => {
        if (item.wallet === accounts[0]) {
          isProvider = true;
          school = item.school;
        }
      });
      dispatch(setProvider({ provider: isProvider, school: school }));
    }
  };

  const disconnect = async () => {
    if (window.ethereum) {
      const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
      const accounts = await web3.eth.getAccounts();
      if (accounts[0]) {
        await web3.eth.currentProvider.disconnect();
      }
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
              <Link href="/">
                <button className="button">Return to home</button>
              </Link>
              <button
                onClick={disconnect}
                className="button"
                style={{ marginTop: 10 }}
              >
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ConnectPage;
