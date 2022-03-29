import RegisterNameButton from "../../connect/RegisterNameButton";

function RegisteredAccount(props) {
  return (
    <div className="account-bubble">
      {props.registered === undefined || props.name === undefined ? (
        <div className="text">Loading...</div>
      ) : props.registered ? (
        <div>
          <div className="home-header" style={{ marginBottom: 10 }}>
            <span style={{ fontWeight: 100 }}>Name: </span>
            <span>
              {props.name.first} {props.name.last}
            </span>
          </div>
          <div
            className="line line-purple"
            style={{ height: 1, marginBottom: 10, maxWidth: 500 }}
          ></div>
          <div className="text account-wallet">
            <span style={{ fontWeight: 100 }}>Wallet:</span>{" "}
            <span>{props.wallet}</span>
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
