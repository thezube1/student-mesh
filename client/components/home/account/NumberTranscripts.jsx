function PendingTranscripts(props) {
  return (
    <div
      className="account-bubble account-number-wrapper"
      style={{ padding: 30, paddingTop: 42 }}
    >
      <div className="header account-number-text">
        <span>Number of </span>
        <span className="purple-text" style={{ fontWeight: 900 }}>
          {props.text}
        </span>
        <span> transcripts</span>
      </div>
      <div className="vertical-line line-purple account-line"></div>
      <div className="title account-number">{props.number}</div>
    </div>
  );
}

export default PendingTranscripts;
