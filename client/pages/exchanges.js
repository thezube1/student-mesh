import Navbar from "../components/navbar/navbar";
import { STUDENTS_ABI, STUDENTS_ADDRESS } from "../config";
import { useEffect, useState } from "react";
import Web3 from "web3";
import ExchangeCard from "../components/provider/ExchangeCard";
import withProvider from "../components/routes/withProvider";

function ExchangePage() {
  const [data, setData] = useState([]);
  useEffect(async () => {
    const web3 = new Web3(Web3.givenProvider || "HTTP://127.0.0.1:7545");
    const accounts = await web3.eth.getAccounts();
    const studentContract = new web3.eth.Contract(
      STUDENTS_ABI,
      STUDENTS_ADDRESS
    );
    const retrieval = await studentContract.getPastEvents("RequestApproval", {
      fromBlock: 0,
      toBlock: "latest",
      filter: { _from: accounts[0] },
    });
    console.log(retrieval);
    setData(retrieval);
  }, []);
  return (
    <div>
      <Navbar />
      <div id="provider-exchanges-wrapper">
        <div className="provider-exchanges-section">
          <div>
            <div className="title pending-exchanges-title">
              Pending Exchanges
            </div>
          </div>
          <div>
            {data.map((item, index) => {
              const returns = item.returnValues;
              return (
                <ExchangeCard
                  key={index}
                  provider={returns.provider}
                  reciever={returns.reciever}
                  header={returns.header}
                  hash={item.transactionHash}
                />
              );
            })}
          </div>
        </div>
        <div className="provider-exchanges-section">
          <div className="title pending-exchanges-title">
            Completed Exchanges
          </div>
        </div>
      </div>
    </div>
  );
}

export default withProvider(ExchangePage);
