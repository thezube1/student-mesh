import Web3 from "web3";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setAccount, setProvider } from "../../redux/reducers/accountReducer";
import Providers from "../../providers.json";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import getProvider from "../libs/getProvider";
import Web3Modal from "web3modal";
//import { setRegistered } from "../../redux/reducers/contractReducer";
//import { STUDENTS_ABI, STUDENTS_ADDRESS } from "../../config";

function LoadBlockchain() {
  const dispatch = useDispatch();
  const account = useSelector((state) => state.account.account);

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

  const loadBlockChainData = async () => {
    const cachedProviderName = JSON.parse(
      localStorage.getItem("WEB3_CONNECT_CACHED_PROVIDER")
    );

    if (account === null) {
      const web3Modal = new Web3Modal({
        network: "mainnet",
        providerOptions,
      });
      web3Modal.clearCachedProvider();
    }

    if (cachedProviderName !== null) {
      const provider = await getProvider();
      try {
        const web3 = new Web3(provider);
        const accounts = await web3.eth.getAccounts();
        if (accounts[0] === undefined) {
          dispatch(setProvider({ isProvider: false, school: null }));
          dispatch(setAccount(null));
        } else {
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
        f;
      } catch (error) {
        //web3Modal.clearCachedProvider();
      }
    } else {
      dispatch(setProvider({ isProvider: false, school: null }));
      dispatch(setAccount(null));
    }
  };

  useEffect(() => {
    loadBlockChainData();
  });
  return <></>;
}

export default LoadBlockchain;
