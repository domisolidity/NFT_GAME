// constants
import Web3 from "web3";
import NftContract from "../../contracts/artifacts/NftContract.json";
import NftDealContract from "../../contracts/artifacts/NftDealContract.json";
import GameTokenContract from "../../contracts/artifacts/GameToken.json";
import jwtDecode from "jwt-decode";
import { fetchData } from "../data/dataActions";
import Cookies from "js-cookie";
const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

const LS_KEY = "login-with-metamask:auth";

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
  const accessToken = Cookies.get(LS_KEY);
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

    const isAuth = fetch(`${baseUrl}/users/${id}`, {
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

      const nftNetwork = await NftContract.networks[networkId];
      console.log(" 🚩 nftNetwork ", nftNetwork);
      const nftDealNetworkData = await NftDealContract.networks[networkId];
      console.log(" 🚩 nftDealNetworkData ", nftDealNetworkData)
      const gameTokenNetworkData = await GameTokenContract.networks[networkId];
      console.log(" 🚩 gameTokenNetworkData ", gameTokenNetworkData)

      const nftContract = new web3.eth.Contract(NftContract.abi, nftNetwork.address);
      console.log(" 🚩 nftContract ", nftContract);
      const nftDealContract = new web3.eth.Contract(NftDealContract.abi, nftDealNetworkData.address);
      console.log(" 🚩 nftDealContract ", nftDealContract)
      const gameTokenContract = new web3.eth.Contract(GameTokenContract.abi, gameTokenNetworkData.address);
      console.log(" 🚩 gameTokenContract ", gameTokenContract)

      dispatch(
        connectSuccess({
          account: accounts.toString(),
          nftContract: nftContract,
          nftDealContract: nftDealContract,
          gameTokenContract: gameTokenContract,
          web3: web3,
        })
      );
      dispatch(authenticate());

      await nftDealContract.events.submitSell().on("data", async (e) => {
        console.log("이벤트", e.returnValues);
      });
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
    console.log("같은 네트워크에서 계정만 교체");

    if (account) {
      console.log(account);
      fetch(`${baseUrl}/users?publicAddress=${account}`)
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
  console.log(" 🛠 connectWallet 🛠");
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

        if (networkId == 1337 || networkId == 5777) {
          const nftNetwork = await NftContract.networks[networkId];
          const nftDealNetworkData = await NftDealContract.networks[networkId];
          const gameTokenNetworkData = await GameTokenContract.networks[networkId];
          const nftContract = new web3.eth.Contract(NftContract.abi, nftNetwork.address);
          const nftDealContract = new web3.eth.Contract(NftDealContract.abi, nftDealNetworkData.address);
          const gameTokenContract = new web3.eth.Contract(GameTokenContract.abi, gameTokenNetworkData.address);

          const coinbase = await web3.eth.getCoinbase(); //계정

          if (!coinbase) {
            dispatch(connectFailed("메타마스크 로그인이 필요합니다."));
            return;
          }

          const publicAddress = coinbase.toLowerCase();
          dispatch(connectRequest());

          const handleAuthenticate = async ({ publicAddress, signature }) =>
            fetch(`${baseUrl}/auth`, {
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
            fetch(`${baseUrl}/users`, {
              body: JSON.stringify({ publicAddress }),
              headers: {
                "Content-Type": "application/json",
              },
              method: "POST",
            }).then((response) => response.json());

          const handleLoggedIn = (auth) => {
            const one_hour = new Date(new Date().getTime() + 3600 * 1000); // sign token for 1 hour
            Cookies.set(LS_KEY, JSON.stringify(auth), { expires: one_hour });

            dispatch(authenticate());
          };

          // Look if user with current publicAddress is already present on backend
          fetch(`${baseUrl}/users?publicAddress=${publicAddress}`)
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
              nftContract: nftContract,
              nftDealContract: nftDealContract,
              gameTokenContract: gameTokenContract,
              web3: web3,
            })
          );

          await nftDealContract.events.submitSell().on("data", async (e) => {
            console.log("이벤트", e.returnValues);
          });
          // Add listeners start
          window.ethereum.on("accountsChanged", (accounts) => {
            console.log("여기", accounts);
            dispatch(updateAccount(accounts));
          });
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
    Cookies.remove(LS_KEY);

    dispatch(authenticate());
    dispatch(connectFailed("로그아웃"));
  };
};
