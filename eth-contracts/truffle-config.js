const fs = require('fs');
const HDWalletProvider = require('@truffle/hdwallet-provider');

const mnemonic = fs.readFileSync(".secret").toString().trim();
const infuraKey = fs.readFileSync(".infura").toString().trim();

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1", 
      port: 7545,
      network_id: "*"
    },
    rinkeby: {
      provider: () => new HDWalletProvider({ mnemonic: mnemonic, providerOrUrl: `https://rinkeby.infura.io/v3/${infuraKey}` }),
      network_id: 4,      
      gas: 5500000,    
      confirmations: 2,  
      timeoutBlocks: 200, 
      skipDryRun: true
    }
  },
  compilers: {
    solc: {
      version: "0.8.6"
    }
  }
}
