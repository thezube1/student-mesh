import Navbar from "../components/navbar/navbar";
import Link from "next/link";
import Web3 from "web3";
import Web3Modal from "web3modal";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import { useSelector, useDispatch } from "react-redux";
import { setAccount, setProvider } from "../redux/reducers/accountReducer";
import Providers from "../providers.json";
import { useEffect } from "react";
import getProvider from "../components/libs/getProvider";

function ConnectPage() {
  const account = useSelector((state) => state.account.account);
  const dispatch = useDispatch();

  const providerOptions = {
    walletlink: {
      package: CoinbaseWalletSDK,
      options: {
        appName: "Student Mesh",
        rpc: "localhost:7545",
        chainId: 1337,
      },
    },
  };
  const connect = async () => {
    try {
      const web3Modal = new Web3Modal({
        network: "mainnet",
        providerOptions,
        cacheProvider: true,
      });
      const provider = await web3Modal.connect();
      const web3 = new Web3(provider);
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
    } catch (error) {
      console.log(error);
    }
  };

  const disconnect = async () => {
    const web3Modal = new Web3Modal({
      network: "mainnet",
      providerOptions,
    });
    web3Modal.clearCachedProvider();
    dispatch(setAccount(null));
    dispatch(setProvider({ provider: null, school: null }));
  };

  useEffect(async () => {
    if (!account) {
      const web3Modal = new Web3Modal({
        network: "mainnet",
        cacheProvider: true,
        providerOptions,
      });
      const provider = await web3Modal.connect();
      const web3 = new Web3(provider);
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
  }, []);

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
                <button className="button" style={{ marginBottom: 10 }}>
                  Return to home
                </button>
              </Link>
              <button className="button" onClick={() => disconnect()}>
                Disconnect Wallet
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ConnectPage;
