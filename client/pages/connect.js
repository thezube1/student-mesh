import Navbar from "../components/navbar/navbar";
import Link from "next/link";
import Web3 from "web3";
import Web3Modal from "web3modal";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import { useSelector, useDispatch } from "react-redux";
import {
  setAccount,
  setName,
  setProvider,
} from "../redux/reducers/accountReducer";
import Providers from "../providers.json";
import { useEffect, useState } from "react";
import RegisterNameButton from "../components/connect/RegisterNameButton";
import axios from "axios";

function ConnectPage() {
  const account = useSelector((state) => state.account.account);
  const isProvider = useSelector((state) => state.account.provider);
  const dispatch = useDispatch();
  const [isRegistered, setRegistered] = useState(true);
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [freshConnect, setFreshConnect] = useState(false);

  const providerOptions = {
    walletlink: {
      package: CoinbaseWalletSDK,
      options: {
        appName: "Student Mesh",
        rpc: "https://mainnet.infura.io/v3/95853d14d95d4892b97ca9158cf30b33",
        chainId: 3,
        //rpc: "localhost:7545",
        //chainId: 1337,
      },
    },
  };
  const connect = async () => {
    try {
      const web3Modal = new Web3Modal({
        //network: "mainnet",
        network: "ropsten",
        providerOptions,
        cacheProvider: true,
        theme: "dark",
      });
      const provider = await web3Modal.connect();
      const web3 = new Web3(provider);
      const accounts = await web3.eth.getAccounts();
      dispatch(setAccount(accounts[0]));
      const registeredWallet = await axios.get(`/api/wallet/${accounts[0]}`);
      if (registeredWallet.data.registered) {
        setRegistered(true);
        setFirst(registeredWallet.data.first);
        setLast(registeredWallet.data.last);
      } else {
        setRegistered(false);
      }
      let isProvider = false;
      let school = null;
      Providers.providers.map((item) => {
        if (item.wallet === accounts[0]) {
          isProvider = true;
          school = item.school;
        }
      });
      dispatch(setProvider({ provider: isProvider, school: school }));
      setFreshConnect(true);
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
    setRegistered(false);
    setFirst(false);
    setLast(false);
  };

  useEffect(async () => {
    if (!account) {
      const web3Modal = new Web3Modal({
        //network: "mainnet",
        network: "ropsten",
        cacheProvider: true,
        providerOptions,
        theme: "dark",
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
      setFreshConnect(true);
    } else {
      // check if wallet is in our database
      const registeredWallet = await axios.get(
        `/api/wallet/${account.toLowerCase()}`
      );
      if (registeredWallet.data.registered) {
        setRegistered(true);
        setFirst(registeredWallet.data.first);
        setLast(registeredWallet.data.last);
      } else {
        setRegistered(false);
      }
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
              {isProvider.isProvider ? (
                <div
                  className="header"
                  style={{ marginBottom: 10, color: "white", fontSize: 30 }}
                >
                  <span>Welcome back, </span>
                  <span style={{ fontWeight: 900 }}>{isProvider.school}</span>
                </div>
              ) : isRegistered ? (
                <div
                  className="header"
                  style={{ marginBottom: 10, color: "white", fontSize: 30 }}
                >
                  <span>Welcome back, </span>
                  <span style={{ fontWeight: 900 }}>
                    {first} {last}
                  </span>
                </div>
              ) : (
                false
              )}
              <div className="text" style={{ marginBottom: 10 }}>
                Connected wallet: <b>{account}</b>
              </div>
              {freshConnect ? (
                <Link href="/">
                  <button
                    className="button-primary"
                    style={{ marginBottom: 10 }}
                  >
                    Return to home
                  </button>
                </Link>
              ) : (
                false
              )}
              {isProvider.isProvider ? (
                false
              ) : (
                <RegisterNameButton isRegistered={isRegistered} />
              )}

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
