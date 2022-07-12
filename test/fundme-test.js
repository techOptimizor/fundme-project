const { assert, expect } = require("chai")
const { deployments, ethers, getNamedAccounts } = require("hardhat")
const { deve } = require("../helper-hardhat")
!deve.includes(network.name)
    ? describe.skip
    : describe("FundMe", async function () {
          let fundme
          let mockv3agg
          let deployer
          const svalue = ethers.utils.parseEther("1")

          beforeEach(async function () {
              deployer = (await getNamedAccounts()).deployer
              await deployments.fixture(["all"])
              fundme = await ethers.getContract("FundMe", deployer)
              mockv3agg = await ethers.getContract("MockV3Aggregator", deployer)
          })

          describe("constructor", async function () {
              it("set the aggregator addreses correctly", async function () {
                  const respone = await fundme.pricefeed()
                  assert.equal(respone, mockv3agg.address)
              })
          })

          describe("fundme", async function () {
              it("throws if valuse is less", async function () {
                  await expect(fundme.fund()).to.be.revertedWith(
                      "You need to spend more ETH!"
                  )
              })
              it("updates the amount funded data structure", async function () {
                  // const { deployer } = await getNamedAccounts()
                  await fundme.fund({ value: svalue })
                  const respone = await fundme.addressToAmountFunded(deployer)
                  assert.equal(respone.toString(), svalue.toString())
              })
              it("adds funders to funder array", async function () {
                  await fundme.fund({ value: svalue })
                  const response = await fundme.funders(0)
                  assert.equal(response, deployer)
              })
          })

          describe("withdraw", async function () {
              beforeEach(async function () {
                  await fundme.fund({ value: svalue })
              })
              it("withdraw eth from a single founder", async function () {
                  const startfundmebal = await fundme.provider.getBalance(
                      fundme.address
                  )
                  const startdeployeval = await fundme.provider.getBalance(
                      deployer
                  )

                  const transresp = await fundme.withdraw()
                  const transrecp = await transresp.wait(1)
                  const { gasUsed, effectiveGasPrice } = transrecp
                  const gascost = gasUsed.mul(effectiveGasPrice)

                  const endfundbal = await fundme.provider.getBalance(
                      fundme.address
                  )
                  const enddeploybal = await fundme.provider.getBalance(
                      deployer
                  )

                  assert.equal(endfundbal, 0)
                  assert.equal(
                      startfundmebal.add(startdeployeval).toString(),
                      enddeploybal.add(gascost).toString()
                  )
              })
              it("allows us to withdraw with multiple account", async function () {
                  const account = await ethers.getSigners()
                  for (let i = 1; i < 6; i++) {
                      const fundconnectedcontract = await fundme.connect(
                          account[i]
                      )
                      await fundconnectedcontract.fund({ value: svalue })
                  }
                  const startfundmebal = await fundme.provider.getBalance(
                      fundme.address
                  )
                  const startdeployeval = await fundme.provider.getBalance(
                      deployer
                  )
                  const transresp = await fundme.withdraw()
                  const transrecp = await transresp.wait(1)
                  const { gasUsed, effectiveGasPrice } = transrecp
                  const gascost = gasUsed.mul(effectiveGasPrice)

                  const endfundbal = await fundme.provider.getBalance(
                      fundme.address
                  )
                  const enddeploybal = await fundme.provider.getBalance(
                      deployer
                  )

                  assert.equal(endfundbal, 0)
                  assert.equal(
                      startfundmebal.add(startdeployeval).toString(),
                      enddeploybal.add(gascost).toString()
                  )
                  await expect(fundme.funders(0)).to.be.reverted
                  for (let i = 1; i < 6; i++) {
                      assert.equal(
                          await fundme.addressToAmountFunded(
                              account[i].address
                          ),
                          0
                      )
                  }
              })
              it("Only the owner can withdraw funds ", async function () {
                  const account = await ethers.getSigners()
                  const attacker = account[1]
                  const attackercon = await fundme.connect(attacker)
                  await expect(attackercon.withdraw()).to.be.revertedWith(
                      "fundme__NotOwner"
                  )
              })
          })
      })
