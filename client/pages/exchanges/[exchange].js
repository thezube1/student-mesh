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

    const temp = await studentContract.getPastEvents("RequestApproval", {
      filter: { transactionHash: exchangeAddress },
    });

    console.log(exchangeAddress);
    console.log(temp);
    if (temp.length === 0) {
      setValid(false);
    } else {
      setData(temp[0]);
      setValid(true);
    }
  }, []);

  return (
    <div>
      <Navbar />
      {valid ? (
        <div>{data.returnValues.header}</div>
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
