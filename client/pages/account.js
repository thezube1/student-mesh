import React, { Component } from "react";
import Navbar from "../components/navbar/navbar";
import withAuth from "../components/routes/withAuth";
import {} from "../redux/reducers/contractReducer";
import { useSelector } from "react-redux";
import LoadingWheel from "../components/loading/LoadingWheel";
import SetupForm from "../components/account/SetupForm";
import AccountInfo from "../components/account/AccountInfo";

function AccountPage() {
  const registered = useSelector((state) => state.contract.registered);
  return registered === undefined ? (
    <LoadingWheel />
  ) : (
    <div>
      <Navbar />
      <div id="account-wrapper">
        <div id="account-content">
          {registered ? <AccountInfo /> : <SetupForm />}
        </div>
      </div>
    </div>
  );
}

export default withAuth(AccountPage);
