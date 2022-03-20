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
    //provider = walletLink.makeWeb3Provider("HTTP://127.0.0.1:7545", 1337);
    provider = walletLink.makeWeb3Provider(
      "https://mainnet.infura.io/v3/95853d14d95d4892b97ca9158cf30b33",
      3
    );
  } else if (
    cachedProviderName === "metamask" ||
    (cachedProviderName === "injected" && window.ethereum !== undefined)
  ) {
    provider = window.ethereum;
  }
  return provider;
};
