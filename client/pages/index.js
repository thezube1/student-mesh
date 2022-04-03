import Head from "next/head";
import Link from "next/link";
import { useSelector } from "react-redux";

import AccountHome from "../components/home/account/AccountHome";
import ProviderHome from "../components/home/provider/ProviderHome";
import DefaultHome from "../components/home/default/DefaultHome";

function Home() {
  const account = useSelector((state) => state.account.account);
  const provider = useSelector((state) => state.account.provider.isProvider);

  return (
    <div>
      <Head>
        <title>Student Mesh</title>
        <meta
          name="description"
          content="A distributed computing solution to storing student data"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {provider && account !== null ? (
        <ProviderHome />
      ) : account ? (
        <AccountHome />
      ) : (
        <DefaultHome />
      )}
    </div>
  );
}

export default Home;
