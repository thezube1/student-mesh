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
import axios from "axios";

function ExchangePage() {
  const provider = useSelector((state) => state.account.provider.isProvider);
  const router = useRouter();
  const [data, setData] = useState(undefined);
  const [dataType, setDataType] = useState(undefined);
  const [schoolName, setSchoolName] = useState(undefined);
  const [valid, setValid] = useState(undefined);

  useEffect(async () => {
    abiDecoder.addABI(STUDENTS_ABI);
    const id = await router.query.exchange;
    const request = await axios.get(`/api/request/${id}`);
    if (request.data.length === 0) {
      setValid(false);
    } else {
      setData(request.data);
      Providers.providers.map((item) => {
        if (item.wallet.toLowerCase() === request.data[0].provider) {
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
              {data[0].header}
            </div>
            <div className="line" style={{ maxWidth: 200 }}></div>
            {dataType === "RequestApproval" ? (
              <div className="text form-error" style={{ marginTop: 20 }}>
                Exchange request
              </div>
            ) : (
              false
            )}
            <div>
              <ExchangeInfo
                label="Provider"
                name={schoolName}
                address={data[0].provider}
              />
            </div>
            <div>
              <ExchangeInfo label="Reciever" address={data[0].reciever} />
            </div>
            <div>
              <ExchangeInfo label="File CID" valueOnly address={data[0].cid} />
            </div>
            {!provider && dataType === "RequestApproval" ? (
              <AcceptButtons
                data={data}
                provider={data[0].provider}
                header={data[0].header}
                cid={data[0].cid}
                txhash={router.query.exchange}
              />
            ) : (
              <DownloadButtons data={data} />
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
