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
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Cabin:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap"
            rel="stylesheet"
          />
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
