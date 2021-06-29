const Verifier = artifacts.require('Verifier');
const { proof, inputs } = require('../../zokrates/code/square/proof.json');

contract('Verifier', accounts => {
  const { a, b, c } = proof;

  beforeEach(async () => { 
    this.verifier = await Verifier.new({ from: accounts[0] });
  });

  it('returns true for correct proof', async () => {
    assert.equal(await this.verifier.verifyTx(a, b, c, inputs), true);
  });

  it('returns false for incorrect proof', async () => {
    assert.equal(await this.verifier.verifyTx(a, b, c, [1,1]), false);
  });
})

