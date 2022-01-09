import Navbar from "../../components/navbar/navbar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Web3 from "web3";
import { STUDENTS_ABI, STUDENTS_ADDRESS } from "../../config";

function ExchangePage() {
  const router = useRouter();
  const [data, setData] = useState({});
  const [valid, setValid] = useState(undefined);

  useEffect(async () => {
    const exchangeAddress = await router.query.exchange;
    const web3 = new Web3(Web3.givenProvider || "HTTP://127.0.0.1:7545");
    const accounts = await web3.eth.getAccounts();
    const studentContract = new web3.eth.Contract(
      STUDENTS_ABI,
      STUDENTS_ADDRESS
    );
    const data = await studentContract.getPastEvents("RequestApproval", {
      fromBlock: 0,
      toBlock: "latest",
      filter: { transactionHash: exchangeAddress },
    });
    if (setData.length === 0) {
      setValid(false);
    } else {
      setData(data[0]);
      setValid(true);
    }
  }, []);

  return (
    <div>
      <Navbar />
      {valid ? (
        <div>{data.returnValues.provider}</div>
      ) : (
        <div>Invalid exchange</div>
      )}
    </div>
  );
}

export default ExchangePage;

export async function getServerSideProps(context) {
  return {
    props: {},
  };
}
