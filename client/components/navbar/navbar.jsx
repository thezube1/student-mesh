import Link from "next/link";
import { useSelector } from "react-redux";

function Navbar() {
  const address = useSelector((state) => state.account.account);
  const provider = useSelector((state) => state.account.provider);

  const providerNavbar = () => {
    return (
      <>
        <Link href="/exchanges">
          <div className="navbar-item">View Exchanges</div>
        </Link>
        <Link href="/exchanges/create">
          <div className="navbar-item-focused">Create Exchange</div>
        </Link>
      </>
    );
  };

  const accountNavbar = () => {
    return (
      <Link href="/account">
        <div className="navbar-item">Account</div>
      </Link>
    );
  };

  const defaultNavbar = () => {
    return (
      <Link href="/connect">
        <div className="navbar-item">Connect</div>
      </Link>
    );
  };
  return (
    <div id="navbar-wrapper">
      <Link href="/">
        <div className="navbar-item">Home</div>
      </Link>
      {provider && address !== null
        ? providerNavbar()
        : address !== null
        ? accountNavbar()
        : defaultNavbar()}
    </div>
  );
}

export default Navbar;
