// constants
import Web3 from "web3";
import NftContract from "../../contracts/NftContract.json";

import jwtDecode from "jwt-decode";


// log
import { fetchData } from "../data/dataActions";

// //test
// import Cookies from 'universal-cookie';
// const cookies = new Cookies();
// export function setRefreshTokenToCookie(accessToken) {
//   cookies.set('accessToken', accessToken, { sameSite: 'strict' });
// }

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

  const accessToken = localStorage.getItem(LS_KEY);
  // const auth = accessToken && JSON.parse(accessToken);
  const auth = accessToken && JSON.parse(accessToken).accessToken

  //토큰이 있을때 if문 실행
  if (auth) {
    const {
      payload: { id },
    } = jwtDecode(auth);

    const isAuth = fetch(`/api/users/${id}`, {
      headers: {
        Authorization: `Bearer ${auth}`,
      },
    })
      .then((response) => response.json().ok)
      .catch((err) => console.log(err));

    if (isAuth) {
      return {
        type: "AUTH",
        payload: true,
      }
    }
  }
  //토큰인 없을 때
  return {
    type: "AUTH",
    payload: false,
  }
}


// //test
// const login = (payload) => {
//   console.log(payload);
//   localStorage.removeItem("logout");

//   return {
//     type: "SET_TOKEN",
//     payload: payload,
//   }
// }

// const logoutToken = () => {
//   console.log("로그아웃토큰");
//   return {
//     type: "DELETE_TOKEN",
//   }
// }

// export const connect = () => {
//   return async (dispatch) => {
//     dispatch(connectRequest());
//     if (window.ethereum) {
//       let web3 = new Web3(window.ethereum);
//       try {
//         const accounts = await window.ethereum.request({
//           method: "eth_accounts",
//         });
//         console.log(accounts);
//         const networkId = await window.ethereum.request({
//           method: "net_version",
//         });
//         console.log("networkId : ", networkId);

//         if (networkId == 1337 || networkId == 5777) {
//           const NetworkData = await NftContract.networks[networkId];
//           const nftContract = new web3.eth.Contract(NftContract.abi, NetworkData.address);

//           if (accounts[0] == null) {
//             dispatch(connectFailed("메타마스크 로그인이 필요합니다."));
//             return;
//           }

//           dispatch(
//             connectSuccess({
//               account: accounts[0],
//               nftContract: nftContract,
//               web3: web3,
//             })
//           );

//           // Add listeners start
//           window.ethereum.on("accountsChanged", (accounts) => {
//             dispatch(updateAccount(accounts));
//           });
//           window.ethereum.on("chainChanged", () => {
//             window.location.reload();
//           });
//           // Add listeners end
//         } else {
//           dispatch(
//             connectFailed(`현재 networkId 는 ${networkId} 입니다.\nnetworkId : 1337 (로컬호스트)로 변경이 필요합니다.`)
//           );
//         }
//       } catch (err) {
//         console.log(err);
//         dispatch(connectFailed("Something went wrong."));
//       }
//     } else {
//       dispatch(connectFailed("Install Metamask."));
//     }
//   };
// };

export const reconnect = () => {
  return async (dispatch) => {
    dispatch(connectRequest());
    let web3 = new Web3(window.ethereum);
    try {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      const networkId = await window.ethereum.request({
        method: "net_version",
      });
      console.log("networkId : ", networkId);

      const NetworkData = await NftContract.networks[networkId];
      const nftContract = new web3.eth.Contract(NftContract.abi, NetworkData.address);

      dispatch(
        connectSuccess({
          account: accounts[0],
          nftContract: nftContract,
          web3: web3,
        })
      );
      dispatch(authenticate())
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
  }
};

export const updateAccount = (account) => {
  return async (dispatch) => {
    dispatch(updateAccountRequest({ account: account }));
    dispatch(fetchData(account));
  };
};

export const connectWallet = () => {
  return async (dispatch) => {
    dispatch(connectRequest());
    if (window.ethereum) {
      dispatch(authenticate())
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
          const NetworkData = await NftContract.networks[networkId];
          const nftContract = new web3.eth.Contract(NftContract.abi, NetworkData.address);

          const coinbase = await web3.eth.getCoinbase();//계정

          if (!coinbase) {
            dispatch(connectFailed("메타마스크 로그인이 필요합니다."));
            return;
          }

          const publicAddress = coinbase.toLowerCase();
          dispatch(connectRequest())

          const handleAuthenticate = async ({ publicAddress, signature }) =>
            fetch(`/api/auth`, {
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
            fetch(`/api/users`, {
              body: JSON.stringify({ publicAddress }),
              headers: {
                "Content-Type": "application/json",
              },
              method: "POST",
            }).then((response) => response.json());

          const handleLoggedIn = (auth) => {
            localStorage.setItem(LS_KEY, JSON.stringify(auth));

            //const access_token = localStorage.getItem(LS_KEY);
            dispatch(authenticate())
            // dispatch(login({ access_token: JSON.parse(access_token).accessToken, refresh_token: null }))
          };


          // Look if user with current publicAddress is already present on backend
          fetch(`/api/users?publicAddress=${publicAddress}`)
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
              account: accounts[0],
              nftContract: nftContract,
              web3: web3,
            })
          );
          // Add listeners start
          window.ethereum.on("accountsChanged", (accounts) => {
            dispatch(updateAccount(accounts));
          });
          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });
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
}

export const disconnectWallet = () => {
  return async (dispatch) => {
    localStorage.removeItem(LS_KEY);
    localStorage.setItem('logout', Date.now())

    dispatch(authenticate())
    dispatch(connectFailed("로그아웃"))
    // dispatch(logoutToken())
    // cookies.remove('accessToken');
  }
}