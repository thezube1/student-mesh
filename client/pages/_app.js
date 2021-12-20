import "../styles/globals.css";
import "../styles/home.css";
import "../styles/navbar.css";
import "../styles/connect.css";

import { Web3ReactProvider } from "@web3-react/core";
import { MetaMaskProvider } from "metamask-react";
import LoadingWheel from "../components/loading/LoadingWheel";

/*
const options = {
  contracts: [Students],
  events: {
    Students: ["Student"],
  },
  web3: {
    fallback: {
      type: "ws",
      url: "ws://127.0.0.1:7545",
    },
  },
};



const drizzle = new Drizzle(options);
*/

function getLibrary(provider, connector) {
  const library = new Web3Provider(provider, "any"); // this will vary according to whether you use e.g. ethers or web3.js
  library.pollingInterval = 15000;
  return library;
}

function MyApp({ Component, pageProps }) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <MetaMaskProvider>
        <Component {...pageProps} />
      </MetaMaskProvider>
    </Web3ReactProvider>
  );
}

export default MyApp;
