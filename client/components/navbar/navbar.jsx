import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";
import useWindowSize from "../libs/useWindowSize";

function Navbar() {
  const address = useSelector((state) => state.account.account);
  const provider = useSelector((state) => state.account.provider.isProvider);
  const size = useWindowSize();
  const [open, setOpen] = useState(false);
  const providerNavbar = (mobile) => {
    return (
      <>
        <Link href="/exchanges">
          <div
            className={`navbar-item ${mobile ? "navbar-item-mobile" : false}`}
            id="nav-exchanges"
          >
            Exchanges
          </div>
        </Link>
        <Link href="/exchanges/create">
          <div
            className={`navbar-item-focused ${
              mobile ? "navbar-item-mobile-focused" : false
            }`}
          >
            Create Exchange
          </div>
        </Link>
      </>
    );
  };

  const accountNavbar = (mobile) => {
    return (
      <Link href="/exchanges">
        <div
          id="nav-exchanges"
          className={`navbar-item ${mobile ? "navbar-item-mobile" : false}`}
        >
          Exchanges
        </div>
      </Link>
    );
  };

  const defaultNavbar = (mobile) => {
    return (
      <>
        <Link href="/about">
          <div
            className={`navbar-item ${mobile ? "navbar-item-mobile" : false}`}
          >
            About
          </div>
        </Link>
        <Link href="/connect">
          <div
            className={`navbar-item-primary ${
              mobile ? "navbar-item-mobile-focused" : false
            }`}
          >
            Connect
          </div>
        </Link>
      </>
    );
  };

  return (
    <>
      {size.width < 700 ? (
        <>
          <div
            style={{ clipPath: open ? "circle(100%)" : "circle(0%)" }}
            className="navbar-mobile-wrapper"
          >
            <Link href="/">
              <div className="navbar-item navbar-item-mobile">Home</div>
            </Link>
            {provider && address !== null
              ? providerNavbar(true)
              : address !== null
              ? accountNavbar(true)
              : defaultNavbar(true)}
            <Link href="/connect">
              <div
                className="navbar-item navbar-item-mobile"
                id="nav-settings"
                style={{ marginTop: 30 }}
              >
                {address ? "Settings" : false}
              </div>
            </Link>
          </div>
          <button className="nav-burger" onClick={() => setOpen(!open)}>
            <div
              className="nav-line"
              style={{
                backgroundColor: open ? "black" : "white",
                transform: open
                  ? "translateY(11px) rotate(45deg)"
                  : "rotate(0deg)",
              }}
            ></div>
            <div className="nav-line"></div>
            <div
              className="nav-line"
              style={{
                backgroundColor: open ? "black" : "white",
                transform: open
                  ? "translateY(-12px) rotate(-45deg)"
                  : "rotate(0deg)",
              }}
            ></div>
          </button>
        </>
      ) : (
        <>
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
                <div className="navbar-item" id="nav-settings">
                  {address ? "Settings" : false}
                </div>
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Navbar;
