const CryptoClans = artifacts.require("CryptoClans");

module.exports = async function(deployer) {
  await deployer.deploy(CryptoClans);
};
