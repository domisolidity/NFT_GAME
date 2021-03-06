// constants
import Web3 from "web3";
// import NftContract from "../../contracts/artifacts/NftContract.json";
// import NftDealContract from "../../contracts/artifacts/NftDealContract.json";
// import GameTokenContract from "../../contracts/artifacts/GameToken.json";
// import Claim20_Contract from "../../contracts/artifacts/Claim_20.json";
// import AuctionCreatorContract from "../../contracts/artifacts/AuctionCreator.json";
import jwtDecode from "jwt-decode";
import { fetchData } from "../data/dataActions";
import Cookies from "js-cookie";
const { NEXT_PUBLIC_LOGIN_KEY } = process.env;


// ================================================================
// import

// ================================================================
const baseUri = process.env.NEXT_PUBLIC_SERVER_URL;


const connectRequest = () => {
  return {
    type: "CONNECTION_REQUEST",
  };
};

const connectSuccess = (payload) => {
  return {
    type: "CONNECTION_SUCCESS",
    payload: payload,
  };
};

const connectFailed = (payload) => {
  return {
    type: "CONNECTION_FAILED",
    payload: payload,
  };
};

const updateAccountRequest = (payload) => {
  return {
    type: "UPDATE_ACCOUNT",
    payload: payload,
  };
};

export const authenticate = () => {
  const accessToken = Cookies.get(NEXT_PUBLIC_LOGIN_KEY);
  const auth = accessToken && JSON.parse(accessToken).accessToken;
  console.log(" ð  authenticate ð ");
  //í í°ì´ ììë ifë¬¸ ì¤í
  if (auth) {
    console.log(" ð  auth ð ");
    const {
      payload: { id },
    } = jwtDecode(auth);

    const isAuth = fetch(`${baseUri}users/${id}`, {
      headers: {
        Authorization: `Bearer ${auth}`,
      },
    })
      .then((response) => {
        console.log("ð  response ð ", response);
        response.json().ok;
      })
      .catch((err) => console.log(err));
    console.log("ð  isAuth1 ð ", isAuth);

    if (isAuth) {
      console.log(" ð  isAuth2 ð ", isAuth);
      return {
        type: "AUTH",
        payload: true,
      };
    }
  }
  //í í°ì¸ ìì ë
  return {
    type: "AUTH",
    payload: false,
  };
};

