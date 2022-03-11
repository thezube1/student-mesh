import Navbar from "../../navbar/navbar";
import { useSelector } from "react-redux";
import ExchangeCard from "../../provider/ExchangeCard";
import { useEffect, useState } from "react";
import axios from "axios";
import Web3 from "web3";
import Link from "next/link";
import getProvider from "../../libs/getProvider";

function ProviderHome() {
  const school = useSelector((state) => state.account.provider.school);
  const [data, setData] = useState(undefined);
  useEffect(async () => {
    const provider = await getProvider();
    const web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts();
    const res = await axios.get(`/api/request/wallet/${accounts[0]}`);
    setData(res.data);
  }, []);
  return (
    <div>
      <Navbar />
      <div id="provider-wrapper">
        <div id="provider-title">
          <div className="title school-title">{school}</div>
          <div className="line school-line"></div>
        </div>
        <div className="pending-exchanges" style={{ width: 320 }}>
          <div className="title pending-exchanges-title">Pending Exchanges</div>
          <div>
            {!data ? (
              <div className="text">Loading...</div>
            ) : data.length === 0 ? (
              <div style={{ display: "grid", justifyItems: "center" }}>
                <div className="text" style={{ marginBottom: 20 }}>
                  No pending exchanges
                </div>
                <Link href="/exchanges/create">
                  <button className="button-primary">Create exchange</button>
                </Link>
              </div>
            ) : (
              data
                .slice(0)
                .reverse()
                .map((item, index) => {
                  console.log(item);
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
                })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProviderHome;
