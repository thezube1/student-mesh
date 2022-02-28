import Web3 from "web3";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setAccount, setProvider } from "../../redux/reducers/accountReducer";
import Providers from "../../providers.json";
import Web3Modal from "web3modal";
import WalletLink from "walletlink";

//import { setRegistered } from "../../redux/reducers/contractReducer";
//import { STUDENTS_ABI, STUDENTS_ADDRESS } from "../../config";

function LoadBlockchain() {
  const dispatch = useDispatch();

  const providerOptions = {
    walletlink: {
      package: WalletLink,
      options: {
        appName: "Student Mesh",
        rpc: "localhost:7545",
        chainId: 1337,
      },
    },
  };

  const loadBlockChainData = async () => {
    /*
    const web3Modal = new Web3Modal({
      network: "mainnet",
      providerOptions,
    });
    const cachedProviderName = JSON.parse(
      localStorage.getItem("WEB3_CONNECT_CACHED_PROVIDER")
    );
    const connector =
      web3Modal.providerController.providerOptions[cachedProviderName]
        .connector; // get account
    const proxy = await connector;
*/
    const web3 = new Web3(Web3.givenProvider);
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
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
  };

  useEffect(() => {
    loadBlockChainData();
  });
  return <></>;
}

export default LoadBlockchain;

/*
      // get contract
      if (accounts[0]) {
        const studentContract = new web3.eth.Contract(
          STUDENTS_ABI,
          STUDENTS_ADDRESS
        );
        const data = await studentContract.getPastEvents("Student", {
          fromBlock: 0,
          toBlock: "latest",
          filter: { _from: accounts[0] },
        });
        if (data.length !== 0) {
          dispatch(setRegistered(true));
          dispatch(
            setName({
              first: data[0].returnValues._first,
              last: data[0].returnValues._last,
            })
          );
        } else {
          dispatch(setRegistered(false));
        }
      }
    } else {
      console.log("No metamask detected");
    }
    */
