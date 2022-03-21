import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoadingWheel from "../../loading/LoadingWheel";
import Navbar from "../../navbar/navbar";
import AccountInfo from "../../account/AccountInfo";
import axios from "axios";
import RegisterNameButton from "../../connect/RegisterNameButton";

function AccountPage() {
  const account = useSelector((state) => state.account.account);
  const [name, setName] = useState({ first: "", last: "" });
  const [registered, setRegistered] = useState(undefined);
  useEffect(async () => {
    const data = await axios.get(`/api/wallet/${account.toLowerCase()}`);
    await setRegistered(data.data.registered);
    if (data.data.registered) {
      console.log(data.data);
      await setName({ first: data.data.first, last: data.data.last });
    } else {
      setName(false);
    }
  }, []);
  return (
    <div>
      {registered === undefined || name === undefined ? (
        <LoadingWheel />
      ) : (
        false
      )}

      <Navbar />
      <div id="account-wrapper">
        <div id="account-content">
          {registered ? (
            <div>
              <div className="home-header">
                Account: {name.first} {name.last}
              </div>
              <div className="text">Wallet: {account}</div>
            </div>
          ) : (
            <div style={{ display: "grid", justifyItems: "center" }}>
              <div className="text" style={{ marginBottom: 20 }}>
                Link account to Student Mesh
              </div>
              <RegisterNameButton />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AccountPage;
