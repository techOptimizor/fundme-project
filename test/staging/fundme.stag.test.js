const { assert } = require("chai")
const { ethers, getNamedAccounts, network } = require("hardhat")
const { deve } = require("../../helper-hardhat")

deve.includes(network.name)
    ? describe.skip
    : describe("FundMe", async function () {
          let fundme
          let deployer
          const svalue = ethers.utils.parseEther("1")

          beforeEach(async function () {
              deployer = (await getNamedAccounts()).deployer
              fundme = await ethers.getContract("FundMe", deployer)
          })

          it("it allows people to fund and withdraw", async function () {
              await fundme.fund({ value: svalue })
              await fundme.withdraw()
              const endingbal = await fundme.provider.getBalance(fundme.address)
              assert.equal(endingbal.toString(), "0")
          })
      })
