import React, { Component } from "react";
import Head from "next/head";
import Link from "next/link";

import Navbar from "../components/navbar/navbar";
import GetStudent from "../components/contracts/GetStudent";
import AddStudent from "../components/contracts/AddStudent";

class Home extends React.Component {
  state = { loggedIn: false };

  componentDidMount() {
    if (!window.ethereum || !window.ethereum.selectedAddress) {
      this.setState({ loggedIn: false });
    } else {
      this.setState({ loggedIn: true });
    }
  }

  render() {
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
            {this.state.loggedIn ? (
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
}

export default Home;

/*
<GetStudent
              drizzle={this.props.drizzle}
              drizzleState={this.props.drizzleState}
            />
            <AddStudent
              drizzle={this.props.drizzle}
              drizzleState={this.props.drizzleState}
            />
*/
