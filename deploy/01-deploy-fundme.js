const { network } = require("hardhat")
const { networkconfig, deve } = require("../helper-hardhat")
const { verify } = require("../utilis/verify")
//const { network } = require("hardhat")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainid = network.config.chainId

    let ethusdaddress
    if (deve.includes(network.name)) {
        const ethusdaggre = await deployments.get("MockV3Aggregator")
        ethusdaddress = ethusdaggre.address
    } else {
        ethusdaddress = networkconfig[chainid]["ethusd"]
    }
    const args = [ethusdaddress]
    const fundme = await deploy("FundMe", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: network.config.blockCon || 1,
    })
    if (!deve.includes(network.name) && process.env.ETHERSCAN) {
        await verify(fundme.address, args)
    }
    log("---------------------------------------")
}
module.exports.tags = ["all", "fundme"]