export const reconnect = () => {
  console.log(" ð  reconnect ð ");
  return async (dispatch) => {
    dispatch(connectRequest());
    let web3 = new Web3(window.ethereum);
    try {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      console.log(" ð  accounts ð ", accounts);
      const networkId = await window.ethereum.request({
        method: "net_version",
      });
      console.log(" ð  networkId ð  ", networkId);

      // const nft_Network = await NftContract.networks[networkId];
      // const nftDeal_NetworkData = await NftDealContract.networks[networkId];
      // // const gameToken_NetworkData = await GameTokenContract.networks[networkId];
      // const auctionCreator_NetworkData = await AuctionCreatorContract.networks[networkId];
      // const claim20_NetworkData = await AuctionCreatorContract.networks[networkId];

      // const nftContract = new web3.eth.Contract(NftContract.abi, nft_Network.address);
      // const nftDealContract = new web3.eth.Contract(NftDealContract.abi, nftDeal_NetworkData.address);
      // const auctionCreatorContract = new web3.eth.Contract(
      //   AuctionCreatorContract.abi,
      //   auctionCreator_NetworkData.address
      // );
      const gameTokenContract = new web3.eth.Contract(
        [
          {
            inputs: [],
            stateMutability: "nonpayable",
            type: "constructor",
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "owner",
                type: "address",
              },
              {
                indexed: true,
                internalType: "address",
                name: "spender",
                type: "address",
              },
              {
                indexed: false,
                internalType: "uint256",
                name: "value",
                type: "uint256",
              },
            ],
            name: "Approval",
            type: "event",
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "previousOwner",
                type: "address",
              },
              {
                indexed: true,
                internalType: "address",
                name: "newOwner",
                type: "address",
              },
            ],
            name: "OwnershipTransferred",
            type: "event",
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "from",
                type: "address",
              },
              {
                indexed: true,
                internalType: "address",
                name: "to",
                type: "address",
              },
              {
                indexed: false,
                internalType: "uint256",
                name: "value",
                type: "uint256",
              },
            ],
            name: "Transfer",
            type: "event",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "owner",
                type: "address",
              },
              {
                internalType: "address",
                name: "spender",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
              },
            ],
            name: "_approve",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "owner",
                type: "address",
              },
              {
                internalType: "address",
                name: "spender",
                type: "address",
              },
            ],
            name: "allowance",
            outputs: [
              {
                internalType: "uint256",
                name: "",
                type: "uint256",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "spender",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
              },
            ],
            name: "approve",
            outputs: [
              {
                internalType: "bool",
                name: "",
                type: "bool",
              },
            ],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "account",
                type: "address",
              },
            ],
            name: "balanceOf",
            outputs: [
              {
                internalType: "uint256",
                name: "",
                type: "uint256",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "decimals",
            outputs: [
              {
                internalType: "uint8",
                name: "",
                type: "uint8",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "spender",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "subtractedValue",
                type: "uint256",
              },
            ],
            name: "decreaseAllowance",
            outputs: [
              {
                internalType: "bool",
                name: "",
                type: "bool",
              },
            ],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [],
            name: "getMsgSender",
            outputs: [
              {
                internalType: "address",
                name: "",
                type: "address",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "getOwner",
            outputs: [
              {
                internalType: "address",
                name: "",
                type: "address",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "spender",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "addedValue",
                type: "uint256",
              },
            ],
            name: "increaseAllowance",
            outputs: [
              {
                internalType: "bool",
                name: "",
                type: "bool",
              },
            ],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
              },
            ],
            name: "mint",
            outputs: [
              {
                internalType: "bool",
                name: "",
                type: "bool",
              },
            ],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [],
            name: "name",
            outputs: [
              {
                internalType: "string",
                name: "",
                type: "string",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "owner",
            outputs: [
              {
                internalType: "address",
                name: "",
                type: "address",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "renounceOwnership",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [],
            name: "symbol",
            outputs: [
              {
                internalType: "string",
                name: "",
                type: "string",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "spender",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
              },
            ],
            name: "test_approve",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "account",
                type: "address",
              },
            ],
            name: "test_getBlance",
            outputs: [
              {
                internalType: "uint256",
                name: "",
                type: "uint256",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "totalSupply",
            outputs: [
              {
                internalType: "uint256",
                name: "",
                type: "uint256",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "recipient",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
              },
            ],
            name: "transfer",
            outputs: [
              {
                internalType: "bool",
                name: "",
                type: "bool",
              },
            ],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "sender",
                type: "address",
              },
              {
                internalType: "address",
                name: "recipient",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
              },
            ],
            name: "transferFrom",
            outputs: [
              {
                internalType: "bool",
                name: "",
                type: "bool",
              },
            ],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "newOwner",
                type: "address",
              },
            ],
            name: "transferOwnership",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
        ],
        "0x8F4A6a12c2B5612b545bAd19E92d8479d95E14BE"
      );

      const claim20_Contract = new web3.eth.Contract(
        [
          {
            inputs: [
              {
                components: [
                  {
                    internalType: "address",
                    name: "account",
                    type: "address",
                  },
                  {
                    internalType: "uint8",
                    name: "ranking",
                    type: "uint8",
                  },
                  {
                    internalType: "string",
                    name: "gameTitle",
                    type: "string",
                  },
                  {
                    internalType: "uint16",
                    name: "score",
                    type: "uint16",
                  },
                ],
                internalType: "struct Claim_20.weeklyRank[]",
                name: "result",
                type: "tuple[]",
              },
            ],
            name: "approveClaim",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "_account",
                type: "address",
              },
            ],
            name: "rankClaim",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [],
            name: "renounceOwnership",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "contract GameToken",
                name: "_token",
                type: "address",
              },
            ],
            stateMutability: "nonpayable",
            type: "constructor",
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "previousOwner",
                type: "address",
              },
              {
                indexed: true,
                internalType: "address",
                name: "newOwner",
                type: "address",
              },
            ],
            name: "OwnershipTransferred",
            type: "event",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "_account",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "_amount",
                type: "uint256",
              },
            ],
            name: "setRewardAmount",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "newOwner",
                type: "address",
              },
            ],
            name: "transferOwnership",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "uint256",
                name: "_amount",
                type: "uint256",
              },
            ],
            name: "transferToContract",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "_account",
                type: "address",
              },
            ],
            name: "victoryClaim",
            outputs: [],
            stateMutability: "payable",
            type: "function",
          },
          {
            inputs: [],
            name: "admin",
            outputs: [
              {
                internalType: "address",
                name: "",
                type: "address",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "gametoken",
            outputs: [
              {
                internalType: "contract GameToken",
                name: "",
                type: "address",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "_account",
                type: "address",
              },
            ],
            name: "getRewardAmount",
            outputs: [
              {
                internalType: "uint256",
                name: "",
                type: "uint256",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [],
            name: "owner",
            outputs: [
              {
                internalType: "address",
                name: "",
                type: "address",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "",
                type: "address",
              },
            ],
            name: "rankRewardList",
            outputs: [
              {
                internalType: "address",
                name: "account",
                type: "address",
              },
              {
                internalType: "uint8",
                name: "ranking",
                type: "uint8",
              },
              {
                internalType: "string",
                name: "gameTitle",
                type: "string",
              },
              {
                internalType: "uint16",
                name: "score",
                type: "uint16",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
        ],
        "0x9Ba02eA73cc80A31b47Fdf1DCAc7FA9D293e785a"
      );

      dispatch(
        connectSuccess({
          account: accounts.toString(),
          // nftContract: nftContract,
          // nftDealContract: nftDealContract,
          // auctionCreatorContract: auctionCreatorContract,
          gameTokenContract: gameTokenContract,
          claim20_Contract: claim20_Contract,
          web3: web3,
        })
      );
      dispatch(authenticate());

      // await nftDealContract.events.submitSell().on("data", async (e) => {
      //   console.log("ì´ë²¤í¸", e.returnValues);
      // });
      // Add listeners start
      window.ethereum.on("accountsChanged", (accounts) => {
        dispatch(updateAccount(accounts));
      });
      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
      // Add listeners end
    } catch (err) {
      console.log(err);
      dispatch(connectFailed("Something went wrong."));
    }
  };
};

export const updateAccount = (account) => {
  return async (dispatch) => {
    dispatch(updateAccountRequest({ account: account }));
    dispatch(fetchData(account));
    console.log("ê°ì ë¤í¸ìí¬ìì ê³ì ë§ êµì²´");

    if (account) {
      console.log(account);
      fetch(`${baseUri}users?publicAddress=${account}`)
        .then((response) => response.json())
        .then((users) => (users.length ? users[0] : dispatch(disconnectWallet())))
        .catch((err) => {
          console.log(err);
          // dispatch(disconnectWallet())
        });
    }
  };
};

export const connectWallet = () => {
  console.log(" ð  connectWallet ð ");
  return async (dispatch) => {
    dispatch(connectRequest());
    if (window.ethereum) {
      dispatch(authenticate());
      let web3 = new Web3(window.ethereum);
      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        console.log(accounts);
        const networkId = await window.ethereum.request({
          method: "net_version",
        });
        console.log("networkId : ", networkId);

        if (networkId == 1337 || networkId == 5777 || networkId == 4) {
          // const nftNetwork = await NftContract.networks[networkId];
          // const nftDealNetworkData = await NftDealContract.networks[networkId];
          // // const gameTokenNetworkData = await GameTokenContract.networks[networkId];
          // const auctionCreatorNetworkData = await AuctionCreatorContract.networks[networkId];
          // const claim20_NetworkData = await AuctionCreatorContract.networks[networkId];
          // console.log("auctionCreatorNetworkData", auctionCreatorNetworkData);

          // const nftContract = new web3.eth.Contract(NftContract.abi, nftNetwork.address);
          // const nftDealContract = new web3.eth.Contract(NftDealContract.abi, nftDealNetworkData.address);
          // const auctionCreatorContract = new web3.eth.Contract(
          //   AuctionCreatorContract.abi,
          //   auctionCreatorNetworkData.address
          // );
          const gameTokenContract = new web3.eth.Contract(
            [
              {
                inputs: [],
                stateMutability: "nonpayable",
                type: "constructor",
              },
              {
                anonymous: false,
                inputs: [
                  {
                    indexed: true,
                    internalType: "address",
                    name: "owner",
                    type: "address",
                  },
                  {
                    indexed: true,
                    internalType: "address",
                    name: "spender",
                    type: "address",
                  },
                  {
                    indexed: false,
                    internalType: "uint256",
                    name: "value",
                    type: "uint256",
                  },
                ],
                name: "Approval",
                type: "event",
              },
              {
                anonymous: false,
                inputs: [
                  {
                    indexed: true,
                    internalType: "address",
                    name: "previousOwner",
                    type: "address",
                  },
                  {
                    indexed: true,
                    internalType: "address",
                    name: "newOwner",
                    type: "address",
                  },
                ],
                name: "OwnershipTransferred",
                type: "event",
              },
              {
                anonymous: false,
                inputs: [
                  {
                    indexed: true,
                    internalType: "address",
                    name: "from",
                    type: "address",
                  },
                  {
                    indexed: true,
                    internalType: "address",
                    name: "to",
                    type: "address",
                  },
                  {
                    indexed: false,
                    internalType: "uint256",
                    name: "value",
                    type: "uint256",
                  },
                ],
                name: "Transfer",
                type: "event",
              },
              {
                inputs: [
                  {
                    internalType: "address",
                    name: "owner",
                    type: "address",
                  },
                  {
                    internalType: "address",
                    name: "spender",
                    type: "address",
                  },
                  {
                    internalType: "uint256",
                    name: "amount",
                    type: "uint256",
                  },
                ],
                name: "_approve",
                outputs: [],
                stateMutability: "nonpayable",
                type: "function",
              },
              {
                inputs: [
                  {
                    internalType: "address",
                    name: "owner",
                    type: "address",
                  },
                  {
                    internalType: "address",
                    name: "spender",
                    type: "address",
                  },
                ],
                name: "allowance",
                outputs: [
                  {
                    internalType: "uint256",
                    name: "",
                    type: "uint256",
                  },
                ],
                stateMutability: "view",
                type: "function",
              },
              {
                inputs: [
                  {
                    internalType: "address",
                    name: "spender",
                    type: "address",
                  },
                  {
                    internalType: "uint256",
                    name: "amount",
                    type: "uint256",
                  },
                ],
                name: "approve",
                outputs: [
                  {
                    internalType: "bool",
                    name: "",
                    type: "bool",
                  },
                ],
                stateMutability: "nonpayable",
                type: "function",
              },
              {
                inputs: [
                  {
                    internalType: "address",
                    name: "account",
                    type: "address",
                  },
                ],
                name: "balanceOf",
                outputs: [
                  {
                    internalType: "uint256",
                    name: "",
                    type: "uint256",
                  },
                ],
                stateMutability: "view",
                type: "function",
              },
              {
                inputs: [],
                name: "decimals",
                outputs: [
                  {
                    internalType: "uint8",
                    name: "",
                    type: "uint8",
                  },
                ],
                stateMutability: "view",
                type: "function",
              },
              {
                inputs: [
                  {
                    internalType: "address",
                    name: "spender",
                    type: "address",
                  },
                  {
                    internalType: "uint256",
                    name: "subtractedValue",
                    type: "uint256",
                  },
                ],
                name: "decreaseAllowance",
                outputs: [
                  {
                    internalType: "bool",
                    name: "",
                    type: "bool",
                  },
                ],
                stateMutability: "nonpayable",
                type: "function",
              },
              {
                inputs: [],
                name: "getMsgSender",
                outputs: [
                  {
                    internalType: "address",
                    name: "",
                    type: "address",
                  },
                ],
                stateMutability: "view",
                type: "function",
              },
              {
                inputs: [],
                name: "getOwner",
                outputs: [
                  {
                    internalType: "address",
                    name: "",
                    type: "address",
                  },
                ],
                stateMutability: "view",
                type: "function",
              },
              {
                inputs: [
                  {
                    internalType: "address",
                    name: "spender",
                    type: "address",
                  },
                  {
                    internalType: "uint256",
                    name: "addedValue",
                    type: "uint256",
                  },
                ],
                name: "increaseAllowance",
                outputs: [
                  {
                    internalType: "bool",
                    name: "",
                    type: "bool",
                  },
                ],
                stateMutability: "nonpayable",
                type: "function",
              },
              {
                inputs: [
                  {
                    internalType: "uint256",
                    name: "amount",
                    type: "uint256",
                  },
                ],
                name: "mint",
                outputs: [
                  {
                    internalType: "bool",
                    name: "",
                    type: "bool",
                  },
                ],
                stateMutability: "nonpayable",
                type: "function",
              },
              {
                inputs: [],
                name: "name",
                outputs: [
                  {
                    internalType: "string",
                    name: "",
                    type: "string",
                  },
                ],
                stateMutability: "view",
                type: "function",
              },
              {
                inputs: [],
                name: "owner",
                outputs: [
                  {
                    internalType: "address",
                    name: "",
                    type: "address",
                  },
                ],
                stateMutability: "view",
                type: "function",
              },
              {
                inputs: [],
                name: "renounceOwnership",
                outputs: [],
                stateMutability: "nonpayable",
                type: "function",
              },
              {
                inputs: [],
                name: "symbol",
                outputs: [
                  {
                    internalType: "string",
                    name: "",
                    type: "string",
                  },
                ],
                stateMutability: "view",
                type: "function",
              },
              {
                inputs: [
                  {
                    internalType: "address",
                    name: "spender",
                    type: "address",
                  },
                  {
                    internalType: "uint256",
                    name: "amount",
                    type: "uint256",
                  },
                ],
                name: "test_approve",
                outputs: [],
                stateMutability: "nonpayable",
                type: "function",
              },
              {
                inputs: [
                  {
                    internalType: "address",
                    name: "account",
                    type: "address",
                  },
                ],
                name: "test_getBlance",
                outputs: [
                  {
                    internalType: "uint256",
                    name: "",
                    type: "uint256",
                  },
                ],
                stateMutability: "view",
                type: "function",
              },
              {
                inputs: [],
                name: "totalSupply",
                outputs: [
                  {
                    internalType: "uint256",
                    name: "",
                    type: "uint256",
                  },
                ],
                stateMutability: "view",
                type: "function",
              },
              {
                inputs: [
                  {
                    internalType: "address",
                    name: "recipient",
                    type: "address",
                  },
                  {
                    internalType: "uint256",
                    name: "amount",
                    type: "uint256",
                  },
                ],
                name: "transfer",
                outputs: [
                  {
                    internalType: "bool",
                    name: "",
                    type: "bool",
                  },
                ],
                stateMutability: "nonpayable",
                type: "function",
              },
              {
                inputs: [
                  {
                    internalType: "address",
                    name: "sender",
                    type: "address",
                  },
                  {
                    internalType: "address",
                    name: "recipient",
                    type: "address",
                  },
                  {
                    internalType: "uint256",
                    name: "amount",
                    type: "uint256",
                  },
                ],
                name: "transferFrom",
                outputs: [
                  {
                    internalType: "bool",
                    name: "",
                    type: "bool",
                  },
                ],
                stateMutability: "nonpayable",
                type: "function",
              },
              {
                inputs: [
                  {
                    internalType: "address",
                    name: "newOwner",
                    type: "address",
                  },
                ],
                name: "transferOwnership",
                outputs: [],
                stateMutability: "nonpayable",
                type: "function",
              },
            ],
            "0x8F4A6a12c2B5612b545bAd19E92d8479d95E14BE"
          );
          const claim20_Contract = new web3.eth.Contract(
            [
              {
                inputs: [
                  {
                    components: [
                      {
                        internalType: "address",
                        name: "account",
                        type: "address",
                      },
                      {
                        internalType: "uint8",
                        name: "ranking",
                        type: "uint8",
                      },
                      {
                        internalType: "string",
                        name: "gameTitle",
                        type: "string",
                      },
                      {
                        internalType: "uint16",
                        name: "score",
                        type: "uint16",
                      },
                    ],
                    internalType: "struct Claim_20.weeklyRank[]",
                    name: "result",
                    type: "tuple[]",
                  },
                ],
                name: "approveClaim",
                outputs: [],
                stateMutability: "nonpayable",
                type: "function",
              },
              {
                inputs: [
                  {
                    internalType: "address",
                    name: "_account",
                    type: "address",
                  },
                ],
                name: "rankClaim",
                outputs: [],
                stateMutability: "nonpayable",
                type: "function",
              },
              {
                inputs: [],
                name: "renounceOwnership",
                outputs: [],
                stateMutability: "nonpayable",
                type: "function",
              },
              {
                inputs: [
                  {
                    internalType: "contract GameToken",
                    name: "_token",
                    type: "address",
                  },
                ],
                stateMutability: "nonpayable",
                type: "constructor",
              },
              {
                anonymous: false,
                inputs: [
                  {
                    indexed: true,
                    internalType: "address",
                    name: "previousOwner",
                    type: "address",
                  },
                  {
                    indexed: true,
                    internalType: "address",
                    name: "newOwner",
                    type: "address",
                  },
                ],
                name: "OwnershipTransferred",
                type: "event",
              },
              {
                inputs: [
                  {
                    internalType: "address",
                    name: "_account",
                    type: "address",
                  },
                  {
                    internalType: "uint256",
                    name: "_amount",
                    type: "uint256",
                  },
                ],
                name: "setRewardAmount",
                outputs: [],
                stateMutability: "nonpayable",
                type: "function",
              },
              {
                inputs: [
                  {
                    internalType: "address",
                    name: "newOwner",
                    type: "address",
                  },
                ],
                name: "transferOwnership",
                outputs: [],
                stateMutability: "nonpayable",
                type: "function",
              },
              {
                inputs: [
                  {
                    internalType: "uint256",
                    name: "_amount",
                    type: "uint256",
                  },
                ],
                name: "transferToContract",
                outputs: [],
                stateMutability: "nonpayable",
                type: "function",
              },
              {
                inputs: [
                  {
                    internalType: "address",
                    name: "_account",
                    type: "address",
                  },
                ],
                name: "victoryClaim",
                outputs: [],
                stateMutability: "payable",
                type: "function",
              },
              {
                inputs: [],
                name: "admin",
                outputs: [
                  {
                    internalType: "address",
                    name: "",
                    type: "address",
                  },
                ],
                stateMutability: "view",
                type: "function",
              },
              {
                inputs: [],
                name: "gametoken",
                outputs: [
                  {
                    internalType: "contract GameToken",
                    name: "",
                    type: "address",
                  },
                ],
                stateMutability: "view",
                type: "function",
              },
              {
                inputs: [
                  {
                    internalType: "address",
                    name: "_account",
                    type: "address",
                  },
                ],
                name: "getRewardAmount",
                outputs: [
                  {
                    internalType: "uint256",
                    name: "",
                    type: "uint256",
                  },
                ],
                stateMutability: "view",
                type: "function",
              },
              {
                inputs: [],
                name: "owner",
                outputs: [
                  {
                    internalType: "address",
                    name: "",
                    type: "address",
                  },
                ],
                stateMutability: "view",
                type: "function",
              },
              {
                inputs: [
                  {
                    internalType: "address",
                    name: "",
                    type: "address",
                  },
                ],
                name: "rankRewardList",
                outputs: [
                  {
                    internalType: "address",
                    name: "account",
                    type: "address",
                  },
                  {
                    internalType: "uint8",
                    name: "ranking",
                    type: "uint8",
                  },
                  {
                    internalType: "string",
                    name: "gameTitle",
                    type: "string",
                  },
                  {
                    internalType: "uint16",
                    name: "score",
                    type: "uint16",
                  },
                ],
                stateMutability: "view",
                type: "function",
              },
            ],
            "0x9Ba02eA73cc80A31b47Fdf1DCAc7FA9D293e785a"
          );

          const coinbase = await web3.eth.getCoinbase(); //ê³ì 

          if (!coinbase) {
            dispatch(connectFailed("ë©íë§ì¤í¬ ë¡ê·¸ì¸ì´ íìí©ëë¤."));
            return;
          }

          const publicAddress = coinbase.toLowerCase();
          dispatch(connectRequest());

          const handleAuthenticate = async ({ publicAddress, signature }) =>
            fetch(`${baseUri}auth`, {
              body: JSON.stringify({ publicAddress, signature }),
              headers: {
                "Content-Type": "application/json",
              },
              method: "POST",
            }).then((response) => response.json());

          const handleSignMessage = async ({ publicAddress, nonce }) => {
            try {
              const signature = await web3.eth.personal.sign(
                `I am signing my one-time nonce: ${nonce}`,
                publicAddress,
                "" // MetaMask will ignore the password argument here
              );
              return { publicAddress, signature };
            } catch (err) {
              throw new Error("You need to sign the message to be able to log in.");
            }
          };

          const handleSignup = (publicAddress) =>
            fetch(`${baseUri}users`, {
              body: JSON.stringify({ publicAddress }),
              headers: {
                "Content-Type": "application/json",
              },
              method: "POST",
            }).then((response) => response.json());

          const handleLoggedIn = (auth) => {
            const one_hour = new Date(new Date().getTime() + 3600 * 1000); // sign token for 1 hour
            Cookies.set(NEXT_PUBLIC_LOGIN_KEY, JSON.stringify(auth), { expires: one_hour });

            dispatch(authenticate());
          };

          // Look if user with current publicAddress is already present on backend
          fetch(`${baseUri}users?publicAddress=${publicAddress}`)
            .then((response) => response.json())
            // If yes, retrieve it. If no, create it.
            .then((users) => (users.length ? users[0] : handleSignup(publicAddress)))
            // Popup MetaMask confirmation modal to sign message
            .then(handleSignMessage)
            // Send signature to backend on the /auth route
            .then(handleAuthenticate)
            // Pass accessToken back to parent component (to save it in localStorage)
            .then((auth) => handleLoggedIn(auth))
            .catch((err) => {
              console.log(err);
              // setLoading(false);
            });
          console.log("22", accounts);
          dispatch(
            connectSuccess({
              account: accounts.toString(),
              // nftContract: nftContract,
              // nftDealContract: nftDealContract,
              // auctionCreatorContract: auctionCreatorContract,
              gameTokenContract: gameTokenContract,
              claim20_Contract: claim20_Contract,
              web3: web3,
            })
          );

          // await nftDealContract.events.submitSell().on("data", async (e) => {
          //   console.log("ì´ë²¤í¸", e.returnValues);
          // });
          // Add listeners start
          window.ethereum.on("accountsChanged", (accounts) => {
            console.log("ì¬ê¸°", accounts);
            dispatch(updateAccount(accounts));
          });
          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });
          // dispatch(getMyNft(accounts[0]));
          // Add listeners end
        } else {
          dispatch(
            connectFailed(`íì¬ networkId ë ${networkId} ìëë¤.\nnetworkId : 1337 (ë¡ì»¬í¸ì¤í¸)ë¡ ë³ê²½ì´ íìí©ëë¤.`)
          );
        }
      } catch (err) {
        console.log(err);
        dispatch(connectFailed("Something went wrong."));
      }
    } else {
      dispatch(connectFailed("Install Metamask."));
    }
  };
};

export const disconnectWallet = () => {
  return async (dispatch) => {
    Cookies.remove(NEXT_PUBLIC_LOGIN_KEY);

    dispatch(authenticate());
    dispatch(connectFailed("ë¡ê·¸ìì"));
  };
};
