import Navbar from "../../components/navbar/navbar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Web3 from "web3";
import { STUDENTS_ABI } from "../../config";
import abiDecoder from "abi-decoder";
import ExchangeInfo from "../../components/exchange/ExchangeInfo";

function ExchangePage() {
  const router = useRouter();
  const [data, setData] = useState({});
  const [valid, setValid] = useState(undefined);

  useEffect(async () => {
    abiDecoder.addABI(STUDENTS_ABI);
    const hash = await router.query.exchange;
    const web3 = new Web3(Web3.givenProvider || "HTTP://127.0.0.1:7545");
    const receipt = await web3.eth.getTransactionReceipt(hash);
    if (receipt === null) {
      setValid(false);
    } else {
      const logs = await abiDecoder.decodeLogs(receipt.logs);
      setData(logs[0].events);
      setValid(true);
    }
  }, []);
  console.log(data);
  return (
    <div>
      <Navbar />
      {valid ? (
        <div id="exchange-wrapper">
          <div>
            <div className="title" style={{ fontSize: 60 }}>
              {data[3].value}
            </div>
            <div className="line" style={{ maxWidth: 200 }}></div>
            <div>
              <ExchangeInfo label="Provider" address={data[0].value} />
            </div>
            <div>
              <ExchangeInfo label="Reciever" address={data[1].value} />
            </div>
            <div>
              <ExchangeInfo
                label="File CID"
                valueOnly
                address={data[2].value}
              />
            </div>
            <div className="exchange-buttons">
              <button className="button" style={{ marginRight: 20 }}>
                View file
              </button>
              <button className="button-primary">Download</button>
            </div>
          </div>
        </div>
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
