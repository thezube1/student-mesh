import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import RegisterNameButton from "../../connect/RegisterNameButton";
import LoadingWheel from "../../loading/LoadingWheel";
import axios from "axios";

function RegisteredAccount() {
  const account = useSelector((state) => state.account.account);
  const [name, setName] = useState({ first: "", last: "" });
  const [registered, setRegistered] = useState(undefined);
  useEffect(async () => {
    const data = await axios.get(`/api/wallet/${account.toLowerCase()}`);
    await setRegistered(data.data.registered);
    if (data.data.registered) {
      await setName({ first: data.data.first, last: data.data.last });
    } else {
      setName(false);
    }
  }, []);

  return (
    <div className="account-bubble">
      {registered === undefined || name === undefined ? (
        <div className="text">Loading...</div>
      ) : registered ? (
        <div>
          <div className="home-header" style={{ marginBottom: 10 }}>
            <span style={{ fontWeight: 100 }}>Name: </span>
            <span>
              {name.first} {name.last}
            </span>
          </div>
          <div
            className="line line-purple"
            style={{ height: 1, marginBottom: 10, maxWidth: 500 }}
          ></div>
          <div className="text account-wallet">
            <span style={{ fontWeight: 100 }}>Wallet:</span>{" "}
            <span>{account}</span>
          </div>
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
  );
}

export default RegisteredAccount;
