const { network } = require("hardhat")
const { deve, decimal, initial_answer } = require("../helper-hardhat")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainid = network.config.chainId

    if (deve.includes(network.name)) {
        log("local network detected")
        await deploy("MockV3Aggregator", {
            contract: "MockV3Aggregator",
            from: deployer,
            log: true,
            args: [decimal, initial_answer],
        })
        log("mocks deployed")
        log("---------------------")
    }
}

module.exports.tags = ["all", "mocks"]
