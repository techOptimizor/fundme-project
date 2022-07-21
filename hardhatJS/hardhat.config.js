require("@nomiclabs/hardhat-waffle")
require("dotenv").config()
require("./blockNumber")
require("hardhat-gas-reporter")
require("solidity-coverage")
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
    const accounts = await hre.ethers.getSigners()

    for (const account of accounts) {
        console.log(account.address)
    }
})

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more
const rinkeby_rpc_url = process.env.RINKEBY_RUL
const PRIVATE_KEY = process.env.PRIVATE_KEY
const COINMARKET = process.env.COINMARKETCAP
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        rinkeby: {
            url: rinkeby_rpc_url,
            accounts: [PRIVATE_KEY],
            chainId: 4,
        },
        localhost: {
            url: "http://127.0.0.1:8545/",
            chainId: 31337,
        },
    },
    solidity: "0.8.7",
    gasReporter: {
        enabled: true,
        currency: "USD",
        coinmarketcap: COINMARKET,
        //token: "MATIC",
    },
    etherscan: {
        apikey: process.env.ETHERSCAN,
    },
}
