const LendingSystem = artifacts.require("SimpleLendingContract");

module.exports = function (deployer) {
  deployer.deploy(LendingSystem);
};
