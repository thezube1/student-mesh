import React, { Component } from "react";
import Navbar from "../../navbar/navbar";
import AccountInfo from "../../account/AccountInfo";

function AccountPage() {
  return (
    <div>
      <Navbar />
      <div id="account-wrapper">
        <div id="account-content">
          <AccountInfo />
        </div>
      </div>
    </div>
  );
}

export default AccountPage;
