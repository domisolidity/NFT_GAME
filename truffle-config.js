require("dotenv").config();
const fs = require("fs");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const path = require("path");
const { INFURA_API_KEY, MORALIS_API_KEY } = process.env;
const mnemonic = fs.readFileSync("migrations/.secret").toString().trim();

module.exports = {
  contracts_build_directory: path.join(__dirname, "contracts/artifacts"),
  networks: {
    development: {
      host: "127.0.0.1",
      port: 9545,
      network_id: "1337",
    },
    // ropsten: {
    //   provider: () => new HDWalletProvider(mnemonic, `https://ropsten.infura.io/v3/${INFURA_API_KEY}`),
    //   network_id: 3, // Ropsten's id
    //   gas: 5500000, // Ropsten has a lower block limit than mainnet
    //   confirmations: 2, // # of confs to wait between deployments. (default: 0)
    //   timeoutBlocks: 200, // # of blocks before a deployment times out  (minimum/default: 50)
    //   skipDryRun: true, // Skip dry run before migrations? (default: false for public nets )
    // },
    // rinkeby: {
    //   provider: () => new HDWalletProvider(mnemonic, `https://rinkeby.infura.io/v3/${INFURA_API_KEY}`),
    //   network_id: 4,
    //   gas: 5500000,
    //   confirmations: 2,
    //   networkCheckTimeoutnetworkCheckTimeout: 10000,
    //   timeoutBlocks: 200,
    //   skipDryRun: true,
    // },
    // bsc_testnet: {
    //   provider: () =>
    //     new HDWalletProvider(mnemonic, `https://speedy-nodes-nyc.moralis.io/${MORALIS_API_KEY}/bsc/testnet`),
    //   network_id: 97,
    //   gas: 5500000,
    //   confirmations: 10,
    //   timeoutBlocks: 200,
    //   skipDryRun: true,
    // },
    // bsc: {
    //   provider: () => new HDWalletProvider(mnemonic, `https://speedy-nodes-nyc.moralis.io/${MORALIS_API_KEY}/bsc/mainnet`),
    //   network_id: 56,
    //   confirmations: 10,
    //   timeoutBlocks: 200,
    //   skipDryRun: true
    // },
  },
  compilers: {
    solc: {
      version: "0.8.7",
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
