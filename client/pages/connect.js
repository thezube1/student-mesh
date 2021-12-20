import Navbar from "../components/navbar/navbar";
import { useMetaMask } from "metamask-react";
import Link from "next/link";

export default function ConnectPage() {
  /*const { active, account, library, connector, activate, deactivate } =
    useWeb3React();
    */
  const { status, connect, account } = useMetaMask();

  return (
    <div>
      <Navbar />
      <div id="connect-wrapper">
        <div id="connect-content">
          {status === "connected" ? (
            <div style={{ display: "grid", justifyItems: "center" }}>
              <div className="text" style={{ marginBottom: 10 }}>
                Connected with <b>{account}</b>
              </div>
              <Link href="/account">
                <button onClick={connect} className="button">
                  View Account
                </button>
              </Link>
            </div>
          ) : (
            <div style={{ display: "grid", justifyItems: "center" }}>
              <button onClick={connect} className="button">
                Connect Wallet
              </button>
              <div className="text" style={{ marginTop: 10 }}>
                Not connected
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/*

import React, { Component } from "react";
import Navbar from "../components/navbar/navbar";
import { injected } from "../components/wallet/Injected";
import { useWeb3React } from "@web3-react/core";

class ConnectPage extends React.Component {
  state = {
    loggedIn: false,
  };

  componentDidMount() {
    if (!window.ethereum || !window.ethereum.selectedAddress) {
      this.setState({ loggedIn: false });
    } else {
      this.setState({ loggedIn: true });
    }
  }

  connect = async () => {
    try {
      useWeb3React().activate(injected);
    } catch (ex) {
      console.log(ex);
    }
  };

  disconnect = async () => {
    try {
      useWeb3React().deactivate();
    } catch (ex) {
      console.log(ex);
    }
  };

  render() {
    return (
      <div>
        <Navbar />
        <div id="connect-wrapper">
          <div id="connect-content">
            <div>
              <button onClick={this.connect} className="button">
                Connect Wallet
              </button>
            </div>

            <div>
              <button onClick={this.disconnect} className="button">
                Disconnect Wallet
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ConnectPage;
*/
