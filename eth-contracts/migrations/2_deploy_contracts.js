// migrating the appropriate contracts
// var SquareVerifier = artifacts.require("./SquareVerifier.sol");
// var SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");
const CasaContract = artifacts.require('Casa');

module.exports = function(deployer) {
  deployer.deploy(CasaContract);
  // deployer.deploy(SolnSquareVerifier);
};
