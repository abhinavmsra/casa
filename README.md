## Introduction
Udacity capstone to build a decentralized housing product.

## Dependencies

Truffle - v5.3.12 (core: 5.3.12)
Solidity - 0.8.6 (solc-js)
Node - v15.4.0
Web3.js - v1.3.6
@openzeppelin/contracts - 4.1.0

## Notes

This project submission does not use Oraclize contract as it is not compatible with latest solidity version.

Oraclize was used for 2 purposes:

1. Convert int to string
It can be done using openzepplin's [`toString`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/3ae911b4421a9f2a4f3483e6fb0a660c31f3fc54/contracts/utils/Strings.sol#L14) helper

```
$ tokenId.toString()
```

2. Concat different strings
It seems the Solidity community now recommeds to use 

```
string(abi.encodePacked(string_A, string_B))
```

This submissing removes `Oraclize` contracts and uses above mentioned steps to perform needed operations. 
Please refer to `eth-contracts/contracts/ERC721Mintable.sol` L:544 for actual implementation.

## Deployment

- Verifier: [0xe4426f60aCCebb6Bfe8ec83293F467e391A74b64](https://rinkeby.etherscan.io/address/0xe4426f60aCCebb6Bfe8ec83293F467e391A74b64)
- SolnSquareVerifier: [0x4A377B48F99B80ed88a4B08276eB582531b66443](https://rinkeby.etherscan.io/address/0x4A377B48F99B80ed88a4B08276eB582531b66443)
- OpenSea: https://testnets.opensea.io/collection/casa-udacity