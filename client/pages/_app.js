import "../styles/globals.css";
import "../styles/home.css";
import { Drizzle, generateStore } from "@drizzle/store";
import Students from "../contracts/Students.json";

const options = {
  contracts: [Students],
  web3: {
    fallback: {
      type: "ws",
      url: "ws://127.0.0.1:9545",
    },
  },
};

const drizzle = new Drizzle(options);

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} drizzle={drizzle} />;
}

export default MyApp;
