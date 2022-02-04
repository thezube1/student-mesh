import Navbar from "../components/navbar/navbar";
import { STUDENTS_ABI, STUDENTS_ADDRESS } from "../config";
import { useEffect, useState } from "react";
import Web3 from "web3";
import ExchangeCard from "../components/provider/ExchangeCard";
import { useSelector } from "react-redux";
import withAuth from "../components/routes/withAuth";
import axios from "axios";
import LoadingWheel from "../components/loading/LoadingWheel";

function ExchangePage() {
  const [requestData, setRequestData] = useState([]);
  const [approvedData, setApprovedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const provider = useSelector((state) => state.account.provider.isProvider);
  useEffect(async () => {
    setLoading(true);
    const web3 = new Web3(Web3.givenProvider || "HTTP://127.0.0.1:7545");
    const accounts = await web3.eth.getAccounts();
    const res = await axios.get(`/api/request/wallet/${accounts[0]}`);
    setRequestData(res.data);
    setLoading(false);

    const studentContract = new web3.eth.Contract(
      STUDENTS_ABI,
      STUDENTS_ADDRESS
    );
    const retrieval = await studentContract.getPastEvents("Transcript", {
      fromBlock: 0,
      toBlock: "latest",
      filter: {
        provider: provider ? accounts[0] : false,
        reciever: provider ? false : accounts[0],
      },
    });
    setApprovedData(retrieval);
    console.log(retrieval);
  }, []);
  console.log(approvedData);
  return (
    <div>
      <Navbar />
      {loading ? (
        <LoadingWheel />
      ) : (
        <div id="provider-exchanges-wrapper">
          <div className="provider-exchanges-section">
            <div>
              <div className="title pending-exchanges-title">
                Pending Exchanges
              </div>
            </div>
            <div>
              {requestData.map((item, index) => {
                return (
                  <ExchangeCard
                    key={index}
                    provider={item.provider}
                    reciever={item.reciever}
                    header={item.header}
                    hash={item._id}
                    request
                  />
                );
              })}
            </div>
          </div>
          <div className="provider-exchanges-section">
            <div className="title pending-exchanges-title">
              Completed Exchanges
            </div>
            {approvedData.map((item, index) => {
              const temp = item.returnValues;
              return (
                <ExchangeCard
                  key={index}
                  provider={temp.provider.toLowerCase()}
                  reciever={temp.owner.toLowerCase()}
                  header={temp.header}
                  hash={item.transactionHash}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default withAuth(ExchangePage);
