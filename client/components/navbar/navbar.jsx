import Link from "next/link";
import { useSelector } from "react-redux";

function Navbar() {
  const address = useSelector((state) => state.account.account);
  return (
    <div id="navbar-wrapper">
      <Link href="/">
        <div className="navbar-item">Home</div>
      </Link>
      {address ? (
        <>
          <Link href="/account">
            <div className="navbar-item">Account</div>
          </Link>
        </>
      ) : (
        <>
          <Link href="/connect">
            <div className="navbar-item">Connect</div>
          </Link>
        </>
      )}
    </div>
  );
}

export default Navbar;
