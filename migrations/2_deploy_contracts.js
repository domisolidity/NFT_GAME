var NftContract = artifacts.require("./NftContract.sol");

module.exports = function (deployer) {
  deployer.deploy(NftContract);
};
