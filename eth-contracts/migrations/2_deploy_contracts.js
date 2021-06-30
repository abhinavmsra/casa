// migrating the appropriate contracts
var Verifier = artifacts.require("./Verifier.sol");
var SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");

const proofs = require('../proofs/proofs.json');

module.exports = async function(deployer, _, accounts) {
  await deployer.deploy(Verifier);
  await deployer.deploy(SolnSquareVerifier, Verifier.address);

  const appContract = await SolnSquareVerifier.deployed();
  
  // Mint tokens when deploying
  await Promise.all(
    Object.keys(proofs).map(async (key, index) => {
      const { proof, inputs } = proofs[key];
      const { a, b, c } = proof;

      console.log(`Miniting token: ${index + 1}`);
      return await appContract.mintToken(accounts[index], index + 1, a, b, c, inputs, { from: accounts[0] });
    })
  );
};
