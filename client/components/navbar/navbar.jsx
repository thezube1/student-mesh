import Link from "next/link";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

function Navbar() {
  const address = useSelector((state) => state.account.account);
  const provider = useSelector((state) => state.account.provider.isProvider);
  const router = useRouter();
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
      <Link href="/exchanges">
        <div className="navbar-item">Exchanges</div>
      </Link>
    );
  };

  const defaultNavbar = () => {
    return (
      <>
        <Link href="/connect">
          <div className="navbar-item">About</div>
        </Link>
        <Link href="/connect">
          <div className="navbar-item-primary">Connect</div>
        </Link>
      </>
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
      <div id="navbar-stuff">
        <Link href="/connect">
          <div className="navbar-item">{address ? "Settings" : false}</div>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
