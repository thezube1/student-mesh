import React, { Component } from "react";
import Navbar from "../components/navbar/navbar";
import withAuth from "../components/routes/withAuth";

function AccountPage() {
  return (
    <div>
      <Navbar />
      <div id="account-wrapper">
        <div id="account-content">
          <div className="text">Account</div>
        </div>
      </div>
    </div>
  );
}

export default withAuth(AccountPage);
