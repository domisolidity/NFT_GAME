import React, { useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";
import NetworkCard from "../../components/NetworkCard";
import ProfileCard from "../../components/ProfileCard";
import Inventory from '../../components/Inventory'
import Collections from "../../components/Collections";
import TotalCard from "../../components/TotalCard";
import Claim from "../../components/Claim";
import Staking from "../../components/Staking";
import { useSelector } from "react-redux";
import CurrentMainNft from "../../components/CurrentMainNft";

const Mypage = () => {
  const [menu, setMenu] = useState("items");
  const data = useSelector(state => state.data);
  const { kdkd, auctionList } = data;

  useEffect(() => {
    returnMenu(menu);
  }, [menu]);

  const returnMenu = (display) => {
    switch (display) {
      case "items":
        return <Inventory />
      case "nfts":
        return <Collections />
      case "claim":
        return <Claim />
      case "staking":
        return <Staking />
      default:
        break;
    }
  };

  const renderItems = (e) => {
    e.preventDefault();
    setMenu("items");
  };
  const renderNfts = (e) => {
    e.preventDefault();
    setMenu("nfts");
  };
  const renderClaim = (e) => {
    e.preventDefault();
    setMenu("claim");
  };
  const renderStaking = (e) => {
    e.preventDefault();
    setMenu("staking");
  };



  return (
    <>
      <div className="mypage">
        <div className="sidebar">
          <ProfileCard />
          <Button onClick={renderItems} m={4}>아이템</Button>
          <Button onClick={renderNfts} m={4}>NFT</Button>
          <Button onClick={renderClaim} m={4}>Claim</Button>
          <Button onClick={renderStaking} m={4}>Staking</Button>
        </div>
        <div className="content">
          <div className="fixed">
            <div className="fixed_item">
            </div>
            <div className="fixed_item">
              <NetworkCard />
            </div>
            {/* <div className="fixed_item">
              <TotalCard />
            </div> */}
            <div className="fixed_item">
              <CurrentMainNft />
            </div>
          </div>
          <div className="menu">
            {returnMenu(menu)}
          </div>
        </div>
      </div>
      <style jsx>{`
      .mypage{
        display: flex;
        margin: 0 3rem;
      }
      .sidebar{
        display: flex;
        width: 10%;
        height: 65vh;
        flex-direction: column;
        border-right: 1px solid
      }
      .content{
        width: 100%;
        height:auto;
        margin: 0 1rem;

      }
      .fixed{
        display: flex;
      }

      .fixed_item{
        
        margin-right: 2rem;
      }
      .menu{
        margin: 2rem 1rem;
      }
      `}</style>
    </>
  );
};

export default Mypage;