import Navbar from "../components/navbar/navbar";
import { STUDENTS_ABI, STUDENTS_ADDRESS } from "../config";
import { useEffect, useState } from "react";
import Web3 from "web3";
import { useSelector } from "react-redux";
import withAuth from "../components/routes/withAuth";
import axios from "axios";
import LoadingWheel from "../components/loading/LoadingWheel";
import getProvider from "../components/libs/getProvider";
import ChangeView from "../components/exchanges/ChangeView";
import CardView from "../components/exchanges/CardView";
import ListView from "../components/exchanges/ListView";

function ExchangePage() {
  const [requestData, setRequestData] = useState(undefined);
  const [approvedData, setApprovedData] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const isProvider = useSelector((state) => state.account.provider.isProvider);
  const layout = useSelector((state) => state.layout.layout);

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
        owner: isProvider ? false : accounts[0],
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
        <>
          <ChangeView />
          {layout === "card" ? (
            <CardView approvedData={approvedData} requestData={requestData} />
          ) : (
            <ListView approvedData={approvedData} requestData={requestData} />
          )}
        </>
      )}
    </div>
  );
}

export default withAuth(ExchangePage);
