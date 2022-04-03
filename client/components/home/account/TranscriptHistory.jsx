import Providers from "../../../providers.json";

function TranscriptHistory(props) {
  return (
    <div className="account-bubble account-history-wrapper">
      <div className="header">Transcript History</div>
      <div id="account-history-content">
        <div className="header account-history-header">School</div>
        <div className="header account-history-header">Reciever</div>
        <div className="header account-history-header">Description</div>
        <div className="header account-history-header">Status</div>
        {props.data.map((item) => {
          return (
            <>
              <div className="account-history-item">
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
              <div className="account-history-item">
                <div className="vertical-line line-purple account-history-tab"></div>
                <div className="text">
                  {!props.name
                    ? "Unknown"
                    : `${props.name.first} ${props.name.last}`}
                </div>
              </div>
              <div className="account-history-item">
                <div className="vertical-line line-purple account-history-tab"></div>
                <div className="text">{item.header}</div>
              </div>
              <div className="account-history-item">
                <div className="vertical-line line-purple account-history-tab"></div>
                <div className="text">Pending</div>
              </div>
            </>
          );
        })}
        {props.acceptedData.map((item) => {
          return (
            <>
              <div className="account-history-item">
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
              <div className="account-history-item">
                <div className="vertical-line line-purple account-history-tab"></div>
                <div className="text">
                  {props.name.first} {props.name.last}
                </div>
              </div>
              <div className="account-history-item">
                <div className="vertical-line line-purple account-history-tab"></div>
                <div className="text">{item.returnValues.header}</div>
              </div>
              <div className="account-history-item">
                <div className="vertical-line line-purple account-history-tab"></div>
                <div className="text">Accepted</div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default TranscriptHistory;
