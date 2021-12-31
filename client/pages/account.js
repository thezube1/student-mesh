import React, { Component } from "react";
import Navbar from "../components/navbar/navbar";
import withAuth from "../components/routes/withAuth";

function AccountPage() {
  return (
    <div>
      <Navbar />
      <div></div>
    </div>
  );
}

export default withAuth(AccountPage);
