const { getNamedAccounts, ethers } = require("hardhat")
async function main() {
    const { deployer } = await getNamedAccounts()
    const fundme = await ethers.getContract("FundMe", deployer)
    console.log("withdrawing your funds....")
    const transrecp = await fundme.withdraw()
    await transrecp.wait(1)
    console.log("Withdrawn!👌")
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })
