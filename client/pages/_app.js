// CSS files
import "../styles/globals.css";
import "../styles/home.css";
import "../styles/navbar.css";
import "../styles/connect.css";
import "../styles/account.css";

// Imports
import store from "../redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import LoadingWheel from "../components/loading/LoadingWheel";
import CheckAccount from "../components/routes/checkAccount";

function MyApp({ Component, pageProps }) {
  let persistor = persistStore(store);
  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingWheel />} persistor={persistor}>
        <CheckAccount />
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
