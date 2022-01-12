function ExchangeInfo(props) {
  return (
    <div className="exchange-info">
      <div className="exchange-label">{props.label}:</div>
      <div className="exchange-values">
        {props.valueOnly ? (
          false
        ) : (
          <>
            {" "}
            <div className="text-bold">Unknown</div>
            <div className="exchange-vertical-line"></div>
          </>
        )}

        <div className="text">{props.address}</div>
      </div>
    </div>
  );
}

export default ExchangeInfo;
