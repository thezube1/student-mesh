import Web3 from "web3";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setAccount, setProvider } from "../../redux/reducers/accountReducer";
import Providers from "../../providers.json";
//import { setRegistered } from "../../redux/reducers/contractReducer";
//import { STUDENTS_ABI, STUDENTS_ADDRESS } from "../../config";

function LoadBlockchain() {
  const dispatch = useDispatch();

  const loadBlockChainData = async () => {
    if (window.ethereum) {
      // get account
      const web3 = new Web3(Web3.givenProvider || "HTTP://127.0.0.1:7545");
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
    } else {
      console.log("No metamask detected");
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
