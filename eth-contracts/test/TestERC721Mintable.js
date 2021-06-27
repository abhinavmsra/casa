const CasaContract = artifacts.require('Casa');

contract('TestCasaContract', accounts => {
    const constractOwner = accounts[0];

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await CasaContract.new({from: constractOwner});
            await this.contract.mint(accounts[1], 1);

            // await Promise.all(accounts.slice(1).map(async (account, index) => {
            //     await this.contract.mint(account, index + 1);
            // }));
        })

        it('should return total supply', async function () { 
            assert.equal(1, 1);
        })

        it('should get token balance', async function () { 
            
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            
        })

        it('should transfer token from one owner to another', async function () { 
            
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            // this.contract = await ERC721MintableComplete.new({from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            
        })

        it('should return contract owner', async function () { 
            
        })

    });
})