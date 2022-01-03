import { useSelector } from "react-redux";

function AccountInfo() {
  const name = useSelector((state) => state.account.name);
  return (
    <div>
      <div className="text">Account</div>
      <div className="text">{`${name.first} ${name.last}`}</div>
    </div>
  );
}

export default AccountInfo;
