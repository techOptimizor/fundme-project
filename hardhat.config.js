require("dotenv").config()

require("@nomiclabs/hardhat-etherscan")
require("@nomiclabs/hardhat-waffle")
require("hardhat-gas-reporter")
require("solidity-coverage")
require("hardhat-deploy")

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
    const accounts = await hre.ethers.getSigners()

    for (const account of accounts) {
        console.log(account.address)
    }
})

module.exports = {
    solidity: {
        compilers: [{ version: "0.8.8" }, { version: "0.6.6" }],
    },
    networks: {
        rinkeby: {
            url: process.env.RINKEBY_RUL,
            accounts: [process.env.PRIVATE_KEY],
            chainId: 4,
            blockCon: 6,
        },
    },
    namedAccounts: { deployer: { default: 0 } },
    gasReporter: {
        enabled: true,
        currency: "USD",
        coinmarketcap: process.env.COINMARKETCAP,
        //token: "MATIC",
    },
    etherscan: {
        apiKey: process.env.ETHERSCAN,
    },
}
