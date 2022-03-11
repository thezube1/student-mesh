import CoinbaseWalletSDK from "@coinbase/wallet-sdk";

export default async () => {
  let provider;
  const cachedProviderName = JSON.parse(
    localStorage.getItem("WEB3_CONNECT_CACHED_PROVIDER")
  );
  if (cachedProviderName === null) {
    false;
  } else if (cachedProviderName === "walletlink") {
    let walletLink = new CoinbaseWalletSDK({ appName: "Student Mesh" });
    provider = walletLink.makeWeb3Provider("HTTP://127.0.0.1:7545", 1337);
    //provider = await provider.enable();
  } else if (
    cachedProviderName === "metamask" ||
    (cachedProviderName === "injected" && window.ethereum !== undefined)
  ) {
    provider = window.ethereum;
  }
  return provider;
};
