"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("hardhat/config");
const units_1 = require("@ethersproject/units");
const protocol_contracts_1 = require("@zetachain/protocol-contracts");
const helpers_1 = require("@zetachain/toolkit/helpers");
const bignumber_1 = require("@ethersproject/bignumber");
const main = async (args, hre) => {
    const [signer] = await hre.ethers.getSigners();
    console.log(`🔑 Using account: ${signer.address}\n`);
    const targetZRC20 = protocol_contracts_1.getAddress("zrc20", args.destination);
    const minAmountOut = bignumber_1.BigNumber.from("0");
    const data = helpers_1.prepareData(args.contract, ["address", "bytes32", "uint256"], [targetZRC20, args.recipient, minAmountOut]);
    const to = protocol_contracts_1.getAddress("tss", hre.network.name);
    const value = units_1.parseEther(args.amount);
    const tx = await signer.sendTransaction({ data, to, value });
    console.log(`
🚀 Successfully broadcasted a token transfer transaction on ${hre.network.name} network.
📝 Transaction hash: ${tx.hash}
`);
    await helpers_1.trackCCTX(tx.hash);
};
config_1.task("interact", "Interact with the contract", main)
    .addParam("contract", "The address of the withdraw contract on ZetaChain")
    .addParam("amount", "Amount of tokens to send")
    .addParam("recipient")
    .addParam("destination");
