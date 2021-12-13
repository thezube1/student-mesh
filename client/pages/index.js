import Head from "next/head";
import React, { Component } from "react";

import GetStudent from "../components/contracts/GetStudent";
import AddStudent from "../components/contracts/AddStudent";

class Home extends React.Component {
  state = { loading: true, drizzleState: null };
  componentDidMount() {
    const drizzle = this.props.drizzle;
    this.unsubscribe = drizzle.store.subscribe(() => {
      const drizzleState = drizzle.store.getState();
      if (drizzleState.drizzleStatus.initialized) {
        this.setState({ loading: false, drizzleState });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }
  render() {
    if (this.state.loading) {
      return (
        <div id="wrapper">
          <div id="content">
            <div className="title">Loading Drizzle...</div>
          </div>
        </div>
      );
    }
    return (
      <div>
        <Head>
          <title>Create Next App</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div id="wrapper">
          <div id="content">
            <div className="title">Student-mesh</div>
            <div>
              <GetStudent
                drizzle={this.props.drizzle}
                drizzleState={this.state.drizzleState}
              />
              <AddStudent
                drizzle={this.props.drizzle}
                drizzleState={this.state.drizzleState}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;