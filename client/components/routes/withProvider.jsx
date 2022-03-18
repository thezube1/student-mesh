import { useRouter } from "next/router";
import { useSelector } from "react-redux";

function withProvider() {
  return (props) => {
    if (typeof window !== "undefined") {
      const Router = useRouter();

      const provider = useSelector((state) => state.account.provider);

      if (!provider.isProvider) {
        Router.replace("/");
        return null;
      }

      // If this is an accessToken we just render the component that was passed with all its props

      return <WrappedComponent {...props} />;
    }

    // If we are on server, return null
    return null;
  };
}

export default withProvider;
