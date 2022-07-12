const { getNamedAccounts, ethers } = require("hardhat")
async function main() {
    const { deployer } = await getNamedAccounts()
    const fundme = await ethers.getContract("FundMe", deployer)
    console.log("funding contract....")
    const transrecp = await fundme.fund({ value: ethers.utils.parseEther("1") })
    await transrecp.wait(1)
    console.log("FUNDED!👌")
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })
