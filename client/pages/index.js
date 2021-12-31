import Head from "next/head";
import Link from "next/link";
import { useSelector } from "react-redux";

import Navbar from "../components/navbar/navbar";

function Home() {
  const account = useSelector((state) => state.web3.account);

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
      <Navbar />
      <div id="wrapper">
        <div id="content">
          <div className="title">Student-Mesh</div>
          <div className="header">
            A distributed computing solution to storing student data
          </div>
          {account ? (
            <Link href="/account">
              <div className="button">View Account</div>
            </Link>
          ) : (
            <Link href="/connect">
              <div className="button">Connect to Metamask</div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
