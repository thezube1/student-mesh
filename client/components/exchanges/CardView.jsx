import ExchangeCard from "../provider/ExchangeCard";
import Link from "next/link";

function CardView(props) {
  return (
    <div id="provider-exchanges-wrapper">
      <div className="provider-exchanges-section">
        <div>
          <div className="title pending-exchanges-title">
            Pending Transcripts
          </div>
        </div>
        <div>
          {props.requestData.map((item, index) => {
            return (
              <ExchangeCard
                key={index}
                provider={item.provider}
                reciever={item.reciever}
                header={item.header}
                hash={item._id}
                request
              />
            );
          })}
        </div>
        <Link href="/exchanges/requests">
          <button className="button-primary" style={{ marginBottom: 20 }}>
            View All
          </button>
        </Link>
      </div>
      <div className="provider-exchanges-section">
        <div className="title pending-exchanges-title">
          Approved Transcripts
        </div>
        {props.approvedData
          .slice(0)
          .reverse()
          .map((item, index) => {
            const temp = item.returnValues;
            return (
              <ExchangeCard
                key={index}
                provider={temp.provider.toLowerCase()}
                reciever={temp.owner.toLowerCase()}
                header={temp.header}
                hash={item.transactionHash}
              />
            );
          })}
        <Link href="/exchanges/approved">
          <button className="button-primary" style={{ marginBottom: 20 }}>
            View All
          </button>
        </Link>
      </div>
    </div>
  );
}

export default CardView;
