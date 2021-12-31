import Web3 from "web3";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setAccount, setContract } from "../../redux/reducers/web3Reducer";
import { STUDENTS_ABI, STUDENTS_ADDRESS } from "../../config";

function CheckAccount() {
  const dispatch = useDispatch();

  const loadBlockChainData = async () => {
    if (window.ethereum) {
      // get account
      const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
      const accounts = await web3.eth.getAccounts();
      dispatch(setAccount(accounts[0]));
      // get contract
      const studentContract = new web3.eth.Contract(
        STUDENTS_ABI,
        STUDENTS_ADDRESS
      );
      dispatch(setContract(studentContract));
    } else {
      console.log("No metamask detected");
    }
  };

  useEffect(() => {
    loadBlockChainData();
  });
  return <div></div>;
}

export default CheckAccount;
