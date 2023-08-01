"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./tasks/interact");
require("./tasks/deploy");
require("@nomicfoundation/hardhat-toolbox");
const networks_1 = require("@zetachain/networks");
require("@zetachain/toolkit/tasks");
const config = {
    solidity: "0.8.7",
    networks: {
        ...networks_1.getHardhatConfigNetworks(),
    },
};
exports.default = config;
