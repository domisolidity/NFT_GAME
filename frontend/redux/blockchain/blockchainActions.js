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

export const connectWeb3 = (payload) => {
  return {
    type: "WEB3",
    payload: payload,
  };
};
export const getContract = (payload) => {
  console.log(payload);
  return {
    type: "CONTRACT",
    payload: payload,
  };
};

export const connectRequest = () => {
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

/* 로그인 인증 */
export const authenticate = () => {
  // NEXT_PUBLIC_LOGIN_KEY 라는 이름의 쿠키 가져오기
  const accessToken = Cookies.get(NEXT_PUBLIC_LOGIN_KEY);
  // 쿠키 안에 제이슨 형식으로 된 인증토큰 파싱(분석) 해서 담기
  const auth = accessToken && JSON.parse(accessToken).accessToken;
  console.log(" 🛠 authenticate 🛠");
  console.log("액세스 토큰", accessToken);
  console.log("auth = ", auth);

  // 토큰이 있을 때 if문 실행
  if (auth) {
    console.log(" 🛠 auth 🛠");
    // 암호화된 인증토큰을 풀어서 payload에 있는 id 꺼내오기
    // (id값이 1이 나오길래 DB의 primary키 값인줄 알았으나)
    // (다른 계정들도 모두 1로 나오는걸 보니 쿠키 내부에서의)
    // (primary키 같은게 아닐까 추측)
    const {
      payload: { id },
    } = jwtDecode(auth);
    // DB에 가입된 내 계정과 인증토큰의 내용이 일치하는지 확인하기
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
    // 인증 됐으면 auth값 true로 바꿔주기
    if (isAuth) {
      console.log(" 🛠 isAuth2 🛠", isAuth);
      return {
        type: "AUTH",
        payload: true,
      };
    }
  }
  // 인증토큰 없을 때 auth값 false로 바꿔주기
  return {
    type: "AUTH",
    payload: false,
  };
};

/* 쿠키 있으면 자동 로그인을 위한 녀석 */
export const reconnect = (account) => {
  console.log(" 🛠 reconnect 🛠");
  return async (dispatch) => {
    dispatch(connectRequest()); // 로딩중으로 변경

    dispatch(authenticate());

    try {
      // 로딩중 끝내기
      dispatch(
        connectSuccess({
          account: account,
        })
      );

      // await nftDealContract.events.submitSell().on("data", async (e) => {
      //   console.log("이벤트", e.returnValues);
      // });
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
    console.log(" 🛠 accounts 🛠", accounts);
    const networkId = await window.ethereum.request({
      method: "net_version",
    });
    console.log(" 🛠 networkId 🛠 ", networkId);

    // const nft_Network = await NftContract.networks[networkId];
    // const stakingNetworkData = await Staking.networks[networkId];
    const nftContract = new web3.eth.Contract(NftContract.abi, "0x11fE4C9c50479529bFc600D33ebE6e1A5DA9C756");
    const stakingContract = new web3.eth.Contract(Staking.abi, "0x53f635b35aae6C01E20bd1fe42b840dC21C3660b");
    const stakingData = await stakingContract.methods.getStakingData().call({ from: accounts.toString() });
    let mainNftData;
    if (stakingData.tokenId == 0) {
      mainNftData = null;
    } else {
      const directoryUri = await nftContract.methods.tokenURI(stakingData.tokenId).call();
      const response = await axios.get(`${baseUri}${directoryUri.slice(6)}/${stakingData.tokenId}.json`);
      mainNftData = { stakingData: stakingData, mainNftJson: response.data };
    }
    dispatch(updateAccountRequest({ account: accounts.toString(), mainNftData: mainNftData }));
    dispatch(fetchData(account));
    console.log("같은 네트워크에서 계정만 교체");

    if (account) {
      console.log(account);
      fetch(`${NEXT_PUBLIC_SERVER_URL}/users?publicAddress=${account}`)
        .then((response) => response.json())
        .then((users) => (users.length ? users[0] : dispatch(disconnectWallet())))
        .catch((err) => {
          console.log(err);
          dispatch(disconnectWallet());
        });
    }
  };
};

/* 로그인 하기 */
export const connectWallet = (web3, account) => {
  console.log(" 🛠 connectWallet 🛠");
  return async (dispatch) => {
    dispatch(connectRequest()); // 로딩중으로 변경
    // 쿠키에 가지고 있는 인증토큰 검증.
    // 인증 성공 시 auth값은 true, 없거나 인증실패 시 false
    dispatch(authenticate());

    const publicAddress = account.toLowerCase();
    console.log(account === publicAddress);

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
      const ten_hour = new Date(new Date().getTime() + 36000 * 1000); // sign token for 10 hour
      Cookies.set(NEXT_PUBLIC_LOGIN_KEY, JSON.stringify(auth), { expires: ten_hour });
      // auth값 true로 바꿔주기
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

    // 로딩 끝난걸로 변경
    dispatch(connectSuccess({ account: account }));

    // await nftDealContract.events.submitSell().on("data", async (e) => {
    //   console.log("이벤트", e.returnValues);
    // });
  };
};

/* 로그아웃 해주기 */
export const disconnectWallet = () => {
  return async (dispatch) => {
    // 내 인증 토큰이 담긴 쿠키 지워주기
    Cookies.remove(NEXT_PUBLIC_LOGIN_KEY);
    // 로그아웃 했으니 리덕스에 담긴 auth값 false로 바꿔주기
    dispatch(authenticate());
    dispatch(connectFailed("로그아웃"));
  };
};

export const init = () => {
  return async (dispatch) => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      dispatch(connectWeb3(web3));
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log("현재 메타마스크 계정", accounts[0]);
        const networkId = await window.ethereum.request({
          method: "net_version",
        });
        console.log("networkId : ", networkId);
        if (networkId == 5777 || networkId == 3 || networkId == 4) {
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
          const nftContract = new web3.eth.Contract(NftContract.abi, "0x11fE4C9c50479529bFc600D33ebE6e1A5DA9C756");
          const nftDealContract = new web3.eth.Contract(
            NftDealContract.abi,
            "0xf58C30c2490113F219Cf9F9ab75BB9ac010F2156"
          );
          const auctionCreatorContract = new web3.eth.Contract(
            AuctionCreatorContract.abi,
            "0xFe6E6c2428D507E6e1DC3d7e5feb250203A71f7a"
          );
          const gameTokenContract = new web3.eth.Contract(
            GameTokenContract.abi,
            "0xD50Dc505C3b96574D70E52BBe8CC18Da0153ec6b"
          );
          const claim20_Contract = new web3.eth.Contract(
            Claim20_Contract.abi,
            "0xBf4ba7dc2997c8478aB5EAA608E3546F8D4eB53c"
          );
          const stakingContract = new web3.eth.Contract(Staking.abi, "0x53f635b35aae6C01E20bd1fe42b840dC21C3660b");

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
            getContract({
              networkId: networkId,
              account: accounts[0],
              nftContract: nftContract,
              nftDealContract: nftDealContract,
              gameTokenContract: gameTokenContract,
              auctionCreatorContract: auctionCreatorContract,
              claim20_Contract: claim20_Contract,
              stakingContract: stakingContract,
              mainNftData: mainNftData,
            })
          );
        } else {
          alert(`현재 networkId 는 ${networkId} 입니다. 네트워크 변경이 필요합니다.`);
        }

        window.ethereum.on("accountsChanged", () => {
          dispatch(disconnectWallet());
          alert(`계정이 변경되어 로그아웃됩니다.`);
          // window.location.reload();
        });

        window.ethereum.on("chainChanged", () => {
          alert(`네트워크가 변경되었습니다.`);
          // window.location.reload();
        });
      } catch (error) {
        console.log(error);
        alert("메타마스크를 확인해주세요");
      }
    } else {
      alert("메타마스크를 설치해주세요");
    }
  };
};
