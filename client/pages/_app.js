import "../styles/globals.css";
import "../styles/home.css";
import "../styles/navbar.css";
import "../styles/connect.css";

import { Web3ReactProvider } from "@web3-react/core";

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
  return new Web3Provider(provider); // this will vary according to whether you use e.g. ethers or web3.js
}

function MyApp({ Component, pageProps }) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Component {...pageProps} />
    </Web3ReactProvider>
  );
}

export default MyApp;
