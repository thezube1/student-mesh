import "../styles/globals.css";
import "../styles/home.css";
import "../styles/navbar.css";
import "../styles/connect.css";
import { DrizzleContext } from "@drizzle/react-plugin";
import { Drizzle } from "@drizzle/store";
import Students from "../contracts/Students.json";

import { Web3ReactProvider } from "@web3-react/core";
import Web3 from "web3";

import LoadingWheel from "../components/loading/LoadingWheel";

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

function getLibrary(provider) {
  return new Web3(provider);
}

function MyApp({ Component, pageProps }) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <DrizzleContext.Provider drizzle={drizzle}>
        <DrizzleContext.Consumer>
          {(drizzleContext) => {
            const { drizzle, drizzleState, initialized } = drizzleContext;
            if (!initialized) {
              return <LoadingWheel />;
            }
            return (
              <Component
                {...pageProps}
                drizzle={drizzle}
                drizzleState={drizzleState}
              />
            );
          }}
        </DrizzleContext.Consumer>
      </DrizzleContext.Provider>
    </Web3ReactProvider>
  );
}

export default MyApp;
