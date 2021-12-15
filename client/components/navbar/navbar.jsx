import React, { Component } from "react";
import Link from "next/link";

class Navbar extends React.Component {
  state = {
    loggedIn: true,
  };

  componentDidMount() {
    if (!window.ethereum || !window.ethereum.selectedAddress) {
      this.setState({ loggedIn: false });
    } else {
      this.setState({ loggedIn: true });
    }
  }

  render() {
    return (
      <div id="navbar-wrapper">
        <Link href="/">
          <div className="navbar-item">Home</div>
        </Link>
        {this.state.loggedIn ? (
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
}

export default Navbar;
