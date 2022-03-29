import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoadingWheel from "../../loading/LoadingWheel";
import Navbar from "../../navbar/navbar";
import axios from "axios";
import Web3 from "web3";
import { STUDENTS_ABI, STUDENTS_ADDRESS } from "../../../config";

import getProvider from "../../libs/getProvider";

import RegisteredAccount from "./RegisteredAccount";
import NumberTranscripts from "./NumberTranscripts";
import TranscriptHistory from "./TranscriptHistory";

function AccountPage() {
  const wallet = useSelector((state) => state.account.account);
  const isProvider = useSelector((state) => state.account.provider.isProvider);
  const [requests, setRequests] = useState(undefined);
  const [accepted, setAccepted] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState({ first: "", last: "" });
  const [registered, setRegistered] = useState(undefined);
  useEffect(async () => {
    // getting if registered user
    const nameData = await axios.get(`/api/wallet/${wallet.toLowerCase()}`);
    await setRegistered(nameData.data.registered);
    if (nameData.data.registered) {
      await setName({ first: nameData.data.first, last: nameData.data.last });
    } else {
      setName(false);
    }
    // getting pending transcripts
    const requests = await axios.get(`/api/request/wallet/${wallet}`);
    setRequests(requests.data);

    // getting accepted transcripts
    const provider = await getProvider();
    const web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts();
    const studentContract = new web3.eth.Contract(
      STUDENTS_ABI,
      STUDENTS_ADDRESS
    );

    const accepted = await studentContract.getPastEvents("Transcript", {
      fromBlock: 0,
      toBlock: "latest",
      filter: {
        provider: isProvider ? accounts[0] : false,
        owner: isProvider ? false : accounts[0],
      },
    });
    setAccepted(accepted);
    setLoading(false);
  }, []);

  useEffect(async () => {}, []);
  return (
    <div>
      {loading ? (
        <LoadingWheel />
      ) : (
        <>
          <Navbar />
          <div id="account-wrapper">
            <div id="account-content">
              <div>
                <RegisteredAccount
                  name={name}
                  registered={registered}
                  wallet={wallet}
                />
              </div>
              <div style={{ display: "flex", gap: 20 }}>
                <div>
                  <div style={{ marginBottom: 20 }}>
                    <NumberTranscripts
                      text="pending"
                      number={requests.length}
                    />
                  </div>
                  <div>
                    <NumberTranscripts
                      text="accepted"
                      number={accepted.length}
                    />
                  </div>
                </div>
                <TranscriptHistory
                  data={requests}
                  acceptedData={accepted}
                  name={name}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default AccountPage;
