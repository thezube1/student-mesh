import React, { Component } from "react";
import Navbar from "../components/navbar/navbar";
import withAuth from "../components/routes/withAuth";
import {} from "../redux/reducers/contractReducer";
import { useSelector } from "react-redux";

import SetupForm from "../components/account/SetupForm";

function AccountPage() {
  const registered = useSelector((state) => state.contract.registered);
  return (
    <div>
      <Navbar />
      <div id="account-wrapper">
        <div id="account-content">
          {registered ? <div className="text">Account</div> : <SetupForm />}
        </div>
      </div>
    </div>
  );
}

export default withAuth(AccountPage);
