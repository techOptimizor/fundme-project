//import

const { ethers } = require("hardhat")

async function main() {
    const simpStorage = await ethers.getContractFactory("SimpleStorage")
    console.log("Deploying contract wait...")
    const simplestorage = await simpStorage.deploy()
    await simplestorage.deployed()
    await simplestorage.deployTransaction.wait(1)
    console.log(` Deployed contract to ${simplestorage.address}`)

    const currentvalue = await simplestorage.retrieve()
    console.log(`current value is: ${currentvalue}`)

    const storevalue = await simplestorage.store("9")
    await storevalue.wait(1)
    console.log("wait for the updated value")
    console.log("-----------------------------")
    const updatedvalue = await simplestorage.retrieve()
    console.log(`this is the current updated value: ${updatedvalue}`)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
