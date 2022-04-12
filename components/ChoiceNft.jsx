import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

import MyNftsCard from "../components/MyNftsCard";
const ChoiceNft = (props) => {
  const blockchain = useSelector((state) => state.blockchain);
  const { account, nftContract } = blockchain;

  const { toggle, getCurrentMainNft } = props;

  const [myNfts, setMyNfts] = useState([]);
  const [currentMainNft, setcurrentMainNft] = useState("");
  const [selectNft, setSelectNft] = useState("");

  const [beforeUserName, setBeforeUserName] = useState("");
  const [beforeImages, setBeforeImages] = useState([]);
  const [userName, setUserName] = useState("");
  const [Images, setImages] = useState([]);

  const baseUri = "http://127.0.0.1:8080/ipfs";
  const LS_KEY = "login-with-metamask:auth";
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const getToken = Cookies.get(LS_KEY);
    const parsedToken = getToken && JSON.parse(getToken).accessToken;
    setAccessToken(parsedToken);
  }, [accessToken]);

  useEffect(() => {
    if (!currentMainNft) return;
    getCurrentMainNft(currentMainNft);
  }, [currentMainNft]);

  const getMyNfts = async () => {
    try {
      await nftContract.methods
        .getMyToken(account)
        .call({ from: account })
        .then(async (result) => {
          console.log("getMyToken", result);
          let mynfts = [];
          if (!result) return true;
          for (const info of result) {
            if (info.uri == "") continue;
            const response = await axios.get(
              `${baseUri}${info.uri.slice(6)}/${info.id}.json`
            );
            console.log(`${baseUri}${info.uri.slice(6)}/${info.id}.json`);
            //console.log(_.cloneDeep(response.data.attributes));
            mynfts.push({
              id: info.id,
              grade: response.data.grade,
              attributes: response.data.attributes,
              name: response.data.name,
              image: `${baseUri}${response.data.image.slice(6)}`,
              description: response.data.description,
            });
          }
          setMyNfts(mynfts);
          console.log("myNft", mynfts);
        });
    } catch (error) {
      console.error();
    }
  };

  const getNftDetail = async (e) => {
    const tokenId = e.currentTarget.getAttribute("tokenId");
    console.log(tokenId);
    handleClick(e);
    setSelectNft(tokenId);
  };

  useEffect(async () => {
    if (!account) return false;

    await getMyNfts();
  }, [account]);

  const clickdeFocus = document.getElementsByClassName("nft-row nft-body");

  function handleClick(event) {
    // console.log(event.target);
    // console.log(this);
    // 콘솔창을 보면 둘다 동일한 값이 나온다

    // console.log(event.target.classList);

    if (event.target.classList[1] === "clicked") {
      event.target.classList.remove("clicked");
    } else {
      for (var i = 0; i < clickdeFocus.length; i++) {
        clickdeFocus[i].classList.remove("clicked");
      }
      event.target.classList.add("clicked");
    }
  }

  let disable = "disable";
  if (selectNft) disable = "";

  const getSubmit = () => {
    if (!selectNft) return;

    const {
      payload: { id },
    } = jwtDecode(accessToken);

    const variables = {
      mainNft: selectNft,
    };

    fetch(`/api/users/profile/${id}`, {
      body: JSON.stringify(variables),
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      method: "PATCH",
    })
      .then((response) => response.json())
      .then((result) => {
        setcurrentMainNft(result.user.mainNft);
        alert("한 주간 유지됩니다.");
        toggle();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="shell overflow-hidden anim-scale-in position-relative ">
      <div className="header">
        <div>Main NFT</div>
      </div>
      <div className="content">
        <div className="nft-row nft-header-label">
          <div className="nft-id">ID</div>
          <div className="nft-name">NFT Name</div>
          <div className="nft-grade">Grade</div>
          <div className="nft-image">Image</div>
        </div>

        {myNfts.length !== 0 ? (
          myNfts.map((info, index) => {
            return (
              <div
                key={index}
                className={"nft-row nft-body"}
                onClick={getNftDetail}
                tokenId={info.id}
              >
                {console.log(info)}
                <div className="nft-id">{info.id}</div>
                <div className="nft-name">{info.name}</div>
                <div className="nft-grade">{info.grade}</div>
                <div className="nft-image">
                  <img src={info.image} />
                </div>
              </div>
            );
          })
        ) : (
          <div className="blank-state">
            <div>
              <img src="https://bunicorn.exchange/img/no-search.96c77eef.svg" />
            </div>
            <div className="not-found mt-4 "> Not Found </div>
          </div>
        )}
      </div>
      <div className="retangle"></div>
      <div className="button-flex button-footer">
        <button
          className={`button button-wrapper button ${disable}`}
          type="submit"
          onClick={getSubmit}
        >
          <span>Confirm</span>
        </button>

        <button
          className="button button button-cancel"
          type="button"
          onClick={toggle}
        >
          Cancel
        </button>
      </div>

      <style jsx>{`
        .shell {
          display: flex;
          flex-direction: column;
          z-index: 999;
          margin: 0 auto;
          width: 100%;
          max-height: 90%;
          border-radius: 25px;
          background-color: #0f263e;
          padding-left: 0 !important;
          padding-right: 0 !important;
          max-width: 810px;
        }
        .border-0,
        .shell {
          border: 0 !important;
        }
        .overflow-hidden {
          overflow: hidden !important;
        }
        .position-relative {
          position: relative !important;
        }
        .anim-scale-in {
          animation-name: scale-in;
          animation-duration: 0.15s;
          animation-timing-function: cubic-bezier(0.2, 0, 0.13, 1.5);
        }
        .position-relative {
          position: relative !important;
        }
        .overflow-hidden {
          overflow: hidden !important;
        }
        .header {
          font-weight: 700;
          font-size: 22px;
          line-height: 35px;
          color: #f9f9f9;
          padding: 20px 40px;
          background: #1b3148;
        }
        .content {
          padding: 0;
          max-height: 300px;
          overflow-y: auto;
          position: relative;
        }
        .nft-row.nft-header-label {
          position: sticky;
          width: 100%;
          top: 0;
          background: #0f263e;
          /*color: hsla(0, 0%, 100%, 0.4); */
        }
        .nft-row {
          padding: 8px 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .nft-row.nft-body {
          background: #0f263e;
          color: hsla(0, 0%, 100%, 0.4);
          cursor: pointer;
          text-align: center;
        }
        .nft-row.nft-body > div {
          pointer-events: none;
        }
        .nft-row.nft-body:hover {
          color: white;
          background: #303844 !important;
        }

        .nft-row.nft-body.clicked {
          color: white;
          background: #f47820 !important;
        }

        .nft-id {
          width: 10%;
          text-align: center;
        }
        .nft-name {
          text-align: center;
          width: 40%;
        }
        .nft-grade {
          width: 20%;
          text-align: center;
        }
        .nft-image {
          width: 20%;
          text-align: center;
        }
        .nft-image > img {
          width: 50%;
          border-radius: 50%;
          text-align: center;
          display: block;
          margin: auto;
        }
        .blank-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 16px;
        }

        img {
          border-style: none;
        }
        img,
        svg {
          vertical-align: middle;
        }
        .not-found {
          color: hsla(0, 0%, 100%, 0.4);
        }
        .mt-4 {
          margin-top: 24px !important;
        }
        .mt-4,
        .my-4 {
          margin-top: 1.5rem !important;
        }
        .retangle {
          width: 100%;
          height: 1px;
          background-color: rgba(0, 0, 0, 0.08);
          margin-bottom: 16px;
        }
        .button-footer {
          padding: 0 20px;
        }
        .button-flex {
          display: flex;
          justify-content: space-around;
          align-items: center;
        }
        .button-wrapper.button.disable {
          background: #f47820;
          opacity: 0.4;
          cursor: not-allowed;
        }

        /* @media only screen and (max-width: 768px) .button-wrapper.button {
          width: 150px;
        } */
        .button-wrapper.button {
          background: #f47820 !important;
          color: #fff !important;
          margin: 15px 0 30px 0;
          font-family: Lato-Bold !important;
          font-size: 16px !important;
          border: 0 !important;
          width: 190px;
        }
        /* @media only screen and (max-width: 768px) .button {
          min-width: 100px !important;
        } */
        .button {
          min-width: 150px !important;
        }

        [type="button"]:not(:disabled),
        [type="reset"]:not(:disabled),
        [type="submit"]:not(:disabled),
        button:not(:disabled) {
          cursor: pointer;
        }
        .button {
          border-radius: 22px;
          padding: 0 22px;
          outline: none;
          height: 44px;
          margin: 0;
        }
        /* @media only screen and (max-width: 768px) .button-cancel {
          width: 150px;
        } */
        .button-cancel {
          margin: 15px 0 30px 0;
          width: 190px !important;
          font-size: 16px;
          color: #f47820;
          border: 2px solid #f47820 !important;
          background-color: inherit !important;
        }
        /* @media only screen and (max-width: 768px) .button {
          min-width: 100px !important;
        } */
        .modal-stake-nft .icon-close-modal,
        .modal-wrap .icon-close-modal {
          padding: 20px !important;
        }
        .modal .icon-close-modal {
          z-index: 1;
        }
        .a {
          color: var(--text-color);
        }
        /* @media (max-width: 768px) .icon-close-modal {
          padding: 0.7rem !important;
        } */
        .p-4 {
          padding: 24px !important;
        }
        .right-0 {
          right: 0 !important;
        }
        .position-absolute {
          position: absolute !important;
        }
      `}</style>
      <link
        href="https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css"
        rel="stylesheet"
      ></link>
    </div>
  );
};

export default ChoiceNft;
