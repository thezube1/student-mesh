import Web3 from "web3";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setAccount, setName } from "../../redux/reducers/accountReducer";
import { setRegistered } from "../../redux/reducers/contractReducer";
import { STUDENTS_ABI, STUDENTS_ADDRESS } from "../../config";

function LoadBlockchain() {
  const dispatch = useDispatch();

  const loadBlockChainData = async () => {
    if (window.ethereum) {
      // get account
      const web3 = new Web3(Web3.givenProvider || "HTTP://127.0.0.1:7545");
      const accounts = await web3.eth.getAccounts();
      dispatch(setAccount(accounts[0]));
    } else {
      console.log("No metamask detected");
    }
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
  };

  useEffect(() => {
    loadBlockChainData();
  });
  return <></>;
}

export default LoadBlockchain;
