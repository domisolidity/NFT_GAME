import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const NftAmount = () => {
  const blockchain = useSelector((state) => state.blockchain);
  const { nftContract, account } = blockchain;
  const [amount, setAmount] = useState("");

  const MyTotalNft = async () => {
    await nftContract.methods
      .getMyToken(account)
      .call({ from: account })
      .then((res) => setAmount(res.length));

    console.log(amount);
  };

  useEffect(() => {
    if (!account) return;
    MyTotalNft();
  }, [amount]);

  return <div className="nft_amount">{amount}</div>;
};

export default NftAmount;
