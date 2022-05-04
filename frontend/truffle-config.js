require("dotenv").config();
const fs = require("fs");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const path = require("path");
const { INFURA_API_KEY, MORALIS_API_KEY, ETHERSCAN_API_KEY } = process.env;
const mnemonic = fs.readFileSync("migrations/.secret").toString().trim();
console.log(MORALIS_API_KEY);
module.exports = {
  contracts_build_directory: path.join(__dirname, "contracts/artifacts"),
  compilers: {
    solc: {
      version: "0.8.7",
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  plugins: ["truffle-plugin-verify"],
  api_keys: {
    etherscan: ETHERSCAN_API_KEY,
  },
  networks: {
    ropsten: {
      provider: () => new HDWalletProvider(mnemonic, `https://ropsten.infura.io/v3/${INFURA_API_KEY}`),
      network_id: 3, // Ropsten's id
      gas: 5500000, // Ropsten has a lower block limit than mainnet
      confirmations: 2, // # of confs to wait between deployments. (default: 0)
      networkCheckTimeout: 5000000,
      timeoutBlocks: 4000, // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true, // Skip dry run before migrations? (default: false for public nets )
    },
    rinkeby: {
      // provider: () => new HDWalletProvider(mnemonic, `https://rinkeby.infura.io/v3/${INFURA_API_KEY}`),
      provider: () => new HDWalletProvider(mnemonic, `https://rinkeby.infura.io/v3/${INFURA_API_KEY}`),
      network_id: 4,
      gas: 5500000,
      confirmations: 2,
      networkCheckTimeout: 3000000,
      timeoutBlocks: 2000,
      skipDryRun: true,
    },
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
};
