const truffleAssert = require('truffle-assertions');
const SolnSquareVerifier = artifacts.require('SolnSquareVerifier');
const Verifier = artifacts.require('Verifier');
const { proof, inputs } = require('../../zokrates/code/square/proof.json');

contract('SolnSquareVerifier', accounts => {
  const { a, b, c } = proof;

  beforeEach(async () => {
      this.verifier = await Verifier.new({ from: accounts[0] });

      this.solnSquareVerifier = await SolnSquareVerifier.new(
        this.verifier.address, 
        { from: accounts[0] }
      );
  });

  it('should add a new solution', async () => {
    await truffleAssert.passes(
      this.solnSquareVerifier.addSolution(accounts[1], 1, a, b, c, inputs)
    );

    await truffleAssert.fails(
      this.solnSquareVerifier.addSolution(accounts[1], 2, a, b, c, inputs),
      truffleAssert.ErrorType.REVERT,
      "solution must be unique"
    );
  });

  it('should mint an ERC721 token', async () => {
    await truffleAssert.passes(
      this.solnSquareVerifier.mintToken(accounts[1], 1, a, b, c, inputs, { from: accounts[0] })
    );

    await truffleAssert.fails(
      this.solnSquareVerifier.mintToken(accounts[1], 2, a, b, c, inputs, { from: accounts[0] }),
      truffleAssert.ErrorType.REVERT,
      "solution must be unique"
    );

    await truffleAssert.fails(
      this.solnSquareVerifier.mintToken(accounts[1], 2, a, b, c, [0, 0], { from: accounts[0] }),
      truffleAssert.ErrorType.REVERT,
      "solution must be valid"
    );
  });
});