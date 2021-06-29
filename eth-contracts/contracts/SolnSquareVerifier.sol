// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "./ERC721Mintable.sol";
import "./Verifier.sol";

contract SolnSquareVerifier is Casa(
  "Casa", 
  "CASA", 
  "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone"
) 
{
  struct Solution {
    uint256 index;
    address submitter;
  }

  Verifier verifier;
  Solution[] private solutions;
  mapping(bytes32 => Solution) private uniqueSolutions;

  event NewSolution(address indexed addr);

  constructor(address addr) {
    verifier = Verifier(addr);
  }

  function mintToken(
    uint256 tokenId, 
    uint[2] memory a, 
    uint[2][2] memory b, 
    uint[2] memory c, 
    uint[2] memory input
  ) 
    public
  {
      require(verifier.verifyTx(a, b, c, input), "solution must be valid");
      addSolution(tokenId, a, b, c, input);
      super.mint(msg.sender, tokenId);
  }

  function addSolution(
    uint256 tokenId, 
    uint[2] memory a, 
    uint[2][2] memory b, 
    uint[2] memory c, 
    uint[2] memory input
  ) 
    private 
  {
      bytes32 key = keccak256(abi.encodePacked(a,b,c,input));

      require(
        uniqueSolutions[key].submitter == address(0), 
        "solution must be unique"
      );

      uniqueSolutions[key] = Solution({ index: tokenId, submitter: msg.sender });
      emit NewSolution(msg.sender);
  }
}

























