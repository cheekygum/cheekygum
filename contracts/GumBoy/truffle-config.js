const HDWalletProvider = require("truffle-hdwallet-provider");

module.exports = {
  networks: {
    development: {
     host: "127.0.0.1",
     port: 7545,
     network_id: "*",
    },
    sepolia: {
      network_id: 11155111,
      provider: () => new HDWalletProvider(
        "two mean river humor transfer input apart attend must anxiety grass seminar",
        "https://sepolia.infura.io/v3/ed6ded023c3d4bbd957b89d1a00f095c"
      ),
      networkCheckTimeout: 60000,
    },
    mainnet: {
      network_id: 1,
      provider: () => new HDWalletProvider(
        "genre mango pulse replace used moon reunion switch dream battle pill ghost",
        "https://mainnet.infura.io/v3/ed6ded023c3d4bbd957b89d1a00f095c"
      ),
      networkCheckTimeout: 60000,
    }
  },
  compilers: {
    solc: {
      version: "0.8.19",
    }
  },
  plugins: [
    "truffle-plugin-verify"
  ],
  api_keys: {
    etherscan: "WAD9U4FVF1Z7MSISPPEJM773W5UTZKTC3B"
  },
};
