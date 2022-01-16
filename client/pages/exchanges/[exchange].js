import Navbar from "../../components/navbar/navbar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Web3 from "web3";
import { STUDENTS_ABI } from "../../config";
import abiDecoder from "abi-decoder";
import ExchangeInfo from "../../components/exchange/ExchangeInfo";
import Providers from "../../providers.json";
import withAuth from "../../components/routes/withAuth";
import DownloadButtons from "../../components/exchange/DownloadButtons";
import AcceptButtons from "../../components/exchange/AcceptButtons";
import { useSelector } from "react-redux";

function ExchangePage() {
  const provider = useSelector((state) => state.account.provider.isProvider);
  const router = useRouter();
  const [data, setData] = useState(undefined);
  const [schoolName, setSchoolName] = useState(undefined);
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
      const temp = logs[0].events;
      setData(temp);
      Providers.providers.map((item) => {
        if (item.wallet.toLowerCase() === temp[0].value) {
          setSchoolName(item.school);
        }
      });
      setValid(true);
    }
  }, []);

  return (
    <div>
      <Navbar />
      {valid && data !== undefined ? (
        <div id="exchange-wrapper">
          <div>
            <div className="title" style={{ fontSize: 60 }}>
              {data[3].value}
            </div>
            <div className="line" style={{ maxWidth: 200 }}></div>
            <div>
              <ExchangeInfo
                label="Provider"
                name={schoolName}
                address={data[0].value}
              />
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
            {provider ? (
              <DownloadButtons data={data} />
            ) : (
              <AcceptButtons data={data} />
            )}
          </div>
        </div>
      ) : (
        <div>Invalid exchange</div>
      )}
    </div>
  );
}

export default withAuth(ExchangePage);

export async function getServerSideProps(context) {
  return {
    props: {},
  };
}
