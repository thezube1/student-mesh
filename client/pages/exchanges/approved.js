import withAuth from "../../components/routes/withAuth";
import Navbar from "../../components/navbar/navbar";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Web3 from "web3";
import { STUDENTS_ABI, STUDENTS_ADDRESS } from "../../config";
import LoadingWheel from "../../components/loading/LoadingWheel";
import ExchangeCard from "../../components/provider/ExchangeCard";

function ApprovedPage() {
  const provider = useSelector((state) => state.account.provider.isProvider);
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(true);
  useEffect(async () => {
    setLoading(true);
    const web3 = new Web3(Web3.givenProvider || "HTTP://127.0.0.1:7545");
    const accounts = await web3.eth.getAccounts();
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

    setData(retrieval);
    setLoading(false);
  }, []);
  return (
    <>
      <Navbar />
      {loading ? (
        <LoadingWheel />
      ) : (
        <div className="approved-exchanges-wrapper">
          {data.length === 0 ? (
            <div
              className="title"
              style={{
                display: "grid",
                justifyContent: "center",
                height: "100vh",
                alignContent: "center",
              }}
            >
              No approved exchanges
            </div>
          ) : (
            data
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
              })
          )}
        </div>
      )}
    </>
  );
}

export default withAuth(ApprovedPage);
