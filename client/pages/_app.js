import "../styles/globals.css";
import "../styles/home.css";
import { Drizzle, generateStore } from "@drizzle/store";
import Students from "../contracts/Students.json";

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

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} drizzle={drizzle} />;
}

export default MyApp;
