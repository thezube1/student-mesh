import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import React from "react";

const withAuth = (WrappedComponent) => {
  const AuthRoute = (props) => {
    const Router = useRouter();
    const address = useSelector((state) => state.account.account);
    //const provider = useSelector((state) => state.account.provider);
    if (typeof window !== "undefined") {
      if (!web3 || !address) {
        Router.replace("/");
        return null;
      }

      // If this is an accessToken we just render the component that was passed with all its props

      return <WrappedComponent {...props} />;
    }

    // If we are on server, return null
    return null;
  };
  return AuthRoute;
};

export default withAuth;
