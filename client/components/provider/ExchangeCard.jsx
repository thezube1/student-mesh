import Link from "next/link";
import Providers from "../../providers.json";
import { useEffect, useState } from "react";
import axios from "axios";

function ExchangeCard(props) {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [registered, setRegistered] = useState(false);
  useEffect(async () => {
    const user = await axios.get(`/api/wallet/${props.reciever.toLowerCase()}`);
    setRegistered(user.data.registered);
    if (user.data.registered) {
      setFirst(user.data.first);
      setLast(user.data.last);
    }
  }, []);
  return (
    <Link
      href={
        props.request
          ? `/exchanges/request/${props.hash}`
          : `/exchanges/approved/${props.hash}`
      }
    >
      <div className="exchange-card-wrapper">
        <div className="exchange-card-content">
          <div className="text provider-exchange-text">
            <span>
              Provider:{" "}
              <span style={{ fontWeight: 900 }}>
                {Providers.providers.map((item) => {
                  if (
                    props.provider.toUpperCase() === item.wallet.toUpperCase()
                  ) {
                    return item.school;
                  }
                })}
              </span>
            </span>

            <div style={{ fontWeight: 100, fontSize: 14 }}>
              {props.provider}
            </div>
          </div>
          <div className="text provider-exchange-text">
            <span>
              Student:{" "}
              <span style={{ fontWeight: 900 }}>
                {registered ? `${first} ${last}` : "Unknown"}
              </span>
            </span>{" "}
            <div style={{ fontWeight: 100, fontSize: 14 }}>
              {props.reciever}
            </div>
          </div>
          <div
            className="line"
            style={{
              width: 100,
              marginBottom: 5,
              backgroundColor: "black",
              height: 1,
            }}
          ></div>
          <div className="text provider-exchange-text">
            <span style={{ fontSize: 17 }}>Information Header: </span>
            <div className="text-bold" style={{ width: 330 }}>
              {props.header}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ExchangeCard;
