import Link from "next/link";
import Providers from "../../providers.json";
import axios from "axios";

function ListView(props) {
  const getDate = async (txhash) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const data = await axios.get(`/api/approved/${txhash}`);
    /*
    const date = new Date(
      parseInt(data.data._id.toString().substring(0, 8), 16) * 1000
    );
    return `${
      months[date.getMonth()]
    } ${data.getDate()}, ${date.getFullYear()}`;
    */
    console.log(
      `${months[date.getMonth()]} ${data.getDate()}, ${date.getFullYear()}`
    );
  };

  return (
    <div className="exchanges-list-wrapper">
      <div className="exchanges-list-content">
        <div className="header exchanges-header">School</div>
        <div className="header exchanges-header">Reciever</div>
        <div className="header exchanges-header">Description</div>
        <div className="header exchanges-header">Date</div>
        <div className="header exchanges-header">Status</div>
        {props.requestData.map((item, index) => {
          const date = new Date(
            parseInt(item._id.toString().substring(0, 8), 16) * 1000
          );
          const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ];

          return (
            <Link href={`/exchanges/request/${item._id}`}>
              <div className="exchanges-item-container" key={index}>
                <div className="exchanges-item-wrapper">
                  <div className="vertical-line line-purple account-history-tab"></div>
                  <div className="text">
                    {Providers.providers.map((school) => {
                      if (
                        item.provider.toLowerCase() ===
                        school.wallet.toLowerCase()
                      ) {
                        return school.school;
                      }
                    })}
                  </div>
                </div>
                <div className="exchanges-item-wrapper">
                  <div className="vertical-line line-purple account-history-tab"></div>
                  <div className="text">Unknown</div>
                </div>
                <div className="exchanges-item-wrapper">
                  <div className="vertical-line line-purple account-history-tab"></div>
                  <div className="text">{item.header}</div>
                </div>
                <div className="exchanges-item-wrapper">
                  <div className="vertical-line line-purple account-history-tab"></div>
                  <div className="text">
                    {months[date.getMonth()]} {date.getDate()},{" "}
                    {date.getFullYear()}
                  </div>
                </div>
                <div className="exchanges-item-wrapper">
                  <div className="vertical-line line-purple account-history-tab"></div>
                  <div className="text">Request</div>
                </div>
              </div>
            </Link>
          );
        })}
        {props.approvedData.map((item, index) => {
          return (
            <Link href={`/exchanges/approved/${item.transactionHash}`}>
              <div className="exchanges-item-container" key={index}>
                <div className="exchanges-item-wrapper">
                  <div className="vertical-line line-purple account-history-tab"></div>
                  <div className="text">
                    {Providers.providers.map((school) => {
                      if (
                        item.returnValues.provider.toLowerCase() ===
                        school.wallet.toLowerCase()
                      ) {
                        return school.school;
                      }
                    })}
                  </div>
                </div>
                <div className="exchanges-item-wrapper">
                  <div className="vertical-line line-purple account-history-tab"></div>
                  <div className="text">Unknown</div>
                </div>
                <div className="exchanges-item-wrapper">
                  <div className="vertical-line line-purple account-history-tab"></div>
                  <div className="text">{item.returnValues.header}</div>
                </div>
                <div className="exchanges-item-wrapper">
                  <div className="vertical-line line-purple account-history-tab"></div>
                  <div className="text"></div>
                </div>
                <div className="exchanges-item-wrapper">
                  <div className="vertical-line line-purple account-history-tab"></div>
                  <div className="text">Accepted</div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default ListView;
