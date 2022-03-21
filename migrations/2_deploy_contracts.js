var NftContract = artifacts.require("./NftContract.sol");
var NftDealContract = artifacts.require("./NftDealContract.sol");

module.exports = async function (deployer) {
  await deployer.deploy(NftContract);
  await deployer.deploy(NftDealContract, NftContract.address);
};
