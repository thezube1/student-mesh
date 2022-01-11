import Navbar from "../../components/navbar/navbar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Web3 from "web3";
import { STUDENTS_ABI, STUDENTS_ADDRESS } from "../../config";
import abiDecoder from "abi-decoder";

function ExchangePage() {
  const router = useRouter();
  const [data, setData] = useState({});
  const [valid, setValid] = useState(undefined);

  useEffect(async () => {
    abiDecoder.addABI(STUDENTS_ABI);
    const hash = await router.query.exchange;
    const web3 = new Web3(Web3.givenProvider || "HTTP://127.0.0.1:7545");
    const accounts = await web3.eth.getAccounts();
    /*
    const studentContract = new web3.eth.Contract(
      STUDENTS_ABI,
      STUDENTS_ADDRESS
    );
    */
    const receipt = await web3.eth.getTransactionReceipt(hash);
    if (receipt === null) {
      setValid(false);
    } else {
      const logs = await abiDecoder.decodeLogs(receipt.logs);
      setData(logs[0].events);
      setValid(true);
    }
  }, []);
  return (
    <div>
      <Navbar />
      {valid ? <div>{data[3].value}</div> : <div>Invalid exchange</div>}
    </div>
  );
}

export default ExchangePage;

export async function getServerSideProps(context) {
  return {
    props: {},
  };
}
