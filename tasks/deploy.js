"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const protocol_contracts_1 = require("@zetachain/protocol-contracts");
const config_1 = require("hardhat/config");
const main = async (args, hre) => {
    if (hre.network.name !== "zeta_testnet") {
        throw new Error('🚨 Please use the "zeta_testnet" network to deploy to ZetaChain.');
    }
    const [signer] = await hre.ethers.getSigners();
    console.log(`🔑 Using account: ${signer.address}\n`);
    const systemContract = protocol_contracts_1.getAddress("systemContract", "zeta_testnet");
    const factory = await hre.ethers.getContractFactory("Swap");
    const contract = await factory.deploy(systemContract);
    await contract.deployed();
    console.log(`🚀 Successfully deployed contract on ZetaChain.
📜 Contract address: ${contract.address}
🌍 Explorer: https://athens3.explorer.zetachain.com/address/${contract.address}
`);
};
config_1.task("deploy", "Deploy the contract", main);
