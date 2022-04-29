import Web3 from "web3";
import NftContract from "../../contracts/artifacts/NftContract.json";
import NftDealContract from "../../contracts/artifacts/NftDealContract.json";
import GameTokenContract from "../../contracts/artifacts/GameToken.json";
import Claim20_Contract from "../../contracts/artifacts/Claim_20.json";
import AuctionCreatorContract from "../../contracts/artifacts/AuctionCreator.json";
import Staking from "../../contracts/artifacts/Staking.json";
import jwtDecode from "jwt-decode";
import { fetchData } from "../data/dataActions";
import Cookies from "js-cookie";
import axios from "axios";

const { NEXT_PUBLIC_SERVER_URL } = process.env;
const { NEXT_PUBLIC_LOGIN_KEY } = process.env;

const baseUri = "https://gateway.pinata.cloud/ipfs/";

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
const updateMainNft = (payload) => {
  return {
    type: "UPDATE_MAIN_NFT",
    payload: payload,
  };
};
export const regMainNft = (mainNftData) => {
  console.log(mainNftData);
  return (dispatch) => {
    dispatch(updateMainNft(mainNftData));
  };
};

export const authenticate = () => {
  const accessToken = Cookies.get(NEXT_PUBLIC_LOGIN_KEY);
  const auth = accessToken && JSON.parse(accessToken).accessToken;
  console.log(" 🛠 authenticate 🛠");
  console.log(accessToken);
  console.log(auth);

  //토큰이 있을때 if문 실행
  if (auth) {
    console.log(" 🛠 auth 🛠");
    const {
      payload: { id },
    } = jwtDecode(auth);

    const isAuth = fetch(`${NEXT_PUBLIC_SERVER_URL}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${auth}`,
      },
    })
      .then((response) => {
        console.log("🛠 response 🛠", response);
        response.json().ok;
      })
      .catch((err) => console.log(err));
    console.log("🛠 isAuth1 🛠", isAuth);

    if (isAuth) {
      console.log(" 🛠 isAuth2 🛠", isAuth);
      return {
        type: "AUTH",
        payload: true,
      };
    }
  }
  //토큰인 없을 때
  return {
    type: "AUTH",
    payload: false,
  };
};

export const reconnect = () => {
  console.log(" 🛠 reconnect 🛠");
  return async (dispatch) => {
    dispatch(connectRequest());
    let web3 = new Web3(window.ethereum);
    try {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      console.log(" 🛠 accounts 🛠", accounts);
      const networkId = await window.ethereum.request({
        method: "net_version",
      });
      console.log(" 🛠 networkId 🛠 ", networkId);

      /*
        option 1 : 로컬 환경
      */
      // const nft_Network = await NftContract.networks[networkId];
      // const nftDeal_NetworkData = await NftDealContract.networks[networkId];
      // const auctionCreator_NetworkData = await AuctionCreatorContract.networks[networkId];
      // const gameToken_NetworkData = await GameTokenContract.networks[networkId];
      // const claim20_NetworkData = await Claim20_Contract.networks[networkId];
      // const stakingNetworkData = await Staking.networks[networkId];

      // const nftContract = new web3.eth.Contract(NftContract.abi, nft_Network.address);
      // const nftDealContract = new web3.eth.Contract(NftDealContract.abi, nftDeal_NetworkData.address);
      // const auctionCreatorContract = new web3.eth.Contract(
      //   AuctionCreatorContract.abi,
      //   auctionCreator_NetworkData.address
      // );
      // const gameTokenContract = new web3.eth.Contract(GameTokenContract.abi, gameToken_NetworkData.address);
      // const claim20_Contract = new web3.eth.Contract(Claim20_Contract.abi, claim20_NetworkData.address);
      // const stakingContract = new web3.eth.Contract(Staking.abi, stakingNetworkData.address);

      /*
      option 2: 배포 환경
      */
      const nftContract = new web3.eth.Contract(NftContract.abi, "0x5E5639C56b73DBEb661e37D6Bf1F3E4E2De7515E");
      const nftDealContract = new web3.eth.Contract(NftDealContract.abi, "0x915415f59DaD96e892b2CCA4A8Cb539c9f38Fa24");
      const auctionCreatorContract = new web3.eth.Contract(
        AuctionCreatorContract.abi,
        "0xF6EdaC055D1b3184eDAB5623f833f072EA7b4fC2"
      );
      const gameTokenContract = new web3.eth.Contract(
        GameTokenContract.abi,
        "0x622a3D7331F2dc4E8f644D4a0d83EE339d7E1BFd"
      );
      const claim20_Contract = new web3.eth.Contract(
        Claim20_Contract.abi,
        "0x9c7E5f6E1B2EB9d3a1Dd9540c6394a8877E4e61B"
      );
      const stakingContract = new web3.eth.Contract(Staking.abi, "0x45ba42cC018541B290d18D2F31046b8bF4D8B3aA");

      /*
        배포환경에서 에러
      */
      const stakingData = await stakingContract.methods.getStakingData().call({ from: accounts.toString() });
      let mainNftData;
      if (stakingData.tokenId == 0) {
        mainNftData = null;
      } else {
        const directoryUri = await nftContract.methods.tokenURI(stakingData.tokenId).call();
        const response = await axios.get(`${baseUri}${directoryUri.slice(6)}/${stakingData.tokenId}.json`);
        mainNftData = { stakingData: stakingData, mainNftJson: response.data };
      }
      dispatch(
        connectSuccess({
          account: accounts.toString(),
          networkId: networkId,
          nftContract: nftContract,
          nftDealContract: nftDealContract,
          gameTokenContract: gameTokenContract,
          auctionCreatorContract: auctionCreatorContract,
          claim20_Contract: claim20_Contract,
          stakingContract: stakingContract,
          mainNftData: mainNftData,
          web3: web3,
        })
      );
      dispatch(authenticate());

      await nftDealContract.events.submitSell().on("data", async (e) => {
        console.log("이벤트", e.returnValues);
      });
      // Add listeners start
      window.ethereum.on("accountsChanged", (accounts) => {
        // dispatch(updateAccount(accounts));
        dispatch(reconnect());
      });
      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
      // Add listeners end
    } catch (err) {
      console.log("오류-recunect");
      console.log(err);
      dispatch(connectFailed("Something went wrong."));
    }
  };
};

