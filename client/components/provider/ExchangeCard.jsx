import Link from "next/link";

function ExchangeCard(props) {
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
            <span>Provider:</span>{" "}
            <span style={{ fontWeight: 900, fontSize: 14 }}>
              {props.provider}
            </span>
          </div>
          <div className="text provider-exchange-text">
            <span>Student:</span>{" "}
            <span style={{ fontWeight: 900, fontSize: 14 }}>
              {props.reciever}
            </span>
          </div>
          <div className="line" style={{ width: 100, marginBottom: 5 }}></div>
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
