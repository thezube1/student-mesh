import { useWeb3React } from "@web3-react/core";
import { injected } from "../components/wallet/Injected";
import Navbar from "../components/navbar/navbar";

export default function ConnectPage() {
  const { active, account, library, connector, activate, deactivate } =
    useWeb3React();

  async function connect() {
    try {
      await activate(injected);
    } catch (ex) {
      console.log(ex);
    }
  }

  async function disconnect() {
    try {
      deactivate();
    } catch (ex) {
      console.log(ex);
    }
  }

  return (
    <div>
      <Navbar />
      <div id="connect-wrapper">
        <div id="connect-content">
          <div>
            <button onClick={connect} className="button">
              Connect Wallet
            </button>
          </div>
          {active ? (
            <span>
              Connected with <b>{account}</b>
            </span>
          ) : (
            <span>Not connected</span>
          )}
          <div>
            <button onClick={disconnect} className="button">
              Disconnect Wallet
            </button>
          </div>
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