export const updateAccount = (account) => {
  return async (dispatch) => {
    let web3 = new Web3(window.ethereum);

    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });
    console.log(" 🛠 accounts 🛠", accounts[0]);
    const networkId = await window.ethereum.request({
      method: "net_version",
    });
    console.log(" 🛠 networkId 🛠 ", networkId);
    console.log(account);

    // const nft_Network = await NftContract.networks[networkId];
    // const stakingNetworkData = await Staking.networks[networkId];
    const nftContract = new web3.eth.Contract(NftContract.abi, "0x5E5639C56b73DBEb661e37D6Bf1F3E4E2De7515E");
    const stakingContract = new web3.eth.Contract(Staking.abi, "0x45ba42cC018541B290d18D2F31046b8bF4D8B3aA");
    // console.log(stakingContract.methods);
    // const stakingData = await stakingContract.methods
    //   .getStakingData()
    //   .call({ from: accounts[0] })
    //   .then((res) => console.log(res))
    //   .catch((err) => console.log(err));
    // console.log(stakingData);
    // let mainNftData;
    // if (stakingData.tokenId == 0) {
    //   mainNftData = null;
    // } else {
    //   const directoryUri = await nftContract.methods.tokenURI(stakingData.tokenId).call();
    //   const response = await axios.get(`${baseUri}${directoryUri.slice(6)}/${stakingData.tokenId}.json`);
    //   mainNftData = { stakingData: stakingData, mainNftJson: response.data };
    // }
    console.log("asdasds");

    dispatch(updateAccountRequest({ account: accounts[0] }));
    dispatch(fetchData(accounts[0]));
    console.log("같은 네트워크에서 계정만 교체");
    console.log(account);
    if (account) {
      console.log(account);
      fetch(`${NEXT_PUBLIC_SERVER_URL}/users?publicAddress=${accounts[0]}`)
        .then((response) => response.json())
        .then((users) => (users.length ? users[0] : dispatch(disconnectWallet())))
        .catch((err) => {
          console.log(err);
          dispatch(disconnectWallet());
        });
    }
  };
};

