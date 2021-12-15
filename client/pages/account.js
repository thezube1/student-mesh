import React, { Component } from "react";
import Navbar from "../components/navbar/navbar";
import withAuth from "../components/routes/withAuth";

class AccountPage extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <div>
        <Navbar />
        <div>View Account</div>
      </div>
    );
  }
}

export default withAuth(AccountPage);
