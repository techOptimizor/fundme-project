const { ethers } = require("hardhat")
const { expect, assert } = require("chai")

describe("SimpleStorage", function () {
    let simplestoragefac, simplestorage
    beforeEach(async function () {
        simplestoragefac = await ethers.getContractFactory("SimpleStorage")
        simplestorage = await simplestoragefac.deploy()
    })

    it("Should start with the favourite number of 0", async function () {
        const currentvalue = await simplestorage.retrieve()
        const expectedvalue = "0"

        assert.equal(currentvalue.toString(), expectedvalue)
    })
    it("Should update when we call store", async function () {
        const expectedvalue = "7"
        const transaction = await simplestorage.store("7")
        await transaction.wait(1)
        const currentvalue = await simplestorage.retrieve()
        assert.equal(currentvalue.toString(), expectedvalue)
    })

    it("Should store name and fav num", async function () {
        const expectedvalue = "3"
        console.log("Adding please wait...")
        const transaction = await simplestorage.addPerson("tony", "3")
        await transaction.wait(1)
        const currentvalue = await simplestorage.nameToFavoriteNumber("tony")
        assert.equal(currentvalue.toString(), expectedvalue)
    })
})
