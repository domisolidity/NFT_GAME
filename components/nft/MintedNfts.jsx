import React from "react";
import NftCard from "../NftCard";

const MintedNfts = (props) => {
  const mintNfts = props.nftInfo;
  console.log(mintNfts);
  return (
    <>
      {mintNfts &&
        mintNfts.map((nft, i) => {
          return <NftCard nftInfo={nft} key={i} />;
        })}
    </>
  );
};

export default MintedNfts;