export const connectWallet = () => {
  console.log(" 🛠 connectWallet 🛠");
  return async (dispatch) => {
    dispatch(connectRequest());
    console.log("메타마스크 밖");
    if (window.ethereum) {
      console.log("메타마스크");
      dispatch(authenticate());
      let web3 = new Web3(window.ethereum);
      console.log(web3);
      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        console.log(accounts);
        const networkId = await window.ethereum.request({
          method: "net_version",
        });
        console.log("networkId : ", networkId);

        if (networkId == 5777 || 3 || 4) {
          console.log("if 통과", networkId);
          /*
        option 1 : 로컬 환경
      */
          // const nft_Network = await NftContract.networks[networkId];
          // const nftDeal_NetworkData = await NftDealContract.networks[networkId];
          // const auctionCreator_NetworkData = await AuctionCreatorContract.networks[networkId];
          // const gameToken_NetworkData = await GameTokenContract.networks[networkId];
          // const claim20_NetworkData = await Claim20_Contract.networks[networkId];
          // const stakingNetworkData = await Staking.networks[networkId];

          // const nftContract = new web3.eth.Contract(NftContract.abi, nft_Network.address);
          // const nftDealContract = new web3.eth.Contract(NftDealContract.abi, nftDeal_NetworkData.address);
          // const auctionCreatorContract = new web3.eth.Contract(
          //   AuctionCreatorContract.abi,
          //   auctionCreator_NetworkData.address
          // );
          // const gameTokenContract = new web3.eth.Contract(GameTokenContract.abi, gameToken_NetworkData.address);
          // const claim20_Contract = new web3.eth.Contract(Claim20_Contract.abi, claim20_NetworkData.address);
          // const stakingContract = new web3.eth.Contract(Staking.abi, stakingNetworkData.address);

          /*
          option 2: 배포 환경
          */
          const nftContract = new web3.eth.Contract(NftContract.abi, "0x5E5639C56b73DBEb661e37D6Bf1F3E4E2De7515E");
          const nftDealContract = new web3.eth.Contract(
            NftDealContract.abi,
            "0x915415f59DaD96e892b2CCA4A8Cb539c9f38Fa24"
          );
          const auctionCreatorContract = new web3.eth.Contract(
            AuctionCreatorContract.abi,
            "0xF6EdaC055D1b3184eDAB5623f833f072EA7b4fC2"
          );
          const gameTokenContract = new web3.eth.Contract(
            GameTokenContract.abi,
            "0x622a3D7331F2dc4E8f644D4a0d83EE339d7E1BFd"
          );
          const claim20_Contract = new web3.eth.Contract(
            Claim20_Contract.abi,
            "0x9c7E5f6E1B2EB9d3a1Dd9540c6394a8877E4e61B"
          );
          const stakingContract = new web3.eth.Contract(Staking.abi, "0x45ba42cC018541B290d18D2F31046b8bF4D8B3aA");
          // console.log("컨트랙트", web3.eth);
          // console.log("컨트랙트", NftContract.abi);
          // console.log("컨트랙트", nftContract);
          // ///
          // console.log("스테이킹 컨트랙트", Staking.abi);

          const coinbase = await web3.eth.getCoinbase(); //계정

          const stakingData = await stakingContract.methods.getStakingData().call({ from: accounts.toString() });
          let mainNftData;
          if (stakingData.tokenId == 0) {
            mainNftData = null;
          } else {
            const directoryUri = await nftContract.methods.tokenURI(stakingData.tokenId).call();
            const response = await axios.get(`${baseUri}${directoryUri.slice(6)}/${stakingData.tokenId}.json`);
            mainNftData = { stakingData: stakingData, mainNftJson: response.data };
          }

          if (!coinbase) {
            dispatch(connectFailed("메타마스크 로그인이 필요합니다."));
            return;
          }

          const publicAddress = coinbase.toLowerCase();
          dispatch(connectRequest());

          const handleAuthenticate = async ({ publicAddress, signature }) =>
            fetch(`${NEXT_PUBLIC_SERVER_URL}/auth`, {
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
            fetch(`${NEXT_PUBLIC_SERVER_URL}/users`, {
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
          fetch(`${NEXT_PUBLIC_SERVER_URL}/users?publicAddress=${publicAddress}`)
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

          dispatch(
            connectSuccess({
              account: accounts.toString(),
              networkId: networkId,
              nftContract: nftContract,
              nftDealContract: nftDealContract,
              gameTokenContract: gameTokenContract,
              auctionCreatorContract: auctionCreatorContract,
              claim20_Contract: claim20_Contract,
              stakingContract: stakingContract,
              mainNftData: mainNftData,
              web3: web3,
            })
          );

          await nftDealContract.events.submitSell().on("data", async (e) => {
            console.log("이벤트", e.returnValues);
          });
          // Add listeners start
          // window.ethereum.on("accountsChanged", (accounts) => {
          //   dispatch(updateAccount(accounts));
          // });
          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });
          // dispatch(getMyNft(accounts[0]));
          // Add listeners end
        } else {
          dispatch(
            connectFailed(`현재 networkId 는 ${networkId} 입니다.\nnetworkId : 1337 (로컬호스트)로 변경이 필요합니다.`)
          );
        }
      } catch (err) {
        console.log("오류우");
        console.log(err);
        console.log("오류우");
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
    dispatch(connectFailed("로그아웃"));
  };
};
