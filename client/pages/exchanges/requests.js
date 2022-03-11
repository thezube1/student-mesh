import withAuth from "../../components/routes/withAuth";
import Navbar from "../../components/navbar/navbar";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Web3 from "web3";
import LoadingWheel from "../../components/loading/LoadingWheel";
import ExchangeCard from "../../components/provider/ExchangeCard";
import axios from "axios";
import getProvider from "../../components/libs/getProvider";

function RequestsPage() {
  const provider = useSelector((state) => state.account.provider.isProvider);
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(true);
  useEffect(async () => {
    setLoading(true);
    const provider = await getProvider();
    const web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts();
    const res = await axios.get(`/api/request/wallet/${accounts[0]}`);

    setData(res.data);
    setLoading(false);
  }, []);
  return (
    <>
      <Navbar />
      {loading ? (
        <LoadingWheel />
      ) : data.length !== 0 ? (
        <div className="request-exchanges-wrapper">
          {data
            .slice(0)
            .reverse()
            .map((item, index) => {
              const temp = item.returnValues;
              return (
                <ExchangeCard
                  key={index}
                  provider={item.provider.toLowerCase()}
                  reciever={item.reciever.toLowerCase()}
                  header={item.header}
                  hash={item._id}
                  request
                />
              );
            })}
        </div>
      ) : (
        <div
          className="title"
          style={{
            display: "grid",
            justifyContent: "center",
            height: "100vh",
            alignContent: "center",
          }}
        >
          No exchange requests
        </div>
      )}
    </>
  );
}

export default withAuth(RequestsPage);
