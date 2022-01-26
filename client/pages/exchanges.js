import Navbar from "../components/navbar/navbar";
import { STUDENTS_ABI, STUDENTS_ADDRESS } from "../config";
import { useEffect, useState } from "react";
import Web3 from "web3";
import ExchangeCard from "../components/provider/ExchangeCard";
import { useSelector } from "react-redux";
import withAuth from "../components/routes/withAuth";
import axios from "axios";

function ExchangePage() {
  const [data, setData] = useState([]);
  const provider = useSelector((state) => state.account.provider.isProvider);
  useEffect(async () => {
    const web3 = new Web3(Web3.givenProvider || "HTTP://127.0.0.1:7545");
    const accounts = await web3.eth.getAccounts();
    /*
    const studentContract = new web3.eth.Contract(
      STUDENTS_ABI,
      STUDENTS_ADDRESS
    );
    const retrieval = await studentContract.getPastEvents("RequestApproval", {
      fromBlock: 0,
      toBlock: "latest",
      filter: {
        provider: provider ? accounts[0] : false,
        reciever: provider ? false : accounts[0],
      },
    });
    setData(retrieval);
    */

    axios
      .get(`/api/request/wallet/${accounts[0]}`)
      .then((res) => setData(res.data));
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
              return (
                <ExchangeCard
                  key={index}
                  provider={item.provider}
                  reciever={item.reciever}
                  header={item.header}
                  hash={item._id}
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

export default withAuth(ExchangePage);
