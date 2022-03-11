import Navbar from "../components/navbar/navbar";
import { STUDENTS_ABI, STUDENTS_ADDRESS } from "../config";
import { useEffect, useState } from "react";
import Web3 from "web3";
import ExchangeCard from "../components/provider/ExchangeCard";
import { useSelector } from "react-redux";
import withAuth from "../components/routes/withAuth";
import axios from "axios";
import LoadingWheel from "../components/loading/LoadingWheel";
import Link from "next/link";
import getProvider from "../components/libs/getProvider";

function ExchangePage() {
  const [requestData, setRequestData] = useState(undefined);
  const [approvedData, setApprovedData] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const isProvider = useSelector((state) => state.account.provider.isProvider);
  useEffect(async () => {
    setLoading(true);
    const provider = await getProvider();
    const web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts();

    const res = await axios.get(`/api/request/wallet/${accounts[0]}`);

    const studentContract = new web3.eth.Contract(
      STUDENTS_ABI,
      STUDENTS_ADDRESS
    );

    const retrieval = await studentContract.getPastEvents("Transcript", {
      fromBlock: 0,
      toBlock: "latest",
      filter: {
        provider: isProvider ? accounts[0] : false,
        reciever: isProvider ? false : accounts[0],
      },
    });
    setApprovedData(retrieval);
    setRequestData(res.data);
    setLoading(false);
  }, []);

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
            <Link href="/exchanges/requests">
              <button className="button-primary" style={{ marginBottom: 20 }}>
                View All
              </button>
            </Link>
          </div>
          <div className="provider-exchanges-section">
            <div className="title pending-exchanges-title">
              Completed Exchanges
            </div>
            {approvedData
              .slice(0)
              .reverse()
              .map((item, index) => {
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
            <Link href="/exchanges/approved">
              <button className="button-primary" style={{ marginBottom: 20 }}>
                View All
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default withAuth(ExchangePage);
