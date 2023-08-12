// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract FungibleToken is ERC20 {
    address public owner;

    struct TokenDetails {
        uint256 tokenId;
        string tokenName;
        string tokenSymbol;
        uint256 amount;
    }

    mapping(address => TokenDetails[]) public userTokenDetails;

    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        owner = msg.sender;
    }

    function mint(
        address recipient,
        uint256 amount,
        uint256 tokenId,
        string memory tokenName,
        string memory tokenSymbol
    ) external {
        _mint(recipient, amount);
        userTokenDetails[recipient].push(
            TokenDetails(tokenId, tokenName, tokenSymbol, amount)
        );
    }

    function getUserTokenCount(address user) external view returns (uint256) {
        return userTokenDetails[user].length;
    }

    function getUserTokenDetails(
        address user,
        uint256 index
    ) external view returns (uint256, string memory, string memory, uint256) {
        require(
            index < userTokenDetails[user].length,
            "Token index out of bounds"
        );
        TokenDetails memory token = userTokenDetails[user][index];
        return (
            token.tokenId,
            token.tokenName,
            token.tokenSymbol,
            token.amount
        );
    }
}
