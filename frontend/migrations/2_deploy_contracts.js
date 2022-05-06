var NftContract = artifacts.require("./NftContract.sol");
var NftDealContract = artifacts.require("./NftDealContract.sol");
var AuctionCreator = artifacts.require("./AuctionCreator.sol");
var GameToken = artifacts.require("./GameToken.sol");
var Claim_20 = artifacts.require("./Claim_20.sol");
var Staking = artifacts.require("./Staking.sol");

module.exports = async function (deployer) {
  // console.log(NftContract.address);
  await deployer.deploy(NftContract);
  await deployer.deploy(NftDealContract, NftContract.address);
  await deployer.deploy(AuctionCreator, NftDealContract.address);

  // BEP20
  await deployer.deploy(GameToken);
  await deployer.deploy(Claim_20, GameToken.address);

  // BEP721, BEP20
  await deployer.deploy(Staking, GameToken.address, NftContract.address);
};
