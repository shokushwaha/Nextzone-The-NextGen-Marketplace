const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("FungibleToken", function () {
    let FungibleToken;
    let token;
    let owner;
    let user1;

    before(async function () {
        [owner, user1] = await ethers.getSigners();
        FungibleToken = await ethers.getContractFactory("FungibleToken");
        token = await FungibleToken.deploy("TestToken", "TST");
        await token.deployed();
    });

    it("Should mint tokens and check balances", async function () {
        const tokenId = 1;
        const tokenName = "Token1";
        const tokenSymbol = "T1";
        const amount = 100;

        await token.mint(user1.address, amount, tokenId, tokenName, tokenSymbol);

        const balance = await token.balanceOf(user1.address);
        expect(balance).to.equal(amount);

        const tokenCount = await token.getUserTokenCount(user1.address);
        expect(tokenCount).to.equal(1);
    });

    it("Should expire a token", async function () {
        await token.expireToken(user1.address, 0);

        const [, , , , expired,] = await token.getUserTokenDetails(user1.address, 0);
        expect(expired).to.equal(true);
    });

    it("Should redeem a token", async function () {
        await token.redeemToken(user1.address, 0);

        const [, , , , , redeemed] = await token.getUserTokenDetails(user1.address, 0);
        expect(redeemed).to.equal(true);
    });

    it("Should get active tokens", async function () {
        const tokenId = 2;
        const tokenName = "Token2";
        const tokenSymbol = "T2";
        const amount = 200;

        await token.mint(user1.address, amount, tokenId, tokenName, tokenSymbol);

        const activeTokens = await token.getActiveTokens(user1.address);

        expect(activeTokens.length).to.equal(1);
        expect(activeTokens[0].expired).to.equal(false);
        expect(activeTokens[0].redeemed).to.equal(false);
    });





    it("Should get expired tokens", async function () {
        const tokenId = 3;
        const tokenName = "Token3";
        const tokenSymbol = "T3";
        const amount = 150;

        await token.mint(user1.address, amount, tokenId, tokenName, tokenSymbol);
        await token.expireToken(user1.address, 1);

        const expiredTokens = await token.getExpiredTokens(user1.address);

        expect(expiredTokens.length).to.equal(1);
        expect(expiredTokens[0].expired).to.equal(true);
        expect(expiredTokens[0].redeemed).to.equal(false);
    });

    it("Should get redeemed tokens", async function () {
        const tokenId = 4;
        const tokenName = "Token4";
        const tokenSymbol = "T4";
        const amount = 250;

        await token.mint(user1.address, amount, tokenId, tokenName, tokenSymbol);
        await token.redeemToken(user1.address, 2);

        const redeemedTokens = await token.getRedeemedTokens(user1.address);

        expect(redeemedTokens.length).to.equal(1);
        expect(redeemedTokens[0].redeemed).to.equal(true);
    });


});
