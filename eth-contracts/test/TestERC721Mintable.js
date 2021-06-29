const truffleAssert = require('truffle-assertions');
const TestCasaContract = artifacts.require('Casa');

contract('TestCasaContract', accounts => {
    const contractOwner = accounts[0];

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await TestCasaContract.new(
                "Casa", 
                "CASA", 
                "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", 
                { from: contractOwner }
            );

            await this.contract.mint(accounts[1], 1, { from: contractOwner });
            await this.contract.mint(accounts[2], 2, { from: contractOwner });
            await this.contract.mint(accounts[2], 3, { from: contractOwner });
            await this.contract.mint(accounts[3], 4, { from: contractOwner });
            await this.contract.mint(accounts[3], 5, { from: contractOwner });
            await this.contract.mint(accounts[3], 6, { from: contractOwner });
        });

        it('should return correct supply', async function () {             
            assert.equal(await this.contract.totalSupply(), 6);
        });

        it('should get token balance', async function () {
            assert.equal(await this.contract.balanceOf(accounts[2]), 2);
            assert.equal(await this.contract.balanceOf(accounts[3]), 3);
        });

        it('should return token uri', async function () { 
            assert.equal(await this.contract.tokenURI.call(1), "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1");
            assert.equal(await this.contract.tokenURI.call(2), "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/2");
            assert.equal(await this.contract.tokenURI.call(3), "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/3");
            assert.equal(await this.contract.tokenURI.call(4), "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/4");
            assert.equal(await this.contract.tokenURI.call(5), "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/5");
            assert.equal(await this.contract.tokenURI.call(6), "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/6");
        });

        it('should transfer token from one owner to another', async function () { 
            await this.contract.transferFrom(accounts[2], accounts[3], 2, { from: accounts[2] });

            assert.equal(await this.contract.balanceOf(accounts[2]), 1);
            assert.equal(await this.contract.balanceOf(accounts[3]), 4);
        });
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await TestCasaContract.new(
                "Casa", 
                "CASA", 
                "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", 
                { from: contractOwner }
            );
        })

        it('should fail when minting when address is not contract owner', async function () { 
            await truffleAssert.fails(
                this.contract.mint(accounts[1], 1, { from: accounts[1] }),
                truffleAssert.ErrorType.REVERT,
                "only owner is authorized to perform this action"
            );
        });

        it('should return contract owner', async function () { 
            assert.equal(await this.contract.owner(), contractOwner);  
        });
    });
})